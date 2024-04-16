# Fetching the latest node image on alpine linux
FROM node:18-alpine

# Setting up the work directory
WORKDIR /var/www/front

# Installing files
#COPY ./front/public/ .
#COPY ./front/src/ .
#COPY ./front/package.json .
COPY ./front/ .

# Installing npm modules
RUN npm install

# Starting our application
CMD ["npm","run", "dev"]