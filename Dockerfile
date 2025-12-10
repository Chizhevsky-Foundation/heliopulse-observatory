# 🐳 DOCKERFILE CÓSMICO HELIOPULSE

FROM node:18-alpine AS cosmic-builder

WORKDIR /cosmic-build

# Instalar dependencias de construcción
RUN apk add --no-cache git python3 make g++ curl

# Copiar archivos de construcción
COPY package*.json ./
COPY scripts/cosmic-build.js ./scripts/

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY src ./src
COPY public ./public
COPY .env ./

# Ejecutar construcción cósmica
RUN node scripts/cosmic-build.js

# Fase de producción
FROM node:18-alpine AS cosmic-observatory

WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S cosmic && \
    adduser -S cosmic -u 1001 -G cosmic

# Copiar desde builder
COPY --from=cosmic-builder --chown=cosmic:cosmic /cosmic-build /app

USER cosmic

# Exponer puerto cósmico
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production \
    PORT=3000

# Comando de inicio
CMD ["node", "src/app.js"]

# Salud del contenedor
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Etiquetas cósmicas
LABEL org.label-schema.name="HelioPulse Observatory" \
      org.label-schema.description="Observatorio de Monitoreo Heliobiológico" \
      org.label-schema.url="https://chizhevsky-foundation.github.io" \
      org.label-schema.vcs-url="https://github.com/chizhevsky-foundation/helio-pulse-project" \
      org.label-schema.version="1.0.0-cosmic"
