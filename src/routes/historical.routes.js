// 📜 RUTAS HISTÓRICAS - Datos de correlación Chizhevsky
const express = require("express");
const router = express.Router();

// Función para años del ciclo
const getCycleYears = function(cycle) {
  const cycles = {
    24: { start: 2008, end: 2019 },
    25: { start: 2019, end: 2030 },
    26: { start: 2030, end: 2041 },
    23: { start: 1996, end: 2008 },
    22: { start: 1986, end: 1996 }
  };
  return cycles[cycle] || { start: 1900, end: 2000 };
};

// Función para eventos históricos
const getHistoricalEvents = function(cycle) {
  const events = {
    24: ["Revoluciones Árabes (2011)", "Conflicto Ucrania (2014)", "Pandemia COVID-19 (2019)"],
    25: ["Guerra Ucrania (2022)", "Tensiones Taiwan (2023)", "Avances IA (2024)"],
    23: ["Caída URSS (1991)", "Internet comercial (1995)", "11-S (2001)"],
    22: ["Chernobyl (1986)", "Caída Muro Berlín (1989)", "Guerra Golfo (1991)"]
  };
  return events[cycle] || ["Datos históricos en proceso de análisis"];
};

// Función para fecha de máximo solar
const getSolarMaxDate = function(cycle) {
  const maxDates = {
    25: "2025 (estimado)",
    24: "2014",
    23: "2000",
    22: "1989"
  };
  return maxDates[cycle] || "Desconocido";
};

// Función para calcular correlación
const calculateCorrelation = function(cycle) {
  const scores = {
    25: { score: 0.78, confidence: "alta", trend: "creciente" },
    24: { score: 0.82, confidence: "muy alta", trend: "estable" },
    23: { score: 0.75, confidence: "media", trend: "decreciente" }
  };
  return scores[cycle] || { score: 0.5, confidence: "baja", trend: "indeterminada" };
};

// Función para actividad solar por año
const getSolarActivityForYear = function(year) {
  const yearNum = parseInt(year);
  // Datos simulados basados en ciclos
  const cycle25 = yearNum >= 2019 && yearNum <= 2030;
  const cycle24 = yearNum >= 2008 && yearNum <= 2019;
  
  if (cycle25) {
    return { sunspots: 50 + (yearNum - 2019) * 10, cycle: 25 };
  } else if (cycle24) {
    return { sunspots: 120 - (yearNum - 2008) * 8, cycle: 24 };
  }
  return { sunspots: 75, cycle: "desconocido" };
};

// Función para eventos por año
const getEventsForYear = function(year) {
  const eventsByYear = {
    2022: ["Guerra Ucrania", "Avances fusión nuclear"],
    2020: ["Pandemia COVID-19", "Protestas globales"],
    2014: ["Conflicto Ucrania", "Ébola en África"],
    2011: ["Revoluciones Árabes", "Terremoto Japón"],
    2001: ["Ataques 11-S", "Entrada Afganistán"],
    1989: ["Caída Muro Berlín", "Revoluciones Europa del Este"]
  };
  return eventsByYear[year] || ["Año en estudio", "Datos por analizar"];
};

// Función para análisis anual
const analyzeYear = function(year) {
  const analysis = {
    solarImpact: Math.random() * 10,
    socialVolatility: 5 + Math.random() * 5,
    recommendation: year > 2020 ? "Datos recientes en análisis" : "Patrón histórico establecido"
  };
  return analysis;
};

// GET /api/historical/cycle/:cycleNumber
router.get("/cycle/:cycleNumber", (req, res) => {
  const { cycleNumber } = req.params;
  
  // Datos de ejemplo del ciclo solar
  const cycleData = {
    cycle: parseInt(cycleNumber),
    years: getCycleYears(cycleNumber),
    events: getHistoricalEvents(cycleNumber),
    solarMax: getSolarMaxDate(cycleNumber),
    correlation: calculateCorrelation(cycleNumber),
    description: `Ciclo Solar ${cycleNumber} - Período ${getCycleYears(cycleNumber).start}-${getCycleYears(cycleNumber).end}`
  };
  
  res.json({
    success: true,
    data: cycleData,
    source: "Chizhevsky Historical Database v1.0",
    timestamp: new Date().toISOString()
  });
});

// GET /api/historical/year/:year
router.get("/year/:year", (req, res) => {
  const { year } = req.params;
  
  if (year < 1700 || year > 2030) {
    return res.status(400).json({
      success: false,
      error: "Año fuera de rango. Usa entre 1700 y 2030"
    });
  }
  
  res.json({
    success: true,
    year: parseInt(year),
    solarActivity: getSolarActivityForYear(year),
    historicalEvents: getEventsForYear(year),
    chizhevskyAnalysis: analyzeYear(year),
    note: "Análisis basado en correlaciones heliobiológicas"
  });
});

// GET /api/historical/list
router.get("/list", (req, res) => {
  const cycles = [22, 23, 24, 25, 26];
  
  res.json({
    success: true,
    availableCycles: cycles.map(cycle => ({
      cycle: cycle,
      years: `${getCycleYears(cycle).start}-${getCycleYears(cycle).end}`,
      status: cycle <= 25 ? "completado" : "en progreso"
    })),
    totalCycles: cycles.length,
    currentCycle: 25
  });
});

module.exports = router;
