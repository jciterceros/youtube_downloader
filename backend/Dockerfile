# Dockerfile para o backend
FROM node:18-alpine

# Instalar dependências do sistema necessárias para FFmpeg
RUN apk add --no-cache ffmpeg

WORKDIR /app

# Copiar package.json e instalar dependências
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Criar diretório para downloads
RUN mkdir -p downloaded

# Expor porta
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npm", "start"] 