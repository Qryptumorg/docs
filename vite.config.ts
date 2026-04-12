import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";
  import path from "path";
  import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

  const port = Number(process.env.PORT ?? "5173");
  const basePath = process.env.BASE_PATH ?? "/docs/";

  const baseNoSlash = basePath.replace(/\/$/, "");

  export default defineConfig({
    base: basePath,
    plugins: [
      {
        name: "redirect-no-trailing-slash",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === baseNoSlash || req.url === baseNoSlash + "?") {
              res.writeHead(302, { Location: basePath });
              res.end();
              return;
            }
            next();
          });
        },
      },
      react(),
      tailwindcss(),
      runtimeErrorOverlay(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  });
  