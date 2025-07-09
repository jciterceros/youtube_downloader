# Dockerfile para YouTube Downloader
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN mkdir -p downloaded

# EXPOSE 3000 # Descomente se for rodar como API

CMD ["node", "src/index.js"] 