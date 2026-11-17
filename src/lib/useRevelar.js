import { useEffect } from "react";
import { gsap, SplitText, ScrollTrigger, reducido } from "./scroll";

// Anima al entrar en pantalla:
//   data-split  -> el titular sube palabra por palabra detrás de una máscara
//   data-sube   -> el bloque sube y aparece
//   data-cuenta -> el número cuenta desde cero hasta su valor
export const useRevelar = (clave = "") => {
    useEffect(() => {
        if (reducido()) return;
        let ctx, vivo = true;
        (document.fonts?.ready ?? Promise.resolve()).then(() => {
            if (!vivo) return;
            ctx = gsap.context(() => {
                gsap.utils.toArray("[data-split]").forEach((el) => {
                    SplitText.create(el, {
                        type: "lines,words", mask: "lines", autoSplit: true,
                        onSplit: (self) => gsap.from(self.words, {
                            yPercent: 115, duration: 1.1, ease: "expo.out", stagger: 0.035,
                            scrollTrigger: { trigger: el, start: "top 90%", once: true },
                        }),
                    });
                });
                gsap.utils.toArray("[data-sube]").forEach((el) => {
                    gsap.from(el, {
                        y: 48, opacity: 0, duration: 1.1, ease: "expo.out",
                        scrollTrigger: { trigger: el, start: "top 92%", once: true },
                    });
                });
                gsap.utils.toArray("[data-cuenta]").forEach((el) => {
                    const fin = Number(el.dataset.cuenta), o = { v: 0 };
                    gsap.to(o, {
                        v: fin, duration: 1.8, ease: "power3.out",
                        onUpdate: () => { el.textContent = Math.round(o.v); },
                        scrollTrigger: { trigger: el, start: "top 92%", once: true },
                    });
                });
            });
            ScrollTrigger.refresh();
        });
        return () => { vivo = false; ctx?.revert(); };
    }, [clave]);
};
