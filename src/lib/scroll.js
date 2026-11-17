// Scroll suave (Lenis) sincronizado con GSAP ScrollTrigger. Una sola instancia para todo el sitio.
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

export const reducido = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;
let tick = null;

export const iniciarScroll = () => {
  if (lenis || reducido()) return;
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  tick = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
};

export const detenerScroll = () => {
  if (!lenis) return;
  gsap.ticker.remove(tick);
  lenis.destroy();
  lenis = null;
};

export const pausarScroll = (pausa) => {
  if (lenis) pausa ? lenis.stop() : lenis.start();
  document.documentElement.classList.toggle("sin-scroll", pausa);
};

export const irA = (destino, inmediato = false) => {
  const el = typeof destino === "string" ? document.querySelector(destino) : destino;
  if (destino !== 0 && !el) return;
  if (lenis) lenis.scrollTo(destino === 0 ? 0 : el, { immediate: inmediato, duration: 1.6 });
  else if (destino === 0) window.scrollTo(0, 0);
  else el.scrollIntoView({ behavior: inmediato ? "auto" : "smooth" });
};

export { gsap, ScrollTrigger, SplitText };
