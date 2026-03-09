# Docker Setup Guide

## Prerequisites
- Docker Desktop installed and running
- Docker Compose installed (usually comes with Docker Desktop)

## Quick Start

### 1. Create Environment File (Optional)
If you need to set environment variables, create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your-api-key-here
```

### 2. Build and Run All Services
Run both frontend and backend services:

```bash
docker-compose up --build
```

This will:
- Build the frontend Docker image
- Build the backend Docker image
- Start both containers
- Frontend will be available at: http://localhost:3000
- Backend API will be available at: http://localhost:5000

### 3. Run in Detached Mode (Background)
To run in the background:

```bash
docker-compose up -d --build
```

### 4. View Logs
To see the logs from all services:

```bash
docker-compose logs -f
```

To see logs from a specific service:

```bash
docker-compose logs -f frontend
docker-compose logs -f backend
```

### 5. Stop Services
To stop all services:

```bash
docker-compose down
```

To stop and remove volumes:

```bash
docker-compose down -v
```

## Individual Service Commands

### Run Only Frontend
```bash
docker-compose up frontend --build
```

### Run Only Backend
```bash
docker-compose up backend --build
```

## Useful Commands

### Rebuild After Code Changes
```bash
docker-compose up --build
```

### View Running Containers
```bash
docker ps
```

### Access Container Shell
```bash
# Frontend container
docker exec -it itew6-frontend sh

# Backend container
docker exec -it itew6-backend bash
```

### Remove All Containers and Images
```bash
docker-compose down --rmi all
```

## Troubleshooting

### Port Already in Use
If port 3000 or 5000 is already in use, you can change the ports in `docker-compose.yml`:

```yaml
ports:
  - "3001:80"  # Change 3000 to 3001
```

### Rebuild from Scratch
If you encounter issues, try rebuilding without cache:

```bash
docker-compose build --no-cache
docker-compose up
```

### Check Container Status
```bash
docker-compose ps
```

## Development vs Production

For development, you might want to use volume mounts to see changes in real-time. You can modify `docker-compose.yml` to add volumes:

```yaml
services:
  frontend:
    volumes:
      - ./frontend:/app
      - /app/node_modules
```

