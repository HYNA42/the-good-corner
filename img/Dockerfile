FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app

RUN mkdir uploads

# Copie des fichiers nécessaires
# COPY package.json package.json
COPY package.json package-lock.json ./
RUN npm install

COPY src src

COPY uploads uploads

COPY tsconfig.json tsconfig.json

# Commande à exécuter pour démarrer le backend
CMD npm start

