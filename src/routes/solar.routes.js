// ☀️ RUTAS DEL SISTEMA SOLAR - Versión limpia y robusta
const express = require("express");
const router = express.Router();
const noaaService = require("../services/noaa.service");
const nasaService = require("../services/nasa.service");
const { ChizhevskyAnalyzer } = require("../services/chizhevsky.service");

// GET /api/solar/status - Estado completo del sistema solar
router.get("/status", async (req, res) => {
  try {
    console.log('🌞 Solicitando datos solares...');
    
    // Obtener datos en paralelo
    const [solarWind, spaceWeather, sunspots] = await Promise.allSettled([
      noaaService.getSolarWind(),
      nasaService.getSpaceWeather(),
      noaaService.getSunspots()
    ]);

    // Procesar resultados
    const windData = solarWind.status === "fulfilled" ? solarWind.value : noaaService.getRealisticFallback();
    const nasaData = spaceWeather.status === "fulfilled" ? spaceWeather.value : { success: false, data: [] };
    const sunspotData = sunspots.status === "fulfilled" ? sunspots.value : { 
      success: false, 
      sunspotNumber: 75, 
      cycle: 25 
    };

    const solarStatus = {
      timestamp: new Date().toISOString(),
      sources: {
        noaa: solarWind.status === "fulfilled" && windData.quality !== 'simulated',
        nasa: nasaData.success,
        sunspots: sunspots.status === "fulfilled" && sunspotData.success,
        windQuality: windData.quality,
        windSource: windData.source,
        nasaSource: nasaData.source
      },
      data: {
        solarWind: {
          speed: windData.speed,
          density: windData.density,
          temperature: windData.temperature,
          magneticField: windData.magneticField,
          timestamp: windData.timestamp,
          note: windData.note
        },
        alerts: nasaData.data || [],
        sunspotCycle: {
          sunspotNumber: sunspotData.sunspotNumber,
          smoothed: sunspotData.smoothed || sunspotData.sunspotNumber * 0.9,
          cycle: sunspotData.cycle,
          date: sunspotData.date
        }
      },
      analysis: ChizhevskyAnalyzer.analyzeCurrentState({
        solarWind: windData.speed,
        sunspots: sunspotData.sunspotNumber
      })
    };

    // Log informativo
    console.log(`📊 Resultados: NOAA=${solarStatus.sources.noaa}, ` +
                `NASA=${solarStatus.sources.nasa}, ` +
                `Wind=${windData.speed.toFixed(0)} km/s`);

    res.json({
      success: true,
      message: "Estado solar obtenido",
      ...solarStatus
    });
    
  } catch (error) {
    console.error('💥 Error en endpoint /status:', error.message);
    res.status(500).json({
      success: false,
      error: "Error obteniendo datos solares",
      details: error.message,
      timestamp: new Date().toISOString(),
      data: noaaService.getRealisticFallback()
    });
  }
});

// GET /api/solar/geomagnetic - Índices geomagnéticos
router.get("/geomagnetic", async (req, res) => {
  try {
    // Usar datos reales si están disponibles
    const windData = await noaaService.getSolarWind();
    
    // Calcular KP basado en datos reales o simular
    const baseKp = windData.speed > 400 ? 4 : 3;
    const kpValue = baseKp + Math.random() * 2;
    
    const geomagneticData = {
      kpIndex: {
        value: kpValue,
        level: this.getKpLevel(kpValue),
        stormWarning: kpValue >= 6
      },
      dstIndex: {
        value: -10 - Math.random() * 20,
        stormCondition: kpValue >= 6
      },
      aurora: {
        visibility: this.calculateAuroraVisibility(kpValue),
        latitude: this.calculateAuroraLatitude(kpValue)
      },
      timestamp: new Date().toISOString(),
      source: windData.source
    };

    res.json({
      success: true,
      ...geomagneticData
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message
    });
  }
});

// GET /api/solar/nasa-test - Probar NASA API
router.get("/nasa-test", async (req, res) => {
  try {
    const result = await nasaService.getSpaceWeather();
    const health = await nasaService.healthCheck();
    
    res.json({
      success: true,
      nasaTest: {
        apiKeyValid: health.apiKeyValid,
        health: health.healthy,
        dataCount: result.data.length,
        source: result.source,
        sampleAlert: result.data[0] ? {
          type: result.data[0].messageType || result.data[0].type,
          preview: result.data[0].messageBody ? 
            result.data[0].messageBody.substring(0, 100) + '...' :
            result.data[0].title || 'No content'
        } : null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/solar/noaa-test - Probar NOAA
router.get("/noaa-test", async (req, res) => {
  try {
    const windData = await noaaService.getSolarWind();
    const sunspots = await noaaService.getSunspots();
    
    res.json({
      success: true,
      noaaTest: {
        windSpeed: windData.speed,
        windQuality: windData.quality,
        windSource: windData.source,
        sunspots: sunspots.sunspotNumber,
        sunspotSource: sunspots.success ? 'NOAA' : 'estimated',
        recommendation: windData.quality === 'good' ? 
          '✅ NOAA funcionando correctamente' :
          '⚠️  NOAA con problemas, usando datos realistas'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Funciones auxiliares
router.getKpLevel = function(kp) {
  if (kp < 4) return "Tranquilo";
  if (kp < 6) return "Inestable";
  if (kp < 7) return "Tormenta Menor";
  if (kp < 8) return "Tormenta Mayor";
  return "Tormenta Severa";
};

router.calculateAuroraVisibility = function(kp) {
  if (kp < 4) return "Baja (solo polos)";
  if (kp < 6) return "Media (latitudes altas)";
  if (kp < 7) return "Alta (latitudes medias)";
  return "Muy Alta (visibilidad extendida)";
};

router.calculateAuroraLatitude = function(kp) {
  return Math.round(60 - (kp * 3));
};

module.exports = router;
