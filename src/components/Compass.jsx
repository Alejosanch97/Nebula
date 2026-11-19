import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, reducido } from "../lib/scroll";
import { fasesAtlas, hitosCompass } from "../data/proyectos";

// COMPASS: en escritorio la sección se queda fija y el scroll recorre las cinco fases de ATLAS.
// La aguja de la brújula gira hacia la fase activa y la Huella sube hasta 80.
export const Compass = () => {
    const raiz = useRef(null);
    const [fase, setFase] = useState(0);
    const [fijo, setFijo] = useState(false);

    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 960px) and (min-height: 620px)", () => {
            if (reducido()) return;
            setFijo(true);
            const st = ScrollTrigger.create({
                trigger: ".compass__escena", start: "top top", end: "+=260%", pin: true, anticipatePin: 1,
                onUpdate: (s) => setFase(Math.min(fasesAtlas.length - 1, Math.floor(s.progress * fasesAtlas.length))),
            });
            return () => { st.kill(); setFijo(false); };
        });
        mm.add("(max-width: 959px), (max-height: 619px)", () => {
            const lista = gsap.utils.toArray(".compass__fase").map((el, i) => ScrollTrigger.create({
                trigger: el, start: "top 62%", end: "bottom 62%",
                onToggle: (s) => s.isActive && setFase(i),
            }));
            return () => lista.forEach((s) => s.kill());
        });
        return () => mm.revert();
    }, []);

    const huella = Math.round(((fase + 1) / fasesAtlas.length) * 80);

    return (
        <section className="compass" id="compass" ref={raiz} data-tramo="COMPASS">
            <div className={`compass__escena ${fijo ? "compass__escena--fija" : ""}`}>
                <header className="compass__cabeza">
                    <p className="compass__sello">Piloto en Los Andes. Rumbo a Berlín.</p>
                    <h2 data-split>COMPASS guía a Instituciones hacia el uso responsable de la IA.</h2>
                    <p className="compass__intro">
                        Lo cofundé con Felipe Cárdenas y construí la plataforma completa. ATLAS, su modelo
                        operativo, lleva a cada institución por cinco fases.
                    </p>
                    <a className="enlace" href="https://compassgovernance.org" target="_blank" rel="noreferrer">compassgovernance.org</a>
                </header>

                <div className="compass__rosa" style={{ "--giro": `${fase * 72}deg` }}>
                    <svg viewBox="0 0 400 400" aria-hidden="true">
                        <circle cx="200" cy="200" r="188" className="rosa__aro" />
                        <circle cx="200" cy="200" r="150" className="rosa__aro rosa__aro--fino" />
                        {Array.from({ length: 60 }).map((_, i) => (
                            <line key={i} x1="200" y1="14" x2="200" y2={i % 5 === 0 ? 34 : 24}
                                transform={`rotate(${i * 6} 200 200)`} className="rosa__marca" />
                        ))}
                        {fasesAtlas.map((f, i) => {
                            const a = (i * 72 - 90) * Math.PI / 180;
                            return (
                                <text key={i} x={200 + Math.cos(a) * 122} y={200 + Math.sin(a) * 122}
                                    className={`rosa__letra ${i === fase ? "rosa__letra--activa" : ""}`}
                                    textAnchor="middle" dominantBaseline="central">{f.letra}</text>
                            );
                        })}
                        <g className="rosa__aguja">
                            <path d="M200 52 216 200 200 222 184 200Z" className="rosa__norte" />
                            <path d="M200 348 216 200 200 178 184 200Z" className="rosa__sur" />
                        </g>
                        <circle cx="200" cy="200" r="46" className="rosa__centro" />
                    </svg>
                    <div className="rosa__huella" aria-live="polite">
                        <b>{huella}</b>
                        <span>Huella</span>
                    </div>
                    <div className={`credencial ${fase === fasesAtlas.length - 1 ? "credencial--lista" : ""}`}>
                        <span>Credencial verificable</span>
                        <b>Emitida al llegar a 80</b>
                    </div>
                </div>

                <ol className="compass__fases">
                    {fasesAtlas.map((f, i) => (
                        <li key={f.nombre} className={`compass__fase ${i === fase ? "compass__fase--activa" : ""} ${i < fase ? "compass__fase--hecha" : ""}`}>
                            <span className="compass__n">{i + 1}</span>
                            <div>
                                <h3>{f.nombre}</h3>
                                <p>{f.texto}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <ul className="compass__hitos ancho">
                {hitosCompass.map((h) => (
                    <li key={h.titulo} data-sube>
                        <h3>{h.titulo}</h3>
                        <p>{h.texto}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};
