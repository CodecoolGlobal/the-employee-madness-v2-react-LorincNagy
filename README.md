# Employee Data - Learning Project
## Overview
This project is built on the MERN (MongoDB, Express, React, Node.js) stack and is designed to manage employee data efficiently.

## Server side
### Install Dependencies
cd ./server
npm install
.env File
Copy the .env.sample as .env and fill in the environment variables with your personal MongoDB connection URL.

# Prepare the Database
bash
Copy code
cd ./server
npm run populate
The populate command will run the populate.js file as a script and generate a bunch of starter data for your database.

# Running the Code
bash
Copy code
cd ./server
npm run dev
It will start the server with nodemon, so it will watch for changes and restart the server if any of the files change.

# Testing with test.http
If you'd like to try the endpoints of the REST API, you can check the test.http file for URLs that should work in your environment. If you install the REST Client extension for VS Code, you can actually run these requests directly in your editor.

# Client side
## Install Dependencies
cd ./client
npm install
Proxy
Pay attention to the port of your REST API. By default, it will bind to port 8080, and the frontend proxy settings depend on this configuration. If you change the port of the backend for any reason, don't forget to update the proxy settings in ./client/package.json accordingly.

## Running the Code
cd ./client
npm start
The create-react-app react-scripts package will start your frontend on port 3000, and you can access it at http://localhost:3000 in your preferred browser.

# Technology Stack
## Frontend:
React
JavaScript/ES6
HTML/CSS
REST Client extension for VS Code (for testing)
## Backend:
Node.js
Express.js
MongoDB
Mongoose
This project demonstrates the use of the MERN stack to efficiently manage employee data.
