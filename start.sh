#!/bin/bash

# Stop any running containers
echo "Stopping any running containers..."
docker-compose down

# Build and start the containers
echo "Building and starting containers..."
docker-compose up --build -d

# Display container status
echo "Container status:"
docker-compose ps

echo ""
echo "SoarOps is now running!"
echo "- Frontend: http://localhost"
echo "- Backend API: http://localhost/api"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"
