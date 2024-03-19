# Fetching the latest node image on alpine linux
FROM node:alpine

# Declaring env
ENV NODE_ENV development

# Installing dependencies
COPY ./front-end /var/www/react

# Setting up the work directory
WORKDIR /var/www/react

RUN npm install

# Copying all the files in our project
COPY ./front-end/ .

# Starting our application
CMD ["npm","start"]