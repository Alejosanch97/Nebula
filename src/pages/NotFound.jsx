import { Link } from "react-router-dom";

export const NotFound = () => (
    <section className="perdido" data-terreno>
        <h1>Este sendero no existe.</h1>
        <p>La página que buscas se movió o nunca estuvo aquí.</p>
        <Link className="boton boton--lleno" to="/">Volver al campamento base</Link>
    </section>
);
