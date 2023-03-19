FROM node:16.19.1-alpine

WORKDIR /node/app

COPY . .

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN npm install
RUN npm run build -- --configuration=${NODE_ENV}

COPY --chown=node:node . .

USER node

CMD [ "node", "server.js" ]
