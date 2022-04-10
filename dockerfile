FROM node:16.14.2-alpine3.15
WORKDIR /usr/src/app
COPY package*.json .
RUN npm set unsafe-perm true
RUN npm install
RUN npm install nodemon -g --save && export PATH=$PATH:~/npm
COPY . .
CMD ["npm", "run", "start"]