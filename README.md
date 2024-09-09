## Task Management Application Overview

Welcome to the Task Management Application! This project is a full-stack web application designed to help users manage tasks efficiently. Built with the MERN stack (MongoDB, Express.js, React.js, and Node.js), it supports user authentication, task CRUD operations, and various filtering and sorting options. Additionally, it utilizes WebSockets for real-time notifications to keep users informed about task updates.

### Features:

- **User Authentication**: Secure user registration and login with JWT (JSON Web Tokens)
- **Task Management**: Create, read, update, and delete tasks easily
- **Task Filtering and Sorting**: Filter and sort tasks based on different criteria
- **Real-Time Notifications**: Receive real-time updates on task changes using WebSockets
- **Responsive Design**: The application is fully responsive and works seamlessly on various devices
- **Form Validation**: Comprehensive validation for both user registration/login and task management forms

### Technology Stack:

- **Frontend**: React.js for a dynamic and interactive user interface
- **Backend**: Node.js with Express.js to handle server-side logic and API endpoints
- **Database**: MongoDB for efficient data storage and retrieval
- **Authentication**: JWT for secure user authentication
- **Real-Time Communication**: WebSockets for real-time notifications
- **Testing**: Includes unit tests for both backend and frontend components
- **Version Control**: Git for managing and tracking changes in the project

### Prerequisites:

- Node.js
- npm or yarn
- MongoDB

### Setup Instructions:

**Backend Setup:**

1. Clone the repository to your local machine: `git clone https://github.com/prashantpkc/MERN_TASK_MANAGER.git`
2. Navigate to the backend directory: `cd <project-directory>/backend`
3. Install the necessary dependencies: `npm install`
4. Create a `.env` file in the backend directory with the following environment variables:
    - `MONGO_URI=<your-mongodb-uri>`
    - `ACCESS_TOKEN_SECRET=<your-jwt-secret>`
5. Start the backend server: `npm run dev`

**Frontend Setup:**

1. Navigate to the frontend directory: `cd ../frontend`
2. Install the necessary dependencies: `npm install`
3. Start the frontend server: `npm start`

### API Endpoints:

- **User Registration**: POST `/api/auth/register` - Register a new user
- **User Login**: POST `/api/auth/login` - Log in an existing user
- **Get Tasks**: GET `/api/tasks` - Retrieve a list of tasks
- **Create Task**: POST `/api/tasks` - Add a new task
- **Update Task**: PUT `/api/tasks/:id` - Update an existing task by ID
- **Delete Task**: DELETE `/api/tasks/:id` - Remove a task by ID

### Unit Tests:

- **Backend Tests**: Run tests for the auth controller using `npm test`
- **Frontend Tests**: Run tests for the login form using `npm test`

### Deployment:

- The application is deployed on GitHub and can be accessed via this link: [https://github.com/prashantpkc/MERN_TASK_MANAGER.git](https://github.com/prashantpkc/MERN_TASK_MANAGER.git)

### Acknowledgments:

- **MERN Stack Documentation**: Comprehensive resources for learning and implementing the MERN stack
- **JWT Documentation**: Information on using JSON Web Tokens for authentication
- **MongoDB Documentation**: Resources for working with MongoDB
- **React Documentation**: Official documentation for React
- **Express Documentation**: Guides and references for using Express.js
- **WebSocket Documentation**: Resources for implementing WebSockets for real-time communication

Thank you for checking out the Task Management Application!
