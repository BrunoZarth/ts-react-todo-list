FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Usar a variável de ambiente NODE_ENV para definir o comando de inicialização
CMD ["sh", "-c", "npm run migrate && if [ \"$NODE_ENV\" = \"test\" ]; then npm run test; else npm run dev; fi"]
