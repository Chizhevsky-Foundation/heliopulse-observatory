// ⚔️ SERVICIO DE ANÁLISIS HISTÓRICO CONFLICTOS - Basado en Chizhevsky
class ConflictAnalysisService {
  constructor() {
    this.historicalConflicts = [
      { year: 1947, event: "Plan de Partición de la ONU", intensity: 7, casualties: 0, region: "israel-palestine" },
      { year: 1948, event: "Guerra Árabe-Israelí (Independencia)", intensity: 10, casualties: 15000, region: "israel-palestine" },
      { year: 1956, event: "Crisis de Suez", intensity: 9, casualties: 3000, region: "middle-east" },
      { year: 1967, event: "Guerra de los Seis Días", intensity: 10, casualties: 20000, region: "israel-palestine" },
      { year: 1970, event: "Septiembre Negro", intensity: 8, casualties: 3500, region: "jordan-palestine" },
      { year: 1973, event: "Guerra de Yom Kippur", intensity: 10, casualties: 18000, region: "israel-palestine" },
      { year: 1982, event: "Guerra del Líbano", intensity: 9, casualties: 17000, region: "lebanon-israel" },
      { year: 1987, event: "Primera Intifada (inicio)", intensity: 8, casualties: 1000, region: "israel-palestine" },
      { year: 1991, event: "Guerra del Golfo", intensity: 9, casualties: 25000, region: "middle-east" },
      { year: 2000, event: "Segunda Intifada", intensity: 9, casualties: 4000, region: "israel-palestine" },
      { year: 2006, event: "Guerra Israel-Líbano", intensity: 8, casualties: 1500, region: "lebanon-israel" },
      { year: 2008, event: "Operación Plomo Fundido (Gaza)", intensity: 8, casualties: 1400, region: "gaza-israel" },
      { year: 2012, event: "Operación Pilar Defensivo", intensity: 7, casualties: 170, region: "gaza-israel" },
      { year: 2014, event: "Operación Margen Protector", intensity: 8, casualties: 2300, region: "gaza-israel" },
      { year: 2021, event: "Conflicto Gaza (mayo)", intensity: 7, casualties: 260, region: "gaza-israel" },
      { year: 2023, event: "Guerra Israel-Hamas (inicio)", intensity: 10, casualties: 40000, region: "gaza-israel" }
    ];

    this.solarCycleData = [
      { year: 1947, sunspots: 151, cycle: 18 },
      { year: 1948, sunspots: 136, cycle: 18 },
      { year: 1956, sunspots: 142, cycle: 19 },
      { year: 1957, sunspots: 190, cycle: 19, peak: true },
      { year: 1967, sunspots: 94, cycle: 20 },
      { year: 1968, sunspots: 106, cycle: 20, peak: true },
      { year: 1970, sunspots: 105, cycle: 20 },
      { year: 1973, sunspots: 38, cycle: 20 },
      { year: 1979, sunspots: 155, cycle: 21, peak: true },
      { year: 1982, sunspots: 116, cycle: 21 },
      { year: 1987, sunspots: 29, cycle: 21 },
      { year: 1989, sunspots: 158, cycle: 22, peak: true },
      { year: 1991, sunspots: 146, cycle: 22 },
      { year: 2000, sunspots: 119, cycle: 23, peak: true },
      { year: 2001, sunspots: 111, cycle: 23 },
      { year: 2006, sunspots: 15, cycle: 23 },
      { year: 2008, sunspots: 3, cycle: 24 },
      { year: 2012, sunspots: 58, cycle: 24 },
      { year: 2014, sunspots: 79, cycle: 24, peak: true },
      { year: 2021, sunspots: 30, cycle: 25 },
      { year: 2023, sunspots: 113, cycle: 25 },
      { year: 2024, sunspots: 159, cycle: 25, peak: true }
    ];
  }

