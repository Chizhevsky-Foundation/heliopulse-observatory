// ☀️ RUTAS DEL SISTEMA SOLAR - Datos en tiempo real
const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ChizhevskyAnalyzer } = require("../services/chizhevsky.service");

// GET /api/solar/status - Estado completo del sistema solar
router.get("/status", async (req, res) => {
  try {
    // Obtener múltiples fuentes de datos
    const [noaaData, nasaData, sunspots] = await Promise.allSettled([
      axios.get(`${process.env.NOAA_API_BASE}/products/solar-wind/mag-1-day.json`),
      axios.get("https://api.nasa.gov/DONKI/notifications?api_key=DEMO_KEY"),
      axios.get(`${process.env.NOAA_API_BASE}/json/solar-cycle/sunspots.json`)
    ]);

    const solarStatus = {
      timestamp: new Date().toISOString(),
      sources: {
        noaa: noaaData.status === "fulfilled",
        nasa: nasaData.status === "fulfilled",
        sunspots: sunspots.status === "fulfilled"
      },
      data: {
        solarWind: noaaData.status === "fulfilled" ? 
          this.processSolarWind(noaaData.value.data) : null,
        alerts: nasaData.status === "fulfilled" ? 
          nasaData.value.data.slice(0, 5) : [],
        sunspotCycle: sunspots.status === "fulfilled" ? 
          this.processSunspotData(sunspots.value.data) : null
      },
      analysis: ChizhevskyAnalyzer.analyzeCurrentState()
    };

    res.json({
      success: true,
      message: "Estado solar obtenido",
      ...solarStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Tormenta de datos en el viento solar",
      details: error.message
    });
  }
});

// GET /api/solar/flares - Eyecciones de masa coronal
router.get("/flares", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.NOAA_API_BASE}/json/goes/primary/xray-flares-latest.json`
    );
    
    const flares = response.data.map(flare => ({
      class: flare.classType,
      peakTime: flare.peakTime,
      duration: flare.duration,
      region: flare.activeRegionNum,
      significance: this.calculateFlareSignificance(flare)
    }));

    res.json({
      success: true,
      count: flares.length,
      flares: flares,
      hasCME: flares.some(f => f.class.includes("X")),
      warning: flares.length > 3 ? "Alta actividad solar detectada" : "Normal"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/solar/geomagnetic - Índices geomagnéticos
router.get("/geomagnetic", async (req, res) => {
  try {
    const [kpIndex, dstIndex] = await Promise.all([
      axios.get(`${process.env.NOAA_API_BASE}/products/geospace/geopack-latest.json`),
      axios.get(`${process.env.NOAA_API_BASE}/products/geospace/dst-latest.json`)
    ]);

    const geomagneticData = {
      kpIndex: {
        value: kpIndex.data[0]?.kp || 0,
        level: this.getKpLevel(kpIndex.data[0]?.kp),
        stormWarning: kpIndex.data[0]?.kp >= 6
      },
      dstIndex: {
        value: dstIndex.data[0]?.dst || 0,
        stormCondition: dstIndex.data[0]?.dst <= -50
      },
      aurora: {
        visibility: this.calculateAuroraVisibility(kpIndex.data[0]?.kp),
        latitude: this.calculateAuroraLatitude(kpIndex.data[0]?.kp)
      }
    };

    res.json({
      success: true,
      ...geomagneticData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/solar/predict - Predicción heliobiológica
router.post("/predict", async (req, res) => {
  try {
    const { days = 7, region = "global" } = req.body;
    
    const prediction = {
      period: `${days} días`,
      region: region,
      solarActivity: this.predictSolarActivity(days),
      geomagneticStorms: this.predictStorms(days),
      chizhevskyRisk: ChizhevskyAnalyzer.predictMassExcitability(days, region),
      recommendations: this.generateRecommendations(days)
    };

    res.json({
      success: true,
      prediction: prediction,
      confidence: 0.85,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Métodos de utilidad
router.processSolarWind = function(data) {
  const latest = data[data.length - 1];
  return {
    speed: parseFloat(latest[1]) || 0,
    density: parseFloat(latest[2]) || 0,
    temperature: parseFloat(latest[3]) || 0,
    magneticField: {
      bx: parseFloat(latest[4]) || 0,
      by: parseFloat(latest[5]) || 0,
      bz: parseFloat(latest[6]) || 0,
      bt: parseFloat(latest[7]) || 0
    }
  };
};

router.getKpLevel = function(kp) {
  if (kp < 4) return "Tranquilo";
  if (kp < 6) return "Inestable";
  if (kp < 7) return "Tormenta Menor";
  if (kp < 8) return "Tormenta Mayor";
  return "Tormenta Severa";
};

module.exports = router;
