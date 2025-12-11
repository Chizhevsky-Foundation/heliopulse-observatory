// ⚔️ RUTAS DE ANÁLISIS DE CAMPO DE BATALLA - Experiencia directa de Chizhevsky
const express = require("express");
const router = express.Router();
const BattlefieldService = require("../services/battlefield.service");

// ========== FUNCIONES AUXILIARES ==========
const formatForMilitaryCommand = function(alert) {
  return [
    `=== ALERTA COMANDO ===`,
    `NIVEL: ${alert.alertLevel}`,
    `PRIORIDAD: ${alert.priority}`,
    `RESUMEN: ${alert.summary}`,
    `EVALUACIÓN RIESGO: ${alert.riskAssessment}`,
    `ACCIONES INMEDIATAS:`,
    ...alert.immediateActions.map((action, i) => `  ${i+1}. ${action}`),
    `VÁLIDO HASTA: ${new Date(alert.validUntil).toLocaleTimeString()}`,
    `BASE CIENTÍFICA: ${alert.scientificBasis}`
  ].join('\n');
};

const compareWithModernData = function(simulation) {
  return {
    modernEquivalent: simulation.battlefieldRisk.score >= 70 ? 
      "Conflicto Gaza 2023 (KP=7, Sunspots=113)" :
      simulation.battlefieldRisk.score >= 50 ?
      "Ucrania 2022 (KP=6, Sunspots=95)" :
      "Tensiones Taiwan 2023 (KP=4, Sunspots=85)",
    similarity: "Patrones consistentes a través de siglo",
    conclusion: "Los mecanismos biológicos permanecen constantes aunque la tecnología cambie"
  };
};

const getMedicalImplications = function(kp, wind) {
  const implications = [];
  
  if (kp >= 6) {
    implications.push(
      "🩺 Aumentar monitoreo salud mental en tropas",
      "💊 Considerar ajustes medicación antidepresiva",
      "😴 Implementar protocolos sueño reforzados",
      "🧠 Evaluación cognitiva periódica para comandantes"
    );
  }
  
  if (wind >= 500) {
    implications.push(
      "🌡️ Monitorear presión arterial frecuente",
      "💧 Hidratación aumentada 30%",
      "🍎 Suplementos magnesio y vitamina B6",
      "🧘 Técnicas respiración para manejo estrés"
    );
  }
  
  return implications.length > 0 ? implications : ["✅ No se requieren ajustes médicos especiales"];
};

const adjustForTroopType = function(behavior, troopType) {
  const adjustments = {
    "infantry": "Efectos más pronunciados - exposición directa",
    "command": "Riesgo de errores estratégicos - decisiones críticas afectadas",
    "artillery": "Precisión disminuida - mayor dispersión",
    "communications": "Interferencias aumentadas - redundancia necesaria",
    "medics": "Estrés aumentado - rotaciones más frecuentes recomendadas"
  };
  
  return adjustments[troopType] || "Efectos generales aplican a todas las unidades";
};

const considerRegionalFactors = function(region, score) {
  const factors = {
    "desert": "Efectos amplificados 20% - calor + radiación solar",
    "montaña": "Presión atmosférica baja + efectos solares sinérgicos",
    "urbano": "Estructuras metálicas pueden amplificar campos electromagnéticos",
    "mar": "Reflejo agua amplifica luz - efectos circadianos aumentados",
    "polar": "Variaciones extremas - adaptación requerida"
  };
  
  return {
    region: region || "no especificada",
    factor: factors[region] || "Efectos base aplican",
    adjustedScore: factors[region] ? Math.min(100, score * 1.2) : score
  };
};

const getYearAnalysis = function(year, conflict, solar) {
  if (!conflict) {
    return {
      message: "Año sin conflicto mayor registrado",
      correlation: "No aplicable",
      recommendation: "Período potencial para diplomacia y construcción de paz"
    };
  }
  
  const intensity = conflict.intensity;
  const sunspots = solar.sunspots;
  
  let analysis = "";
  if (sunspots > 100 && intensity >= 8) {
    analysis = "Fuerte correlación: alto conflicto durante alta actividad solar";
  } else if (sunspots < 50 && intensity >= 8) {
    analysis = "Contradice patrón Chizhevsky: alto conflicto durante baja actividad solar";
  } else if (sunspots > 100 && intensity <= 5) {
    analysis = "Contradice patrón: alta actividad solar pero bajo conflicto";
  } else {
    analysis = "Patrón moderado o mixto";
  }
  
  return {
    message: analysis,
    solarInfluence: sunspots > 100 ? "potencialmente significativa" : "probablemente menor",
    factors: "Recuerde: múltiples factores políticos, económicos y sociales influyen",
    chizhevskyQuote: "La actividad solar modula, no determina, el comportamiento humano"
  };
};

