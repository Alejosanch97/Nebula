// Todo el contenido del sitio vive aquí. Edita textos, enlaces y cifras sin tocar componentes.
// Para mostrar una captura real en un proyecto: guarda la imagen en /public/proyectos/
// y pon su ruta en `imagen` (por ejemplo "/proyectos/orbit.jpg"). Si es null se usa el póster animado.

export const contacto = {
  email: "a.sanchezb97@gmail.com",
  whatsapp: "573173769865",
  github: "https://github.com/Alejosanch97",
  linkedin: "https://www.linkedin.com/in/luis-alejandro-sanchez-burgos",
  instagram: "https://www.instagram.com/alejo_sanchez97",
};

export const cifras = [
  { valor: 20, sufijo: "+", texto: "proyectos web en producción" },
  { valor: 10, sufijo: "+", texto: "clientes atendidos desde Nébula Estudio" },
  { valor: 60, sufijo: "%", texto: "menos tiempo de preparación de clases con Orbit Horizon" },
  { valor: 100, sufijo: "%", texto: "de los docentes del colegio usa la plataforma" },
];

export const stack = {
  frente: ["React", "Vite", "JavaScript ES6+", "React Router", "Context + useReducer", "CSS propio", "PWA", "Leaflet", "Recharts", "Spline"],
  fondo: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "Supabase", "JWT", "Multi-tenant", "Apps Script", "Groq", "Gemini", "Mistral", "Render", "Vercel", "NFC", "ESP32-S3"],
};

export const fasesAtlas = [
  { letra: "A", nombre: "Auditar", texto: "Un diagnóstico muestra cómo usa hoy la IA cada docente y cada directivo de la institución." },
  { letra: "T", nombre: "Transformar", texto: "Retos, dilemas éticos y un laboratorio de prompts convierten el diagnóstico en práctica." },
  { letra: "L", nombre: "Liderar", texto: "El equipo directivo recibe su radar y arma un plan de acción con responsables." },
  { letra: "A", nombre: "Asegurar", texto: "Políticas aceptadas y registradas, inventario de herramientas de IA y un segundo diagnóstico." },
  { letra: "S", nombre: "Sostener", texto: "Cierre institucional. Con una Huella COMPASS de 80 se emite la credencial verificable." },
];

export const hitosCompass = [
  { titulo: "Piloto en la Universidad de los Andes", texto: "Validado con 12 participantes del departamento de lenguas." },
  { titulo: "Seleccionado para Berlín", texto: "El proyecto se presenta en Berlín en un espacio sobre ética en IA." },
  { titulo: "Cerca de 100 endpoints", texto: "Unas 25 tablas relacionadas y cada ruta protegida con JWT y roles." },
  { titulo: "Marcos internacionales", texto: "Alineado con UNESCO, OCDE y la Unión Europea." },
];

