# Use Node.js 18 Alpine as base image
FROM node:18-alpine as builder

# Install system dependencies required for building
RUN apk add --no-cache python3 make g++ git

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force && \
    npm ci --verbose

# Copy project files
COPY . .

# Ensure build directories exist
RUN mkdir -p src/build asserts/css/min

# Execute build steps separately for easier debugging
RUN echo "Step 1: Validating JSON files..." && npm run jsonlint:data
RUN echo "Step 2: Building CSS..." && npm run build:css  
RUN echo "Step 3: Building TypeScript..." && npm run build:prod:ts
RUN echo "All build steps completed successfully!"

# Use nginx as production web server
FROM nginx:alpine

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files to nginx default directory
COPY --from=builder /app/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
