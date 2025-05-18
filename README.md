# SoarOps

## Attraction Operations Management System based on Disney's Soarin.

![Rigby](https://raw.githubusercontent.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png

## Overview
### speedrunning rando heads repos
SoarOps is a comprehensive operations management system for theme park attractions, providing:

- Real-time monitoring of attraction theaters
- Staff management and assignment
- Wait time tracking and prediction
- Maintenance logging
- Incident reporting

## System Architecture

- **Frontend**: React.js application with Material-UI components
- **Backend**: Flask API with PostgreSQL database
- **Deployment**: Docker containers orchestrated with Docker Compose
- **Proxy**: Nginx serving as a reverse proxy

## Quick Start

### Prerequisites

- Docker and Docker Compose installed on your system
- Git for cloning the repository

### Installation and Running

1. Clone the repository:
   ```
   git clone <repository-url>
   cd soarops
   ```

2. Run the start script:
   ```
   chmod +x start.sh
   ./start.sh
   ```

3. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost/api

### Demo Credentials

- **Admin passcode**: 123456789
- **Sample Cast ID**: 482529

## Development

### Project Structure

```
soarops/
├── backend/              # Flask API
│   ├── app.py            # Main application file
│   ├── Dockerfile        # Backend container configuration
│   └── requirements.txt  # Python dependencies
├── database/             # Database scripts
│   ├── schema.sql        # Database schema
│   └── seed.sql          # Sample data
├── frontend/             # React application
│   ├── public/           # Static assets
│   ├── src/              # Source code
│   └── Dockerfile        # Frontend container configuration
├── nginx/                # Nginx configuration
│   └── nginx.conf        # Reverse proxy setup
├── docker-compose.yml    # Service orchestration
└── start.sh              # Startup script
```

### Manual Setup

If you prefer to run the services individually:

1. **Database**:
   ```
   docker-compose up -d postgres
   ```

2. **Backend**:
   ```
   cd backend
   pip install -r requirements.txt
   flask run --host=0.0.0.0
   ```

3. **Frontend**:
   ```
   cd frontend
   npm install
   npm start
   ```

## Features

- Theater status monitoring
- Cast member assignment and rotation
- Wait time tracking and predictions
- Maintenance scheduling and logging
- Incident reporting and resolution tracking
- Staff efficiency metrics

## Screenshots

**Home**
![Home](https://github.com/user-attachments/assets/b188649d-9a5e-4a54-907e-7c6d9e1ac446)

**Cast Access**
![Cast Access 1](https://github.com/user-attachments/assets/716e5cdf-5968-4d19-a33e-4fce5c9b3e79)
![Cast Access 2](https://github.com/user-attachments/assets/c5a68d15-bbcc-4e33-8aaa-7ae329f0bbcd)

**Leadership Access**
![Leadership 1](https://github.com/user-attachments/assets/2c58eebc-9390-4de6-9610-8b45e23a21d0)
![Leadership 2](https://github.com/user-attachments/assets/8aeaf1d0-f70b-42eb-aa3c-4512f8d1605e)
