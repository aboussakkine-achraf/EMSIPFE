# University Department Management Platform

![image](https://github.com/aboussakkine-achraf/EMSIPFE/assets/114268936/a6ca20b7-1935-4c4c-ba56-31b8048f9ba9)

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

The project is about our user-friendly platform designed to manage a university department. It handles various aspects including student management, coordinators, and professors. Additionally, it features an admin role for overseeing final year projects and end-of-study projects.

## Software Architecture
![mern-stack-b9q1kbudz0](https://github.com/aboussakkine-achraf/EMSIPFE/assets/114268936/9015892a-3a24-4cf8-bf13-0e909314a74f)

This project uses the MERN stack architecture, which is a powerful, full-stack JavaScript solution designed to simplify and streamline the development process of modern web applications. Comprising MongoDB, Express.js, React, and Node.js, each component of the MERN stack serves a specific purpose. MongoDB, a NoSQL database, stores application data in a flexible, JSON-like format. Express.js, a lightweight web application framework, handles server-side logic and routes. React, a popular front-end library, enables developers to build dynamic user interfaces with reusable components. Node.js, a runtime environment, allows JavaScript to be used on the server side, ensuring seamless integration between the server and client. Together, these technologies enable the creation of robust, scalable, and maintainable applications with a consistent JavaScript codebase throughout.

## Frontend

### Technologies Used

- Angular
- Tailwind CSS

### Frontend Project Structure

The Angular front-end project is organized around ten main components, each serving a specific purpose and contributing to the overall architecture and maintainability of the application.

#### 1. ABOUT US Component

- **Purpose:** The ABOUT US component is responsible for showing data about contributors of the application.
- **Functionality:** Users can view developer information of the application.

#### 2. CONTACT Component

- **Purpose:** The CONTACT component focuses on retrieving and displaying a form where users can send messages to the admin of the application.
- **Functionality:** Users can send messages to the admin of the application.

#### 3. ADMIN Component

- **Purpose:** The ADMIN component manages administrative tasks within the application.
- **Functionality:** It aggregates data from various sources and presents it in a visually appealing and informative manner.

#### 4. COORDINATEUR Component

- **Purpose:** The COORDINATEUR component handles the modification of existing data or entities related to coordinators.
- **Functionality:** Users can access and edit information, with changes reflected in real-time or upon submission.

#### 5. ETUDIANT Component

- **Purpose:** The ETUDIANT component acts as the main entry point of the application for students, providing a landing page or initial interface.
- **Functionality:** It includes navigation links, welcome messages, or any other content to guide students through the application.

#### 6. ENSEIGNANT Component

- **Purpose:** The ENSEIGNANT component manages information related to professors.
- **Functionality:** It provides functionalities for professors to interact with the system, such as viewing and managing their courses and students.

### Routing

- **Angular Router:** The Angular Router is utilized to navigate between the different components, ensuring a seamless user experience.

### Styling

- **Tailwind CSS:** The project uses Tailwind CSS for styling, allowing for a highly customizable and responsive design.

### Dependencies

List the main dependencies for the frontend along with their versions.

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

#### 2. Project Management

- **Purpose:** Manages final year projects and end-of-study projects.
- **Functionality:** Allows the creation, modification, and deletion of projects, assigns projects to students and coordinators.

#### 3. Data Management

- **Purpose:** Manages data related to students, professors, and coordinators.
- **Functionality:** Provides CRUD operations for student, professor, and coordinator data.

### Routing

- **Express Router:** Manages API routes, directing requests to appropriate handlers.

### Dependencies

List the main dependencies for the backend along with their versions.

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
   npm start
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
