import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Salida 100% estática (AWS Amplify + Cloudflare). React solo se usa en
// islas (hero 3D, calculadoras, demo de chatbot); el resto es HTML puro.
export default defineConfig({
  site: 'https://havenser.com',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

