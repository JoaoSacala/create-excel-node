# Dockerfile
FROM node:22-slim

# Instala o pnpm
RUN npm install -g pnpm

# Cria diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (para cache)
COPY package.json pnpm-lock.yaml* ./

# Instala dependências
RUN pnpm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando padrão
CMD ["pnpm", "dev"]