// ========== ENDPOINTS ==========

// GET /api/battlefield/analysis - Análisis actual de condiciones de batalla
router.get("/analysis", async (req, res) => {
  try {
    // Obtener datos solares actuales (simulados o reales)
    const solarData = {
      kpIndex: parseFloat(req.query.kp) || 4 + Math.random() * 4,
      solarWind: parseFloat(req.query.wind) || 400 + Math.random() * 200,
      sunspots: parseFloat(req.query.sunspots) || 75 + Math.random() * 50
    };
    
    const analysis = BattlefieldService.analyzeCurrentBattlefieldConditions(solarData);
    
    res.json({
      success: true,
      dedication: "En honor a Alexander Chizhevsky, quien observó estos patrones en el frente de batalla",
      solarData: solarData,
      analysis: analysis,
      timestamp: new Date().toISOString(),
      historicalContext: "Observaciones originales: Frente del Volcán, 1915-1917"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error en análisis de campo de batalla",
      details: error.message
    });
  }
});

// GET /api/battlefield/commander-alert - Alerta para comandantes
router.get("/commander-alert", (req, res) => {
  try {
    const solarData = {
      kpIndex: parseFloat(req.query.kp) || 4 + Math.random() * 4,
      solarWind: parseFloat(req.query.wind) || 400 + Math.random() * 200
    };
    
    const alert = BattlefieldService.generateCommanderAlert(solarData);
    
    res.json({
      success: true,
      alert: alert,
      formattedForCommand: formatForMilitaryCommand(alert),
      chizhevskyQuote: "El soldado no pelea solo contra el enemigo, sino contra el cosmos en su sangre."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error generando alerta",
      details: error.message
    });
  }
});

// GET /api/battlefield/simulate/:date - Simular día histórico
router.get("/simulate/:date", (req, res) => {
  try {
    const date = req.params.date;
    const simulation = BattlefieldService.simulateHistoricalBattle(date);
    
    const observation = BattlefieldService.observations.find(o => o.date === date);
    
    res.json({
      success: true,
      date: date,
      historicalObservation: observation || {note: "Fecha no documentada específicamente"},
      simulation: simulation,
      comparison: compareWithModernData(simulation)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error en simulación histórica",
      details: error.message
    });
  }
});

// GET /api/battlefield/biological-effects - Efectos biológicos detallados
router.get("/biological-effects", (req, res) => {
  try {
    const kp = parseFloat(req.query.kp) || 4;
    const wind = parseFloat(req.query.wind) || 400;
    
    const effects = BattlefieldService.getBiologicalEffects(kp, wind);
    
    res.json({
      success: true,
      conditions: { kpIndex: kp, solarWind: wind },
      biologicalEffects: effects,
      mechanisms: BattlefieldService.biologicalMechanisms,
      medicalImplications: getMedicalImplications(kp, wind)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error analizando efectos biológicos",
      details: error.message
    });
  }
});

// POST /api/battlefield/predict - Predecir comportamiento para condiciones específicas
router.post("/predict", (req, res) => {
  try {
    const { kpIndex, solarWind, sunspots, troopType, region } = req.body;
    
    const solarData = {
      kpIndex: kpIndex || 5,
      solarWind: solarWind || 450,
      sunspots: sunspots || 80
    };
    
    const analysis = BattlefieldService.analyzeCurrentBattlefieldConditions(solarData);
    const behavior = BattlefieldService.predictMilitaryBehavior(analysis.battlefieldRisk.score);
    
    res.json({
      success: true,
      inputConditions: solarData,
      aggressionScore: analysis.battlefieldRisk.score,
      predictedBehavior: behavior,
      troopTypeSpecific: adjustForTroopType(behavior, troopType),
      regionalFactors: considerRegionalFactors(region, analysis.battlefieldRisk.score),
      confidence: 0.78,
      disclaimer: "Predicción basada en patrones observados, no determinismo causal"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error en predicción",
      details: error.message
    });
  }
});

// GET /api/battlefield/year/:year - Análisis por año específico (para conflict.routes)
router.get("/year/:year", (req, res) => {
  try {
    const year = parseInt(req.params.year);
    
    // Esto es un ejemplo simple
    res.json({
      success: true,
      year: year,
      analysis: getYearAnalysis(year, null, null),
      note: "Endpoint de ejemplo para integración"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error en análisis anual",
      details: error.message
    });
  }
});

// Asignar funciones al router
router.formatForMilitaryCommand = formatForMilitaryCommand;
router.compareWithModernData = compareWithModernData;
router.getMedicalImplications = getMedicalImplications;
router.adjustForTroopType = adjustForTroopType;
router.considerRegionalFactors = considerRegionalFactors;
router.getYearAnalysis = getYearAnalysis;

module.exports = router;
