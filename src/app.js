// 🌌 HELIOPULSE CORE - Núcleo del Observatorio Cósmico
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

class HelioPulseCore {
  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer, {
      cors: { origin: "*" }
    });
    
    this.initializeMiddlewares();
    this.initializeCosmicRoutes();
    this.initializeSocketEvents();
    this.initializeErrorHandling();
  }

  initializeMiddlewares() {
    // Protección cósmica
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
          scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
          imgSrc: ["'self'", "data:", "https://*.nasa.gov", "https://*.noaa.gov"]
        }
      }
    }));
    
    this.app.use(cors({
      origin: process.env.NODE_ENV === "cosmic_development" ? "*" : [
        "https://chizhevsky-foundation.github.io",
        "https://heliopulse.observatory"
      ],
      credentials: true
    }));
    
    this.app.use(compression());
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.static("public"));
    
    // Middleware de logging cósmico
    this.app.use((req, res, next) => {
      console.log(`🌠 ${new Date().toISOString()} | ${req.method} ${req.path}`);
      next();
    });
  }

  initializeCosmicRoutes() {
    // Ruta raíz - Portal del Observatorio
    this.app.get("/", (req, res) => {
      res.json({
        message: "🌌 Bienvenido al Observatorio HelioPulse",
        version: "1.0.0-cosmic",
        mission: "Monitorear el pulso solar para la paz global",
        endpoints: {
          solar: "/api/solar",
          historical: "/api/historical",
          analysis: "/api/analysis",
          chizhevsky: "/api/chizhevsky",
          realtime: "/api/realtime (WebSocket)"
        },
        tribute: "En honor a Alexander L. Chizhevsky, padre de la heliobiología"
      });
    });

    // Importar rutas cósmicas
    const solarRoutes = require("./routes/solar.routes");
    const historicalRoutes = require("./routes/historical.routes");
    const analysisRoutes = require("./routes/analysis.routes");
    
    this.app.use("/api/solar", solarRoutes);
    this.app.use("/api/historical", historicalRoutes);
    this.app.use("/api/analysis", analysisRoutes);
  }

  initializeSocketEvents() {
    this.io.on("connection", (socket) => {
      console.log(`🔭 Cliente cósmico conectado: ${socket.id}`);
      
      socket.emit("welcome", {
        message: "Conectado al Observatorio HelioPulse",
        solarCycle: process.env.SOLAR_CYCLE,
        updateInterval: process.env.REALTIME_UPDATE_INTERVAL
      });

      // Suscripción a eventos solares
      socket.on("subscribe:solar", (data) => {
        socket.join("solar-updates");
        console.log(`☀️ Cliente suscrito a actualizaciones solares: ${socket.id}`);
      });

      socket.on("disconnect", () => {
        console.log(`🌑 Cliente desconectado: ${socket.id}`);
      });
    });

    // Emitir datos solares cada 30 segundos
    setInterval(() => {
      const cosmicData = {
        timestamp: new Date().toISOString(),
        solarWind: {
          speed: 300 + Math.random() * 200,
          density: 5 + Math.random() * 3
        },
        kpIndex: 2 + Math.random() * 5,
        sunspots: 50 + Math.random() * 100
      };
      this.io.to("solar-updates").emit("solar:update", cosmicData);
    }, 30000);
  }

  initializeErrorHandling() {
    this.app.use((err, req, res, next) => {
      console.error("💥 Error cósmico:", err);
      res.status(500).json({
        error: "Perturbación en el campo cósmico",
        message: err.message,
        timestamp: new Date().toISOString()
      });
    });
  }

  launch(port = process.env.PORT || 3000) {
    this.httpServer.listen(port, () => {
      console.log(`
        🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
        🚀 OBSERVATORIO HELIOPULSE INICIADO EN PUERTO ${port}
        📡 Monitoreando el pulso solar para la paz global
        🌞 Ciclo Solar: ${process.env.SOLAR_CYCLE}
        🕐 ${new Date().toISOString()}
        🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
      `);
      
      // Mensaje de Chizhevsky
      console.log(`
        💫 "La humanidad no es sólo un habitante de la Tierra,
        💫 sino también del universo, sometiéndose a las influencias
        💫 de las fuerzas cósmicas." - Alexander L. Chizhevsky
      `);
    });
  }
}

// Iniciar el núcleo cósmico
const observatory = new HelioPulseCore();
observatory.launch();

module.exports = observatory.app;
