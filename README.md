# Feedback-form

Feedback collection system with an ASP.NET Core Web API backend, PostgreSQL database, and a static web frontend served via Nginx.

## Architecture

- **Frontend**: Nginx container serving the HTML5 feedback form and feedbacks listing on port 3000 and reverse-proxying `/api/` calls to the backend.
- **Backend**: ASP.NET Core 10 Web API running on port 5200 (internal port 8080) handling feedback submissions and queries with automatic EF Core migrations.
- **Database**: PostgreSQL 16 on port 5436.

## Running with Docker Compose

1. Copy the environment template if needed:
```bash
cp .env.example .env
```

2. Start all services:
```bash
docker compose up --build
```

3. Access the application:
- Feedback Form: http://localhost:3000
- Submitted Feedback: http://localhost:3000/feedbacks.html
- Backend API Docs (Scalar): http://localhost:5200/scalar/v1
- Feedback API Endpoint: http://localhost:3000/api/feedback (or direct backend: http://localhost:5200/api/feedback)

4. Stop the services:
```bash
docker compose down
```
