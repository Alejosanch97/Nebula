// Estado global del sitio (mismo patrón del boilerplate: store + reducer + dispatch).
export const SELLOS_META = 8;

export const initialStore = () => {
  return {
    listo: false,        // true cuando termina el preloader; dispara la animación del hero
    sellos: 3,           // sellos de la tarjeta de fidelización de la demo
    premios: 0,          // premios reclamados en la demo
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'sitio_listo':
      return { ...store, listo: true };
    case 'sumar_sello':
      return { ...store, sellos: Math.min(store.sellos + 1, SELLOS_META) };
    case 'reclamar_premio':
      return { ...store, sellos: 0, premios: store.premios + 1 };
    default:
      throw Error('Unknown action.');
  }
}
