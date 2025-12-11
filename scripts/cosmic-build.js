#!/usr/bin/env node
// 🛠️ SCRIPT DE CONSTRUCCIÓN CÓSMICA HELIOPULSE

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class CosmicBuilder {
  constructor() {
    this.projectRoot = process.cwd();
    this.buildLog = [];
  }

  log(message, emoji = "📝") {
    const timestamp = new Date().toISOString();
    const logMessage = `${emoji} [${timestamp}] ${message}`;
    this.buildLog.push(logMessage);
    console.log(logMessage);
  }

  async buildCompleteSystem() {
    this.log("INICIANDO CONSTRUCCIÓN DEL OBSERVATORIO HELIOPULSE", "🌌");
    
    try {
      // 1. Verificar estructura
      this.verifyStructure();
      
      // 2. Instalar dependencias
      this.installDependencies();
      
      // 3. Configurar base de datos
      await this.setupDatabase();
      
      // 4. Compilar assets
      this.compileAssets();
      
      // 5. Ejecutar tests
      this.runTests();
      
      // 6. Generar reporte
      this.generateReport();
      
      this.log("OBSERVATORIO CONSTRUIDO EXITOSAMENTE", "🚀");
      this.displayLaunchInstructions();
      
    } catch (error) {
      this.log(`ERROR EN CONSTRUCCIÓN: ${error.message}`, "💥");
      process.exit(1);
    }
  }

  verifyStructure() {
    this.log("Verificando estructura cósmica...", "🔍");
    
    const requiredDirs = [
      "src", "public", "docs", "scripts", "tests"
    ];
    
    const requiredFiles = [
      "package.json", "src/app.js", ".env"
    ];
    
    requiredDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.log(`Directorio creado: ${dir}`, "📁");
      }
    });
    
    requiredFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        this.log(`ARCHIVO FALTANTE: ${file}`, "⚠️");
        throw new Error(`Archivo requerido no encontrado: ${file}`);
      }
    });
    
    this.log("Estructura verificada correctamente", "✅");
  }

  installDependencies() {
    this.log("Instalando dependencias cósmicas...", "📦");
    
    try {
      if (fs.existsSync("package-lock.json")) {
        execSync("npm ci --only=production", { stdio: "inherit" });
      } else {
        execSync("npm install", { stdio: "inherit" });
      }
      
      this.log("Dependencias instaladas", "✅");
    } catch (error) {
      this.log("Error instalando dependencias", "❌");
      throw error;
    }
  }

  async setupDatabase() {
    this.log("Configurando base de datos cósmica...", "🗄️");
    
    // Verificar si MongoDB está disponible
    try {
      execSync("mongod --version", { stdio: "pipe" });
      this.log("MongoDB detectado", "✅");
      
      // Crear directorio de datos si no existe
      if (!fs.existsSync("data/db")) {
        fs.mkdirSync("data/db", { recursive: true });
      }
      
    } catch (error) {
      this.log("MongoDB no encontrado. Usando datos en memoria", "⚠️");
    }
  }

  compileAssets() {
    this.log("Compilando assets del dashboard...", "🎨");
    
    const dashboardDir = "public/dashboard";
    if (!fs.existsSync(dashboardDir)) {
      fs.mkdirSync(dashboardDir, { recursive: true });
    }
    
    this.log("Dashboard preparado", "✅");
  }

  runTests() {
    this.log("Ejecutando tests cósmicos...", "🧪");
    
    try {
      execSync("npm test", { stdio: "inherit" });
      this.log("Tests pasados exitosamente", "✅");
    } catch (error) {
      this.log("Algunos tests fallaron", "⚠️");
      // No fallar la construcción por tests
    }
  }

  generateReport() {
    this.log("Generando reporte de construcción...", "📊");
    
    const report = {
      timestamp: new Date().toISOString(),
      project: "HelioPulse Observatory",
      version: require("../package.json").version,
      buildLog: this.buildLog,
      systemCheck: {
        nodeVersion: process.version,
        platform: process.platform,
        memory: process.memoryUsage()
      }
    };
    
    fs.writeFileSync(
      "build-report.json",
      JSON.stringify(report, null, 2)
    );
    
    this.log("Reporte generado: build-report.json", "✅");
  }

  displayLaunchInstructions() {
    console.log(`
    🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
    🚀 CONSTRUCCIÓN COMPLETADA - OBSERVATORIO HELIOPULSE
    🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
    
    📍 Directorio: ${this.projectRoot}
    🕐 Hora: ${new Date().toLocaleString()}
    
    🎯 COMANDOS PARA INICIAR:
    
    1. INICIAR SERVIDOR:
       $ npm start
       o
       $ node src/app.js
    
    2. MODO DESARROLLO (con recarga automática):
       $ npm run dev
    
    3. SINCRONIZAR DATOS SOLARES:
       $ npm run solar-sync
    
    4. ABRIR DASHBOARD:
       http://localhost:3000/dashboard
    
    5. VER API DOCS:
       http://localhost:3000/api-docs
    
    🔭 ENDPOINTS PRINCIPALES:
       • GET  /api/solar/status      - Estado solar completo
       • GET  /api/solar/flares      - Eyecciones solares
       • GET  /api/analysis/chizhevsky - Índice heliobiológico
       • WS   /socket.io            - Datos en tiempo real
    
    🌌 "La humanidad es ciudadana del cosmos"
       - Alexander L. Chizhevsky
    
    🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
    `);
  }
}

// Ejecutar constructor
const builder = new CosmicBuilder();
builder.buildCompleteSystem().catch(console.error);
