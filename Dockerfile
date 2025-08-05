# Base image
FROM node:22.14-alpine

# Set working directory
WORKDIR /app

# Copy package files from backend folder
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend directory contents to /app
COPY backend/ ./

# Expose port
EXPOSE 5001

# Set environment variable for chokidar polling
ENV CHOKIDAR_USEPOLLING=true

# Start the application
CMD ["npm", "run", "dev"]

# Ajoutez ces lignes à votre Dockerfile
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_POLLING_INTERVAL=1000
ENV NODE_ENV=development