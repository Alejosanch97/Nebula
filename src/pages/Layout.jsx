import { useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Terrain } from "../components/Terrain";
import { Preloader } from "../components/Preloader";
import { Cursor } from "../components/Cursor";
import { Altimeter } from "../components/Altimeter";
import { iniciarScroll, detenerScroll, irA, gsap, ScrollTrigger, reducido } from "../lib/scroll";

// Estructura base: el terreno 3D vive fijo detrás de todo, encima van la navegación,
// el altímetro y la página actual. Cada cambio de ruta pasa por una cortina.
export const Layout = () => {
    const { pathname, hash } = useLocation();
    const cortina = useRef(null);
    const primera = useRef(true);

    useEffect(() => {
        iniciarScroll();
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        return () => detenerScroll();
    }, []);

    useLayoutEffect(() => {
        if (primera.current) { primera.current = false; return; }
        if (!hash) irA(0, true);
        if (reducido()) return;
        gsap.fromTo(cortina.current,
            { yPercent: 0, display: "block" },
            { yPercent: -100, duration: 0.9, ease: "expo.inOut", delay: 0.05, onComplete: () => gsap.set(cortina.current, { display: "none" }) });
    }, [pathname]);

    useEffect(() => {
        if (!hash) return;
        const t = setTimeout(() => irA(hash), 350);
        return () => clearTimeout(t);
    }, [hash, pathname]);

    return (
        <>
            <Terrain />
            <Preloader />
            <Cursor />
            <Navbar />
            <Altimeter />
            <main><Outlet /></main>
            <Footer />
            <div className="cortina" ref={cortina} aria-hidden="true" />
        </>
    )
}
