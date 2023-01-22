FROM node:18

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install 

COPY . .

ENV PORT=3000
ENV COOKIE_KEY=supersecretkey

EXPOSE 3000

CMD ["yarn", "start:dev"]
