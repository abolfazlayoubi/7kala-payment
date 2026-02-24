FROM node:24-slim

# Install dependencies and tools
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libgtk-3-0 \
    xvfb \
    default-jdk \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . .

#RUN yarn install
RUN yarn build

EXPOSE 3000
CMD ["npm","run","start"]
