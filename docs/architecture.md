# Application Architecture

## Overview
The College Productivity Manager is a web application designed to help college students keep track of their assignments, courses, deadlines, and group projects. The application uses React for the frontend, Node.js and Express for the backend, and PostgreSQL for storing information.

## Design Pattern: MVC
For this project, I decided to use the Model-View-Controller (MVC) design pattern. This helps keep the code organized by giving different parts of the application their own responsibilities.

- **Model:** Handles the database and the information stored in it. For example, the assignment model is responsible for adding, viewing, updating, and deleting assignments.
- **View:** This is the frontend of the application. It is built with React and is what the user sees and interacts with.
- **Controller:** Handles requests from the frontend and sends back the correct responses.
- **Service:** Handles the main logic of the application, such as making sure an assignment has a title before it is added.
- **Routes:** Connect the different API requests to the correct controller functions.

## Project Organization

The project is separated into two main folders:

### Client
The client folder contains the React frontend. This includes the main application, styling, and other parts of the user interface.

### Server
The server folder contains the backend code and is organized into smaller folders:

- `config`: Contains the database connection setup.
- `controllers`: Handles requests coming from the frontend.
- `models`: Handles database operations.
- `routes`: Sets up the API endpoints.
- `services`: Contains the logic used by the application.

## Database
PostgreSQL is used to store application information. The backend connects to the database using the `pg` package. Currently, the application has an assignments table that stores assignment titles, due dates, completion status, and when each assignment was created.

## Why I Chose This Structure
I chose this structure because it keeps the different parts of the application separate instead of putting everything into one file. It makes the code easier to understand and should make it easier to add more features as the project grows. Using MVC also helps keep database operations, application logic, and the frontend from getting mixed together.

## How Everything Works Together
The user interacts with the React frontend. When information needs to be saved or retrieved, the frontend sends a request to the Express backend. The backend uses the routes, controllers, services, and models to process the request and communicate with the PostgreSQL database. The backend then sends a response back to the frontend.
