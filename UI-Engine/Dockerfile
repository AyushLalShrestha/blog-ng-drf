FROM node:8.11.2-alpine

RUN mkdir /ngapp

WORKDIR /ngapp

COPY package*.json /ngapp/

RUN npm install -g @angular/cli

RUN npm install

# For now, do these steps manually after running the docket container
# RUN npm run build
# RUN ng build
# Run ng serve