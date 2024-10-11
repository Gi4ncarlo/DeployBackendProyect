FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

FROM node:18-alpine AS build 

WORKDIR /ecommerce-gi4ncarlo/src/app

COPY package*.json ./

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS production 

COPY --from=build /ecommerce-gi4ncarlo/src/app/node_modules ./node_modules
COPY --from=build /ecommerce-gi4ncarlo/src/app/dist ./dist 

EXPOSE 3000

CMD ["node", "dist/main.js"]