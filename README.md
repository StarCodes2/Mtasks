# MTasks: Stay organized. Stay productive.

MTasks is a full-stack task manager application designed for individuals and small teams who need a simple, effective way to manage daily tasks. It allows users to register and authenticate securely, create and update tasks, and track progress in real time. The goal is to create a clean, responsive, and efficient tool that works across devices and can be expanded with collaboration and notification features in the future.

## Target Users:
- Solo professionals
- Students
- Startup teams
- Productivity enthusiasts

## Why it matters:
Managing tasks can become chaotic without a centralized and flexible system. TaskPilot keeps things simple but powerful—making it easier for users to focus on getting things done, not managing the tool itself.

## 🛠️ Tech Stack

### Frontend
- **Language**: JavaScript
- **Framework**: React
- **Routing**: React Router
- **State Management**: React Context (or Redux Toolkit if scaling)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

### Backend
- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: JWT + bcrypt
- **Environment Config**: dotenv

### Dev Tools
- **Version Control**: Git + GitHub
- **Testing**: Jest, Supertest (API)
- **Linting/Formatting**: ESLint, Prettier
- **API Testing**: Postman or Insomnia

### Deployment:
- **Frontend**: Vercel
- **Backend**: Railway, Render, or Fly.io
- **DB**: MongoDB Atlas

## 🧠 AI Integration Strategy

### ⚙️ Code Generation
Use an AI-native IDE (e.g. Continue, Cursor, or Codeium) to:
- Scaffold route handlers (CRUD for tasks)
- Auto-generate controllers and Mongoose models
- Prompt for boilerplate code: middleware, error handling, pagination
- Quickly stub out unit tests and mock data generators

### 🧪 Testing
Use AI to:
- Generate unit tests for services and controllers using prompts like:
  “Write a Jest unit test for this task service that returns all tasks belonging to a user.”
- Generate integration tests for user auth and task flow
- Prompt for edge cases and validation scenarios

### 📚 Documentation
Prompt AI to:
- Generate docstrings for functions, using a pattern like:
  “Add JSDoc to this function that creates a new task in MongoDB.”
- Generate and keep the README updated by feeding:
  - File tree
  - API route definitions
  - Setup instructions
- Summarize controller and service logic for internal dev documentation

### 🧠 Context-Aware AI Workflows
Feed AI:
- The full file tree so it understands project structure when generating or refactoring code
- API spec (OpenAPI or JSON output) to generate:
  - Frontend API clients
  - Documentation pages
- Git diffs when writing commit messages or asking for code reviews
- MongoDB schemas when prompting for validation rules, aggregation pipelines, or indexing strategy