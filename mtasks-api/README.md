# MTasks API

**MTasks API** is a robust and secure backend service designed to manage user authentication, task lists, and individual tasks. Built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**, it provides a RESTful interface for a multi-user task management application. This API enforces strict authentication and authorization rules, ensuring users can only access and manage their own resources.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWTs.
- **Task List Management**: Create, retrieve, update, and delete task lists.
- **Task Management**: Comprehensive CRUD operations for tasks within specific lists.
- **Ownership Enforcement**: Strict authorization ensuring users only interact with their own data.
- **Data Validation**: Robust input validation to maintain data integrity.
- **Secure Passwords**: Industry-standard bcrypt hashing for password storage.
- **Centralized Error Handling**: Consistent API responses for errors.
- **Modular Design**: Clean architecture for scalability and maintainability.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT, bcrypt
- **Validation**: `express-validator` (or `zod`)
- **Testing**: Jest, Supertest
- **Environment**: `dotenv`
- **Development**: `nodemon`

## 📂 Project Structure

The project follows a modular structure to separate concerns and enhance maintainability:

```
mtasks-api/
├── /src
│   ├── /config              # Configuration files (e.g., MongoDB, environment variables)
│   ├── /models              # Mongoose schemas for User, List, and Task
│   ├── /routes              # Express route definitions for API endpoints
│   ├── /controllers         # Business logic and request handling for routes
│   ├── /services            # Service layer for data access and complex logic
│   ├── /middlewares         # Express middleware (e.g., authentication, error handling)
│   ├── /utils               # Utility functions (e.g., JWT helpers, loggers)
│   └── server.js            # Main Express application entry point
├── /tests                   # Unit and integration tests
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## ⚙️ Setup and Installation

To get the MTasks API up and running on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone <repository_url>
cd mtasks-api
```

### 2. Install Dependencies

```bash
npm install
# or yarn install
```

### 3. Environment Variables

Create a `.env` file in the project root with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

- `PORT`: The port on which the server will run (e.g., `5000`).
- `MONGODB_URI`: Your MongoDB connection string. For local development, this might be `mongodb://localhost:27017/mtasks`. For production, use a MongoDB Atlas URI.
- `JWT_SECRET`: A strong, random string used to sign JWTs. Generate a complex one.
- `JWT_EXPIRES_IN`: The expiration time for JWTs (e.g., `1h`, `7d`).

### 4. Run the Application

To start the development server with `nodemon`:

```bash
npm run dev
```

To start the application in production mode:

```bash
npm start
```

The API will be running at `http://localhost:PORT` (e.g., `http://localhost:5000`).

## 📝 API Documentation

Detailed API endpoint documentation, including request/response formats and examples, will be generated using OpenAPI (Swagger/Postman Documentation).


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

## 📝 API Endpoints

#### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user and receive a JWT.

#### Task Lists
- `GET /api/lists`: Get all task lists for the authenticated user.
- `POST /api/lists`: Create a new task list.
- `GET /api/lists/:id`: Get a specific task list by ID.
- `PUT /api/lists/:id`: Update a specific task list by ID.
- `DELETE /api/lists/:id`: Delete a specific task list by ID.

#### Tasks
- `GET /api/lists/:listId/tasks`: Get all tasks for a specific task list.
- `POST /api/lists/:listId/tasks`: Create a new task within a specific task list.
- `GET /api/lists/:listId/tasks/:taskId`: Get a specific task by ID within a task list.
- `PUT /api/lists/:listId/tasks/:taskId`: Update a specific task by ID within a task list.
- `DELETE /api/lists/:listId/tasks/:taskId`: Delete a specific task by ID within a task list.

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