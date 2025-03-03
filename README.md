# Aircraft Spotter Application (Source Code)

This repository contains the source code for the Aircraft Spotter application, a full-stack web application built with React and Express.js. The infrastructure code for deployment is maintained separately in [DevOps_Midterm_Infra](https://github.com/lawrenceslng/DevOps_Midterm_Infra) to ensure proper separation of concerns.

## Repository Structure

```
.
├── client/                 # React frontend
│   ├── Dockerfile         # Frontend container configuration
│   ├── public/           
│   └── src/              
├── server/                # Express.js backend
│   ├── Dockerfile        # Backend container configuration
│   └── index.js          # Server entry point
├── docker-compose.yml     # Local development orchestration
└── setup.sql             # Database initialization
```

## Tech Stack

### Frontend
- React 18
- Material UI (MUI) for component library
- React Scripts for development and build tooling

### Backend
- Express.js
- MySQL database (via mysql2)
- CORS enabled for development
- Environment configuration via dotenv

## Local Development

The application is containerized using Docker for consistent development environments. To run locally:

1. Ensure Docker and Docker Compose are installed on your system
2. Clone this repository
3. Start the application:
   ```bash
   docker-compose up
   ```

This will start:
- Frontend container (React development server)
- Backend container (Express.js with Nodemon for hot reloading)
- MySQL database container

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:3001`.

## Infrastructure

The infrastructure code for deploying this application is maintained in a separate repository at [DevOps_Midterm_Infra](https://github.com/lawrenceslng/DevOps_Midterm_Infra). This separation ensures:

- Clear distinction between application code and infrastructure
- Independent versioning of infrastructure changes
- Easier management of different deployment environments
- Better security through separation of concerns

The infrastructure repository handles:
- Nightly deployment automation
- CI/CD pipeline setup