  // Análisis de correlación Chizhevsky
  analyzeChizhevskyCorrelation(region = "all") {
    const conflicts = region === "all" 
      ? this.historicalConflicts 
      : this.historicalConflicts.filter(c => c.region.includes(region));

    const combinedData = conflicts.map(conflict => {
      const solar = this.solarCycleData.find(s => s.year === conflict.year) || 
                    this.solarCycleData.reduce((prev, curr) => 
                      Math.abs(curr.year - conflict.year) < Math.abs(prev.year - conflict.year) ? curr : prev
                    );
      return {
        year: conflict.year,
        event: conflict.event,
        intensity: conflict.intensity,
        casualties: conflict.casualties,
        region: conflict.region,
        sunspots: solar.sunspots,
        solarCycle: solar.cycle,
        isPeak: solar.peak || false,
        timeDiff: Math.abs(solar.year - conflict.year)
      };
    });

    // Calcular correlación de Pearson
    const correlation = this.calculatePearsonCorrelation(combinedData);
    
    // Análisis estadístico
    const analysis = this.performStatisticalAnalysis(combinedData);
    
    return {
      region: region,
      period: `${Math.min(...conflicts.map(c => c.year))}-${Math.max(...conflicts.map(c => c.year))}`,
      totalConflicts: conflicts.length,
      correlation: parseFloat(correlation),
      interpretation: this.interpretCorrelation(correlation),
      combinedData: combinedData,
      statisticalAnalysis: analysis,
      chizhevskyNote: this.getChizhevskyNote(correlation),
      currentContext: this.getCurrentContext(region)
    };
  }

