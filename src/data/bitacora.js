// Mini blog. Cada entrada es un objeto: agrega una nueva al inicio del arreglo y aparece sola.
// `cuerpo` es una lista de párrafos. Un párrafo que empieza con "## " se muestra como subtítulo.

export const entradas = [
  {
    slug: "tarjeta-de-sellos-nfc",
    titulo: "Lo que aprendí poniendo una tarjeta de sellos en un celular",
    tema: "Fidelización",
    lectura: "3 min",
    resumen: "Una heladería de Puente Aranda, unas 90 personas inscritas y una regla: nadie descarga una app por un helado.",
    cuerpo: [
      "La tarjeta de cartón con sellos funciona hasta que se pierde. Dulce Fresa, una heladería de Puente Aranda, quería lo mismo pero sin cartón, y yo quería probar cuánto se podía simplificar.",
      "## Sin app",
      "La primera decisión fue no pedirle nada al cliente. Acerca el celular a una etiqueta NFC, se abre una página web y ahí está su tarjeta. Nadie instala una app por un helado.",
      "## El orden importa",
      "La página es solo para celular y abre con la tarjeta. Después vienen el menú, los videos, los favoritos, Instagram y la ubicación. Lo primero que ve la persona es cuánto le falta para su premio.",
      "## Lo que sigue",
      "Hoy hay unas 90 personas inscritas. El siguiente paso ya está decidido: una plataforma multi-empresa, donde cada negocio tiene su tarjeta, su menú y su panel, con prueba gratis y un plan mensual.",
    ],
  },
  {
    slug: "cuando-la-ia-tarda",
    titulo: "Cuando la IA tarda, el servidor no puede rendirse",
    tema: "Backend",
    lectura: "3 min",
    resumen: "Timeouts de Gunicorn, cuatro proveedores en fila y por qué un docente nunca debería ver un error 502.",
    cuerpo: [
      "Lumi es el asistente de Orbit Horizon. Genera planeaciones de clase completas, y eso significa respuestas largas. El primer problema apareció en los logs de Render: el worker se cerraba antes de que la IA terminara.",
      "## Leer el log primero",
      "El mensaje era claro: WORKER TIMEOUT. El código estaba bien. El servidor tenía un límite de tiempo más corto que la respuesta. Ajusté el timeout de Gunicorn y el error desapareció.",
      "## Un proveedor siempre falla",
      "Después llegó el segundo problema: los límites de uso. La solución fue una cadena de respaldo. Si Groq no responde, entra una segunda llave de Groq, luego Gemini y luego Mistral. El docente no se entera.",
      "## El resultado",
      "Todos los docentes del colegio usan la plataforma, y preparar clases les toma un 60% menos de tiempo.",
    ],
  },
  {
    slug: "de-sheets-a-postgres",
    titulo: "De Google Sheets a PostgreSQL sin detener un colegio",
    tema: "Arquitectura",
    lectura: "4 min",
    resumen: "Apps Script es perfecto para empezar. Esto fue lo que me avisó que era hora de migrar.",
    cuerpo: [
      "Casi todo lo que construyo empieza en Google Apps Script con una hoja de cálculo como base de datos. Es gratis, es rápido y el cliente puede abrir sus datos sin pedirme nada.",
      "## La señal",
      "Orbit Horizon nació así. La señal para migrar fue de negocio: quería ofrecerla a otros colegios, y eso exige separar los datos de cada institución.",
      "## El cambio",
      "La pasé a Flask, SQLAlchemy y PostgreSQL en Supabase, con cada tabla marcada por colegio. Sumé un módulo de superadministrador para crear colegios y usuarios, y un editor masivo de datos para no depender de la consola.",
      "## Lo que me llevo",
      "Sheets sigue siendo mi primera opción para prototipos. Cuando varios usuarios escriben a la vez uso LockService, y cuando el producto necesita crecer, ya sé cuál es el camino.",
    ],
  },
  {
    slug: "una-manilla-sin-servidor",
    titulo: "Una manilla de emergencia que funciona sin servidor",
    tema: "Experimentos",
    lectura: "2 min",
    resumen: "SOS-ID guarda tus datos en la propia URL. Si no hay señal en la montaña, igual abre.",
    cuerpo: [
      "En la montaña no hay señal. Si alguien se accidenta, quien lo encuentra necesita saber su nombre, su tipo de sangre y a quién llamar.",
      "## La idea",
      "SOS-ID es una manilla NFC. Al acercar un celular se abre una página con los datos de emergencia de quien la lleva.",
      "## El truco",
      "No hay backend. Los datos van codificados en Base64 dentro de la URL que guarda la manilla. La página los lee, los muestra y oculta la vista después de un tiempo.",
      "## Por qué me gusta",
      "No hay servidor que mantener ni base de datos que proteger. A veces la mejor arquitectura es la que no existe.",
    ],
  },
];
