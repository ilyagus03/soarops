#!/bin/bash

# Check if Docker is installed, install if not
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    
    sudo apt-get update
    
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release
    
    # Docker's official GPG key
    curl -fsSL https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Docker repository
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    sudo apt-get update
    
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
    
    sudo usermod -aG docker $USER
    
    echo "Docker installed successfully!"
else
    echo "Docker is already installed!"
fi

# Check if docker-compose is installed, install if not
if ! command -v docker-compose &> /dev/null; then
    echo "Installing docker-compose..."
    # Install docker-compose
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    
    echo "docker-compose installed successfully!"
else
    echo "docker-compose is already installed!"
fi

# Stop any running containers
echo "Stopping any running containers..."
docker-compose down

# Build and start the containers ( no -d if you wanna see logs)
echo "Building and starting containers..."
docker-compose up --build -d

# Display container status, also you can run docker-compose logs -f for the logs if you ran -d
echo "Container status:"
docker-compose ps

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m


echo -e "${CYAN}"
cat << 'EOF'
   ____       _            
  / ___|     (_) ___  ___  
 | |     ___  _  __ _|__ \ 
 | |___ / __|| |/ _` | / / 
  \____|\___||_|\__,_|/_/ 
EOF
echo -e "${NC}"


echo -e "${YELLOW}🚀 SoarOps is launching...${NC}"
sleep 0.5
echo -e "${GREEN}✔ System online!${NC}"
echo ""


echo -e "${BLUE}═══════════════════════${NC}"
echo -e "${CYAN}   SoarOps Status: ${GREEN}RUNNING${NC}"
echo -e "${BLUE}═══════════════════════${NC}"
echo -e "${YELLOW}🌐 Frontend:${NC} http://localhost"
echo -e "${YELLOW}⚙️  Backend API:${NC} http://localhost/api"
echo ""


echo -e "${BLUE}🛠️  Quick Commands:${NC}"
echo -e "  📜 View logs: ${GREEN}docker-compose logs -f${NC}"
echo -e "  🛑 Stop system: ${GREEN}docker-compose down${NC}"
echo -e "${BLUE}═══════════════════════${NC}"
echo -e "${YELLOW}✨ SoarOps is ready Disney and shiii${NC}"
