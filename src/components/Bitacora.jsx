import { Link } from "react-router-dom";
import { entradas } from "../data/bitacora";
import { fuera } from "../data/proyectos";

export const Bitacora = () => (
    <section className="bita" id="bitacora" data-tramo="Bitácora">
        <div className="ancho">
            <header className="bita__cabeza">
                <h2 data-split>Bitácora de ascenso.</h2>
                <p data-sube>Notas cortas sobre lo que voy aprendiendo mientras construyo.</p>
            </header>
            <ul className="bita__lista">
                {entradas.map((e) => (
                    <li key={e.slug} data-sube>
                        <Link to={`/bitacora/${e.slug}`} className="nota" data-cursor="Leer">
                            <span className="nota__tema">{e.tema}, {e.lectura}</span>
                            <h3>{e.titulo}</h3>
                            <p>{e.resumen}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export const Fuera = () => (
    <section className="fuera" id="fuera" data-tramo="Fuera del código">
        <svg className="fuera__curvas" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
                <path key={i} d={`M-20 ${520 - i * 34} C 220 ${380 - i * 44}, 380 ${520 - i * 52}, 640 ${300 - i * 26} S 1000 ${440 - i * 46}, 1220 ${330 - i * 30}`} />
            ))}
        </svg>
        <div className="ancho">
            <h2 data-split>Lo que hago cuando cierro el editor.</h2>
            <ul className="fuera__lista">
                {fuera.map((f) => (
                    <li key={f.titulo} data-sube>
                        <h3>{f.titulo}</h3>
                        <p>{f.texto}</p>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);
