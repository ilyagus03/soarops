# SoarOps ♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋

## Attraction Operations Management System based on Disney's Soarin.

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

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

- nothin ⛄⛄⛄⛄

### Installation and Running

1. Clone the repository:
   ```
   git clone and shiii
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
.
├── README.md
├── backend
│   ├── BALLER_ROUTES
│   │   ├── anal.py
│   │   ├── incidents.py
│   │   ├── maintenance.py
│   │   ├── operations.py
│   │   ├── ride_cycles.py
│   │   ├── staff.py
│   │   └── theaters.py
│   ├── DB_MODELLLLLLLSSS
│   │   ├── __init__.py
│   │   ├── all_models.py
│   │   ├── incident.py
│   │   ├── maintenance_log.py
│   │   ├── operation_day.py
│   │   ├── ride_cycle.py
│   │   ├── staff_assignment.py
│   │   ├── staff_member.py
│   │   ├── theater.py
│   │   └── weather.py
│   ├── Dockerfile.prod
│   ├── app.py
│   ├── requirements.txt
│   └── services
│       └── wait_time_predictor.py
├── database
│   ├── schema.sql
│   └── seed.sql
├── docker-compose.yml
├── frontend
│   ├── Dockerfile.prod
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── site.webmanifest
│   └── src
│       ├── App.js
│       ├── Demo.js
│       ├── Main.js
│       ├── components
│       │   ├── CapacityChart.js
│       │   ├── Dashboard.js
│       │   ├── ErrorBoundary.js
│       │   ├── Login.js
│       │   ├── MaintenanceLog.js
│       │   ├── NavBARS.js
│       │   ├── StaffingTable.js
│       │   └── WaitTimeChart.js
│       ├── contexts
│       │   └── AuthContext.js
│       ├── index.css
│       ├── index.js
│       ├── services
│       │   └── api.js
│       └── utils
│           └── mockData.js
├── nginx
│   └── nginx.conf
└── start.sh

14 directories, 54 files
                          
```

## Features

- idk
- disney stats or something?
- ♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋♋
## Screenshots

**Home**
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

**Cast Access**
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

**Leadership Access**
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
*Leadership Access**
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
*Leadership Access**
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
*Leadership Access**
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
*Leadership Access**
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
*Leadership Access**
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
*Leadership Access**
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
*Leadership Access**
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
*Leadership Access**
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)
![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

![Rigby](https://github.com/CarterPerez-dev/angela-cli/blob/main/MD/assets/rigby.png?raw=true)

