FROM node:16-alpine

WORKDIR /app

# Instala curl para healthchecks
RUN apk add --no-cache curl

COPY package*.json ./
RUN npm install

COPY . .

# Healthcheck (opcional pero recomendado)
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["node", "app.js"]