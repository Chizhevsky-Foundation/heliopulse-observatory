# 🚀 Guía de Despliegue Cósmico

## 📋 Scripts Disponibles

### **1. Despliegue Completo** (Recomendado)
```bash
./scripts/deploy-cosmic.sh
```
- Verifica prerequisitos
- Configura Git si es necesario
- Muestra cambios pendientes
- Sincroniza con remoto
- Crea commit con mensaje
- Sube a GitHub
- Verifica el despliegue

### **2. Despliegue Rápido**
```bash
./deploy.sh
```
Menú interactivo con opciones rápidas.

### **3. Configurar SSH para GitHub**
```bash
./scripts/setup-github-ssh.sh
```
Si es tu primera vez usando Git con SSH.

## 🔑 Configuración Inicial (Primera Vez)

### **A. Configurar Git Globalmente**
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### **B. Configurar Repositorio Remoto**
```bash
git remote add origin git@github.com:Chizhevsky-Foundation/heliopulse-observatory.git
```

### **C. Verificar Conexión SSH**
```bash
ssh -T git@github.com
```
Deberías ver: "Hi Chizhevsky-Foundation! You've successfully authenticated..."

## 📁 Estructura del Repositorio

```
heliopulse-observatory/
├── scripts/
│   ├── deploy-cosmic.sh     # Despliegue principal
│   ├── setup-github-ssh.sh  # Configuración SSH
│   └── cosmic-build.js      # Constructor del proyecto
├── deploy.sh                # Despliegue rápido
├── .gitignore              # Archivos a ignorar
└── DEPLOYMENT.md           # Esta guía
```

## 🚨 Solución de Problemas Comunes

### **1. Error: "Permission denied (publickey)"**
```bash
# Generar nueva clave SSH
ssh-keygen -t ed25519 -C "tu-email@github"

# Agregar clave a ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copiar clave pública y agregar a GitHub
cat ~/.ssh/id_ed25519.pub
```

### **2. Error: "Updates were rejected"**
```bash
# Hacer pull primero
git pull origin main --rebase

# O forzar push (solo si sabes lo que haces)
git push origin main --force
```

### **3. Error: "No configured push destination"**
```bash
# Configurar remoto
git remote add origin git@github.com:Chizhevsky-Foundation/heliopulse-observatory.git

# Verificar
git remote -v
```

## 🌟 Buenas Prácticas

### **Mensajes de Commit Claros**
```
🌌 Agrega dashboard interactivo con WebSocket
🔧 Corrige funciones faltantes en servicios Chizhevsky
🚀 Mejora API con manejo de errores y puertos dinámicos
📝 Actualiza documentación de despliegue
```

### **Flujo de Trabajo Recomendado**
1. 🔄 `git pull` antes de trabajar
2. ✏️  Trabajar en una rama nueva
3. ✅ `git add .` para agregar cambios
4. 💾 `git commit -m "mensaje descriptivo"`
5. 🚀 `git push origin nombre-rama`
6. 🔀 Crear Pull Request en GitHub

## 🔗 Enlaces Útiles

- **Repositorio:** https://github.com/Chizhevsky-Foundation/heliopulse-observatory
- **SSH Keys:** https://github.com/settings/keys
- **Git Documentation:** https://git-scm.com/doc

---

*"Compartir conocimiento cósmico acelera la evolución humana"*  
*- Adaptación de Chizhevsky para la era digital*
