# Si tu clave no funciona, podemos usar un enfoque más robusto
cat > /tmp/nasa_fallback.js << "NASA_FALLBACK"
// Enfoque para manejar NASA API de forma robusta

// En solar.routes.js, reemplazar getNASAData con:
const getNASAData = async () => {
  const nasaApiKey = process.env.NASA_API_KEY;
  
  // Si no hay clave o es inválida, usar datos simulados inmediatamente
  if (!nasaApiKey || nasaApiKey === 'DEMO_KEY' || nasaApiKey.includes('nasa.gov')) {
    return {
      success: true, // Decimos que sí tiene éxito pero con datos simulados
      data: getRealisticNASAData(),
      source: 'simulated',
      message: 'Using simulated NASA data (no valid API key)'
    };
  }
  
  // Intentar endpoints reales
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`,
      { timeout: 3000 }
    );
    
    return {
      success: true,
      data: [{
        title: response.data.title || 'NASA Astronomy Picture',
        url: response.data.url,
        date: response.data.date,
        type: 'APOD'
      }],
      source: 'apod',
      message: 'NASA APOD data retrieved'
    };
    
  } catch (error) {
    // Fallback a datos simulados realistas
    return {
      success: true,
      data: getRealisticNASAData(),
      source: 'fallback',
      message: 'NASA API failed, using realistic simulation'
    };
  }
};

// Datos NASA simulados realistas
const getRealisticNASAData = () => {
  const now = new Date();
  const events = [];
  
  // Simular eventos solares basados en probabilidad
  if (Math.random() > 0.7) {
    events.push({
      messageType: "Watch",
      messageID: "SIM-FLR-001",
      issueTime: new Date(now.getTime() - Math.random() * 86400000).toISOString(),
      messageBody: "Increased probability of M-class solar flares from region 12345"
    });
  }
  
  if (Math.random() > 0.8) {
    events.push({
      messageType: "Warning", 
      messageID: "SIM-CME-001",
      issueTime: new Date(now.getTime() - Math.random() * 172800000).toISOString(),
      messageBody: "CME detected. Possible geomagnetic storm in 2-3 days"
    });
  }
  
  // Siempre incluir al menos un evento
  if (events.length === 0) {
    events.push({
      messageType: "Summary",
      messageID: "SIM-STATUS-001",
      issueTime: now.toISOString(),
      messageBody: "Solar activity within normal ranges. No significant space weather expected."
    });
  }
  
  return events;
};
NASA_FALLBACK