  calculatePearsonCorrelation(data) {
    if (data.length < 2) return 0;
    
    const n = data.length;
    const sumX = data.reduce((sum, d) => sum + d.sunspots, 0);
    const sumY = data.reduce((sum, d) => sum + d.intensity, 0);
    const sumXY = data.reduce((sum, d) => sum + d.sunspots * d.intensity, 0);
    const sumX2 = data.reduce((sum, d) => sum + d.sunspots * d.sunspots, 0);
    const sumY2 = data.reduce((sum, d) => sum + d.intensity * d.intensity, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return denominator === 0 ? 0 : (numerator / denominator).toFixed(3);
  }

  performStatisticalAnalysis(data) {
    const peakConflicts = data.filter(d => d.isPeak);
    const nonPeakConflicts = data.filter(d => !d.isPeak);
    
    const avgIntensityPeak = peakConflicts.length > 0 
      ? peakConflicts.reduce((sum, d) => sum + d.intensity, 0) / peakConflicts.length 
      : 0;
    
    const avgIntensityNonPeak = nonPeakConflicts.length > 0 
      ? nonPeakConflicts.reduce((sum, d) => sum + d.intensity, 0) / nonPeakConflicts.length 
      : 0;
    
    // Conflictos durante ciclos solares específicos
    const cycleAnalysis = {};
    data.forEach(d => {
      if (!cycleAnalysis[d.solarCycle]) {
        cycleAnalysis[d.solarCycle] = { count: 0, totalIntensity: 0, years: [] };
      }
      cycleAnalysis[d.solarCycle].count++;
      cycleAnalysis[d.solarCycle].totalIntensity += d.intensity;
      cycleAnalysis[d.solarCycle].years.push(d.year);
    });
    
    return {
      conflictsDuringPeaks: peakConflicts.length,
      averageIntensityPeak: parseFloat(avgIntensityPeak.toFixed(2)),
      averageIntensityNonPeak: parseFloat(avgIntensityNonPeak.toFixed(2)),
      intensityDifference: parseFloat((avgIntensityPeak - avgIntensityNonPeak).toFixed(2)),
      mostConflictualCycle: Object.entries(cycleAnalysis)
        .sort((a, b) => b[1].count - a[1].count)[0],
      cycleAnalysis: cycleAnalysis
    };
  }

  interpretCorrelation(correlation) {
    const corr = parseFloat(correlation);
    
    if (Math.abs(corr) < 0.3) {
      return "Correlación débil. Los factores socio-políticos predominan sobre influencias solares.";
    } else if (Math.abs(corr) < 0.6) {
      return "Correlación moderada. La actividad solar podría ser un factor coadyuvante en tensiones sociales.";
    } else if (Math.abs(corr) < 0.8) {
      return "Correlación fuerte. Patrón notable que merece investigación más profunda.";
    } else {
      return "Correlación muy fuerte. Patrón significativo que valida parcialmente las teorías de Chizhevsky.";
    }
  }

  getChizhevskyNote(correlation) {
    const corr = parseFloat(correlation);
    
    if (corr > 0.5) {
      return "Chizhevsky diría: 'Los máximos solares incrementan la excitabilidad de las masas, creando condiciones para conflictos.'";
    } else if (corr > 0.3) {
      return "Chizhevsky observaría: 'La actividad solar modula el ambiente psicológico, pero no determina los eventos.'";
    } else {
      return "Chizhevsky notaría: 'La complejidad humana supera las influencias cósmicas simples.'";
    }
  }

  getCurrentContext(region) {
    const currentYear = new Date().getFullYear();
    const currentCycle = 25; // Ciclo solar actual
    const currentSunspots = 159; // Aproximado para 2024
    
    const recentConflicts = this.historicalConflicts
      .filter(c => c.year >= 2000 && (region === "all" || c.region.includes(region)))
      .sort((a, b) => b.year - a.year)
      .slice(0, 5);
    
    return {
      currentYear: currentYear,
      currentSolarCycle: currentCycle,
      currentSunspots: currentSunspots,
      isSolarMaximum: currentYear >= 2024 && currentYear <= 2025,
      recentConflicts: recentConflicts,
      trend: this.calculateTrend(recentConflicts),
      peaceRecommendations: this.getPeaceRecommendations(region)
    };
  }

  calculateTrend(conflicts) {
    if (conflicts.length < 2) return "insuficientes datos";
    
    const intensities = conflicts.map(c => c.intensity);
    const avgRecent = intensities.slice(0, 3).reduce((a, b) => a + b, 0) / Math.min(3, intensities.length);
    const avgPrevious = intensities.slice(3).reduce((a, b) => a + b, 0) / Math.max(1, intensities.length - 3);
    
    if (avgRecent > avgPrevious * 1.2) return "creciente";
    if (avgRecent < avgPrevious * 0.8) return "decreciente";
    return "estable";
  }

  getPeaceRecommendations(region) {
    const recommendations = {
      general: [
        "Fomentar diálogos durante períodos de baja actividad solar",
        "Establecer mecanismos de alerta temprana para tensiones durante máximos solares",
        "Promover cooperación científica internacional sobre heliobiología"
      ],
      "israel-palestine": [
        "Incrementar mediación internacional durante ciclos solares activos",
        "Crear zonas de desescalada automática durante tormentas geomagnéticas severas",
        "Establecer comunicaciones directas que trasciendan tensiones cíclicas"
      ],
      "middle-east": [
        "Diplomacia preventiva antes de picos solares pronosticados",
        "Cooperación regional en monitoreo de actividad solar",
        "Protocolos compartidos para crisis durante tormentas geomagnéticas"
      ]
    };
    
    return recommendations[region] || recommendations.general;
  }

  // Análisis predictivo basado en ciclo solar actual
  predictRiskPeriods(yearsAhead = 5) {
    const currentYear = new Date().getFullYear();
    const predictions = [];
    
    // Ciclo solar 25: máximo 2024-2025, mínimo ~2030
    for (let year = currentYear; year <= currentYear + yearsAhead; year++) {
      let solarActivity = "moderada";
      let riskLevel = "medio";
      
      if (year >= 2024 && year <= 2025) {
        solarActivity = "alta";
        riskLevel = "elevado";
      } else if (year >= 2029 && year <= 2030) {
        solarActivity = "baja";
        riskLevel = "bajo";
      }
      
      predictions.push({
        year: year,
        solarActivity: solarActivity,
        predictedRisk: riskLevel,
        recommendations: this.getYearSpecificRecommendations(year, riskLevel),
        historicalPattern: this.getHistoricalPatternForYear(year)
      });
    }
    
    return predictions;
  }

  getYearSpecificRecommendations(year, riskLevel) {
    const recommendations = [];
    
    if (riskLevel === "elevado") {
      recommendations.push(
        "Aumentar vigilancia diplomática",
        "Preparar mecanismos de desescalada",
        "Monitorear indicadores de tensión social"
      );
    }
    
    if (year === 2025) {
      recommendations.push(
        "Año de máximo solar - Especial atención a negociaciones internacionales",
        "Posible aumento de polarización social - Fomentar diálogos intercomunitarios"
      );
    }
    
    return recommendations;
  }

  getHistoricalPatternForYear(year) {
    // Buscar años con actividad solar similar en el pasado
    const currentCycle = 25;
    const cycleYear = year - 2019; // Años desde inicio ciclo 25
    
    // Patrones históricos (ciclo, año en ciclo -> conflicto)
    const patterns = {
      "18-2": ["1948 - Guerra Independencia"],
      "19-8": ["1956 - Crisis Suez"],
      "20-8": ["1967 - Guerra Seis Días"],
      "21-3": ["1973 - Guerra Yom Kippur"],
      "22-2": ["1991 - Guerra Golfo"],
      "23-1": ["2000 - Segunda Intifada"],
      "24-5": ["2014 - Operación Margen Protector"],
      "25-5": ["2023 - Guerra Gaza"]
    };
    
    const patternKey = `${currentCycle}-${Math.min(cycleYear, 11)}`;
    return patterns[patternKey] || ["Sin patrón histórico claro"];
  }
}

module.exports = new ConflictAnalysisService();
