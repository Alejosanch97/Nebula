import { useEffect, useRef } from "react";
import { gsap } from "../lib/scroll";

// Cursor propio: un punto que crece y muestra una palabra sobre los elementos con data-cursor="Texto".
export const Cursor = () => {
    const punto = useRef(null);
    const texto = useRef(null);

    useEffect(() => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const el = punto.current;
        document.documentElement.classList.add("con-cursor");
        const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
        const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
        const mover = (e) => {
            x(e.clientX); y(e.clientY);
            el.classList.add("cursor--vivo");
            const obj = e.target.closest?.("[data-cursor]");
            const enlace = e.target.closest?.("a, button");
            el.classList.toggle("cursor--texto", !!obj);
            el.classList.toggle("cursor--enlace", !obj && !!enlace);
            if (obj) texto.current.textContent = obj.dataset.cursor;
        };
        const salir = () => el.classList.remove("cursor--vivo");
        window.addEventListener("pointermove", mover, { passive: true });
        document.addEventListener("pointerleave", salir);
        return () => {
            window.removeEventListener("pointermove", mover);
            document.removeEventListener("pointerleave", salir);
            document.documentElement.classList.remove("con-cursor");
        };
    }, []);

    return <div className="cursor" ref={punto} aria-hidden="true"><span ref={texto} /></div>;
};
