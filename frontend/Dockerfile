FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY package*.json ./
RUN npm install -g http-server
EXPOSE 4200
CMD ["http-server", "./dist", "-p", "4200", "-P", "http://backend:8000/api/v1"]
