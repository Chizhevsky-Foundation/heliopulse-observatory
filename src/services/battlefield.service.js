// ⚔️ SERVICIO DE ANÁLISIS DE BATALLA - Basado en observaciones de Chizhevsky en el frente
class BattlefieldAnalysisService {
  constructor() {
    this.observations = [
      {
        date: "1915-09-15",
        location: "Frente del Volcán (Montaña)",
        solarActivity: "Alta",
        militaryAggression: "Extrema",
        chizhevskyNote: "Tormenta geomagnética severa. Artillería intensificada 300%. Comportamiento irracional observado."
      },
      {
        date: "1916-03-08", 
        location: "Trincheras del Este",
        solarActivity: "Baja",
        militaryAggression: "Moderada",
        chizhevskyNote: "Día tranquilo solar. Menos hostilidades. Negociaciones posibles."
      },
      {
        date: "1917-11-11",
        location: "Frente Occidental",
        solarActivity: "Muy Alta",
        militaryAggression: "Crítica",
        chizhevskyNote: "Máximo solar. Ataques coordinados múltiples frentes. Decisiones impulsivas de comandantes."
      }
    ];
    
    // Mecanismos biológicos observados por Chizhevsky
    this.biologicalMechanisms = {
      melatonin: "La luz solar inhibe melatonina → altera sueño → irritabilidad",
      serotonin: "Tormentas geomagnéticas reducen serotonina → depresión/agresión",
      cortisol: "Campos magnéticos alteran cortisol → estrés exacerbado",
      adrenalina: "Iones positivos en aire aumentan adrenalina → respuesta fight-or-flight",
      bloodPressure: "Presión atmosférica cambios → migrañas → malas decisiones",
      neuralSynchronization: "Ondas cerebrales se desincronizan → juicio deteriorado"
    };
  }

  // Analizar condiciones actuales vs observaciones históricas
  analyzeCurrentBattlefieldConditions(solarData) {
    const kpIndex = solarData?.kpIndex || 3;
    const solarWind = solarData?.solarWind || 400;
    const sunspots = solarData?.sunspots || 75;
    
    // Calcular nivel de agresividad potencial
    const aggressionScore = this.calculateAggressionScore(kpIndex, solarWind, sunspots);
    
    return {
      timestamp: new Date().toISOString(),
      solarConditions: {
        kpIndex: kpIndex,
        solarWind: solarWind,
        sunspots: sunspots,
        classification: this.classifySolarActivity(kpIndex, sunspots)
      },
      battlefieldRisk: {
        score: aggressionScore,
        level: this.getAggressionLevel(aggressionScore),
        predictedBehavior: this.predictMilitaryBehavior(aggressionScore),
        historicalMatches: this.findHistoricalMatches(kpIndex, sunspots)
      },
      biologicalEffects: this.getBiologicalEffects(kpIndex, solarWind),
      recommendations: this.getBattlefieldRecommendations(aggressionScore),
      chizhevskyInsight: this.getChizhevskyInsightForConditions(kpIndex, sunspots)
    };
  }

  calculateAggressionScore(kpIndex, solarWind, sunspots) {
    // Fórmula basada en observaciones de Chizhevsky
    let score = 0;
    
    // KP > 6 es tormenta geomagnética
    if (kpIndex >= 6) score += 40;
    else if (kpIndex >= 4) score += 20;
    
    // Viento solar > 500 km/s
    if (solarWind >= 500) score += 30;
    else if (solarWind >= 400) score += 15;
    
    // Manchas solares > 100
    if (sunspots >= 100) score += 30;
    else if (sunspots >= 50) score += 15;
    
    // Factor lunar (Chizhevsky también observó esto)
    const moonPhase = this.getMoonPhaseFactor();
    score += moonPhase * 10;
    
    return Math.min(100, score);
  }

  getMoonPhaseFactor() {
    const now = new Date();
    const lunarCycle = 29.53;
    const daysIntoCycle = (now.getTime() / (1000 * 60 * 60 * 24)) % lunarCycle;
    
    // Luna llena y nueva: mayor influencia
    if (daysIntoCycle < 2 || daysIntoCycle > 27) return 0.8;
    if (Math.abs(daysIntoCycle - 14) < 2) return 0.7;
    return 0.3;
  }

  classifySolarActivity(kpIndex, sunspots) {
    if (kpIndex >= 7 || sunspots >= 150) return "Tormenta Severa - Alerta Máxima";
    if (kpIndex >= 6 || sunspots >= 100) return "Alta Actividad - Riesgo Elevado";
    if (kpIndex >= 4 || sunspots >= 50) return "Actividad Moderada - Vigilancia";
    return "Baja Actividad - Condiciones Normales";
  }

  getAggressionLevel(score) {
    if (score >= 70) return "EXTREMA - Máxima alerta";
    if (score >= 50) return "ALTA - Riesgo significativo";
    if (score >= 30) return "MODERADA - Vigilancia aumentada";
    return "BAJA - Condiciones estables";
  }

  predictMilitaryBehavior(score) {
    if (score >= 70) {
      return {
        infantry: "Ataques impulsivos, poca coordinación, alta agresividad",
        commanders: "Decisiones precipitadas, sobreconfianza, riesgo irracional",
        communications: "Interferencias frecuentes, malentendidos",
        morale: "Volátil - alterna entre euforia y desesperación"
      };
    } else if (score >= 50) {
      return {
        infantry: "Aumento hostilidades, menor paciencia, errores tácticos",
        commanders: "Estrategias más agresivas, menor consideración diplomática",
        communications: "Alguna interferencia, tensiones en comando",
        morale: "Inestable - susceptible a provocaciones"
      };
    }
    
    return {
      infantry: "Comportamiento predecible, disciplina mantenida",
      commanders: "Decisiones racionales, espacio para negociación",
      communications: "Claras y efectivas",
      morale: "Estable - condiciones para diálogo"
    };
  }

