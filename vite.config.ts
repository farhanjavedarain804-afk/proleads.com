import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    tsConfigPaths(),
    react(),
    tailwindcss()
  ],
  server: {
    port: 8080,
    strictPort: false,
    host: true,
  },
  ssr: {
    // Keep these as native Node.js requires — never bundle them.
    // Bundling mysql2 or bcryptjs breaks CJS/ESM interop and causes
    // "Cannot read properties of undefined (reading 'config')" at runtime.
    external: ["mysql2", "mysql2/promise", "bcryptjs", "drizzle-orm", "drizzle-orm/mysql2", "drizzle-orm/mysql-core"],
  },
});
