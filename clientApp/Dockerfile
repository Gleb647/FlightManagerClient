FROM node:alpine
WORKDIR usr/app/front
EXPOSE 3000
COPY . .
RUN npm install
RUN npm install react-bootstrap bootstrap
CMD ["npm", "start"]
