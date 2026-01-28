# ---------- BASE ----------
FROM node:24.13.0 AS base

WORKDIR /api

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

# ---------- BUILD ----------
FROM base AS build
RUN pnpm run build

# ---------- DEV ----------
FROM base AS dev
CMD ["pnpm", "run", "dev"]

# ---------- PROD ----------
FROM node:24.13.0 AS prod

WORKDIR /api

COPY --from=build /api/node_modules ./node_modules
COPY --from=build /api/dist ./dist
COPY --from=build /api/package.json ./

EXPOSE 3333
CMD ["node", "dist/server.js"]
