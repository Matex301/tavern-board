FROM nginx:1.17.8-alpine

# Copy the public directory
COPY ./symfony /var/www/symfony

# Copy the nginx config file
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
