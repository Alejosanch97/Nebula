import { useRef, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { SELLOS_META } from "../store";
import { gsap } from "../lib/scroll";
import { contacto } from "../data/proyectos";
import { Magnetic } from "./Magnetic";

const ventajas = [
    { t: "Sin app", x: "El cliente acerca el celular a una etiqueta NFC y su tarjeta se abre en el navegador." },
    { t: "Tu marca, no la mía", x: "Cada negocio tiene su página, su menú digital y sus colores." },
    { t: "Un panel por negocio", x: "Ves quién volvió, cuántos sellos entregaste y qué premios faltan." },
    { t: "Prueba gratis", x: "Empiezas sin pagar. Si te sirve, sigues con un plan mensual." },
];

// Demo viva de la tarjeta de sellos. Los sellos se guardan en el store global.
export const Fidelizacion = () => {
    const { store, dispatch } = useGlobalReducer();
    const tarjeta = useRef(null);
    const escena = useRef(null);
    const [leyendo, setLeyendo] = useState(false);
    const llena = store.sellos >= SELLOS_META;

    const acercar = () => {
        if (leyendo || llena) return;
        setLeyendo(true);
        setTimeout(() => { dispatch({ type: "sumar_sello" }); setLeyendo(false); }, 900);
    };

    const reclamar = () => {
        const piezas = escena.current.querySelectorAll(".confeti i");
        gsap.fromTo(piezas,
            { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 },
            {
                x: () => gsap.utils.random(-260, 260), y: () => gsap.utils.random(-320, 120),
                rotate: () => gsap.utils.random(-400, 400), opacity: 0, scale: 0.4,
                duration: 1.4, ease: "power3.out", stagger: 0.008,
            });
        dispatch({ type: "reclamar_premio" });
    };

    const inclinar = (e) => {
        if (e.pointerType !== "mouse") return;
        const r = escena.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(tarjeta.current, { "--rx": `${-y * 16}deg`, "--ry": `${x * 20}deg`, "--luz": `${50 + x * 80}%`, duration: 0.5, ease: "power3" });
    };
    const soltar = () => gsap.to(tarjeta.current, { "--rx": "0deg", "--ry": "0deg", "--luz": "50%", duration: 1.1, ease: "elastic.out(1, 0.5)" });

    const wa = `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent("Hola Alejo, quiero una tarjeta de fidelización NFC para mi negocio.")}`;

    return (
        <section className="fide" id="fidelizacion" data-tramo="Fidelización">
            <div className="ancho fide__rejilla">
                <div className="fide__texto">
                    <h2 data-split>La tarjeta de sellos ahora vive en el celular.</h2>
                    <p className="fide__intro" data-sube>
                        Empezó en Dulce Fresa, una heladería de Puente Aranda con unas 90 personas inscritas.
                        Ahora la estoy convirtiendo en una plataforma para cualquier negocio que quiera que sus clientes vuelvan.
                    </p>
                    <ul className="fide__ventajas">
                        {ventajas.map((v) => (
                            <li key={v.t} data-sube><h3>{v.t}</h3><p>{v.x}</p></li>
                        ))}
                    </ul>
                    <Magnetic><a className="boton boton--tinta" href={wa} target="_blank" rel="noreferrer">Quiero una para mi negocio</a></Magnetic>
                </div>

                <div className="fide__escena" ref={escena} onPointerMove={inclinar} onPointerLeave={soltar}>
                    <div className={`tarjeta ${llena ? "tarjeta--llena" : ""} ${leyendo ? "tarjeta--leyendo" : ""}`} ref={tarjeta}>
                        <div className="tarjeta__cara tarjeta__frente">
                            <div className="tarjeta__arriba">
                                <span>Tu negocio</span>
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8a8 8 0 0 1 0 8M10 5a12 12 0 0 1 0 14M14 2a16 16 0 0 1 0 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                            </div>
                            <ul className="tarjeta__sellos" aria-label={`${store.sellos} de ${SELLOS_META} sellos`}>
                                {Array.from({ length: SELLOS_META }).map((_, i) => (
                                    <li key={i} className={i < store.sellos ? "sello sello--puesto" : "sello"}>
                                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </li>
                                ))}
                            </ul>
                            <p className="tarjeta__cuenta"><b>{store.sellos}</b> de {SELLOS_META} sellos</p>
                        </div>
                        <div className="tarjeta__cara tarjeta__reverso">
                            <p>Premio listo</p>
                            <b>El próximo va por la casa.</b>
                        </div>
                    </div>
                    <div className="confeti" aria-hidden="true">{Array.from({ length: 36 }).map((_, i) => <i key={i} style={{ "--c": ["#FF7A2F", "#F0457F", "#FFC24B", "#6C63D9"][i % 4] }} />)}</div>
                    <div className="fide__control">
                        {llena
                            ? <button className="boton boton--tinta" onClick={reclamar}>Reclamar premio</button>
                            : <button className="boton boton--tinta" onClick={acercar} disabled={leyendo}>{leyendo ? "Leyendo etiqueta" : "Acercar el celular"}</button>}
                        <p aria-live="polite">
                            {llena ? "Tarjeta completa." : "Pruébala: cada toque suma un sello."}
                            {store.premios > 0 && ` Premios reclamados: ${store.premios}.`}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
