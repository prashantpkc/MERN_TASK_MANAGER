Task Management Application Overview

Welcome to the Task Management Application! This project is a full-stack web application designed to help users manage tasks efficiently. Built with the MERN stack (MongoDB, Express.js, React.js, and Node.js), it supports user authentication, task CRUD operations, and various filtering and sorting options.

Features:

- User Authentication: Secure user registration and login with JWT (JSON Web Tokens)
- Task Management: Create, read, update, and delete tasks easily
- Task Filtering and Sorting: Filter and sort tasks based on different criteria
- Responsive Design: The application is fully responsive and works seamlessly on various devices
- Form Validation: Comprehensive validation for both user registration/login and task management forms


Technology Stack:

- Frontend: React.js for a dynamic and interactive user interface
- Backend: Node.js with Express.js to handle server-side logic and API endpoints
- Database: MongoDB for efficient data storage and retrieval
- Authentication: JWT for secure user authentication
- Testing: Includes unit tests for both backend and frontend components
- Version Control: Git for managing and tracking changes in the project

Prerequisites:

- Node.js
- npm or yarn
- MongoDB

Setup Instructions:

Backend Setup:

1. Clone the repository to your local machine: git clone <repository-url>
2. Navigate to the backend directory: cd <project-directory>/backend
3. Install the necessary dependencies: npm install
4. Create a .env file in the backend directory with the following environment variables:
    - MONGO_URI=<your-mongodb-uri>
    - JWT_SECRET=<your-jwt-secret>
5. Start the backend server: npm run dev

Frontend Setup:

1. Navigate to the frontend directory: cd ../frontend
2. Install the necessary dependencies: npm install
3. Start the frontend server: npm start

API Endpoints:

- User Registration: POST /api/auth/register - Register a new user
- User Login: POST /api/auth/login - Log in an existing user
- Get Tasks: GET /api/tasks - Retrieve a list of tasks
- Create Task: POST /api/tasks - Add a new task
- Update Task: PUT /api/tasks/:id - Update an existing task by ID
- Delete Task: DELETE /api/tasks/:id - Remove a task by ID

Unit Tests:

- Backend Tests: Run tests for the backend by navigating to the backend directory and using npm test
- Frontend Tests: Run tests for the frontend by navigating to the frontend directory and using npm test

Deployment:

- The application is deployed and can be accessed via this link

Acknowledgments:

- MERN Stack Documentation: Comprehensive resources for learning and implementing the MERN stack
- JWT Documentation: Information on using JSON Web Tokens for authentication
- MongoDB Documentation: Resources for working with MongoDB
- React Documentation: Official documentation for React
- Express Documentation: Guides and references for using Express.js

Thank you for checking out the Task Management Application!