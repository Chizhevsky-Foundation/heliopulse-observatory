// 🧪 TESTS DEL SISTEMA CHIZHEVSKY

const { ChizhevskyAnalyzer } = require("../../src/services/chizhevsky.service");

describe("Sistema de Análisis Chizhevsky", () => {
  
  test("Debería calcular índice de excitabilidad correctamente", () => {
    const analysis = ChizhevskyAnalyzer.calculateMassExcitability(6.5, 120);
    
    expect(analysis).toHaveProperty("index");
    expect(analysis).toHaveProperty("level");
    expect(analysis.index).toBeGreaterThan(0);
    expect(["Baja", "Moderada", "Alta", "Muy Alta"]).toContain(analysis.level);
  });
  
  test("Debería generar recomendaciones según nivel de riesgo", () => {
    const highRiskAnalysis = ChizhevskyAnalyzer.calculateMassExcitability(8, 150);
    const recommendations = ChizhevskyAnalyzer.generateHeliobiologicalRecommendations(highRiskAnalysis);
    
    expect(recommendations).toHaveProperty("forGovernments");
    expect(recommendations).toHaveProperty("forCitizens");
    expect(recommendations.forGovernments.length).toBeGreaterThan(0);
  });
  
  test("Debería predecir excitabilidad para múltiples días", () => {
    const prediction = ChizhevskyAnalyzer.predictMassExcitability(7, "europe");
    
    expect(prediction).toHaveProperty("predictions");
    expect(prediction.predictions).toHaveLength(7);
    expect(prediction.region).toBe("europe");
    expect(prediction.predictions[0]).toHaveProperty("predictedIndex");
  });
  
  test("Debería reconocer patrones históricos", () => {
    const pattern1789 = ChizhevskyAnalyzer.getHistoricalPattern(1789);
    const pattern2000 = ChizhevskyAnalyzer.getHistoricalPattern(2000);
    
    expect(pattern1789.solarMax).toBe(true);
    expect(pattern1789.events).toContain("Revolución Francesa");
    expect(pattern2000.solarMax).toBe(false);
  });
});

// Test de factores regionales
describe("Factores Regionales", () => {
  test("Debería aplicar factor correcto para cada región", () => {
    expect(ChizhevskyAnalyzer.getRegionalFactor("middle-east")).toBe(1.4);
    expect(ChizhevskyAnalyzer.getRegionalFactor("asia")).toBe(1.1);
    expect(ChizhevskyAnalyzer.getRegionalFactor("global")).toBe(1.0);
  });
});