export const proyectos = [
  {
    slug: "orbit", nombre: "Orbit Horizon", tipo: "SaaS para colegios",
    resumen: "Planeación docente con IA sobre tus mallas curriculares. Lumi arma clases dinámicas con juegos en 8 pasos y reduce el tiempo de planeación significativamente.",
    dato: "100% de los docentes la usa", stack: ["Flask", "PostgreSQL", "React", "Groq + Gemini + Mistral"],
    enlace: null, imagen: null,
  },
  {
    slug: "lumi", nombre: "Lumi", tipo: "Asistente de IA propio",
    resumen: "Construí mi propio Jarvis. Tiene memoria, organiza mis pendientes y orquesta una cascada de modelos de IA para ejecutar lo que le pido, a mi manera.",
    dato: "Funciona como yo lo diseñé", stack: ["ESP32-S3", "Flask", "APIs de LLM", "SQLite"],
    enlace: null, imagen: null,
  },
  {
    slug: "whatsapp", nombre: "Chatbots de WhatsApp", tipo: "Automatización",
    resumen: "Automatiza la atención de cualquier negocio con flujos inteligentes que responden al instante, ordenan solicitudes 24/7 y escalan a un humano solo cuando hace falta.",
    dato: "Adaptable a cualquier empresa o institución.", stack: ["WhatsApp Cloud API", "Meta", "Backend propio"],
    enlace: null, imagen: null,
  },
  {
    slug: "finfluent", nombre: "FinFluent", tipo: "Educación financiera en inglés",
    resumen: "Plataforma de educación financiera 100 % en inglés. Los estudiantes aprenden presupuesto, crédito e inversión en la práctica mientras fortalecen su segundo idioma.",
    dato: "De la teoría al mundo real · En uso en aula", stack: ["React", "Apps Script", "Sheets"],
    enlace: null, imagen: null,
  },
  {
    slug: "dulcefresa", nombre: "Fidelización Digital y Sellos NFC", tipo: "Fidelización NFC",
    resumen: "Convierte cada compra en una dinámica digital y divertida. Una plataforma multiempresa con sellos NFC que motiva a los clientes a volver y vender más en tu negocio.",
    dato: "Unos 90 clientes inscritos", stack: ["Flask", "React", "Supabase", "NFC"],
    enlace: "https://nfcdulcefresa.onrender.com", imagen: null,
  },
  {
    slug: "nomos", nombre: "Nomos", tipo: "Seguridad y salud en el trabajo",
    resumen: "Digitaliza todo tu SG-SST sin papeles: crea y gestiona formularios, visualiza el cumplimiento en gráficas claras y conversa con una IA que detecta al instante qué te falta por cumplir.",
    dato: "Resolución 0312 · Control total e IA integrada", stack: ["React", "Apps Script", "IA"],
    enlace: "https://nomossgsst.netlify.app/", imagen: null,
  },
  {
    slug: "avana", nombre: "Avana Leather", tipo: "Marca y catálogo",
    resumen: "Marroquinería artesanal con scroll horizontal de cine y galería editorial en mosaico.",
    dato: "Rediseño completo", stack: ["React", "Sheets"],
    enlace: "https://avanaleather.com.co", imagen: null,
  },
  {
    slug: "ayuda", nombre: "Colombia Ayuda", tipo: "Coordinación de emergencias",
    resumen: "Puntos de ayuda, inventario y solicitudes de insumos filtradas por GPS sobre un mapa.",
    dato: "Lanzada con una campaña en Instagram", stack: ["React", "Leaflet", "Apps Script"],
    enlace: "https://colombiaayuda.website", imagen: null,
  },
  {
    slug: "sos", nombre: "SOS-ID", tipo: "Manilla NFC de emergencia",
    resumen: "Tus datos de emergencia viajan en la URL. Funciona sin internet y sin servidor.",
    dato: "Cero backend", stack: ["NFC", "Base64", "Web offline"],
    enlace: "https://sos-id.netlify.app", imagen: null,
  },
  {
    slug: "neon", nombre: "Neon Pub", tipo: "Gestión de bar",
    resumen: "Cada mesa tiene su QR. Mesero, cajero y administrador ven paneles distintos.",
    dato: "La interfaz responde antes de guardar", stack: ["React", "QR", "Optimistic UI"],
    enlace: "https://neonpub.netlify.app", imagen: null,
  },
  {
    slug: "tribu", nombre: "Tribu 2600", tipo: "Viajes de aventura",
    resumen: "El sitio de mi comunidad de montaña, lleno de cumbres y expediciones por catálogo.",
    dato: "Colombia, Guatemala y más", stack: ["React", "Spline", "Sheets"],
    enlace: "https://tribu2600.online/", imagen: null,
  },
];

