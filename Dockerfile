FROM node:18-alpine
WORKDIR /test-task/
COPY public/ /test-task/public
COPY src/ /test-task/src
COPY package.json /test-task/
RUN yarn
CMD ["yarn", "dev"]
