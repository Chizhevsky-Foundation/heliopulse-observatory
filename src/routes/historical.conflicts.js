// ⚔️ RUTAS DE ANÁLISIS HISTÓRICO DE CONFLICTOS - Chizhevsky
const express = require("express");
const router = express.Router();
const ConflictService = require("../services/historical/conflict.service");

// GET /api/historical/conflicts/chizhevsky - Análisis general
router.get("/chizhevsky", (req, res) => {
  try {
    const region = req.query.region || "all";
    const analysis = ConflictService.analyzeChizhevskyCorrelation(region);
    
    res.json({
      success: true,
      analysis: analysis,
      timestamp: new Date().toISOString(),
      dedication: "En memoria de Alexander L. Chizhevsky, pionero de la heliobiología"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error en análisis histórico",
      details: error.message
    });
  }
});

// GET /api/historical/conflicts/israel-palestine - Análisis específico
router.get("/israel-palestine", (req, res) => {
  try {
    const analysis = ConflictService.analyzeChizhevskyCorrelation("israel-palestine");
    
    res.json({
      success: true,
      region: "Israel-Palestina",
      period: "1947-2024",
      totalConflicts: analysis.totalConflicts,
      correlation: analysis.correlation,
      interpretation: analysis.interpretation,
      currentContext: analysis.currentContext,
      combinedData: analysis.combinedData.slice(0, 10), // Primeros 10 para no sobrecargar
      statisticalAnalysis: analysis.statisticalAnalysis,
      peaceMessage: "La paz requiere voluntad humana que trasciende cualquier ciclo natural"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error en análisis Israel-Palestina",
      details: error.message
    });
  }
});

// GET /api/historical/conflicts/predict - Predicciones basadas en ciclos solares
router.get("/predict", (req, res) => {
  try {
    const years = parseInt(req.query.years) || 5;
    const predictions = ConflictService.predictRiskPeriods(years);
    
    res.json({
      success: true,
      predictions: predictions,
      currentSolarCycle: 25,
      currentPhase: "máximo solar (2024-2025)",
      note: "Predicciones basadas en patrones históricos de Chizhevsky. No determinismo, solo patrones observados."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error en predicciones",
      details: error.message
    });
  }
});

// GET /api/historical/conflicts/cycle/:cycle - Conflictos por ciclo solar
router.get("/cycle/:cycle", (req, res) => {
  try {
    const cycle = parseInt(req.params.cycle);
    const conflicts = ConflictService.historicalConflicts.filter(conflict => {
      const solar = ConflictService.solarCycleData.find(s => s.year === conflict.year);
      return solar && solar.cycle === cycle;
    });
    
    res.json({
      success: true,
      solarCycle: cycle,
      conflicts: conflicts,
      count: conflicts.length,
      intensityAverage: conflicts.length > 0 ? 
        (conflicts.reduce((sum, c) => sum + c.intensity, 0) / conflicts.length).toFixed(2) : 0,
      note: `Ciclo Solar ${cycle} - Período de ~11 años`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error obteniendo conflictos por ciclo",
      details: error.message
    });
  }
});

// GET /api/historical/conflicts/year/:year - Análisis por año específico
router.get("/year/:year", (req, res) => {
  try {
    const year = parseInt(req.params.year);
    
    const conflict = ConflictService.historicalConflicts.find(c => c.year === year);
    const solar = ConflictService.solarCycleData.find(s => s.year === year) ||
                  ConflictService.solarCycleData.reduce((prev, curr) => 
                    Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev
                  );
    
    const nearbyConflicts = ConflictService.historicalConflicts
      .filter(c => Math.abs(c.year - year) <= 3 && c.year !== year)
      .sort((a, b) => Math.abs(a.year - year) - Math.abs(b.year - year));
    
    res.json({
      success: true,
      year: year,
      conflict: conflict || { note: "No hay conflicto principal registrado este año" },
      solarActivity: {
        sunspots: solar.sunspots,
        cycle: solar.cycle,
        isPeak: solar.peak || false,
        yearDifference: Math.abs(solar.year - year)
      },
      nearbyConflicts: nearbyConflicts.slice(0, 3),
      chizhevskyAnalysis: this.getYearAnalysis(year, conflict, solar)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error en análisis anual",
      details: error.message
    });
  }
});

// Método auxiliar para análisis anual
router.getYearAnalysis = function(year, conflict, solar) {
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

// GET /api/historical/conflicts/peace-recommendations - Recomendaciones para la paz
router.get("/peace-recommendations", (req, res) => {
  try {
    const recommendations = {
      basedOnChizhevsky: [
        "Programar negociaciones importantes durante períodos de mínima actividad solar",
        "Establecer alertas tempranas para tensiones sociales durante tormentas geomagnéticas",
        "Educar a líderes sobre posibles influencias cósmicas en la psicología de masas",
        "Crear mecanismos de desescalada automática durante períodos de alta excitabilidad"
      ],
      generalPeaceBuilding: [
        "Diálogo continuo independientemente de ciclos solares",
        "Cooperación científica internacional como puente diplomático",
        "Enfoque en necesidades humanas básicas: agua, alimentos, seguridad",
        "Educación para la paz desde temprana edad"
      ],
      specificIsraelPalestine: [
        "Corredores humanitarios garantizados durante todos los ciclos",
        "Cooperación en energía solar (literal y metafórica)",
        "Diálogos interreligiosos e interculturales",
        "Soluciones creativas que respeten derechos y aspiraciones de todos"
      ]
    };
    
    res.json({
      success: true,
      recommendations: recommendations,
      message: "La paz es una construcción humana activa, no un resultado pasivo de ciclos naturales",
      chizhevskyWisdom: "Comprender los ciclos nos da herramientas para trascenderlos"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error obteniendo recomendaciones",
      details: error.message
    });
  }
});

module.exports = router;
