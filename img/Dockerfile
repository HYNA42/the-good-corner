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


# FROM node:lts-alpine

# RUN apk --no-cache add curl

# WORKDIR /app
# RUN mkdir uploads

# COPY package.json package.json
# RUN npm install

# COPY tsconfig.json tsconfig.json

# COPY src src

# CMD npm start

