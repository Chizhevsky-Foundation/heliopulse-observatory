#!/bin/bash

# 🌌 SCRIPT DE DESPLIEGUE CÓSMICO HELIOPULSE
# Para subir al repositorio: git@github.com:Chizhevsky-Foundation/heliopulse-observatory.git

echo "🚀 INICIANDO DESPLIEGUE CÓSMICO HELIOPULSE"
echo "🌌 Repositorio: Chizhevsky-Foundation/heliopulse-observatory"
echo "🐘 Aprendiz en modo cósmico activado"
echo ""

# Colores para mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_color() {
    echo -e "${2}${1}${NC}"
}

# Función para verificar comandos
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_color "❌ ERROR: $1 no encontrado" $RED
        print_color "   Instala con: $2" $YELLOW
        exit 1
    fi
    print_color "✅ $1 encontrado" $GREEN
}

# PASO 1: Verificar prerequisitos
print_color "🔍 VERIFICANDO PREREQUISITOS CÓSMICOS..." $BLUE
check_command "git" "sudo apt install git"
check_command "node" "sudo apt install nodejs"
check_command "npm" "sudo apt install npm"
check_command "curl" "sudo apt install curl"

# Verificar que estamos en el directorio correcto
if [[ ! -f "package.json" ]] || [[ ! -d "src" ]]; then
    print_color "❌ ERROR: No estás en el directorio heliopulse-observatory" $RED
    print_color "   Ejecuta: cd ~/heliopulse-observatory" $YELLOW
    exit 1
fi

print_color "✅ Directorio correcto: heliopulse-observatory" $GREEN

# PASO 2: Configurar Git (si no está configurado)
print_color "\n⚙️  CONFIGURANDO GIT CÓSMICO..." $BLUE

# Verificar configuración de git
if [[ -z $(git config --get user.name) ]]; then
    print_color "⚠️  Nombre de git no configurado" $YELLOW
    read -p "   📝 Ingresa tu nombre para git: " git_name
    git config --global user.name "$git_name"
fi

if [[ -z $(git config --get user.email) ]]; then
    print_color "⚠️  Email de git no configurado" $YELLOW
    read -p "   📧 Ingresa tu email para git: " git_email
    git config --global user.email "$git_email"
fi

print_color "✅ Git configurado: $(git config --get user.name) <$(git config --get user.email)>" $GREEN

# PASO 3: Verificar conexión con GitHub
print_color "\n🌐 VERIFICANDO CONEXIÓN CON GITHUB..." $BLUE

# Verificar si ya tenemos el remoto
if git remote -v | grep -q "Chizhevsky-Foundation/heliopulse-observatory"; then
    print_color "✅ Repositorio remoto ya configurado" $GREEN
else
    print_color "🔄 Configurando repositorio remoto..." $YELLOW
    git remote add origin git@github.com:Chizhevsky-Foundation/heliopulse-observatory.git 2>/dev/null || \
    git remote set-url origin git@github.com:Chizhevsky-Foundation/heliopulse-observatory.git
    
    # Verificar la URL
    if git remote -v | grep -q "Chizhevsky-Foundation"; then
        print_color "✅ Repositorio remoto configurado correctamente" $GREEN
    else
        print_color "❌ No se pudo configurar el repositorio remoto" $RED
        print_color "   Verifica que tienes acceso al repositorio" $YELLOW
        exit 1
    fi
fi

# PASO 4: Verificar estado actual
print_color "\n📊 ESTADO ACTUAL DEL REPOSITORIO..." $BLUE

# Obtener branch actual
current_branch=$(git branch --show-current)
print_color "🌿 Rama actual: $current_branch" $GREEN

# Verificar cambios
if [[ -z $(git status --porcelain) ]]; then
    print_color "✅ No hay cambios pendientes" $GREEN
else
    print_color "📝 Cambios detectados:" $YELLOW
    git status --short
    
    # Mostrar cambios en detalle
    read -p "   👀 ¿Ver diff de los cambios? (s/n): " ver_diff
    if [[ $ver_diff == "s" ]] || [[ $ver_diff == "S" ]]; then
        git diff --stat
        echo ""
        read -p "   📋 ¿Ver diff completo? (s/n): " ver_full
        if [[ $ver_full == "s" ]] || [[ $ver_full == "S" ]]; then
            git diff
        fi
    fi
fi

# PASO 5: Sincronizar con el repositorio remoto
print_color "\n🔄 SINCRONIZANDO CON REPOSITORIO REMOTO..." $BLUE

# Primero, obtener los últimos cambios
print_color "⬇️  Obteniendo últimos cambios de GitHub..." $YELLOW
git fetch origin

# Verificar si hay commits remotos que no tenemos
if git status | grep -q "Your branch is behind"; then
    print_color "⚠️  Tu rama está detrás del remoto" $YELLOW
    read -p "   🔄 ¿Deseas hacer pull primero? (s/n): " hacer_pull
    if [[ $hacer_pull == "s" ]] || [[ $hacer_pull == "S" ]]; then
        git pull origin $current_branch
        if [[ $? -ne 0 ]]; then
            print_color "❌ Error al hacer pull. Puede haber conflictos." $RED
            print_color "   Resuelve los conflictos manualmente y ejecuta el script nuevamente" $YELLOW
            exit 1
        fi
        print_color "✅ Pull completado exitosamente" $GREEN
    fi
fi

# PASO 6: Preparar el commit
print_color "\n💾 PREPARANDO COMMIT CÓSMICO..." $BLUE

# Crear .gitignore si no existe
if [[ ! -f ".gitignore" ]]; then
    print_color "📄 Creando .gitignore..." $YELLOW
    cat > .gitignore << GITIGNORE
# 🌌 HELIOPULSE OBSERVATORY .gitignore

