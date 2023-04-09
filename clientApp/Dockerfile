FROM node:alpine
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

COPY . /app
EXPOSE 3000

RUN npm install
RUN npm install react-bootstrap bootstrap
RUN npm install react-scripts@5.0.1 
CMD ["npm", "start"]
