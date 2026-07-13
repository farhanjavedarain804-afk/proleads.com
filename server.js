// Hostinger-compatible server entry point
// This bootstraps the TanStack Start (Nitro/Vinxi) production server

import { createServer } from "node:http";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Try to start via vinxi (preferred) or fall back to the built output
async function start() {
  try {
    // Load the built Nitro server handler from the dist output
    const serverPath = path.join(__dirname, "dist", "server", "server.js");
    const { default: handler } = await import(serverPath);

    const server = createServer(async (req, res) => {
      const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

      // Build a standard Request from Node's IncomingMessage
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      }

      const body =
        req.method !== "GET" && req.method !== "HEAD"
          ? await new Promise((resolve, reject) => {
              const chunks = [];
              req.on("data", (chunk) => chunks.push(chunk));
              req.on("end", () => resolve(Buffer.concat(chunks)));
              req.on("error", reject);
            })
          : undefined;

      const request = new Request(url.toString(), {
        method: req.method,
        headers,
        body: body?.length ? body : undefined,
        duplex: "half",
      });

      try {
        const response = await handler.fetch(request, process.env, {});
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        const buffer = Buffer.from(await response.arrayBuffer());
        res.end(buffer);
      } catch (err) {
        console.error("Request handler error:", err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });

    server.listen(PORT, HOST, () => {
      console.log(`✓ ProLeadsGeneration server running on http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
