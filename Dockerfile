# Discord.js 13 requires node.js v.16.
FROM node:16

# Set port 8085 as env constant (not required, though may be useful.)
ENV PORT 8085

# Set working directory inside the container.
WORKDIR /app
# Copy sources and run starting from application main file.
COPY . ./

# Install packages.
RUN apt-get update -qq && \
    apt-get install -qy \
    unzip \
    zip \
    vim \
    mariadb-client

# Install Node dependencies.
WORKDIR /app/bot
RUN npm install -g nodemon && npm install

# Run app through nodemon.
ENTRYPOINT ["nodemon", "index.js"]
