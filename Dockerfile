# Usa a imagem base do Node.js
FROM node:18 AS build

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do projeto para o diretório de trabalho
COPY . .

# Compila a aplicação para produção
RUN npm run build

# Usa uma imagem base do nginx para servir a aplicação
FROM nginx:stable-alpine

# Copia os arquivos construídos para o diretório do nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia o arquivo de configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponha a porta em que o nginx vai rodar
EXPOSE 80

# Comando para rodar o nginx
CMD ["nginx", "-g", "daemon off;"]