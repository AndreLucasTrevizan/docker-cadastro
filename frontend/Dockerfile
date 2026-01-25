FROM node:24.13.0 AS BUILD

ENV CI=true

COPY . /cadastro

WORKDIR /cadastro

RUN ["npm", "install", "-g", "pnpm@latest-10"]
RUN ["npm", "install", "-g", "typescript"]
RUN ["pnpm", "install"]

EXPOSE 3000

CMD ["pnpm", "run", "dev"]