# MTask API: Stay organized. Stay productive.

MTask API is a RESTful backend service for a task manager application. It handles user registration, authentication, and task management features like create, read, update, delete (CRUD). Built with Node.js, Express, and MongoDB, it serves as the backend for a productivity app that can later support web, mobile, and CLI clients.

## Target Users:
- Solo professionals
- Students
- Startup teams
- Productivity enthusiasts

## Why it matters:
Managing tasks can become chaotic without a centralized and flexible system. MTasks keeps things simple but powerful—making it easier for users to focus on getting things done, not managing the tool itself.

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
/taskpilot-api
│
├── /src
│   ├── /config             # DB, env, etc.
│   ├── /models             # User, List, Task
│   ├── /routes
│   │   ├── auth.routes.js
│   │   ├── lists.routes.js
│   │   └── tasks.routes.js
│   ├── /controllers        # One per resource
│   ├── /services           # Business logic
│   ├── /middlewares        # Auth, error handlers
│   ├── /utils              # Token generation, etc.
│   └── server.js
│
├── /tests
├── .env
└── package.json
```

## 📦 Data Models

### 👤 User
```json
{
  _id: ObjectId,
  name: String,
  email: String, // unique
  password: String, // hashed
  createdAt: Date
}
```

### 🗂️ List
```json
{
  _id: ObjectId,
  title: String,
  description: String,
  owner: ObjectId, // ref: User
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
  dueDate: Date,
  completed: Boolean,
  priority: String, // optional: 'low', 'medium', 'high'
  list: ObjectId, // ref: List
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Auth & Ownership Flow

User -> Lists -> Tasks

Every list is tied to a user.

Every task is tied to a list.

Users can only manage their own lists and tasks.

Middleware checks ownership:

`req.user.id === list.owner`

`task.list.owner === req.user.id`

## 📌 API Endpoints (MVP)

### 🔐 Auth
| Method | Endpoint         | Description   |
|--------|------------------|---------------|
| POST   | /api/auth/register | Create account|
| POST   | /api/auth/login  | Login, get JWT token |

### 🗂️ Lists
| Method | Endpoint         | Description   |
|--------|------------------|---------------|
| GET    | /api/lists       | Get user's lists |
| POST   | /api/lists       | Create new list |
| GET    | /api/lists/:id   | Get single list |
| PUT    | /api/lists/:id   | Update list title/desc |
| DELETE | /api/lists/:id   | Delete list + tasks |

### ✅ Tasks
| Method | Endpoint                     | Description   |
|--------|------------------------------|---------------|
| GET    | /api/lists/:listId/tasks     | Get tasks for a list |
| POST   | /api/lists/:listId/tasks     | Add task to a list |
| GET    | /api/lists/:listId/tasks/:id | Get single task |
| PUT    | /api/lists/:listId/tasks/:id | Update a task |
| DELETE | /api/lists/:listId/tasks/:id | Delete a task from a list |

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