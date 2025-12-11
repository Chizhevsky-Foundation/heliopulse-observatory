#!/bin/bash
# 🚀 Despliegue rápido de HelioPulse Observatory

echo "🚀 Iniciando despliegue rápido..."
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No estás en el directorio heliopulse-observatory"
    echo "   Ejecuta: cd ~/heliopulse-observatory"
    exit 1
fi

# Opciones
echo "Selecciona una opción:"
echo "1) 🌌 Despliegue completo (recomendado)"
echo "2) ⚡ Despliegue rápido (solo push)"
echo "3) 🔍 Solo ver estado"
echo "4) ❌ Cancelar"
echo ""
read -p "Opción [1]: " opcion

case $opcion in
    1|"")
        echo "🌌 Ejecutando despliegue completo..."
        ./scripts/deploy-cosmic.sh
        ;;
    2)
        echo "⚡ Despliegue rápido..."
        git add .
        git commit -m "🚀 Actualización rápida del Observatorio HelioPulse"
        git push origin $(git branch --show-current)
        ;;
    3)
        echo "🔍 Estado del repositorio:"
        git status
        echo ""
        echo "📜 Últimos commits:"
        git log --oneline -5
        ;;
    4)
        echo "❌ Despliegue cancelado"
        exit 0
        ;;
    *)
        echo "❌ Opción no válida"
        exit 1
        ;;
esac
