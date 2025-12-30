#!/bin/bash
# 🔄 BACKUP AUTOMÁTICO DIARIO - OBSERVATORIO HELIOPULSE

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups/$DATE"

echo "💾 CREANDO BACKUP: $DATE"
mkdir -p "$BACKUP_DIR"

# Copiar archivos importantes
cp -r src/ "$BACKUP_DIR/src_$DATE/"
cp package.json "$BACKUP_DIR/"
cp README.md "$BACKUP_DIR/"
cp .env.example "$BACKUP_DIR/"
cp -r scripts/ "$BACKUP_DIR/scripts_$DATE/"

# Crear archivo de metadatos
cat > "$BACKUP_DIR/metadata.txt" << EOF
Backup: Observatorio HelioPulse
Fecha: $(date)
Commit: $(git rev-parse --short HEAD 2>/dev/null || echo "N/A")
Usuario: $(whoami)
Sistema: $(uname -a)
EOF

# Comprimir
tar -czf "$BACKUP_DIR.tar.gz" "$BACKUP_DIR"
rm -rf "$BACKUP_DIR"

echo "✅ Backup creado: $BACKUP_DIR.tar.gz"
echo "📦 Tamaño: $(du -h "$BACKUP_DIR.tar.gz" | cut -f1)"
