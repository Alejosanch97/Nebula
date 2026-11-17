import { useEffect, useRef } from "react";
import * as THREE from "three";
import { reducido } from "../lib/scroll";

// Terreno 3D con curvas de nivel, generado por completo en la GPU.
// El scroll avanza el vuelo sobre la cordillera y, al llegar al final de la página, amanece.

const ruido = /* glsl */`
vec2 hash(vec2 p){ p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))); return -1.0 + 2.0*fract(sin(p)*43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(dot(hash(i),f), dot(hash(i+vec2(1,0)),f-vec2(1,0)),u.x),
             mix(dot(hash(i+vec2(0,1)),f-vec2(0,1)), dot(hash(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){ float a=.5, s=0.; for(int i=0;i<5;i++){ s+=a*noise(p); p=p*2.03+17.; a*=.5; } return s; }
`;

const vert = /* glsl */`
uniform float uAvance; uniform float uTiempo;
varying float vAlt; varying float vDist; varying vec2 vXY;
${ruido}
void main(){
  vec3 p = position;
  vec2 q = vec2(p.x, p.y + uAvance) * 0.035;
  float h = fbm(q) * 0.5 + 0.5;
  h = pow(h, 2.2) * 46.0;
  float valle = smoothstep(2.0, 34.0, abs(p.x + sin((p.y + uAvance) * 0.03) * 8.0));
  h *= mix(0.16, 1.0, valle);
  h += sin(uTiempo * 0.4 + p.x * 0.2) * 0.05;
  p.z = h;
  vAlt = h; vXY = p.xy;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}`;

const frag = /* glsl */`
precision highp float;
uniform vec3 uFondo; uniform vec3 uSuelo; uniform vec3 uLinea; uniform vec3 uCima; uniform float uAlba;
varying float vAlt; varying float vDist; varying vec2 vXY;
void main(){
  float c = vAlt * 0.8;
  float linea = 1.0 - smoothstep(0.0, 1.4, abs(fract(c - 0.5) - 0.5) / fwidth(c));
  float maestra = 1.0 - smoothstep(0.0, 1.8, abs(fract(c * 0.2 - 0.5) - 0.5) / fwidth(c * 0.2));
  float alto = smoothstep(4.0, 24.0, vAlt);
  vec3 col = mix(uSuelo, mix(uSuelo, uCima, 0.35 + uAlba * 0.35), alto * 0.55);
  vec3 tinta = mix(uLinea, uCima, alto);
  col = mix(col, tinta, max(linea * 0.55, maestra * 0.95));
  float niebla = smoothstep(18.0, 150.0, vDist);
  col = mix(col, uFondo, niebla);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;

const NOCHE = { fondo: "#2E2780", suelo: "#19164A", linea: "#8F86FF", cima: "#FF7A2F" };
const ALBA = { fondo: "#FFC7A6", suelo: "#FFDCC2", linea: "#F0457F", cima: "#FF7A2F" };

export const Terrain = () => {
    const caja = useRef(null);

    useEffect(() => {
        const el = caja.current;
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        } catch (e) {
            el.classList.add("terreno--plano");   // sin WebGL queda el degradado de CSS
            return;
        }
        const movil = window.innerWidth < 800;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, movil ? 1.5 : 2));
        el.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
        const seg = movil ? 150 : 260;
        const geo = new THREE.PlaneGeometry(260, 260, seg, seg);
        const c = (h) => new THREE.Color(h);
        const uniforms = {
            uAvance: { value: 0 }, uTiempo: { value: 0 }, uAlba: { value: 0 },
            uFondo: { value: c(NOCHE.fondo) }, uSuelo: { value: c(NOCHE.suelo) },
            uLinea: { value: c(NOCHE.linea) }, uCima: { value: c(NOCHE.cima) },
        };
        const mat = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms });
        const malla = new THREE.Mesh(geo, mat);
        malla.rotation.x = -Math.PI / 2;
        scene.add(malla);

        const pares = [["uFondo", "fondo"], ["uSuelo", "suelo"], ["uLinea", "linea"], ["uCima", "cima"]]
            .map(([u, k]) => [uniforms[u].value, c(NOCHE[k]), c(ALBA[k])]);

        const medir = () => {
            const w = el.clientWidth, h = el.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.fov = w < h ? 70 : 55;
            camera.updateProjectionMatrix();
        };
        medir();
        window.addEventListener("resize", medir);

        const raton = { x: 0, y: 0, sx: 0, sy: 0 };
        const mover = (e) => { raton.x = e.clientX / window.innerWidth - 0.5; raton.y = e.clientY / window.innerHeight - 0.5; };
        window.addEventListener("pointermove", mover, { passive: true });

        const quieto = reducido();
        let raf, avance = 0, alba = 0, t0 = performance.now();
        const cuadro = (ahora) => {
            raf = requestAnimationFrame(cuadro);
            // Solo se dibuja cuando alguna sección transparente (data-terreno) está en pantalla.
            const visibles = document.querySelectorAll("[data-terreno]");
            let ver = visibles.length === 0;
            visibles.forEach((s) => { const r = s.getBoundingClientRect(); if (r.bottom > 0 && r.top < window.innerHeight) ver = true; });
            if (!ver) return;

            const t = (ahora - t0) / 1000;
            const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const p = Math.min(1, window.scrollY / max);
            const meta = document.querySelector("[data-alba]");
            let albaMeta = 0;
            if (meta) { const r = meta.getBoundingClientRect(); albaMeta = THREE.MathUtils.clamp(1 - r.top / window.innerHeight, 0, 1); }
            alba += (albaMeta - alba) * 0.08;
            avance += ((quieto ? 0 : t * 1.6) + window.scrollY * 0.03 - avance) * 0.08;
            raton.sx += (raton.x - raton.sx) * 0.04; raton.sy += (raton.y - raton.sy) * 0.04;

            uniforms.uAvance.value = avance;
            uniforms.uTiempo.value = t;
            uniforms.uAlba.value = alba;
            pares.forEach(([v, a, b]) => v.copy(a).lerp(b, alba));

            const sube = Math.min(1, window.scrollY / window.innerHeight);
            camera.position.set(raton.sx * 6, 9 + sube * 16 + alba * 4 - raton.sy * 2, 96);
            camera.lookAt(raton.sx * 2, 12 + sube * 4 + alba * 6, 0);
            renderer.render(scene, camera);
            document.documentElement.style.setProperty("--alba", alba.toFixed(3));
        };
        raf = requestAnimationFrame(cuadro);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", medir);
            window.removeEventListener("pointermove", mover);
            geo.dispose(); mat.dispose(); renderer.dispose();
            renderer.domElement.remove();
        };
    }, []);

    return <div className="terreno" ref={caja} aria-hidden="true"><div className="terreno__estrellas" /><div className="terreno__sol" /></div>;
};
