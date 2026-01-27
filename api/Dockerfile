FROM node:20-alpine AS BUILD

WORKDIR /api

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

CMD ["pnpm", "run", "build"]

FROM node:20-alpine AS RUNNER

WORKDIR /api

COPY --from=BUILD /api/node_modules ./node_modules
COPY --from=BUILD /api/dist ./dist
COPY --from=BUILD /api/package*.json ./

EXPOSE 3333

CMD ["node", "dist/server.js"]