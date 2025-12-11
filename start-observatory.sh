#!/bin/bash

# 🐘 SCRIPT DE INICIO PARA APRENDIZ HELIOPULSE
echo "🌌 INICIANDO OBSERVATORIO HELIOPULSE..."
echo "🐘 Recordatorio: Los elefantes aprenden a volar paso a paso"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no encontrado. Instala con: sudo apt install nodejs"
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no encontrado. Instala con: sudo apt install npm"
    exit 1
fi

# Limpiar puertos
echo "🧹 Limpiando puertos 2220-2240..."
for port in {2220..2240}; do
    sudo fuser -k $port/tcp 2>/dev/null
done
sleep 2

# Instalar dependencias si falta
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Crear .env si no existe
if [ ! -f ".env" ]; then
    echo "⚙️  Creando archivo .env..."
    cat > .env << EOF
PORT=2220
NODE_ENV=development
NOAA_API_BASE=https://services.swpc.noaa.gov
SOLAR_CYCLE=25
EOF
    echo "✅ .env creado"
fi

# Iniciar servidor
echo "🚀 Iniciando servidor en puerto 2220-2240..."
echo "📊 Dashboard: http://localhost:2220/dashboard"
echo "📡 API: http://localhost:2220/api/solar/status"
echo "🔧 Presiona Ctrl+C para detener"
echo ""

npm run dev
