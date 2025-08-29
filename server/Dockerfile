# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Development dependencies for building (if needed)
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Production image, copy all the files and run the server
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user to run the application
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs expressjs

# Copy production dependencies
COPY --from=deps --chown=expressjs:nodejs /app/node_modules ./node_modules

# Copy application code
COPY --chown=expressjs:nodejs . .

# Create necessary directories and set permissions
RUN mkdir -p /app/public && \
    chown -R expressjs:nodejs /app

USER expressjs

# Expose the port the app runs on
EXPOSE 3000

# Health check to ensure the container is running properly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get(process.env.HEALTHCHECK_URL || 'http://localhost:3000/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"

# Start the application
CMD ["npm", "start"]