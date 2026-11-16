\# College Productivity Manager



\## About the Project



The College Productivity Manager is a web application that I am building to help college students stay organized. It allows students to keep track of assignments, courses, deadlines, and group projects all in one place.



The main goal is to make it easier for students to manage their schoolwork and keep up with everything they need to get done.



\## Technologies Used



\- \*\*Frontend:\*\* React, JavaScript, CSS, and Vite

\- \*\*Backend:\*\* Node.js and Express

\- \*\*Database:\*\* PostgreSQL

\- \*\*Testing:\*\* Jest



\## Main Features



\- \*\*Assignments:\*\* Add, view, complete, and delete assignments.

\- \*\*Courses:\*\* Add and manage college courses.

\- \*\*Dashboard:\*\* See an overview of assignments and other school information.

\- \*\*Calendar:\*\* Keep track of upcoming and overdue assignments.

\- \*\*Group Projects:\*\* Create group projects and keep track of their tasks.

\- \*\*Database:\*\* Save assignment information so it is still there after refreshing the website.



\## How the Application Is Organized



The backend uses the Model-View-Controller (MVC) design pattern. This helps keep the code organized and gives each part of the application its own job.



\- \*\*Model:\*\* Handles information stored in the database.

\- \*\*View:\*\* The part of the application that users see and interact with.

\- \*\*Controller:\*\* Handles requests from the frontend and sends back responses.

\- \*\*Service:\*\* Handles the main logic for different features.

\- \*\*Routes:\*\* Connect requests to the correct controller functions.



I chose this setup because it keeps everything from being placed in one file and makes the project easier to work on as more features are added.



More details about the architecture can be found in `docs/architecture.md`.



\## Project Structure



```text

College-Productivity-Manager

├── client

│   └── src

│       ├── App.jsx

│       ├── App.css

│       ├── index.css

│       └── services

│           └── assignmentService.js

├── docs

│   └── architecture.md

├── server

│   ├── src

│   │   ├── config

│   │   ├── controllers

│   │   ├── models

│   │   ├── routes

│   │   ├── services

│   │   └── index.js

│   └── tests

│       └── assignmentService.test.js

├── tests

├── .gitignore

└── README.md

```



\## How to Run the Application



\### Start the Backend



Open a terminal and go into the server folder:



```bash

cd server

```



Install the required packages if needed:



```bash

npm install

```



Start the backend:



```bash

npm run dev

```



The backend runs at `http://localhost:3000`.



\### Start the Frontend



Open another terminal and go into the client folder:



```bash

cd client

```



Install the required packages if needed:



```bash

npm install

```



Start the frontend:



```bash

npm run dev

```



Open the local address provided by Vite, usually `http://localhost:5173`.



\## Database



The project uses PostgreSQL to store assignment information. The backend connects to the database using settings saved in `server/.env`.



The assignments table currently stores:

\- Assignment ID

\- Assignment title

\- Due date

\- Whether the assignment is completed

\- When the assignment was created



The `.env` file is not uploaded to GitHub because it contains private database information.



\## Testing



I used Jest to set up unit testing for the backend. The goal is to make sure the important parts of the application work correctly and catch problems before they become bigger issues.



\### What I Tested



The assignment service tests check that:



\- All assignments can be retrieved.

\- New assignments can be created.

\- Extra spaces are removed from assignment titles.

\- Empty assignment titles are rejected.

\- Titles containing only spaces are rejected.

\- Errors when loading assignments are handled.

\- Errors when creating assignments are handled.

\- Assignment completion status can be updated.

\- Assignments can be deleted.



I used mock database functions so the tests can check the assignment service without needing to connect to the actual PostgreSQL database.



\### How to Run the Tests



Open a terminal in the server folder:



```bash

cd server

```



Run:



```bash

npm test

```



The project currently has 9 unit tests, and all 9 passed during testing.



\## GitHub and Version Control



I use Git and GitHub to keep track of changes to the project. I create separate branches when working on new features and use pull requests to merge completed work into the main branch.



This helps keep the project organized and makes it easier to go back and review changes.



\## Future Improvements



Some things I would like to add or improve as I continue working on the project include:



\- Adding user accounts and login functionality.

\- Improving the calendar.

\- Adding more information to courses.

\- Expanding the group project features.

\- Writing more tests for the frontend and backend.

\- Improving error handling and security.

