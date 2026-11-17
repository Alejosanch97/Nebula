// Póster animado de cada proyecto, dibujado solo con HTML y CSS.
// Cada uno usa la identidad visual de su proyecto. Si el proyecto trae `imagen`, se muestra la captura.
const arte = {
    orbit: () => (<><i className="o o1"><b /></i><i className="o o2"><b /></i><i className="o o3"><b /></i><em>Lumi</em></>),
    lumi: () => (<><i className="halo h1" /><i className="halo h2" /><div className="cara"><i /><i /></div><div className="voz">{[0, 1, 2, 3, 4, 5, 6].map((i) => <i key={i} style={{ "--i": i }} />)}</div></>),
    whatsapp: () => (<div className="chat"><p className="ellos">Hola, ¿a qué hora es la salida hoy?</p><p className="bot">Hoy la salida es a las 3:00 p. m.</p><p className="ellos">Necesito un certificado</p><p className="bot puntos"><i /><i /><i /></p></div>),
    finfluent: () => (<><div className="tanque"><i /><i /></div><em>$</em></>),
    dulcefresa: () => (<div className="sellitos">{Array.from({ length: 8 }).map((_, i) => <i key={i} className={i < 5 ? "si" : ""} />)}</div>),
    nomos: () => (<><div className="semaforo"><i /><i /><i /></div><div className="lista"><i /><i /><i /><i /></div></>),
    avana: () => (<><div className="costura" /><em>A</em></>),
    ayuda: () => (<><div className="mapa" /><i className="pin p1" /><i className="pin p2" /><i className="pin p3" /></>),
    sos: () => (<><i className="onda w1" /><i className="onda w2" /><i className="onda w3" /><em>SOS</em></>),
    neon: () => (<div className="qr">{Array.from({ length: 49 }).map((_, i) => <i key={i} style={{ "--d": `${(i * 37) % 23 / 10}s` }} className={(i * 7 + (i % 5)) % 3 ? "" : "on"} />)}</div>),
    tribu: () => (
        <svg viewBox="0 0 400 300" preserveAspectRatio="none">
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <path key={i} d={`M-10 ${250 - i * 14} C 70 ${200 - i * 26}, 120 ${240 - i * 30}, 190 ${120 - i * -6 + i * 18} S 320 ${210 - i * 22}, 410 ${170 - i * 12}`} style={{ "--i": i }} />
            ))}
            <text x="200" y="92" textAnchor="middle">2600</text>
        </svg>
    ),
};

export const Poster = ({ proyecto }) => {
    const Arte = arte[proyecto.slug];
    return (
        <div className={`poster poster--${proyecto.slug}`} aria-hidden="true">
            {proyecto.imagen
                ? <img src={proyecto.imagen} alt="" loading="lazy" />
                : (Arte ? <Arte /> : null)}
        </div>
    );
};
