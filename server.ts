import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("registrations.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    clinic TEXT,
    payment_status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/register", (req, res) => {
    const { name, email, phone, clinic } = req.body;
    
    if (!name || !email || !phone || !clinic) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
      const stmt = db.prepare("INSERT INTO registrations (name, email, phone, clinic) VALUES (?, ?, ?, ?)");
      const info = stmt.run(name, email, phone, clinic);
      
      console.log(`Nueva inscripción: ${name} (${email})`);
      
      // Simulación de automatización de correo
      console.log(`ENVIANDO CORREO DE CONFIRMACIÓN A: ${email}...`);
      console.log(`Asunto: ¡Bienvenido a CodontouRD 2026!`);
      
      res.json({ 
        success: true, 
        registrationId: info.lastInsertRowid,
        message: "Registro exitoso. Se ha enviado un correo de confirmación."
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al procesar el registro" });
    }
  });

  app.get("/api/registrations", (req, res) => {
    const rows = db.prepare("SELECT * FROM registrations ORDER BY created_at DESC").all();
    res.json(rows);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
