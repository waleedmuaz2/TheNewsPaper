FROM php:8.1-apache

WORKDIR /var/www/html

COPY . .

RUN apt-get update && \
    apt-get install -y \
        libzip-dev \
        unzip

RUN docker-php-ext-install pdo_mysql zip && \
    a2enmod rewrite

CMD ["apache2-foreground"]
