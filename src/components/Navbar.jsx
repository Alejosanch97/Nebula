import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { irA, pausarScroll } from "../lib/scroll";
import { Magnetic } from "./Magnetic";

const enlaces = [
    { id: "compass", texto: "COMPASS" },
    { id: "proyectos", texto: "Proyectos" },
    { id: "metodo", texto: "Método" },
    { id: "fidelizacion", texto: "Fidelización" },
    { id: "bitacora", texto: "Bitácora" },
];

export const Navbar = () => {
    const [abierto, setAbierto] = useState(false);
    const [oculta, setOculta] = useState(false);
    const { pathname } = useLocation();
    const navegar = useNavigate();

    useEffect(() => {
        let antes = window.scrollY;
        const alScroll = () => {
            const y = window.scrollY;
            setOculta(y > antes && y > 400);
            antes = y;
        };
        window.addEventListener("scroll", alScroll, { passive: true });
        return () => window.removeEventListener("scroll", alScroll);
    }, []);

    useEffect(() => { pausarScroll(abierto); return () => pausarScroll(false); }, [abierto]);

    const ir = (e, id) => {
        e.preventDefault();
        setAbierto(false);
        if (pathname === "/") setTimeout(() => irA(`#${id}`), 50);
        else navegar(`/#${id}`);
    };

    return (
        <header className={`nav ${oculta && !abierto ? "nav--oculta" : ""} ${abierto ? "nav--abierta" : ""}`}>
            <Link to="/" className="nav__marca" onClick={() => { setAbierto(false); if (pathname === "/") irA(0); }} aria-label="Nébula Estudio, inicio">
                <svg viewBox="0 0 40 24" aria-hidden="true"><path d="M2 21 13 5l7 10 4-6 14 12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>Nébula</span>
            </Link>
            <nav className="nav__lista" aria-label="Secciones">
                {enlaces.map((l) => (
                    <a key={l.id} href={`/#${l.id}`} onClick={(e) => ir(e, l.id)}>{l.texto}</a>
                ))}
            </nav>
            <Magnetic>
                <a className="nav__cta" href="/#contacto" onClick={(e) => ir(e, "contacto")}>Hablemos</a>
            </Magnetic>
            <button className="nav__menu" aria-expanded={abierto} aria-label={abierto ? "Cerrar menú" : "Abrir menú"} onClick={() => setAbierto(!abierto)}>
                <i /><i />
            </button>
            <div className="nav__panel" aria-hidden={!abierto}>
                {[...enlaces, { id: "contacto", texto: "Hablemos" }].map((l, i) => (
                    <a key={l.id} href={`/#${l.id}`} style={{ "--i": i }} tabIndex={abierto ? 0 : -1} onClick={(e) => ir(e, l.id)}>{l.texto}</a>
                ))}
            </div>
        </header>
    );
};
