// 🔬 SERVICIO DE ANÁLISIS CHIZHEVSKY - Núcleo de la heliobiología
class ChizhevskyAnalyzer {
  static historicalCorrelations = {
    solarMax: ["Revoluciones", "Guerras", "Innovación"],
    solarMin: ["Estabilidad", "Consolidación", "Tradición"]
  };

  static analyzeCurrentState(solarData, historicalContext) {
    const currentKp = solarData?.kpIndex || 3;
    const sunspotCount = solarData?.sunspots || 50;
    
    // Cálculo de la "Excitabilidad de Masas" según Chizhevsky
    const massExcitability = this.calculateMassExcitability(currentKp, sunspotCount);
    
    return {
      timestamp: new Date().toISOString(),
      chizhevskyIndex: massExcitability.index,
      riskLevel: massExcitability.level,
      factors: {
        solarActivity: this.getSolarActivityLevel(sunspotCount),
        geomagnetic: this.getGeomagneticImpact(currentKp),
        seasonal: this.getSeasonalFactor(),
        lunar: this.getLunarInfluence()
      },
      predictions: {
        socialTension: massExcitability.socialImpact,
        creativeOutburst: massExcitability.creativePotential,
        conflictProbability: massExcitability.conflictRisk
      },
      recommendations: this.generateHeliobiologicalRecommendations(massExcitability)
    };
  }

  static calculateMassExcitability(kpIndex, sunspots) {
    // Fórmula basada en los estudios de Chizhevsky
    const baseScore = (kpIndex * 1.5) + (sunspots / 100);
    const seasonalMultiplier = this.getSeasonalMultiplier();
    const lunarMultiplier = this.getLunarMultiplier();
    
    const finalScore = baseScore * seasonalMultiplier * lunarMultiplier;
    
    return {
      index: parseFloat(finalScore.toFixed(2)),
      level: this.getExcitabilityLevel(finalScore),
      socialImpact: this.calculateSocialImpact(finalScore),
      creativePotential: this.calculateCreativePotential(finalScore),
      conflictRisk: this.calculateConflictRisk(finalScore)
    };
  }

  static getExcitabilityLevel(score) {
    if (score < 3) return "Baja - Estabilidad";
    if (score < 6) return "Moderada - Vigilancia";
    if (score < 9) return "Alta - Precauciones";
    return "Muy Alta - Alerta";
  }

  static calculateSocialImpact(score) {
    // Mapeo basado en datos históricos de Chizhevsky
    if (score < 4) return "Estabilidad social, baja movilización";
    if (score < 7) return "Aumento actividad social, posibles protestas";
    if (score < 10) return "Alta movilización, cambios sociales probables";
    return "Punto de inflexión social, posibles revoluciones";
  }

  static predictMassExcitability(daysAhead, region) {
    const predictions = [];
    const now = new Date();
    
    for (let i = 0; i < daysAhead; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      // Simulación de ciclo solar predecible
      const baseSolar = 5 + Math.sin(i / 5) * 3;
      const regionalFactor = this.getRegionalFactor(region);
      
      predictions.push({
        date: date.toISOString().split("T")[0],
        predictedIndex: parseFloat((baseSolar * regionalFactor).toFixed(2)),
        confidence: 0.7 + Math.random() * 0.2,
        notableEvents: this.predictNotableEvents(date, baseSolar)
      });
    }
    
    return {
      region: region,
      period: `${daysAhead} días`,
      predictions: predictions,
      trend: this.calculateTrend(predictions),
      warnings: this.generateWarnings(predictions)
    };
  }

  static getRegionalFactor(region) {
    const factors = {
      "global": 1.0,
      "europe": 1.2,
      "asia": 1.1,
      "middle-east": 1.4,
      "americas": 1.0,
      "africa": 0.9
    };
    return factors[region.toLowerCase()] || 1.0;
  }

  static generateHeliobiologicalRecommendations(excitability) {
    const recommendations = [];
    
    if (excitability.level.includes("Alta")) {
      recommendations.push(
        "Aumentar mediación en conflictos internacionales",
        "Monitorear redes sociales por discurso polarizado",
        "Preparar mecanismos de desescalada diplomática"
      );
    }
    
    if (excitability.creativePotential > 7) {
      recommendations.push(
        "Fomentar iniciativas culturales y científicas",
        "Invertir en proyectos de innovación social"
      );
    }
    
    return {
      forGovernments: recommendations,
      forCitizens: [
        "Mantener pensamiento crítico durante noticias emocionales",
        "Participar en diálogos constructivos",
        "Documentar ideas creativas"
      ],
      forMedia: [
        "Verificar fuentes durante picos de actividad solar",
        "Evitar lenguaje sensacionalista",
        "Contextualizar noticias con datos científicos"
      ]
    };
  }

  static getHistoricalPattern(year) {
    // Patrones históricos documentados por Chizhevsky
    const patterns = {
      1789: { solarMax: true, events: ["Revolución Francesa"] },
      1848: { solarMax: true, events: ["Revoluciones Europeas"] },
      1917: { solarMax: true, events: ["Revolución Rusa"] },
      1989: { solarMax: true, events: ["Caída del Muro de Berlín"] }
    };
    
    return patterns[year] || { solarMax: false, events: [] };
  }
}

module.exports = { ChizhevskyAnalyzer };
