// Datos de contacto y de marca usados en todo el sitio.
// Cambiar el teléfono o el correo AQUÍ actualiza NavBar, Footer, formularios,
// calculadoras, JSON-LD y enlaces de WhatsApp.

export const SITIO = {
  nombre: 'Havenser',
  url: 'https://havenser.com',
  eslogan: 'Innovación inteligente, ejecución impecable.',
  descripcion:
    'Consultora de ingeniería avanzada y ciencias exactas: IA, automatización, software, cloud, marketing digital y chatbots para empresas B2B en México.',
  email: 'consultoria@havenser.com',
  // Formato internacional para wa.me (sin "+", espacios ni el "1" heredado de México).
  whatsapp: '525650724919',
  telefonoVisible: '+52 56 5072 4919',
  ogImage: '/Banner_havenser_City.png',
  redes: {
    linkedin: 'https://www.linkedin.com/in/havenser-consulting-436b9442a',
    facebook: 'https://www.facebook.com/share/19Dt7aW5LQ/',
  },
} as const;

/** Enlace de WhatsApp con un mensaje ya escrito. */
export const linkWhatsApp = (mensaje: string) =>
  `https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;

/** Clave de sessionStorage con la que una calculadora precarga el formulario de contacto. */
export const CLAVE_PRECARGA_CONTACTO = 'havenser:precarga-contacto';