# Dependencias
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Entornos
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
venv/
*.pyc
__pycache__/

# Editor
.vscode/
.idea/
*.swp
*.swo

# Sistema
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Docker
data/
*.tar.gz
GITIGNORE
    print_color "✅ .gitignore creado" $GREEN
fi

# Agregar todos los cambios
print_color "➕ Agregando cambios al staging..." $YELLOW
git add .

# Verificar qué se agregó
print_color "📦 Archivos en staging:" $GREEN
git status --short

# Pedir mensaje de commit
print_color "\n📝 MENSAJE DEL COMMIT CÓSMICO:" $BLUE
echo "   Ejemplos:"
echo "   • '🌌 Agrega dashboard interactivo con WebSocket'"
echo "   • '🔧 Corrige funciones faltantes en servicios Chizhevsky'"
echo "   • '🚀 Mejora API con manejo de errores y puertos dinámicos'"
echo ""

# Si hay un commit anterior, mostrarlo
last_commit=$(git log -1 --pretty=%B 2>/dev/null)
if [[ -n "$last_commit" ]]; then
    print_color "📖 Último commit: $last_commit" $YELLOW
fi

read -p "   ✏️  Ingresa el mensaje del commit: " commit_message

# Si no ingresó mensaje, usar uno por defecto
if [[ -z "$commit_message" ]]; then
    commit_message="🌌 Actualización cósmica del Observatorio HelioPulse"
    print_color "⚠️  Usando mensaje por defecto: $commit_message" $YELLOW
fi

# Hacer el commit
print_color "\n💫 Creando commit..." $YELLOW
git commit -m "$commit_message"

if [[ $? -eq 0 ]]; then
    print_color "✅ Commit creado exitosamente" $GREEN
else
    print_color "❌ Error al crear commit. ¿Quizás no hay cambios?" $RED
    print_color "   Continuando con push forzado si es necesario..." $YELLOW
fi

# PASO 7: Subir al repositorio
print_color "\n🚀 SUBIENDO AL REPOSITORIO GITHUB..." $BLUE

# Verificar si es la primera vez
if git branch -r | grep -q "origin/$current_branch"; then
    print_color "⬆️  Haciendo push a rama existente..." $YELLOW
    git push origin $current_branch
else
    print_color "⭐ Primera subida de la rama $current_branch..." $YELLOW
    print_color "   Esto creará la rama remota" $YELLOW
    git push -u origin $current_branch
fi

# Verificar resultado del push
if [[ $? -eq 0 ]]; then
    print_color "\n🎉 ¡DESPLIEGUE CÓSMICO COMPLETADO! 🎉" $GREEN
    print_color "   ✅ Repositorio actualizado exitosamente" $GREEN
    print_color "   🔗 https://github.com/Chizhevsky-Foundation/heliopulse-observatory" $BLUE
    
    # Mostrar información útil
    echo ""
    print_color "📊 RESUMEN DEL DESPLIEGUE:" $BLUE
    echo "   • Rama: $current_branch"
    echo "   • Commit: $commit_message"
    echo "   • Hora: $(date)"
    echo ""
    
    # Probar que el repositorio es accesible
    print_color "🔍 VERIFICANDO ACCESO PÚBLICO..." $YELLOW
    if curl -s https://api.github.com/repos/Chizhevsky-Foundation/heliopulse-observatory | grep -q "not found"; then
        print_color "⚠️  El repositorio no es público o no existe" $YELLOW
    else
        print_color "✅ Repositorio accesible públicamente" $GREEN
    fi
    
else
    print_color "\n❌ ERROR EN EL PUSH" $RED
    print_color "   Posibles causas:" $YELLOW
    print_color "   1. No tienes permisos para escribir en el repositorio" $YELLOW
    print_color "   2. Hay conflictos con el remoto" $YELLOW
    print_color "   3. Problemas de autenticación con GitHub" $YELLOW
    echo ""
    print_color "🔧 SOLUCIONES SUGERIDAS:" $BLUE
    print_color "   • Verifica tus claves SSH: ssh -T git@github.com" $BLUE
    print_color "   • Usa token de acceso en lugar de SSH" $BLUE
    print_color "   • Contacta al administrador del repositorio" $BLUE
    exit 1
fi

# PASO 8: Verificar el estado final
print_color "\n🔭 ESTADO FINAL DEL OBSERVATORIO..." $BLUE

# Mostrar últimas confirmaciones
print_color "📜 Últimos 3 commits:" $GREEN
git log --oneline -3

# Mostrar ramas
print_color "🌿 Ramas disponibles:" $GREEN
git branch -a

# Mostrar URL para clonar
print_color "\n🌐 URL DEL REPOSITORIO:" $BLUE
echo "   git clone git@github.com:Chizhevsky-Foundation/heliopulse-observatory.git"
echo "   o"
echo "   git clone https://github.com/Chizhevsky-Foundation/heliopulse-observatory.git"

# Mensaje final
echo ""
print_color "🐘 ¡EL ELEFANTE CÓSMICO HA SUBIDO SU TRABAJO A GITHUB! 🚀" $GREEN
echo ""
print_color "💫 'La ciencia compartida es ciencia multiplicada'" $YELLOW
print_color "   - Adaptación cósmica de Chizhevsky" $YELLOW
echo ""

# Opción para abrir en navegador
read -p "   🌐 ¿Abrir repositorio en navegador? (s/n): " abrir_navegador
if [[ $abrir_navegador == "s" ]] || [[ $abrir_navegador == "S" ]]; then
    xdg-open "https://github.com/Chizhevsky-Foundation/heliopulse-observatory" 2>/dev/null || \
    echo "   Abre manualmente: https://github.com/Chizhevsky-Foundation/heliopulse-observatory"
fi
