#!/bin/bash

# Bryan's CV Website - Docker Startup Script

echo "Starting Bryan's CV Website..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed. Please install Docker first."
    echo "Installation guide: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "ERROR: Docker service is not running. Please start Docker Desktop first."
    exit 1
fi

# Check if Docker Compose is available
if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
    echo "Starting service using Docker Compose..."
    
    # Stop existing containers (if any)
    docker-compose down 2>/dev/null
    
    # Build and start services
    echo "Building image..."
    docker-compose build --no-cache
    
    if [ $? -eq 0 ]; then
        echo "Starting services..."
        docker-compose up -d
        
        if [ $? -eq 0 ]; then
            echo "SUCCESS: Services started successfully!"
            echo "Please visit: http://localhost:8080"
            echo ""
            echo "Management commands:"
            echo "  Stop services: docker-compose down"
            echo "  View logs: docker-compose logs"
            echo "  Rebuild: docker-compose build --no-cache"
        else
            echo "ERROR: Failed to start services"
            echo "View logs: docker-compose logs"
            exit 1
        fi
    else
        echo "ERROR: Failed to build image"
        exit 1
    fi
else
    echo "Starting service using Docker..."
    
    # Stop existing containers (if any)
    docker stop bryanyuan2-cv 2>/dev/null
    docker rm bryanyuan2-cv 2>/dev/null
    
    # Build image
    echo "Building Docker image..."
    docker build --no-cache -t bryanyuan2-cv .
    
    if [ $? -eq 0 ]; then
        # Start container
        echo "Starting container..."
        docker run -d -p 8080:80 --name bryanyuan2-cv bryanyuan2-cv
        
        if [ $? -eq 0 ]; then
            echo "SUCCESS: Services started successfully!"
            echo "Please visit: http://localhost:8080"
            echo ""
            echo "Management commands:"
            echo "  Stop service: docker stop bryanyuan2-cv"
            echo "  Remove container: docker rm bryanyuan2-cv"
            echo "  View logs: docker logs bryanyuan2-cv"
        else
            echo "ERROR: Failed to start container"
            echo "View logs: docker logs bryanyuan2-cv"
            exit 1
        fi
    else
        echo "ERROR: Failed to build Docker image"
        exit 1
    fi
fi
