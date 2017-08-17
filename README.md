# Structures: A Customizable CMS

## About
This is my final project for CS-546: Web Programming. This web application allows the admins of the application to create custom data structures and then create, update, and delete entries of these structures. Admins and regular users will then be able to add comments to these structures and their entries.

## Implementation
This is a full stack web application written entirely in Typescript. The server code uses Node and Express to serve the client as well as to communicate with the MongoDB database. The client uses React as its view library with JSX and inline styles to keep the UI code expressive and powerful. The inline styles also use Radium so that psuedo-classes and media queries can be used. The application state is managed using Redux.

## To get started:
- Clone this project to a local directory of your choosing
- `cd structures-cms` or wherever the project is saved
- `npm install` to install all package dependencies
- For a dev environment
  - `npm start` to start the server and create a dev build with webpack middleware
- For a prod environment
  - `npm run build` to make a production build that is outputted to the `dist` folder
  - `npm run start:prod` to start the server and point it to the dist folder
