#here the version is latest or specify the exact version
FROM node:latest

#copy the necessary packages and the app
COPY package*.json /app/

#point to the working directory
WORKDIR /app/

RUN npm install

COPY . .

#last command in the docker file, start the execution
CMD ["node", "index.js"]

EXPOSE 5040