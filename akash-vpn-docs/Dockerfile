# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN yarn install && yarn build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
