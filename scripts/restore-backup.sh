#!/bin/bash

# 🚨 SCRIPT DE RESTAURACIÓN DE EMERGENCIA - OBSERVATORIO HELIOPULSE
echo "🚨 INICIANDO RESTAURACIÓN DE EMERGENCIA"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Función para imprimir
print_color() {
    echo -e "${2}${1}${NC}"
}

# 1. Encontrar último commit estable
print_color "🔍 Buscando último commit estable..." $YELLOW
LAST_STABLE=$(git log --oneline --grep="feat\|fix\|chore" --invert-grep="documentación\|README\|docs" | head -1 | awk '{print $1}')

if [ -z "$LAST_STABLE" ]; then
    LAST_STABLE=$(git log --oneline | head -5 | tail -1 | awk '{print $1}')
fi

print_color "📌 Último commit estable: $LAST_STABLE" $GREEN

# 2. Listar todos los archivos en ese commit
print_color "📋 Listando archivos del commit estable..." $YELLOW
git ls-tree -r $LAST_STABLE --name-only > /tmp/stable-files.txt

# 3. Restaurar cada archivo
print_color "🔄 Restaurando archivos..." $YELLOW
while read -r file; do
    if [ -n "$file" ] && [[ ! "$file" =~ node_modules ]]; then
        echo "📦 $file"
        git checkout $LAST_STABLE -- "$file" 2>/dev/null
    fi
done < /tmp/stable-files.txt

# 4. Restaurar backups locales
print_color "💾 Buscando backups locales..." $YELLOW
find . -name "*.backup" -type f | while read backup; do
    original="${backup%.backup}"
    if [ -f "$backup" ] && [ ! -f "$original" ]; then
        print_color "📝 Restaurando $original desde backup local" $GREEN
        cp "$backup" "$original"
    fi
done

# 5. Verificar estructura mínima
print_color "✅ Verificando estructura recuperada..." $GREEN
REQUIRED_FILES=("src/app.js" "package.json" "README.md" ".gitignore")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_color "✓ $file" $GREEN
    else
        print_color "✗ $file - FALTANTE" $RED
    fi
done

print_color "\n🎉 RESTAURACIÓN COMPLETADA" $GREEN
print_color "🚀 Para iniciar: npm run dev" $YELLOW
print_color "🌐 Dashboard: http://localhost:2220/dashboard" $YELLOW
