// 📜 RUTAS HISTÓRICAS - Datos de correlación Chizhevsky
const express = require("express");
const router = express.Router();

// GET /api/historical/cycle/:cycleNumber
router.get("/cycle/:cycleNumber", (req, res) => {
  const { cycleNumber } = req.params;
  
  // Datos de ejemplo del ciclo solar 24-25
  const cycleData = {
    cycle: parseInt(cycleNumber),
    years: this.getCycleYears(cycleNumber),
    events: this.getHistoricalEvents(cycleNumber),
    solarMax: this.getSolarMaxDate(cycleNumber),
    correlation: this.calculateCorrelation(cycleNumber)
  };
  
  res.json({
    success: true,
    data: cycleData,
    source: "Chizhevsky Historical Database"
  });
});

// GET /api/historical/year/:year
router.get("/year/:year", (req, res) => {
  const { year } = req.params;
  
  res.json({
    year: parseInt(year),
    solarActivity: this.getSolarActivityForYear(year),
    historicalEvents: this.getEventsForYear(year),
    chizhevskyAnalysis: this.analyzeYear(year)
  });
});

// Métodos auxiliares
router.getCycleYears = function(cycle) {
  const cycles = {
    24: { start: 2008, end: 2019 },
    25: { start: 2019, end: 2030 },
    26: { start: 2030, end: 2041 }
  };
  return cycles[cycle] || { start: 1900, end: 2000 };
};

router.getHistoricalEvents = function(cycle) {
  const events = {
    24: ["Revoluciones Árabes (2011)", "Conflicto Ucrania (2014)", "Pandemia COVID-19 (2019)"],
    25: ["Guerra Ucrania (2022)", "Tensiones Taiwan (2023)"],
    26: ["Eventos futuros - Por monitorear"]
  };
  return events[cycle] || ["Datos históricos en proceso"];
};

module.exports = router;
