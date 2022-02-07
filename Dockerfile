FROM node
ENV NPM_CONFIG_LOGLEVEL info

# diretório onde será colocado as informações
WORKDIR /usr/application

COPY packege.json ./

RUN npm install

# colocar o ponto para dizer que será baixado tudo
COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]