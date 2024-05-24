# University Department Management Platform

![Platform Overview](https://github.com/aboussakkine-achraf/EMSIPFE/assets/114268936/a6ca20b7-1935-4c4c-ba56-31b8048f9ba9)

This article introduces our user-friendly platform designed to manage a university department. It handles various aspects including student management, coordinators, and professors. Additionally, it features an admin role for overseeing final year projects and end-of-study projects.

## Table of Contents

- [Overview](#overview)
- [Software Architecture](#software-architecture)
- [Frontend](#frontend)
- [Backend](#backend)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Video Demonstration](#video-demonstration)
- [Contributing](#contributing)

## Overview

The project is a user-friendly platform designed to manage a university department. It handles various aspects including student management, coordinators, and professors. Additionally, it features an admin role for overseeing final year projects and end-of-study projects.

## Software Architecture
![MERN Stack](https://github.com/aboussakkine-achraf/EMSIPFE/assets/114268936/9015892a-3a24-4cf8-bf13-0e909314a74f)

This project uses the MERN stack architecture, which is a powerful, full-stack JavaScript solution designed to simplify and streamline the development process of modern web applications. Comprising MongoDB, Express.js, React, and Node.js, each component of the MERN stack serves a specific purpose. MongoDB, a NoSQL database, stores application data in a flexible, JSON-like format. Express.js, a lightweight web application framework, handles server-side logic and routes. React, a popular front-end library, enables developers to build dynamic user interfaces with reusable components. Node.js, a runtime environment, allows JavaScript to be used on the server side, ensuring seamless integration between the server and client. Together, these technologies enable the creation of robust, scalable, and maintainable applications with a consistent JavaScript codebase throughout.

## Frontend

### Technologies Used

- React
- Tailwind CSS

### Frontend Project Structure

The React front-end project is organized around ten main components, each serving a specific purpose and contributing to the overall architecture and maintainability of the application.

#### 1. ABOUT US Component

- **Purpose:** The ABOUT US component is responsible for showing data about contributors of the application.
- **Functionality:** Users can view developer information of the application.

#### 2. CONTACT Component

- **Purpose:** The CONTACT component focuses on retrieving and displaying a form where users can send messages to the admin of the application.
- **Functionality:** Users can send messages to the admin of the application.

#### 3. ADMIN Component

- **Purpose:** The ADMIN component manages administrative tasks within the application.
- **Functionality:** Add users, add companies, and manage final year projects (PFEs).

#### 4. COORDINATEUR Component

- **Purpose:** The COORDINATEUR component handles the modification of existing data or entities related to coordinators.
- **Functionality:** Validate final year project (PFE) subjects.

#### 5. ETUDIANT Component

- **Purpose:** The ETUDIANT component manages student-related functionalities.
- **Functionality:** Register for a final year project (PFE) and view the list of available PFEs.

#### 6. ENSEIGNANT Component

- **Purpose:** The ENSEIGNANT component manages professor-related functionalities.
- **Functionality:** Supervise subjects validated by coordinators.

### Routing

- **React Router:** The React Router is utilized to navigate between the different components, ensuring a seamless user experience.

### Styling

- **Tailwind CSS:** The project uses Tailwind CSS for styling, allowing for a highly customizable and responsive design.

### Dependencies

List the main dependencies for the frontend along with their versions.

```json
"dependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "tailwindcss": "^3.0.0"
},
"devDependencies": {
  "autoprefixer": "^10.0.0",
  "postcss": "^8.0.0"
}
```

## Backend

### Technologies Used

- Node.js
- Express.js
- MongoDB

### Backend Project Structure

The backend is organized into various modules, each responsible for different functionalities of the application.

#### 1. User Management

- **Purpose:** Handles user registration, login, and authentication.
- **Functionality:** Implements secure user authentication using JWT, manages user roles and permissions.

#### 2. Entreprise Management

- **Purpose:** Manages Entreprise .
- **Functionality:** Allows the creation  of entreprise and assigne this PFE's.

#### 3. PFEs Management

- **Purpose:** Manages data related to PFEs.
- **Functionality:** create PFE and asign it to student and enseignant.

### Routing

- **Express Router:** Manages API routes, directing requests to appropriate handlers.

### Dependencies

List the main dependencies for the backend along with their versions.

```json
"dependencies": {
  "bcryptjs": "^2.4.3",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.0",
  "mongoose": "^7.2.1",
  "multer": "^1.4.5-lts.1",
  "nodemailer": "^6.9.3"
},
"devDependencies": {
  "nodemon": "^2.0.22",
  "string-similarity": "^4.0.4"
}
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/aboussakkine-achraf/EMSIPFE.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd EMSIPFE
   ```
3. **Install dependencies for frontend and backend:**
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
4. **Start the development servers:**
   ```sh
   cd frontend
   npm start
   cd ../backend
   npx nodemon index.js
   ```

## Folder Structure

Describe the folder structure of the project, highlighting key directories and files.

## Dependencies

List the main dependencies for the entire project along with their versions.

## Video Demonstration

Provide a link to a video demonstration of the project.

## Contributing

We welcome contributions from everyone, and we appreciate your help to make this project even better! If you would like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear and descriptive messages.
4. Push your changes to your forked repository.
5. Open a pull request to the main repository.

## Contributors

- Aboussakkine Achraf ([GitHub](https://github.com/aboussakkine-achraf))
- Tebaa Bader ([GitHub](https://github.com/badrtebaa))
- Abderrafie El Fakir ([GitHub](https://github.com/Abderrafie1))
- Mohamed Amine Esssaoud ([GitHub](https://github.com/amin12398))
- Mohamed Lachgar ([ResearchGate](https://www.researchgate.net/profile/Mohamed-Lachgar))
