import { Link, useParams } from "react-router-dom";
import { entradas } from "../data/bitacora";
import { useRevelar } from "../lib/useRevelar";
import { NotFound } from "./NotFound";

export const Post = () => {
    const { slug } = useParams();
    const i = entradas.findIndex((e) => e.slug === slug);
    useRevelar(slug);
    if (i < 0) return <NotFound />;
    const e = entradas[i];
    const sig = entradas[(i + 1) % entradas.length];

    return (
        <article className="post">
            <header className="post__cabeza" data-terreno data-tramo="Bitácora">
                <div className="post__ancho">
                    <Link to="/#bitacora" className="enlace">Volver a la bitácora</Link>
                    <p className="post__tema">{e.tema}, {e.lectura} de lectura</p>
                    <h1 data-split key={slug}>{e.titulo}</h1>
                </div>
            </header>
            <div className="post__cuerpo">
                <div className="post__ancho">
                    <p className="post__resumen">{e.resumen}</p>
                    {e.cuerpo.map((p, n) => p.startsWith("## ")
                        ? <h2 key={n}>{p.slice(3)}</h2>
                        : <p key={n}>{p}</p>)}
                    <p className="post__firma">Alejo Sánchez, Nébula Estudio</p>
                </div>
                <Link to={`/bitacora/${sig.slug}`} className="post__sig" data-cursor="Leer">
                    <span>Siguiente nota</span>
                    <b>{sig.titulo}</b>
                </Link>
            </div>
        </article>
    );
};
