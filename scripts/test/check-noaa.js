const axios = require('axios');

async function checkNOAAStructure() {
  console.log('🔍 ANALIZANDO ESTRUCTURA NOAA 🔍');
  console.log('=' .repeat(50));
  
  try {
    const response = await axios.get('https://services.swpc.noaa.gov/products/solar-wind/mag-1-day.json');
    const data = response.data;
    
    console.log('Total de registros:', data.length);
    console.log('Último registro:', data[data.length - 1]);
    
    if (data.length > 0) {
      const latest = data[data.length - 1];
      console.log('\n📊 ANÁLISIS DE COLUMNAS:');
      console.log('0 - Timestamp:', latest[0]);
      console.log('1 - Speed (debería ser ~300-600):', latest[1], typeof latest[1]);
      console.log('2 - Density (debería ser ~1-10):', latest[2], typeof latest[2]);
      console.log('3 - Temperature (debería ser ~50k-150k):', latest[3], typeof latest[3]);
      console.log('4 - Bx:', latest[4]);
      console.log('5 - By:', latest[5]);
      console.log('6 - Bz:', latest[6]);
      console.log('7 - Bt:', latest[7]);
      
      // Buscar algún registro con datos buenos
      console.log('\n🔎 Buscando registro con datos válidos...');
      let goodRecord = null;
      for (let i = data.length - 1; i >= Math.max(0, data.length - 20); i--) {
        const speed = parseFloat(data[i][1]);
        if (speed > 100 && speed < 1000) {
          goodRecord = data[i];
          console.log(`✅ Encontrado en posición ${i}: speed = ${speed}`);
          break;
        }
      }
      
      if (!goodRecord) {
        console.log('⚠️  No se encontraron registros con velocidad > 100');
        console.log('   Probando endpoint alternativo...');
        
        // Probar otro endpoint
        const altResponse = await axios.get('https://services.swpc.noaa.gov/products/solar-wind/plasma-1-day.json');
        const altData = altResponse.data;
        if (altData.length > 0) {
          const altLatest = altData[altData.length - 1];
          console.log('   Alternativa - Speed:', altLatest[1]);
          console.log('   Alternativa - Density:', altLatest[2]);
        }
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkNOAAStructure();
