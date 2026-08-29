import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Ajoutez chaque page ici :
        home: resolve(__dirname, 'home.html'),
        about: resolve(__dirname, 'about.html'),
        boutique: resolve(__dirname, 'boutique.html'),
      },
    },
  },
});
