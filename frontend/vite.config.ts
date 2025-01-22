import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Accepte les connexions depuis n'importe quelle adresse réseau
    hmr: {
      path: "/hmr", // Chemin HMR
    },
    allowedHosts: true, // Autorise tous les hôtes
  },
});
