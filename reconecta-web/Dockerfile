# Multi-stage Dockerfile for ReConecta Web (React + Express + SQLite)

# Stage 1: Build Frontend
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production Server
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built frontend and server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

# Ensure SQLite data folder exists with persistent volume permissions
RUN mkdir -p ./server/data && chmod 777 ./server/data

VOLUME ["/app/server/data"]
EXPOSE 3000

CMD ["node", "server/index.js"]
