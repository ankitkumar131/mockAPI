# MockFlow - Project Synopsis

## Project Overview

**MockFlow** is a full-stack web application designed to provide mock API services for frontend developers. It enables developers to quickly spin up mock backend endpoints without needing to set up a real backend server, making it ideal for prototyping, testing, and development workflows.

---

## Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB
- **Server**: Uvicorn
- **Port**: 8001

### Frontend
- **Framework**: Angular (v21.2.2)
- **Build Tool**: Vite
- **Port**: 4200

---

## Project Architecture

```
mockflow/
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── api/         # API routes
│   │   │   ├── routes/projects.py
│   │   │   └── mock_engine/handler.py
│   │   ├── core/        # Core configurations
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   ├── models/     # Data models & schemas
│   │   │   └── schemas.py
│   │   ├── services/   # Business logic
│   │   │   ├── project_service.py
│   │   │   └── faker_service.py
│   │   └── main.py      # Application entry point
│   ├── requirements.txt
│   └── to_run.txt
│
└── frontend/             # Angular frontend
    ├── src/app/
    │   ├── shared/     # Shared components
    │   │   ├── header/
    │   │   └── confirm-dialog/
    │   └── (components)
    ├── angular.json
    ├── package.json
    └── to_run.txt
```

---

## Core Features

### 1. Project Management (CRUD)
- **Create Project**: POST `/api/projects`
- **List Projects**: GET `/api/projects`
- **Get Project**: GET `/api/projects/{slug}`
- **Update Project**: PUT `/api/projects/{slug}`
- **Delete Project**: DELETE `/api/projects/{slug}`

### 2. Mock Engine
- Generates mock API endpoints dynamically
- Integrates with Faker service for realistic data generation
- Handles mock request/response lifecycle

### 3. Faker Service
- Generates fake data for testing purposes
- Supports various data types (names, emails, addresses, etc.)

---

## Configuration

### Environment Variables (backend/.env)
- `MONGODB_URL`: MongoDB connection string (default: `mongodb://localhost:27017`)
- `DATABASE_NAME`: Database name (default: `mockflow`)
- `CORS_ORIGINS`: Allowed CORS origins (default: `http://localhost:4200`)
- `HOST`: Server host (default: `0.0.0.0`)
- `PORT`: Server port (default: `8000`)

---

## Running the Project

### Backend
```bash
python -m uvicorn app.main:app --reload --port 8001
```

### Frontend
```bash
npx ng serve --port 4200
```

---

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/projects` | Create new project |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/{slug}` | Get project by slug |
| PUT | `/api/projects/{slug}` | Update project |
| DELETE | `/api/projects/{slug}` | Delete project |
| * | `/api/mock/*` | Mock engine endpoints |

---

## Data Models

### Project Schema
- `slug`: Unique identifier (string)
- `name`: Project name (string)
- `description`: Project description (string, optional)
- `endpoints`: List of mock endpoints (array)
- `created_at`: Creation timestamp (datetime)
- `updated_at`: Last update timestamp (datetime)

---

## Key Dependencies

### Backend
- fastapi
- uvicorn
- motor (async MongoDB driver)
- pydantic-settings
- faker

### Frontend
- @angular/core
- @angular/material
- @angular/forms

---

## Use Cases

1. **Frontend Development**: Frontend developers can develop against mock APIs without waiting for backend implementation
2. **Prototyping**: Quickly create mock endpoints for prototyping new features
3. **Testing**: Use mock APIs for integration and unit testing
4. **Demo/PoC**: Build demonstrations without setting up a full backend

---

## Summary

MockFlow provides a streamlined solution for creating and managing mock APIs. It combines a FastAPI backend with MongoDB for data persistence and an Angular frontend for easy management. The system allows developers to define mock endpoints, generate realistic fake data using Faker, and serve these mock APIs to frontend applications in development or testing phases.