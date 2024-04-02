FROM node:lts-alpine3.19 as builder
WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
COPY .env ./.env
ENV $(cat .env | grep -v ^# | xargs)
RUN npm run build
# #----------------------
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf 

COPY --from=builder /app/build /usr/share/nginx/html
COPY ./private.key /etc/ssl/private/private.key
COPY ./certificate.crt /etc/ssl/certs/certificate.crt
EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]