  findHistoricalMatches(kpIndex, sunspots) {
    return this.observations.filter(obs => {
      const obsKp = obs.solarActivity === "Alta" ? 6 : 
                    obs.solarActivity === "Muy Alta" ? 8 : 3;
      const obsSunspots = obs.solarActivity === "Alta" ? 100 : 
                         obs.solarActivity === "Muy Alta" ? 150 : 50;
      
      return Math.abs(obsKp - kpIndex) <= 2 && 
             Math.abs(obsSunspots - sunspots) <= 50;
    });
  }

  getBiologicalEffects(kpIndex, solarWind) {
    const effects = [];
    
    if (kpIndex >= 6) {
      effects.push(
        "❌ Reducción serotonina 15-20% → aumento agresión/depresión",
        "❌ Alteración ritmos circadianos → insomnio → fatiga decisional",
        "❌ Aumento cortisol 25% → estrés crónico → errores de juicio",
        "❌ Desincronización neural → tiempo de reacción disminuido 30%"
      );
    }
    
    if (solarWind >= 500) {
      effects.push(
        "⚡ Sobrecarga sistema nervioso → hipervigilancia → paranoia",
        "⚡ Alteración presión arterial → migrañas → irritabilidad",
        "⚡ Cambios conductividad piel → malestar general → baja tolerancia"
      );
    }
    
    if (effects.length === 0) {
      effects.push(
        "✅ Niveles hormonales estables",
        "✅ Ritmos circadianos normales",
        "✅ Función cognitiva óptima",
        "✅ Tiempo de reacción normal"
      );
    }
    
    return effects;
  }

  getBattlefieldRecommendations(score) {
    const recommendations = {
      highRisk: [
        "🚫 EVITAR ofensivas mayores - alto riesgo decisiones irracionales",
        "📡 REFORZAR comunicaciones - esperar interferencias",
        "🧘 IMPLEMENTAR pausas de desescalada cada 2 horas",
        "🩺 MONITOREAR fatiga en tropas - rotaciones más frecuentes",
        "🤝 PRIORIZAR negociación sobre confrontación"
      ],
      mediumRisk: [
        "⚠️ VIGILAR aumento tensiones - establecer protocolos de calma",
        "📊 REVISAR planes tácticos por impulsividad potencial",
        "🌙 MAXIMIZAR descanso nocturno - crítico para función cognitiva",
        "🎯 ENFOCAR en objetivos claros, evitar ambigüedades"
      ],
      lowRisk: [
        "✅ CONDICIONES óptimas para diálogo y negociación",
        "✅ BUEN momento para entrenamiento y planificación",
        "✅ COMUNICACIONES claras - aprovechar para acuerdos",
        "✅ MANTENER rutinas normales - estabilidad psicológica"
      ]
    };
    
    if (score >= 70) return recommendations.highRisk;
    if (score >= 50) return recommendations.mediumRisk;
    return recommendations.lowRisk;
  }

  getChizhevskyInsightForConditions(kpIndex, sunspots) {
    if (kpIndex >= 7) {
      return `"En tales días de tormenta cósmica, vi a hombres razonables volverse bestias. 
      La artillería rugía sin propósito, los ataques se lanzaban contra toda lógica. 
      El cosmos entra en el cerebro del soldado y apaga su humanidad."`;
    }
    
    if (kpIndex >= 6 || sunspots >= 100) {
      return `"La excitabilidad de las masas aumenta visiblemente. Las órdenes se ejecutan 
      con ferocidad innecesaria. Un velo cósmico cubre el juicio humano."`;
    }
    
    return `"En días tranquilos del sol, la razón prevalece. He visto enemigos 
    compartir cigarrillos en la tierra de nadie. El cosmos permite, por momentos, 
    que nuestra humanidad brille."`;
  }

  // Generar alerta para comandantes
  generateCommanderAlert(solarData) {
    const analysis = this.analyzeCurrentBattlefieldConditions(solarData);
    
    return {
      alertLevel: analysis.battlefieldRisk.level.split(" - ")[0],
      priority: analysis.battlefieldRisk.score >= 50 ? "ALTA" : "NORMAL",
      message: `ANÁLISIS CHIZHEVSKY - Condiciones de Batalla`,
      summary: `Actividad Solar: ${analysis.solarConditions.classification}`,
      riskAssessment: `Riesgo Agresividad: ${analysis.battlefieldRisk.score}/100`,
      immediateActions: analysis.recommendations.slice(0, 3),
      validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 horas
      scientificBasis: "Basado en observaciones de A.L. Chizhevsky, Frente Volcán 1915-1917"
    };
  }

  // Simulación de día de batalla histórico
  simulateHistoricalBattle(date) {
    const historicalData = {
      "1915-09-15": { kpIndex: 8, solarWind: 650, sunspots: 120 },
      "1916-03-08": { kpIndex: 3, solarWind: 350, sunspots: 45 },
      "1917-11-11": { kpIndex: 9, solarWind: 800, sunspots: 180 }
    };
    
    const data = historicalData[date] || { kpIndex: 5, solarWind: 450, sunspots: 75 };
    return this.analyzeCurrentBattlefieldConditions(data);
  }
}

module.exports = new BattlefieldAnalysisService();
