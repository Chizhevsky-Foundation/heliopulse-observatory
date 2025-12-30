# 🌌 OBSERVATORIO HELIOPULSE

**Un Observatorio Global para la Paz - Honrando el legado de Alexander L. Chizhevsky**

> *"La tierra, tomada como un todo con sus esferas atmosférica, hidro y litográfica y también con todas las plantas, animales y toda la especie humana, la biosfera, debe ser considerada por nosotros como un organismo común."*  
> **- Alexander L. Chizhevsky, padre de la heliobiología**

## 🚀 INSTALACIÓN CÓSMICA RÁPIDA

### **Método 1: Constructor Automático (Recomendado)**
```bash
# Clonar y construir automáticamente
git clone https://github.com/chizhevsky-foundation/helio-pulse-project
cd helio-pulse-project
node scripts/cosmic-build.js
npm start
```

### **Método 2: Docker (Para producción)**
```bash
# Construir y ejecutar todo el ecosistema
docker-compose up --build -d

# Ver logs cósmicos
docker-compose logs -f heliopulse-api
```

### **Método 3: Desarrollo Local**
```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus claves API

# Iniciar servidor de desarrollo
npm run dev

# Abrir dashboard en: http://localhost:3000/dashboard
```

## 📡 ARQUITECTURA DEL SISTEMA

```
heliopulse-observatory/
├── src/                          # Núcleo de la aplicación
│   ├── app.js                    # Núcleo principal
│   ├── routes/                   # Rutas API
│   │   ├── solar.routes.js       # Datos solares
│   │   ├── historical.routes.js  # Datos históricos
│   │   └── analysis.routes.js    # Análisis Chizhevsky
│   ├── services/                 # Servicios
│   │   ├── chizhevsky.service.js # Análisis heliobiológico
│   │   ├── solar.service.js      # Datos solares
│   │   └── database.service.js   # Conexión DB
│   ├── models/                   # Modelos de datos
│   ├── controllers/              # Controladores
│   └── config/                   # Configuración
├── public/                       # Dashboard público
│   └── dashboard/
│       └── index.html           # Dashboard cósmico
├── scripts/                      # Scripts de construcción
│   └── cosmic-build.js          # Constructor automático
├── tests/                        # Tests
├── docker-compose.yml           # Orquestación Docker
└── Dockerfile                   # Contenedor principal
```

## 🔭 ENDPOINTS PRINCIPALES DE LA API

### **📊 Datos Solares en Tiempo Real**
```http
GET /api/solar/status
GET /api/solar/flares
GET /api/solar/geomagnetic
GET /api/solar/predictions
```

### **📈 Análisis Heliobiológico**
```http
GET /api/analysis/chizhevsky
POST /api/analysis/predict
GET /api/analysis/historical/{year}
```

### **🌍 Dashboard y WebSocket**
```http
GET /dashboard                    # Dashboard interactivo
WS /socket.io                    # Datos en tiempo real
```

## 🎯 FUNCIONALIDADES PRINCIPALES

1. **🌞 Monitoreo Solar en Tiempo Real**
   - Viento solar y partículas cargadas
   - Manchas solares y actividad de llamaradas
   - Índices geomagnéticos (Kp, Dst)

2. **🔬 Análisis Chizhevsky**
   - Cálculo de "excitabilidad de masas"
   - Correlación histórica solar-conflictos
   - Predicciones de tensión social

3. **📊 Dashboard Interactivo**
   - Visualizaciones en tiempo real
   - Alertas geomagnéticas
   - Análisis regional específico

4. **🗄️ Base de Datos Histórica**
   - Eventos históricos desde 500 BCE
   - Correlaciones con ciclos solares
   - Patrones de comportamiento humano

## 🔧 CONFIGURACIÓN DE APIS EXTERNAS

