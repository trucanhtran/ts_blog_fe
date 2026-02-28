# syntax=docker/dockerfile:1
# Local dev only
FROM node:22-alpine

WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    npm install

EXPOSE 3000
CMD ["npm", "run", "dev:no-turbopack"]
