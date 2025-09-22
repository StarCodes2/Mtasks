# MTasks API

## Project Overview

MTasks API is a backend service for managing task lists and individual tasks. It allows users to register, log in, create task lists, and manage tasks within each list. The API enforces authentication and strict resource ownership, making it secure and multi-user-ready.

**Goals:**
- RESTful API for user-authenticated task management
- Modular codebase for easy scaling and testing
- Strong validation, authorization, and documentation practices

## Technology Stack

### Backend
- **Language:** JavaScript (Node.js)
- **Runtime:** Node.js 18+
- **Framework:** Express.js

### Database
- **Database:** MongoDB
- **ODM:** Mongoose

### Authentication
- JWT (access token in `Authorization: Bearer <token>` header)
- bcrypt (password hashing)

### Validation
- `express-validator` or `zod`

### Testing
- Jest (unit tests)
- Supertest (integration tests)

### Dev Tools
- nodemon (dev auto-reload)
- dotenv (env vars)
- Postman or Insomnia (API testing)
- ESLint + Prettier (linting & formatting)

### Deployment
- **Backend:** Render, Railway, or Fly.io
- **Database:** MongoDB Atlas

## File Structure
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

## MongoDB Schema Models

### User
```json
{
  _id: ObjectId,
  name: String,
  email: { type: String, unique: true },
  password: String, // bcrypt-hashed
  createdAt: Date
}
```

### List
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

### Task
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

## Security Rules

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

## MVP API Endpoints

### Auth
- `POST /api/auth/register` → create user
- `POST /api/auth/login` → return JWT

### Lists
- `GET /api/lists`
- `POST /api/lists`
- `GET /api/lists/:id`
- `PUT /api/lists/:id`
- `DELETE /api/lists/:id`

### Tasks (Nested under List)
- `GET /api/lists/:listId/tasks`
- `POST /api/lists/:listId/tasks`
- `GET /api/lists/:listId/tasks/:taskId`
- `PUT /api/lists/:listId/tasks/:taskId`
- `DELETE /api/lists/:listId/tasks/:taskId`