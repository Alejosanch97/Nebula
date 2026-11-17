import { useEffect, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { gsap, SplitText, irA, reducido } from "../lib/scroll";
import { Magnetic } from "./Magnetic";

export const Hero = () => {
    const { store } = useGlobalReducer();
    const raiz = useRef(null);

    // Entrada: espera al preloader (store.listo) y a las fuentes.
    useEffect(() => {
        if (!store.listo || reducido()) return;
        let ctx, vivo = true;
        (document.fonts?.ready ?? Promise.resolve()).then(() => {
            if (!vivo) return;
            ctx = gsap.context(() => {
                gsap.set(raiz.current, { autoAlpha: 1 });
                const t = SplitText.create(".hero__titulo", { type: "lines,chars", mask: "lines" });
                gsap.timeline()
                    .from(t.chars, { yPercent: 120, rotate: 8, duration: 1.2, ease: "expo.out", stagger: 0.018 })
                    .from(".hero__entra", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.09 }, "-=0.8");
                // Al bajar, el titular se aleja y deja ver la cordillera.
                gsap.to(".hero__dentro", {
                    yPercent: -18, opacity: 0, scale: 0.94, ease: "none",
                    scrollTrigger: { trigger: raiz.current, start: "top top", end: "bottom 35%", scrub: true },
                });
            }, raiz);
        });
        return () => { vivo = false; ctx?.revert(); };
    }, [store.listo]);

    return (
        <section className="hero" ref={raiz} data-terreno data-tramo="Bogotá">
            <div className="hero__dentro">
                <p className="hero__entra hero__quien">Alejo Sánchez, Nébula Estudio</p>
                <h1 className="hero__titulo">Construyo productos web que la gente sí usa.</h1>
                <div className="hero__bajo">
                    <p className="hero__entra hero__texto">
                        Soy ingeniero químico y desarrollador full-stack. Me gusta tomar una idea
                        y llevarla hasta que alguien la usa. La diseño, la programo y la despliego
                        desde Bogotá.
                    </p>
                    <div className="hero__entra hero__acciones">
                        <Magnetic><button className="boton boton--lleno" onClick={() => irA("#proyectos")}>Ver proyectos</button></Magnetic>
                        <Magnetic><button className="boton" onClick={() => irA("#compass")}>Conocer COMPASS</button></Magnetic>
                    </div>
                </div>
            </div>
            <div className="hero__pie hero__entra">
                <span>4.711° N, 74.072° O</span>
                <span className="hero__baja"><i />Sigue subiendo</span>
                <span className="hero__libre"><i />Disponible para nuevos retos</span>
            </div>
        </section>
    );
};
