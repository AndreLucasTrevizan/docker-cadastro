FROM node:24.13.0 AS base

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

FROM base AS build
RUN npm run build

FROM base AS dev
CMD ["npm", "run", "dev"]

FROM node:24.13.0 AS prod

WORKDIR /frontend

COPY --from=build /frontend/node_modules ./node_modules
COPY --from=build /frontend/package.json ./
COPY --from=build /frontend/public ./public
COPY --from=build /frontend/next.config.js ./
COPY --from=build /frontend/.next ./

EXPOSE 3000

CMD ["npm", "run", "start"]