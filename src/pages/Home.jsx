import { Hero } from "../components/Hero";
import { Manifiesto } from "../components/Manifiesto";
import { Compass } from "../components/Compass";
import { Proyectos } from "../components/Proyectos";
import { Metodo } from "../components/Metodo";
import { Fidelizacion } from "../components/Fidelizacion";
import { Bitacora, Fuera } from "../components/Bitacora";
import { useRevelar } from "../lib/useRevelar";

// La página es un ascenso: sale de Bogotá (2.600 m) y cada sección es un tramo hasta la cumbre.
export const Home = () => {
    useRevelar("home");
    return (
        <>
            <Hero />
            <Manifiesto />
            <Compass />
            <Proyectos />
            <Metodo />
            <Fidelizacion />
            <Bitacora />
            <Fuera />
        </>
    );
};
