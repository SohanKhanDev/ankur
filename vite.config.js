import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/*** ----------*** :: IMPORT => TAILWIND :: ***---------- ***/
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
