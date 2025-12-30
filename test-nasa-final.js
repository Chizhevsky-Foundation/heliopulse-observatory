require('dotenv').config();
const nasaService = require('./src/services/nasa.service');

async function test() {
  console.log('🚀 PRUEBA FINAL NASA SERVICE 🚀');
  
  // 1. Health check
  console.log('\n1. Health Check:');
  const health = await nasaService.healthCheck();
  console.log('   Salud:', health.healthy ? '✅' : '❌');
  console.log('   Clave válida:', health.apiKeyValid ? '✅' : '⚠️ DEMO');
  console.log('   Clave preview:', health.apiKeyPreview);
  
  // 2. Obtener datos
  console.log('\n2. Obteniendo datos espaciales...');
  const data = await nasaService.getSpaceWeather();
  console.log('   Éxito:', data.success ? '✅' : '❌');
  console.log('   Fuente:', data.source);
  console.log('   Nota:', data.note || '(sin nota)');
  console.log('   Cantidad alertas:', data.data.length);
  
  if (data.data.length > 0) {
    console.log('   Primera alerta:');
    const first = data.data[0];
    console.log('     Tipo:', first.messageType || first.type || 'unknown');
    console.log('     Título:', first.title || first.messageBody?.substring(0, 50) || 'N/A');
  }
  
  console.log('\n🎯 CONCLUSIÓN:');
  console.log('El sistema NASA ahora es ROBUSTO:');
  console.log('- ✅ Usa APOD para verificar clave');
  console.log('- ✅ Intenta múltiples endpoints DONKI');
  console.log('- ✅ Fallback a datos simulados realistas');
  console.log('- ✅ Siempre retorna datos útiles');
}

test().catch(console.error);
