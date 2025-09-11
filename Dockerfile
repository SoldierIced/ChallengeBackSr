# ---------- STAGE 1: Build ----------
FROM node:20-alpine AS builder

# Definir directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo dev)
RUN npm ci

# Copiar el código fuente
COPY . .

# Compilar el proyecto NestJS a dist/
RUN npm run build


# ---------- STAGE 2: Production ----------
FROM node:20-alpine AS runner

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Copiar build de la etapa anterior
COPY --from=builder /app/dist ./dist

# Copiar también .env si lo usás dentro del contenedor
# (opcional, porque en docker-compose ya usás env_file)
# COPY --from=builder /app/.env ./

EXPOSE 3000

# Ejecutar Nest compilado
CMD ["node", "dist/main.js"]
