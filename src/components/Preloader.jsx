import { useEffect, useRef, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { gsap, pausarScroll, reducido } from "../lib/scroll";

// Entrada del sitio: el altímetro sube hasta 2.600 m (Bogotá) y la pantalla se abre.
export const Preloader = () => {
    const { store, dispatch } = useGlobalReducer();
    const caja = useRef(null);
    const num = useRef(null);
    const [fin, setFin] = useState(store.listo);

    useEffect(() => {
        if (store.listo) return;
        if (reducido()) { dispatch({ type: "sitio_listo" }); setFin(true); return; }
        pausarScroll(true);
        const cuenta = { v: 0 };
        const tl = gsap.timeline({
            onComplete: () => { pausarScroll(false); },
        });
        tl.to(cuenta, {
            v: 2600, duration: 1.7, ease: "power3.inOut",
            onUpdate: () => { num.current.textContent = Math.round(cuenta.v).toLocaleString("es-CO"); },
        })
            .to(".pre__barra i", { scaleX: 1, duration: 1.7, ease: "power3.inOut" }, 0)
            .to(".pre__fila", { yPercent: -110, duration: 0.6, ease: "power3.in", stagger: 0.05 }, "+=0.25")
            .add(() => dispatch({ type: "sitio_listo" }), "-=0.15")
            .to(caja.current, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "-=0.2")
            .add(() => setFin(true));
        return () => { tl.kill(); pausarScroll(false); };
    }, []);

    if (fin) return null;

    return (
        <div className="pre" ref={caja} aria-hidden="true">
            <div className="pre__centro">
                <div className="pre__linea"><p className="pre__fila pre__marca">Nébula Estudio</p></div>
                <div className="pre__linea"><p className="pre__fila pre__num"><span ref={num}>0</span> m</p></div>
                <div className="pre__linea"><p className="pre__fila pre__lugar">Subiendo a Bogotá</p></div>
            </div>
            <div className="pre__barra"><i /></div>
        </div>
    );
};
