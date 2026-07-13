// Hostinger-compatible server entry point
// This bootstraps the TanStack Start (Nitro/Vinxi) production server

import { createServer } from "node:http";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Try to start via vinxi (preferred) or fall back to the built output
async function start() {
  try {
    // Load the built Nitro server handler from the dist output
    const serverPath = "./dist/server/server.js";
    const { default: handler } = await import(serverPath);

    const server = createServer(async (req, res) => {
      const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

      // Direct diagnostics endpoint to check database status and server code version
      if (url.pathname === "/diagnostics") {
        res.setHeader("Content-Type", "application/json");
        try {
          const mysql = require("mysql2/promise");
          const pool = mysql.createPool({
            host: process.env.DB_HOST || '127.0.0.1',
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER || 'u749853029_prouser',
            password: process.env.DB_PASSWORD || 'M-husnain@393393',
            database: process.env.DB_NAME || 'u749853029_pro',
            connectTimeout: 5000,
          });
          const [rows] = await pool.query("SELECT 1 + 1 AS test_result");
          res.end(JSON.stringify({
            status: "success",
            message: "Direct database test succeeded!",
            serverTimestamp: new Date().toISOString(),
            data: rows
          }));
        } catch (err) {
          res.end(JSON.stringify({
            status: "error",
            message: "Direct database test failed",
            serverTimestamp: new Date().toISOString(),
            error: err.message,
            stack: err.stack
          }));
        }
        return;
      }
      
      // Serve static assets from dist/client
      const clientDir = path.join(__dirname, "dist", "client");
      // Prevent directory traversal
      const cleanPath = path.normalize(url.pathname).replace(/^(\.\.[\/\\])+/, '');
      const filePath = path.join(clientDir, cleanPath);
      
      try {
        if (url.pathname !== "/" && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes = {
            ".css": "text/css",
            ".js": "application/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".svg": "image/svg+xml",
            ".ico": "image/x-icon",
            ".json": "application/json",
            ".txt": "text/plain",
            ".woff": "font/woff",
            ".woff2": "font/woff2"
          };
          res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
          
          if (url.pathname.startsWith("/assets/")) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          } else {
            res.setHeader("Cache-Control", "public, max-age=3600");
          }
          
          fs.createReadStream(filePath).pipe(res);
          return;
        }
      } catch (e) {
        // Not found or error reading, continue to SSR handler
      }

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
