FROM node:22-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
ARG VITE_API_BASE_URL=/api/v1
ARG VITE_GITHUB_USERNAME=
ARG VITE_SITE_URL=
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_GITHUB_USERNAME=$VITE_GITHUB_USERNAME \
    VITE_SITE_URL=$VITE_SITE_URL
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
