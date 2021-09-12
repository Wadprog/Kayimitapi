FROM node:16.6.1-alpine3.14
RUN addgroup app && adduser -S -G app app 
USER app 
WORKDIR /app
COPY . . 
RUN npm install 
RUN cd client 
RUN npm install
RUN npm install pm2 
CMD pm2 start server/server.js 
