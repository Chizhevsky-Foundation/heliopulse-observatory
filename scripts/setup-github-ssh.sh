#!/bin/bash

# 🔑 Script de configuración SSH para GitHub

echo "🔑 CONFIGURANDO ACCESO SSH A GITHUB"
echo ""

# Verificar si ya existe clave SSH
if [ -f ~/.ssh/id_ed25519 ] || [ -f ~/.ssh/id_rsa ]; then
    echo "✅ Clave SSH ya existe"
    echo "   Claves disponibles:"
    ls -la ~/.ssh/id_*
    echo ""
    read -p "¿Usar clave existente? (s/n): " usar_existente
    if [[ $usar_existente != "s" ]] && [[ $usar_existente != "S" ]]; then
        echo "🔐 Generando nueva clave SSH..."
        ssh-keygen -t ed25519 -C "heliopulse-observatory@chizhevsky"
    fi
else
    echo "🔐 Generando nueva clave SSH..."
    ssh-keygen -t ed25519 -C "heliopulse-observatory@chizhevsky"
fi

# Mostrar clave pública
echo ""
echo "📋 TU CLAVE PÚBLICA (cópiala):"
echo "----------------------------------------"
cat ~/.ssh/id_ed25519.pub 2>/dev/null || cat ~/.ssh/id_rsa.pub
echo "----------------------------------------"
echo ""

echo "📝 INSTRUCCIONES PARA AGREGAR A GITHUB:"
echo "1. Ve a: https://github.com/settings/keys"
echo "2. Haz clic en 'New SSH key'"
echo "3. Pega la clave pública arriba"
echo "4. Dale un nombre como 'HelioPulse Observatory'"
echo "5. Haz clic en 'Add SSH key'"
echo ""
read -p "¿Ya agregaste la clave a GitHub? (s/n): " clave_agregada

if [[ $clave_agregada == "s" ]] || [[ $clave_agregada == "S" ]]; then
    echo "🔍 Probando conexión SSH..."
    ssh -T git@github.com
else
    echo "⚠️  Recuerda agregar la clave SSH a GitHub para poder hacer push"
fi

echo ""
echo "✅ Configuración SSH completada"
