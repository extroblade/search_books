FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY . .

RUN yarn install


EXPOSE 5173
#docker image build -t search_books:latest .
CMD [ "yarn","dev"]
