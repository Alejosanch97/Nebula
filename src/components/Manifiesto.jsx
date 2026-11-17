import { useEffect, useRef } from "react";
import { gsap, SplitText, reducido } from "../lib/scroll";
import { cifras, stack } from "../data/proyectos";

const Cinta = ({ items, reversa }) => (
    <div className={`cinta ${reversa ? "cinta--reversa" : ""}`} aria-hidden="true">
        <div className="cinta__pista">
            {[0, 1].map((n) => (
                <ul key={n}>{items.map((s) => <li key={s}>{s}</li>)}</ul>
            ))}
        </div>
    </div>
);

export const Manifiesto = () => {
    const raiz = useRef(null);

    // El párrafo se "tinta" palabra por palabra mientras avanzas.
    useEffect(() => {
        if (reducido()) return;
        let ctx, vivo = true;
        (document.fonts?.ready ?? Promise.resolve()).then(() => {
            if (!vivo) return;
            ctx = gsap.context(() => {
                SplitText.create(".mani__texto", {
                    type: "words", autoSplit: true,
                    onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.14 }, {
                        opacity: 1, ease: "none", stagger: 0.1,
                        scrollTrigger: { trigger: ".mani__texto", start: "top 78%", end: "bottom 45%", scrub: 0.6 },
                    }),
                });
                // Las cintas del stack se inclinan con la velocidad del scroll.
                const inclina = gsap.quickTo(".cinta__pista", "skewX", { duration: 0.5, ease: "power3" });
                gsap.to({}, {
                    scrollTrigger: {
                        trigger: ".mani__stack", start: "top bottom", end: "bottom top",
                        onUpdate: (s) => inclina(gsap.utils.clamp(-14, 14, s.getVelocity() / -260)),
                    },
                });
            }, raiz);
        });
        return () => { vivo = false; ctx?.revert(); };
    }, []);

    return (
        <section className="mani" ref={raiz} id="sobre" data-tramo="Quién soy">
            <div className="ancho">
                <p className="mani__texto">
                    Estudié ingeniería química en Los Andes y de ahí me quedó la costumbre
                    de entender un problema antes de tocarlo. Aprendí a programar construyendo
                    cosas que alguien necesitaba. Hoy lidero la transformación digital de un
                    colegio bilingüe y hago software en Nébula Estudio. La IA es mi mejor
                    herramienta: yo decido la arquitectura, leo los logs, aíslo la causa y entrego probado.
                </p>
                <ul className="mani__cifras">
                    {cifras.map((c) => (
                        <li key={c.texto} data-sube>
                            <strong><span data-cuenta={c.valor}>{c.valor}</span>{c.sufijo}</strong>
                            <span>{c.texto}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mani__stack">
                <p className="oculto">Tecnologías que uso en producción: {[...stack.frente, ...stack.fondo].join(", ")}.</p>
                <Cinta items={stack.frente} />
                <Cinta items={stack.fondo} reversa />
            </div>
        </section>
    );
};
