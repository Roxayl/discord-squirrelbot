# Discord.js 13 requires node.js v.16.
FROM node:16

# Set port 8080 as env constant (not required, though may be useful.)
ENV PORT 8080

# Set working directory inside the container.
WORKDIR /usr/bot

# Install dependencies.
COPY ./bot/package.json ./
RUN npm install -g nodemon && npm install

# Copy sources and run starting from application main file.
COPY ./bot/ ./
ENTRYPOINT ["nodemon", "index.js"]