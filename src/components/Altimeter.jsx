import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Altímetro lateral: convierte el avance del scroll en metros de altura.
// Sale de 2.600 m (Bogotá) y la última sección es la cumbre.
const BASE = 2600, CUMBRE = 5200;

export const Altimeter = () => {
    const num = useRef(null), nombre = useRef(null), aguja = useRef(null);
    const { pathname } = useLocation();

    useEffect(() => {
        let raf;
        const medir = () => {
            raf = requestAnimationFrame(medir);
            const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const p = Math.min(1, Math.max(0, window.scrollY / max));
            if (!num.current) return;
            num.current.textContent = Math.round(BASE + (CUMBRE - BASE) * p).toLocaleString("es-CO");
            aguja.current.style.transform = `translateY(${(1 - p) * 100}%)`;
            let actual = "";
            document.querySelectorAll("[data-tramo]").forEach((s) => {
                if (s.getBoundingClientRect().top < window.innerHeight * 0.5) actual = s.dataset.tramo;
            });
            if (nombre.current.textContent !== actual) nombre.current.textContent = actual;
        };
        raf = requestAnimationFrame(medir);
        return () => cancelAnimationFrame(raf);
    }, [pathname]);

    return (
        <aside className="alti" aria-hidden="true">
            <span className="alti__nombre" ref={nombre} />
            <div className="alti__regla"><i ref={aguja} /></div>
            <span className="alti__num"><b ref={num}>2.600</b> m</span>
        </aside>
    );
};
