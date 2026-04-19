import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Endpoint de simulación de Audio Stream (PC Link)
  app.get("/stream.wav", (req, res) => {
    console.log("[Server] Cliente conectado al stream de audio...");
    
    // Cabecera WAV básica para que el receptor lo reconozca
    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Transfer-Encoding", "chunked");

    // Enviamos audio sintético (Float32) para probar el procesamiento
    const interval = setInterval(() => {
      const buffer = Buffer.alloc(4096);
      for (let i = 0; i < buffer.length; i += 4) {
        // Generar una onda senoidal simple
        const sample = Math.sin(Date.now() / 100) * 0.5;
        buffer.writeFloatLE(sample, i);
      }
      
      if (!res.write(buffer)) {
        // Si el buffer de red está lleno, manejamos el backpressure (opcional en simulación)
      }
    }, 20);

    req.on("close", () => {
      console.log("[Server] Conexión de stream cerrada.");
      clearInterval(interval);
    });
  });

  // Middleware de Vite para la UI
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Audio Engine Simulator corriendo en http://localhost:${PORT}`);
  });
}

startServer();
