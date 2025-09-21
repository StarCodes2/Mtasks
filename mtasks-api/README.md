# MTask API

MTask API is a RESTful backend service for a task manager application. It handles user registration, authentication, and task management features like create, read, update, delete (CRUD). Built with Node.js, Express, and MongoDB, it serves as the backend for a productivity app that can later support web, mobile, and CLI clients.

## Core Features:
- User authentication (JWT)
- Task CRUD (create, update, delete, get)
- Ownership-based access control (each user can only manage their tasks)
- Validation and error handling
- Secure password storage
- Modular, testable codebase

## 🛠️ Tech Stack

### Core
- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT, bcrypt
- **Validation**: express-validator or zod
- **Environment Config**: dotenv

### Dev & Tooling
- **Testing**: Jest + Supertest
- **Linting & Formatting**: ESLint + Prettier
- **Live Reload**: nodemon
- **Dev Scripts**: concurrently (if needed for testing services in parallel)
- **API Testing**: Postman or Insomnia

### Deployment Targets
- Railway, Render, Fly.io, or DigitalOcean App Platform
- MongoDB Atlas for production DB

## Core Entities

### User:
Registers, logs in, owns lists.

### List:
Created by a user, contains tasks.

### Task:
Belongs to a list, has status, due date, etc.

## 🧱 Updated API Folder Structure
```
mtasks-api/
│
├── /src
│   ├── /config              # Environment and MongoDB config
│   ├── /models              # Mongoose schemas: User, List, Task
│   ├── /routes              # API route definitions
│   ├── /controllers         # Route logic (auth, lists, tasks)
│   ├── /services            # Business logic and data access
│   ├── /middlewares         # Auth, error, validation
│   ├── /utils               # Token helpers, logger, constants
│   └── server.js            # Main Express app bootstrap
│
├── /tests                   # Unit and integration test suites
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 📦 Data Models

### 👤 User
```json
{
  _id: ObjectId,
  name: String,
  email: { type: String, unique: true },
  password: String, // bcrypt-hashed
  createdAt: Date
}
```

### 🗂️ List
```json
{
  _id: ObjectId,
  title: String,
  description: String,
  owner: { type: ObjectId, ref: 'User' },
  createdAt: Date,
  updatedAt: Date
}
```

### ✅ Task
```json
{
  _id: ObjectId,
  title: String,
  description: String,
  completed: Boolean,
  dueDate: Date,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  list: { type: ObjectId, ref: 'List' },
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Rules

### Authentication
- JWT-based with `Authorization: Bearer <token>` header
- Auth middleware verifies token and attaches user to `req.user`

### Authorization
- Users can only access or modify lists and tasks they own
- List → owner (User)
- Task → list → owner (User)

### Validation
- Validate all input (title, email, password, etc.)
- Sanitize inputs to prevent injection attacks

### Password Storage
- Hash using bcrypt with salt rounds (e.g. 10)

### Error Handling
- Centralized error middleware
- Always respond with meaningful status codes (400, 401, 403, 404, 500)

### Sensitive Data
- Never expose password or internal IDs in responses
- Remove user-related private fields from JSON responses

## 📌 MVP API Endpoints

### 🔐 Auth
- `POST /api/auth/register` → create user
- `POST /api/auth/login` → return JWT

### 🗂️ Lists
- `GET /api/lists`
- `POST /api/lists`
- `GET /api/lists/:id`
- `PUT /api/lists/:id`
- `DELETE /api/lists/:id`

### ✅ Tasks (Nested under List)
- `GET /api/lists/:listId/tasks`
- `POST /api/lists/:listId/tasks`
- `GET /api/lists/:listId/tasks/:taskId`
- `PUT /api/lists/:listId/tasks/:taskId`
- `DELETE /api/lists/:listId/tasks/:taskId`

## 🧠 AI Integration Strategy (API-Only)

### 🧱 Code Generation
Use AI tools to:
- Scaffold list/task routes and controllers
- Generate Mongoose schemas with validation
- Prompt for boilerplate like:
  “Write an Express route that returns all tasks for a list, only if the authenticated user owns the list.”

### 🧪 Testing
Generate Supertest-based integration tests:
- “Test that unauthorized users cannot access another user’s lists.”
- Unit test services: create list, update task, delete all tasks when list is deleted

### 📚 Documentation
Use AI to:
- Auto-document all routes into OpenAPI format
- Keep README updated with usage examples
- Generate inline comments/docstrings in services

### 🧠 Context-aware techniques
Feed AI your file tree and specific controller/service files when refactoring
Pass in route definitions for generating API usage examples
Use diffs to prompt for commit messages or changelogs