1. **NASA API**: Regístrate en [api.nasa.gov](https://api.nasa.gov)
2. **NOAA/SWPC**: Datos públicos en [services.swpc.noaa.gov](https://services.swpc.noaa.gov)
3. **ESA Data**: Recursos en [esa.int](https://www.esa.int)

Agrega tus claves en el archivo `.env`:

```env
NASA_API_KEY=tu_clave_aqui
NOAA_API_BASE=https://services.swpc.noaa.gov
SOLAR_CYCLE=25
```

## 🐳 DESPLIEGUE CON DOCKER

### **Despliegue Local**
```bash
# Construir imágenes
docker-compose build

# Iniciar todos los servicios
docker-compose up -d

# Verificar estado
docker-compose ps

# Acceder a logs
docker-compose logs -f heliopulse-api
```

### **Despliegue en Producción**
```bash
# Con Docker Swarm
docker stack deploy -c docker-compose.yml heliopulse

# Con Kubernetes
kubectl apply -f kubernetes/
```

## 🧪 EJECUCIÓN DE TESTS

```bash
# Tests unitarios
npm test

# Tests de integración
npm run test:integration

# Tests con cobertura
npm run test:coverage
```

## 🤝 CONTRIBUIR AL PROYECTO

El Observatorio HelioPulse es un proyecto de código abierto. Necesitamos:

- **🌌 Científicos** para validar correlaciones
- **👨💻 Desarrolladores** para nuevas funcionalidades
- **📚 Historiadores** para datos históricos
- **🌍 Traductores** para documentación

**Guía de contribución:**
1. Fork el repositorio
2. Crea una rama (`feature/nueva-funcionalidad`)
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 LICENCIA

Este proyecto se distribuye bajo la **Licencia de Paz Cósmica**:
- Uso libre para fines de investigación y paz
- Atribución a la Fundación Chizhevsky
- No uso para fines militares o bélicos

## 🌟 EN HONOR A CHIZHEVSKY

> *"La humanidad no es sólo un habitante de la Tierra, sino también del universo, sometiéndose a las influencias de las fuerzas cósmicas."*

Este proyecto continúa su visión de una humanidad consciente de sus conexiones cósmicas.

---

**🌌 The Chizhevsky Foundation**  
**🔗 https://chizhevsky-foundation.github.io/helio-pulse-project/**  
**📧 contacto@chizhevsky-foundation.org**

*Monitoreando el pulso solar para la paz global*

## 📚 Documentación Completa

El Observatorio HelioPulse cuenta con documentación extensa para colaboradores, usuarios y investigadores:

### 🤝 Para Colaboradores
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guía completa para contribuir al proyecto
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** - Código de conducta para la comunidad
- **[.github/](.github/)** - Templates para issues y pull requests

### ⚖️ Legal y Seguridad
- **[LICENSE](LICENSE)** - Licencia de Paz Cósmica (MIT con adiciones para paz)
- **[SECURITY.md](SECURITY.md)** - Política de seguridad y reporte de vulnerabilidades

### 🔬 Guías Específicas
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía de despliegue y configuración
- **[CHANGELOG.md](CHANGELOG.md)** - Historial de cambios y mejoras
- **[/docs/](/docs/)** - Documentación técnica y científica detallada

## 🏛️ Gobernanza del Proyecto

### Estructura de Toma de Decisiones
1. **Mantenedores Principales**: Decisiones técnicas y arquitectónicas
2. **Comité Científico**: Validación de metodologías y análisis
3. **Comunidad**: Discusión abierta en issues y PRs

### Canales de Comunicación
- **Issues de GitHub**: Para discusiones técnicas y científicas
- **Email**: ia.mechmind@gmail.com (para asuntos no técnicos)
- **Documentación**: Principal fuente de información y guías

## 🌍 Impacto y Visión

### Misión a Largo Plazo
1. **2024-2025**: Establecer base científica y técnica sólida
2. **2026-2027**: Expandir fuentes de datos y análisis
3. **2028-2030**: Convertirse en referencia global en heliobiología digital

### Métricas de Éxito
- ✅ Número de investigadores utilizando la plataforma
- ✅ Calidad y cantidad de análisis publicados
- ✅ Impacto en discusiones sobre paz global
- ✅ Integración con instituciones académicas

## 👥 Reconocimientos

### Equipo Actual
- **Aprendiz Cósmico** - Desarrollo principal y arquitectura
- **Maestro Developer** - Mentoría y guía técnica
- **Comunidad de Colaboradores** - Mejoras continuas

### Inspiración Científica
- **Alexander L. Chizhevsky** - Padre de la heliobiología
- **Todos los investigadores** que continúan su legado
- **La comunidad científica** que comparte conocimiento abiertamente

## 🔗 Enlaces Rápidos

- **[Comenzar a Contribuir](CONTRIBUTING.md)**
- **[Reportar un Error](.github/ISSUE_TEMPLATE/bug_report.md)**
- **[Solicitar Característica](.github/ISSUE_TEMPLATE/feature_request.md)**
- **[Hacer Pregunta Científica](.github/ISSUE_TEMPLATE/science_question.md)**
- **[Ver Código Fuente](src/)**
- **[Probar Dashboard](http://localhost:2220/dashboard)**

---

*"La documentación es el puente entre el conocimiento y su aplicación práctica para el bien de la humanidad."*

**🌌 The Chizhevsky Foundation**  
**🔗 https://chizhevsky-foundation.github.io/heliopulse-observatory/**  
**📧 ia.mechmind@gmail.com**

*Monitoreando el pulso solar para la paz global - Documentación versión 1.0*
