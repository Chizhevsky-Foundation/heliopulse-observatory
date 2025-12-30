#!/bin/bash
echo "🔍 DIAGNÓSTICO NASA API"
echo "======================="

# 1. Verificar variable de entorno
echo "1. Variable NASA_API_KEY:"
if [ -n "$NASA_API_KEY" ]; then
  echo "   ✅ Definida en shell: ${NASA_API_KEY:0:10}..."
else
  echo "   ℹ️  No definida en shell"
fi

NASA_ENV_KEY=$(grep NASA_API_KEY .env 2>/dev/null | cut -d= -f2)
if [ -n "$NASA_ENV_KEY" ]; then
  echo "   ✅ En .env: ${NASA_ENV_KEY:0:10}..."
else
  echo "   ❌ No en .env"
fi

# 2. Probar carga en Node.js
echo ""
echo "2. Prueba Node.js:"
node -e "
require('dotenv').config();
const key = process.env.NASA_API_KEY;
if (key) {
  console.log('   ✅ Cargada: ' + key.substring(0, 10) + '...');
  console.log('   Longitud: ' + key.length);
  
  // Probar formato
  if (key.includes('.nasa.gov')) {
    console.log('   ⚠️  ADVERTENCIA: La clave parece incluir dominio');
    console.log('   Las claves NASA son solo el código, ej: jxM6SYxbj9R93...');
  }
} else {
  console.log('   ❌ No cargada');
}
"

# 3. Probar endpoints NASA
echo ""
echo "3. Probando endpoints NASA:"

if [ -n "$NASA_ENV_KEY" ]; then
  # Limpiar clave si tiene .nasa.gov
  CLEAN_KEY=$(echo "$NASA_ENV_KEY" | sed 's/\.nasa\.gov$//')
  
  echo "   a) APOD (siempre funciona):"
  curl -s "https://api.nasa.gov/planetary/apod?api_key=$CLEAN_KEY" | \
    jq -r '.title // "❌ Error"' 2>/dev/null || echo "   ❌ Falló"
  
  echo "   b) DONKI notifications:"
  curl -s "https://api.nasa.gov/DONKI/notifications?api_key=$CLEAN_KEY" | \
    jq -r 'if . then "✅ OK - " + (length|tostring) + " items" else "❌ Error" end' 2>/dev/null || echo "   ❌ Falló"
  
  echo "   c) DONKI CME:"
  DATE=$(date -d "3 days ago" +%Y-%m-%d)
  curl -s "https://api.nasa.gov/DONKI/CME?api_key=$CLEAN_KEY&startDate=$DATE" | \
    jq -r 'if . then "✅ OK" else "❌ Sin datos" end' 2>/dev/null || echo "   ❌ Falló"
else
  echo "   ⏭️  Saltando: No hay clave NASA"
fi

# 4. Probar endpoint local
echo ""
echo "4. Endpoint local /api/solar/nasa-test:"
curl -s http://localhost:2220/api/solar/nasa-test 2>/dev/null | \
  jq -r '.nasaTest.recommendations // "❌ Servidor no disponible"' || echo "   ❌ Servidor no corriendo"

echo ""
echo "🎯 RECOMENDACIONES:"
echo "1. Obtén una clave NASA gratuita en: https://api.nasa.gov"
echo "2. La clave es solo el código (ej: jxM6SYxbj9R93...), sin .nasa.gov"
echo "3. Actualiza .env con: NASA_API_KEY=tu_clave_aqui"
echo "4. Reinicia el servidor después de cambiar .env"
