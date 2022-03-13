FROM node:16-alpine as builder

RUN mkdir /app && chown -R node:node /app

WORKDIR /app

COPY ./package.json ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx:alpine

COPY container /

COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
