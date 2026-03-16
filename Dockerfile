FROM node:24-bookworm

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install

