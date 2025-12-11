# 👥 Guía de Contribución - Observatorio HelioPulse

¡Gracias por tu interés en contribuir al Observatorio HelioPulse! Este proyecto busca entender las conexiones cósmicas que influyen en la humanidad, y tu contribución es valiosa.

## 🌌 Nuestra Visión

El Observatorio HelioPulse continúa el trabajo de **Alexander L. Chizhevsky**, padre de la heliobiología. Buscamos:
1. **Monitorear** la actividad solar y sus efectos
2. **Analizar** correlaciones con eventos históricos
3. **Educar** sobre nuestra conexión cósmica
4. **Promover** la paz global mediante la comprensión científica

## 🚀 Cómo Empezar

### 1. Primeros Pasos
- Lee el [README.md](README.md) para entender el proyecto
- Revisa los [issues abiertos](https://github.com/Chizhevsky-Foundation/heliopulse-observatory/issues)
- Únete a nuestras discusiones

### 2. Configurar el Entorno
```bash
# Clonar el repositorio
git clone https://github.com/Chizhevsky-Foundation/heliopulse-observatory.git
cd heliopulse-observatory

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus claves API

# Iniciar servidor de desarrollo
npm run dev
```

### 3. Estructura del Proyecto
```
heliopulse-observatory/
├── src/                    # Código fuente
│   ├── routes/            # Endpoints de la API
│   ├── services/          # Servicios (NASA, NOAA, etc.)
│   └── app.js             # Aplicación principal
├── public/                # Archivos estáticos
├── scripts/               # Scripts de utilidad
├── tests/                 # Pruebas
└── docs/                  # Documentación
```

## 💡 Áreas donde Necesitamos Ayuda

### 🔭 Para Científicos e Investigadores
- Validar correlaciones históricas
- Mejorar algoritmos de análisis
- Agregar nuevas fuentes de datos científicos
- Revisar metodologías heliobiológicas

### 👨💻 Para Desarrolladores
- Mejorar la API REST
- Optimizar el dashboard en tiempo real
- Agregar nuevas visualizaciones de datos
- Mejorar rendimiento y escalabilidad

### 📚 Para Historiadores y Analistas
- Agregar eventos históricos a la base de datos
- Analizar patrones en diferentes culturas
- Traducir documentos históricos relevantes
- Validar contextos históricos

### 🌍 Para Traductores y Comunicadores
- Traducir la documentación a otros idiomas
- Mejorar la documentación existente
- Crear contenido educativo
- Ayudar con la divulgación científica

## 🔧 Proceso de Contribución

### 1. Encontrar una Tarea
- Mira los [issues con etiqueta "good first issue"](https://github.com/Chizhevsky-Foundation/heliopulse-observatory/labels/good%20first%20issue)
- Revisa el [roadmap del proyecto](docs/ROADMAP.md)
- Propón nuevas ideas creando un issue

### 2. Trabajar en tu Contribución
```bash
# Crear una rama nueva
git checkout -b feature/nueva-funcionalidad

# Hacer tus cambios
# Asegúrate de seguir las convenciones de código

# Ejecutar pruebas
npm test

# Verificar que todo funciona
npm run dev
```

### 3. Convenciones de Código
- Usar **ES6+** para JavaScript
- Seguir la **guía de estilos** existente
- Documentar funciones complejas
- Escribir pruebas para nueva funcionalidad
- Usar commits semánticos: `feat:`, `fix:`, `docs:`, etc.

### 4. Crear un Pull Request
1. **Actualiza** tu rama con la última versión de `main`
2. **Asegúrate** de que todas las pruebas pasen
3. **Actualiza** la documentación si es necesario
4. **Describe** claramente los cambios en el PR
5. **Menciona** el issue relacionado

### Plantilla de PR:
```markdown
## Tipo de Cambio
- [ ] Nueva característica
- [ ] Corrección de error
- [ ] Mejora de documentación
- [ ] Refactorización de código

## Descripción
Breve descripción de los cambios...

## Issue Relacionado
Fixes #(número del issue)

## Cambios Realizados
- Lista de cambios específicos
- 

## Comprobación
- [ ] Las pruebas pasan
- [ ] La documentación fue actualizada
- [ ] El código sigue las convenciones
```

## 📊 Sistema de Etiquetas de Issues

| Etiqueta | Descripción | Color |
|----------|-------------|-------|
| `good first issue` | Ideal para nuevos contribuidores | #7057ff |
| `help wanted` | Necesita ayuda de la comunidad | #008672 |
| `bug` | Error que necesita corrección | #d73a4a |
| `enhancement` | Mejora de funcionalidad existente | #a2eeef |
| `documentation` | Mejoras en documentación | #0075ca |
| `science` | Asuntos científicos/heliobiológicos | #cfd3d7 |
| `data` | Relacionado con datos/fuentes | #fbca04 |
| `ui/ux` | Interfaz de usuario/experiencia | #fef2c0 |

## 🧪 Pruebas y Calidad

### Ejecutar Pruebas
```bash
# Todas las pruebas
npm test

# Pruebas específicas
npm test -- --testPathPattern=chizhevsky

# Con cobertura
npm test -- --coverage
```

### Verificación de Código
- Usamos **ESLint** para mantener consistencia
- El **CI/CD** verifica automáticamente los PRs
- Requerimos **revisión de código** para cambios grandes

## 📚 Documentación

### Tipos de Documentación
1. **Documentación de API** - Endpoints y uso
2. **Documentación científica** - Bases heliobiológicas
3. **Guías de desarrollo** - Cómo contribuir
4. **Documentación de datos** - Fuentes y formatos

### Actualizar Documentación
- Documenta nuevas características inmediatamente
- Mantén ejemplos de código actualizados
- Incluye diagramas para arquitectura compleja

## 🏆 Reconocimiento

Todas las contribuciones son reconocidas:
- **Mención** en el archivo CONTRIBUTORS.md
- **Inclusión** en las notas de lanzamiento
- **Posibilidad** de convertirse en mantenedor

## ❓ Preguntas Frecuentes

### ¿Necesito ser científico para contribuir?
¡No! Necesitamos habilidades diversas: desarrollo, documentación, diseño, traducción, etc.

### ¿Puedo contribuir sin saber programar?
¡Sí! La documentación, traducción y análisis de datos son igualmente importantes.

### ¿Cómo me uno al equipo de mantenedores?
Contribuye consistentemente por varios meses y muestra comprensión del proyecto.

### ¿Hay un chat o foro para la comunidad?
Actualmente usamos los issues de GitHub para discusiones.

## 📞 Contacto

- **Issues de GitHub**: Para problemas técnicos y características
- **Email**: ia.mechmind@gmail.com (para asuntos no técnicos)
- **Documentación**: Revisa la carpeta `docs/` para más información

---

*"Cada contribución, por pequeña que sea, avanza nuestra comprensión del cosmos y nuestra conexión con él."*
*- El equipo del Observatorio HelioPulse*
