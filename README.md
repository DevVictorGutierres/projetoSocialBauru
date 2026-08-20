# Projeto Social Bauru

Projeto Social Bauru is a free platform designed to help people discover and join social projects in Bauru, Brazil. The idea is similar to a discovery marketplace: instead of searching for accommodation or products, users search for organizations and initiatives where they can volunteer, participate, or find support.

## Motivation

Many social projects rely almost exclusively on Instagram, Facebook, or WhatsApp to communicate their work. This makes them difficult to discover, especially for people who do not already know the organization or follow its social media accounts.

Projeto Social Bauru aims to bring these initiatives together in one accessible place, making it easier to:

- discover active social projects;
- understand their purpose and area of work;
- find contact and location information;
- join or leave a project;
- connect volunteers and participants with local initiatives.

The platform is intended to remain free and focused on social impact.

## Current Scope

The repository currently contains the backend REST API. It supports:

- user registration and profile management;
- project creation and management;
- JWT-based authentication;
- authorization for user and project operations;
- project ownership;
- joining and leaving projects;
- duplicate participation prevention;
- blocking new participation in inactive projects;
- listing the projects joined by a user;
- listing project participants with privacy-aware responses;
- request validation and centralized error handling.

## Tech Stack

- **Node.js** — JavaScript runtime;
- **TypeScript** — static typing;
- **Express 5** — HTTP server and REST API;
- **MongoDB** — document database;
- **Prisma ORM 6.19** — database access and data modeling;
- **Zod** — request validation and data normalization;
- **bcrypt** — password hashing;
- **JSON Web Token (JWT)** — stateless authentication;
- **dotenv** — environment variable loading;
- **CORS** — cross-origin request configuration;
- **TSX** — TypeScript development runner.

## Architecture

The backend follows a layered structure:

```text
HTTP request
    |
    v
Routes -> Middlewares -> Controllers -> Services -> Prisma -> MongoDB
```

- **Routes** define endpoints and their middleware chain.
- **Middlewares** handle authentication, validation, and global errors.
- **Controllers** adapt HTTP input and output.
- **Services** contain business rules and database operations.
- **DTOs** define the data contracts used by the service layer.
- **Prisma** provides typed access to MongoDB.

Participation uses `Project.userIds` as its single source of truth. This avoids storing the same user-project relationship in both collections and reduces the risk of inconsistent data.

## Project Structure

```text
backend/
|-- prisma/
|   `-- schema.prisma
|-- src/
|   |-- config/
|   |-- constants/
|   |-- controllers/
|   |-- dtos/
|   |-- middlewares/
|   |-- routes/
|   |-- services/
|   |-- types/
|   |-- utils/
|   |-- validations/
|   |-- app.ts
|   `-- server.ts
|-- package.json
`-- tsconfig.json
```

## Sprint Progress

### Sprint 1 — API Foundation

- Initial Express and TypeScript setup;
- Prisma and MongoDB integration;
- user CRUD;
- project CRUD;
- initial layered architecture;
- manual API validation.

**Status:** Completed

### Sprint 2 — Data Modeling and Validation

- domain model improvements;
- project ownership relationship;
- address and project category fields;
- Zod schemas;
- reusable validation middleware;
- password hashing with bcrypt;
- initial security improvements.

**Status:** Completed

### Sprint 3 — Authentication and Architecture

- login with JWT;
- authentication middleware;
- user and project authorization;
- Create and Update DTOs;
- centralized application errors;
- global error middleware;
- controller and service refactoring;
- stronger separation of responsibilities.

**Status:** Completed

### Sprint 4 — Project Participation

- join a project;
- leave a project;
- prevent duplicate participation;
- prevent project owners from joining their own projects;
- prevent participation in inactive projects;
- list a user's joined projects;
- list project participants;
- restrict participant contact details to the project owner;
- protect participation operations with authentication;
- manual endpoint testing with Insomnia.

**Status:** Completed

## Main API Routes

All routes use the `/api` prefix.

### Authentication

```text
POST   /api/auth/login
```

### Users

```text
POST   /api/users
GET    /api/users
GET    /api/users/:id
GET    /api/users/:id/projects
PUT    /api/users/:id
DELETE /api/users/:id
```

### Projects

```text
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
GET    /api/projects/:id/users
PUT    /api/projects/:id
DELETE /api/projects/:id
PATCH  /api/projects/:id/apply
PATCH  /api/projects/:id/quit
```

Protected routes expect a bearer token:

```http
Authorization: Bearer <token>
```

## Running Locally

### Requirements

- Node.js;
- npm;
- a MongoDB database, preferably a MongoDB Atlas replica set.

### Setup

Clone the repository and enter the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
DATABASE_URL=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_private_jwt_secret
```

Never commit the `.env` file or expose real database credentials and JWT secrets.

Generate the Prisma Client:

```bash
npx prisma generate
```

Synchronize the Prisma schema with MongoDB when necessary:

```bash
npx prisma db push
```

Start the development server:

```bash
npm run dev
```

By default, the API is available at:

```text
http://localhost:3000
```

## Testing

The API endpoints have currently been tested manually with Insomnia. Automated unit and integration tests are planned for a future sprint.

## Roadmap

Possible future improvements include:

- automated unit and integration tests;
- project search and combined filters;
- pagination;
- image and avatar uploads;
- API documentation with OpenAPI/Swagger;
- user roles and administrative permissions;
- logging and observability;
- Docker support;
- deployment;
- frontend application.

## Project Status

The backend foundation and the first core user interaction — participating in social projects — are complete. The project is under active development and will continue evolving through incremental sprints.
