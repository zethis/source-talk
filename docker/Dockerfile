# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy server and static files
COPY app/server.js ./
COPY app/public ./public

# Install dependencies
RUN npm install express socket.io

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
