import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, reducido } from "../lib/scroll";
import { proyectos, masTrabajo } from "../data/proyectos";
import { Poster } from "./Poster";

// Inclina la tarjeta en 3D siguiendo el puntero.
const inclinar = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el.querySelector(".poster"), { rotateY: x * 14, rotateX: -y * 12, duration: 0.5, ease: "power3" });
};
const soltar = (e) => gsap.to(e.currentTarget.querySelector(".poster"), { rotateY: 0, rotateX: 0, duration: 1, ease: "elastic.out(1, 0.5)" });

export const Proyectos = () => {
    const raiz = useRef(null);
    const pista = useRef(null);
    const chip = useRef(null);

    // En escritorio el scroll vertical mueve la galería en horizontal; en celular se desliza con el dedo.
    useEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 960px)", () => {
            if (reducido()) return;
            raiz.current.classList.add("pro--fija");
            const largo = () => pista.current.scrollWidth - window.innerWidth;
            const tw = gsap.to(pista.current, {
                x: () => -largo(), ease: "none",
                scrollTrigger: {
                    trigger: ".pro__escena", start: "top top", end: () => `+=${largo()}`,
                    pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
                    onUpdate: (s) => gsap.set(".pro__avance i", { scaleX: s.progress }),
                },
            });
            gsap.utils.toArray(".pro__item .poster").forEach((p) => {
                gsap.fromTo(p, { "--corre": "8%" }, {
                    "--corre": "-8%", ease: "none",
                    scrollTrigger: { trigger: p, containerAnimation: tw, start: "left right", end: "right left", scrub: true },
                });
            });
            return () => raiz.current?.classList.remove("pro--fija");
        });
        return () => mm.revert();
    }, []);

    // Lista "más trabajo": un chip de color sigue al puntero.
    useEffect(() => {
        const x = gsap.quickTo(chip.current, "x", { duration: 0.5, ease: "power3" });
        const y = gsap.quickTo(chip.current, "y", { duration: 0.5, ease: "power3" });
        const mover = (e) => { x(e.clientX); y(e.clientY); };
        window.addEventListener("pointermove", mover, { passive: true });
        return () => window.removeEventListener("pointermove", mover);
    }, []);
    const verChip = (item) => {
        chip.current.style.setProperty("--c", item.color);
        chip.current.textContent = item.nombre.slice(0, 1);
        chip.current.classList.add("chip--ver");
    };

    return (
        <section className="pro" id="proyectos" ref={raiz} data-tramo="Proyectos">
            <div className="pro__escena">
                <div className="pro__pista" ref={pista}>
                    <header className="pro__cabeza">
                        <h2 data-split>Once productos. Ninguno se parece al otro.</h2>
                        <p>Cada proyecto tiene su propia identidad visual, hecha a la medida y sin plantillas. Todos están en uso.</p>
                        <span className="pro__pista-ayuda">Desliza para recorrerlos</span>
                    </header>
                    {proyectos.map((p) => {
                        const Marco = p.enlace ? "a" : "div";
                        const extra = p.enlace ? { href: p.enlace, target: "_blank", rel: "noreferrer", "data-cursor": "Abrir" } : {};
                        return (
                            <article className="pro__item" key={p.slug}>
                                <Marco className="pro__marco" onPointerMove={inclinar} onPointerLeave={soltar} {...extra}>
                                    <Poster proyecto={p} />
                                </Marco>
                                <div className="pro__info">
                                    <p className="pro__tipo">{p.tipo}</p>
                                    <h3>{p.nombre}</h3>
                                    <p className="pro__resumen">{p.resumen}</p>
                                    <p className="pro__dato">{p.dato}</p>
                                    <ul className="chips">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                                </div>
                            </article>
                        );
                    })}
                    <div className="pro__fin">
                        <p>Y hay {masTrabajo.length} más abajo.</p>
                    </div>
                </div>
                <div className="pro__avance" aria-hidden="true"><i /></div>
            </div>

            <div className="mas ancho">
                <h2 data-split>También construí esto.</h2>
                <ul className="mas__lista" onPointerLeave={() => chip.current.classList.remove("chip--ver")}>
                    {masTrabajo.map((m) => {
                        const C = m.enlace ? "a" : "div";
                        return (
                            <li key={m.nombre} onPointerEnter={() => verChip(m)}>
                                <C className="mas__fila" {...(m.enlace ? { href: m.enlace, target: "_blank", rel: "noreferrer" } : {})}>
                                    <span className="mas__nombre">{m.nombre}</span>
                                    <span className="mas__tipo">{m.tipo}{m.enlace && <i className="mas__ir" aria-hidden="true" />}</span>
                                </C>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="chip" ref={chip} aria-hidden="true" />
        </section>
    );
};
