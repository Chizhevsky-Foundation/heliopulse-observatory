// 🔬 RUTAS DE ANÁLISIS - Versión arreglada
const express = require("express");
const router = express.Router();
const { ChizhevskyAnalyzer } = require("../services/chizhevsky.service");

const interpretAnalysis = (analysis) => {
  const index = analysis.chizhevskyIndex || 5;
  if (index < 4) return "Estabilidad - Buen momento para diplomacia";
  if (index < 7) return "Vigilancia - Posible aumento de tensiones";
  return "Alerta - Alto riesgo de conflictos";
};

router.get("/chizhevsky", async (req, res) => {
  try {
    const analysis = ChizhevskyAnalyzer.analyzeCurrentState({
      kpIndex: parseFloat(req.query.kp) || 3.5,
      sunspots: parseFloat(req.query.sunspots) || 75
    });
    
    res.json({
      success: true,
      analysis: analysis,
      interpretation: interpretAnalysis(analysis),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/simple", (req, res) => {
  res.json({
    success: true,
    message: "Endpoint de análisis simple funcionando",
    chizhevskyIndex: 5.5,
    level: "Moderado",
    recommendation: "Monitoreo normal"
  });
});

module.exports = router;
