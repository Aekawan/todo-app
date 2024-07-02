
# Todo App with Authentication

This project demonstrates how to create a Todo application with authentication using Next.js, React, and Tailwind CSS. It includes features such as login, fetching todos, creating, updating, and deleting todos.

## Demo

- Demo Link: <https://todo-app-lime-five.vercel.app>
- Username: admin
- Password: password

<img src="https://raw.githubusercontent.com/Aekawan/todo-app/main/screenshot/2.png?raw=true" alt="ToDo" width="300"/>

## Features

- User authentication with JWT
- Protected routes for authenticated users
- CRUD operations for todos
- Server-side rendering (SSR)
- Form validation using React Hook Form
- Responsive design using Tailwind CSS

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Step-by-Step Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/Aekawan/todo-app.git>
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or if you prefer yarn

   ```bash
   yarn install
   ```

## Running the App

1. Start the development server:

  ```bash
   npm run dev

# or

   yarn dev
  ```

## API Endpoints

I have created an API for testing the Todo app. You can view it at <https://github.com/Aekawan/todo-app-api>.

```bash
- POST /auth/login: Authenticates a user and returns a JWT token.
Request body: { "username": "admin", "password": "password" }

- GET /todos/: Fetches all todos.

- GET /todos/:id: Fetches a single todo by ID.

- POST /todos/: Creates a new todo.
Request body: { "title": "My todo", "description": "I'm gonna create some todo list", "icon": "shopping", "date": "2024-07-10", "time": "19:19" }

- PUT /todos/:id: Updates an existing todo.
Request body: { "title": "Update todo", "description": "Update new description", icon: "gift", "date": "2024-07-01", "time": "19:00"  }
```

## Authentication

Create an account at <https://todo-app-api-ochre.vercel.app/users>.

To create an account using the provided API via curl, you can use the following command. Replace username and password with the actual credentials you want to use.

```bash
curl -X POST https://todo-app-api-ochre.vercel.app/users \
-H "Content-Type: application/json" \
-d '{"username": "your-username", "password": "your-password"}'

```

Use the credentials to log in via the login form.
Upon successful login, a JWT token will be stored in cookies.
The token will be included in the headers for all subsequent API requests to protected routes.

## Protected Routes

The todos page is protected and can only be accessed by authenticated users. The authentication status is checked on the server side using the requireAuth utility function.

## Form Validation

Form validation is handled using React Hook Form. Error messages are displayed for required fields.

## Environment Variables

```bash
# .env
# The base URL for your API
NEXT_PUBLIC_API_BASE_URL=https://todo-app-api-ochre.vercel.app

# Other environment-specific variables can be added here
# For example, if you have a secret key or other API endpoints
```

## Screenshots

<img src="https://raw.githubusercontent.com/Aekawan/todo-app/main/screenshot/1.png?raw=true" alt="ToDo" width="300"/>

<img src="https://raw.githubusercontent.com/Aekawan/todo-app/main/screenshot/2.png?raw=true" alt="ToDo" width="300"/>

<img src="https://raw.githubusercontent.com/Aekawan/todo-app/main/screenshot/3.png?raw=true" alt="ToDo" width="300"/>

<img src="https://raw.githubusercontent.com/Aekawan/todo-app/main/screenshot/4.png?raw=true" alt="ToDo" width="300"/>

<img src="https://raw.githubusercontent.com/Aekawan/todo-app/main/screenshot/5.png?raw=true" alt="ToDo" width="300"/>

<img src="https://raw.githubusercontent.com/Aekawan/todo-app/main/screenshot/6.png?raw=true" alt="ToDo" width="300"/>

<img src="https://raw.githubusercontent.com/Aekawan/todo-app/main/screenshot/7.png?raw=true" alt="ToDo" width="300"/>

<img src="https://raw.githubusercontent.com/Aekawan/todo-app/main/screenshot/8.png?raw=true" alt="ToDo" width="300"/>

<img src="https://raw.githubusercontent.com/Aekawan/todo-app/main/screenshot/9.png?raw=true" alt="ToDo" width="300"/>

<img src="https://raw.githubusercontent.com/Aekawan/todo-app/main/screenshot/10.png?raw=true" alt="ToDo" width="300"/>
