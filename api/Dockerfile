FROM node:24.13.0

COPY src /api/src
COPY .env          /api
COPY biome.json    /api
COPY package.json  /api
COPY tsconfig.json /api

WORKDIR /api

RUN ["npm", "install", "-g", "pnpm@latest-10"]
RUN ["npm", "install", "-g", "typescript"]
RUN ["pnpm", "i"]

EXPOSE 3333

CMD ["pnpm", "run", "dev"]