export const masTrabajo = [
  { nombre: "Machis", tipo: "Linktree para influencer", color: "#F0457F", enlace: "https://soymachis.vercel.app/" },
  { nombre: "Klaudia Briceño", tipo: "Linktree editorial para modelo", color: "#C9B28A", enlace: "https://klaudiabrice.vercel.app/" },
  { nombre: "Nath", tipo: "Linktree de viajes", color: "#3FA7A0", enlace: "https://holanath.vercel.app" },
  { nombre: "Bruma by Vanne", tipo: "Linktree para tienda de ropa", color: "#B9A7D8", enlace: "https://bruma-by-vanne.vercel.app/" },
  { nombre: "Imagine Nation Films", tipo: "Linktree para agencia creativa", color: "#FFC24B", enlace: "https://imaginationlinktree.vercel.app/" },
  { nombre: "Puro Momentum", tipo: "Linktree para productora audiovisual", color: "#FF7A2F", enlace: "https://linktreepuromomentum.vercel.app/" },
  { nombre: "Deleite Garden", tipo: "Linktree y carta digital", color: "#7FB069", enlace: "https://deleitegarden.vercel.app/" },
  { nombre: "Bicicletas Nevada", tipo: "E-commerce administrable", color: "#5AA9E6", enlace: "https://bicicletasnevada.netlify.app/" },
  { nombre: "GameBros", tipo: "Tienda con pedido por WhatsApp", color: "#8E5CF6" },
  { nombre: "Recibos y pagos del colegio", tipo: "Herramienta interna con impresión térmica", color: "#2EC4B6", enlace: "" },
  { nombre: "Asistencia desde iPads", tipo: "Herramienta interna con concurrencia", color: "#F4A261" },
  { nombre: "Protocolo 60", tipo: "PWA de ejercicio y nutrición", color: "#E63946", enlace: "https://protocolo-60.netlify.app/" },
  { nombre: "RealismoMagico", tipo: "Arcade en React", color: "#FFD166" },
];

export const casos = [
  {
    id: "gunicorn", titulo: "La IA tardaba y el servidor se rendía",
    lineas: [
      { t: "log", x: "[CRITICAL] WORKER TIMEOUT (pid:41)" },
      { t: "log", x: "POST /api/lumi/planear  502" },
      { t: "nota", x: "La respuesta larga de la IA supera el límite del worker." },
      { t: "fix", x: "gunicorn app:app --timeout 120" },
      { t: "fix", x: "cadena de respaldo: Groq → Groq2 → Gemini → Mistral" },
      { t: "ok", x: "POST /api/lumi/planear  200" },
    ],
  },
  {
    id: "cors", titulo: "El frontend no podía hablar con la API",
    lineas: [
      { t: "log", x: "Access to fetch has been blocked by CORS policy" },
      { t: "log", x: "OPTIONS /api/login  blocked" },
      { t: "nota", x: "El dominio de Vercel no estaba en los orígenes permitidos." },
      { t: "fix", x: "CORS(app, origins=[FRONTEND_URL])" },
      { t: "ok", x: "OPTIONS /api/login  200" },
      { t: "ok", x: "POST /api/login  200" },
    ],
  },
  {
    id: "storage", titulo: "Un docente veía el chat de otro",
    lineas: [
      { t: "log", x: "localStorage['chat'] compartido entre usuarios" },
      { t: "nota", x: "Dos cuentas en el mismo equipo escribían la misma llave." },
      { t: "fix", x: "const llave = `chat_${usuario.id}`" },
      { t: "fix", x: "estado del chat persistente por docente" },
      { t: "ok", x: "sesiones aisladas, verificado con dos cuentas" },
    ],
  },
];

export const fuera = [
  { titulo: "Tribu 2600", texto: "Fundé una comunidad de viajes de aventura. Montañas, volcanes y cumbres en grupo, de Colombia a Guatemala." },
  { titulo: "Un colegio", texto: "Soy vicerrector de un colegio bilingüe en Bogotá: 320 estudiantes, 20 docentes y toda la operación digitalizada." },
  { titulo: "Correr", texto: "Corro para pensar. La disciplina de los kilómetros es la misma con la que cierro proyectos." },
  { titulo: "Un país al año", texto: "Mi meta es conocer un país nuevo cada año." },
];
