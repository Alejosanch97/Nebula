import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "../lib/scroll";
import { casos } from "../data/proyectos";

const pasos = [
    { tipo: "log", nombre: "Leo el log", texto: "El error casi siempre ya dijo qué pasa." },
    { tipo: "nota", nombre: "Aíslo la causa", texto: "Una hipótesis, una prueba, sin tocar nada más." },
    { tipo: "fix", nombre: "Corrijo", texto: "Cambios quirúrgicos. Nada de reescribir archivos enteros." },
    { tipo: "ok", nombre: "Verifico en producción", texto: "Si no lo probé desplegado, no está terminado." },
];
const signo = { log: "!", nota: "?", fix: "+", ok: "✓" };

// Una terminal que reproduce tres errores reales y cómo los resolví.
export const Metodo = () => {
    const raiz = useRef(null);
    const [caso, setCaso] = useState(0);
    const [visibles, setVisibles] = useState(0);
    const [activo, setActivo] = useState(false);
    const lineas = casos[caso].lineas;

    useEffect(() => {
        const st = ScrollTrigger.create({ trigger: ".term", start: "top 75%", once: true, onEnter: () => setActivo(true) });
        return () => st.kill();
    }, []);

    useEffect(() => {
        if (!activo) return;
        if (visibles >= lineas.length) return;
        const t = setTimeout(() => setVisibles((v) => v + 1), visibles === 0 ? 350 : 750);
        return () => clearTimeout(t);
    }, [activo, visibles, caso]);

    const elegir = (i) => { setCaso(i); setVisibles(0); setActivo(true); };
    const tipoActual = visibles > 0 ? lineas[Math.min(visibles, lineas.length) - 1].t : null;
    const resuelto = visibles >= lineas.length;

    return (
        <section className="metodo" id="metodo" ref={raiz} data-tramo="Método">
            <div className="ancho metodo__rejilla">
                <div className="metodo__texto">
                    <h2 data-split>Resuelvo rápido porque resuelvo en orden.</h2>
                    <p data-sube>
                        Trabajo con IA todos los días. Me deja construir, probar y corregir mucho más rápido,
                        y el criterio sigue siendo mío: qué construir, cómo se guardan los datos y cuándo algo está bien hecho.
                    </p>
                    <ol className="pasos">
                        {pasos.map((p, i) => (
                            <li key={p.tipo} className={`${tipoActual === p.tipo ? "pasos--activo" : ""} ${resuelto ? "pasos--hecho" : ""}`}>
                                <span>{i + 1}</span>
                                <div><h3>{p.nombre}</h3><p>{p.texto}</p></div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="term" data-sube>
                    <div className="term__barra" role="tablist" aria-label="Casos reales">
                        {casos.map((c, i) => (
                            <button key={c.id} role="tab" aria-selected={i === caso} className={i === caso ? "term__tab--activa" : ""} onClick={() => elegir(i)}>
                                {c.id}
                            </button>
                        ))}
                    </div>
                    <div className="term__cuerpo" role="tabpanel">
                        <p className="term__titulo">{casos[caso].titulo}</p>
                        <ul>
                            {lineas.slice(0, visibles).map((l, i) => (
                                <li key={`${caso}-${i}`} className={`term__l term__l--${l.t}`}>
                                    <span>{signo[l.t]}</span><code>{l.x}</code>
                                </li>
                            ))}
                        </ul>
                        {!resuelto && <i className="term__cursor" />}
                        {resuelto && (
                            <button className="term__otra" onClick={() => elegir((caso + 1) % casos.length)}>Ver otro caso</button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
