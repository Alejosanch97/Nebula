import { useState } from "react";
import { contacto } from "../data/proyectos";
import { Magnetic } from "./Magnetic";

// Cierre del sitio: la cumbre. Aquí el terreno 3D amanece (data-alba).
export const Footer = () => {
    const [copiado, setCopiado] = useState(false);
    const copiar = async () => {
        try {
            await navigator.clipboard.writeText(contacto.email);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2200);
        } catch (e) {
            window.location.href = `mailto:${contacto.email}`;
        }
    };
    const wa = `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent("Hola Alejo, vi tu sitio y quiero contarte de un proyecto.")}`;

    return (
        <footer className="cima" id="contacto" data-terreno data-alba data-tramo="Cumbre">
            <div className="cima__dentro">
                <p className="cima__ante">Llegaste a la cumbre.</p>
                <h2 className="cima__titulo" data-split>Construyamos lo que sigue.</h2>
                <p className="cima__texto">Busco un equipo donde retarme como desarrollador, y sigo tomando proyectos en Nébula Estudio. Bogotá, remoto o híbrido.</p>
                <div className="cima__acciones">
                    <Magnetic>
                        <button className="boton boton--lleno" onClick={copiar} data-cursor={copiado ? "Listo" : "Copiar"}>
                            {copiado ? "Correo copiado" : contacto.email}
                        </button>
                    </Magnetic>
                    <Magnetic>
                        <a className="boton" href={wa} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
                    </Magnetic>
                </div>
                <div className="cima__pie">
                    <nav aria-label="Redes">
                        <a href={contacto.github} target="_blank" rel="noreferrer">GitHub</a>
                        <a href={contacto.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                        <a href={contacto.instagram} target="_blank" rel="noreferrer">Instagram</a>
                    </nav>
                    <p>Nébula Estudio, {new Date().getFullYear()}. Diseñado y construido por Alejo Sánchez en Bogotá.</p>
                </div>
            </div>
        </footer>
    );
};
