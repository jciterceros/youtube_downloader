# Dockerfile para o frontend
FROM node:18-alpine

WORKDIR /app

# Copiar package.json e instalar dependências
COPY package.json package-lock.json* ./
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Instalar servidor para servir arquivos estáticos
RUN npm install -g serve

# Expor porta
EXPOSE 3000

# Comando para servir a aplicação
CMD ["serve", "-s", "build", "-l", "3000"] 