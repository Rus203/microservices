FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

RUN npm run build

COPY --from=development usr/src/app/dist ./dist

CMD ["node", "dist/apps/billing/main"]