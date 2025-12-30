require('dotenv').config();
const axios = require('axios');

async function testNASA() {
  console.log('🧪 PRUEBA COMPLETA NASA API 🧪');
  console.log('=' .repeat(40));
  
  const key = process.env.NASA_API_KEY;
  console.log('1. Clave cargada:', key ? `✅ (${key.length} chars)` : '❌ No');
  console.log('   Preview:', key?.substring(0, 15) + '...');
  
  // Probar diferentes endpoints
  const endpoints = [
    {
      name: 'APOD (siempre funciona)',
      url: `https://api.nasa.gov/planetary/apod?api_key=${key}`
    },
    {
      name: 'DONKI Notifications',
      url: `https://api.nasa.gov/DONKI/notifications?api_key=${key}`
    },
    {
      name: 'DONKI sin parámetros',
      url: `https://api.nasa.gov/DONKI/notifications?api_key=${key}&type=all`
    }
  ];
  
  for (const ep of endpoints) {
    console.log(`\n2. Probando: ${ep.name}`);
    console.log('   URL:', ep.url.substring(0, 60) + '...');
    
    try {
      const response = await axios.get(ep.url, { timeout: 5000 });
      console.log('   Status:', response.status);
      console.log('   ¿Tiene datos?:', response.data ? '✅ Sí' : '❌ No');
      
      if (Array.isArray(response.data)) {
        console.log('   Cantidad items:', response.data.length);
        if (response.data.length > 0) {
          console.log('   Primer item:', JSON.stringify(response.data[0]).substring(0, 80) + '...');
        }
      }
    } catch (error) {
      console.log('   ❌ Error:', error.message);
      console.log('   Código:', error.code);
      if (error.response) {
        console.log('   Status HTTP:', error.response.status);
        console.log('   Data:', JSON.stringify(error.response.data).substring(0, 100));
      }
    }
  }
  
  console.log('\n' + '=' .repeat(40));
  console.log('🎯 RECOMENDACIÓN FINAL:');
  console.log('Si DONKI no funciona pero APOD sí, la clave es válida pero');
  console.log('DONKI puede no tener datos disponibles o requerir parámetros específicos.');
  console.log('El sistema puede usar APOD como verificación y datos simulados para alertas.');
}

testNASA().catch(console.error);
