import { useRef } from "react";
import { gsap } from "../lib/scroll";

// Envuelve un botón o enlace y lo atrae hacia el puntero.
export const Magnetic = ({ children, fuerza = 0.35 }) => {
    const ref = useRef(null);
    const mover = (e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current.getBoundingClientRect();
        gsap.to(ref.current, {
            x: (e.clientX - (r.left + r.width / 2)) * fuerza,
            y: (e.clientY - (r.top + r.height / 2)) * fuerza,
            duration: 0.4, ease: "power3",
        });
    };
    const soltar = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });
    return <span className="iman" ref={ref} onPointerMove={mover} onPointerLeave={soltar}>{children}</span>;
};
