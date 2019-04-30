#Qraft

 - - - -

##Project Brief
A group project to design a full-stack React app with a NoSQL database.

##Timeframe
7 days

##Technologies used
HTML5
SASS/SCSS
JavaScript (ES6)
React
Webpack
PostgreSQL
SQLAlchemy
Python 3.7
Flask
Git/GitHub
React Semantic UI

##Deployed web app
qraft.herokuapp.com

##Code Installation
Clone or download the repo
Install yarn (and pipenv) in Terminal
Launch a flask server yarn serve:flask
Launch Webpack to watch the front-end yarn serve:react

###Overview

Qraft is a full stack web application for furniture makers to showcase DIY or handmade pieces. A 'qraft' is a moniker for pieces of furniture uploaded by the user for the site.

Users who are logged in can access more of the app's functionality including:

  - View user profile
  - View details about
  - Edit personal profile details
  - Post, edit or delete a qraft
  - Follow furniture makers and contact them for custom orders.
  - Leave comments about pieces of furniture

##Development process

###BackEnd

The backend of the application was created with Python SQL toolkit, SQLAlchemy to interact with the database. Python-based framework Flask was used to handle RESTful HTTP requests.

Flask methods such as Blueprint was used to register routing logic to the application. Flask g was used as to store the current user logged into the application.

As data retrieved from the PostgreSQL database via SQLAlchemy were objects, the Flask Marshmallow library was used for serialising models into JSON strings. Marshmallow could then be used for validating schemas and formatting data such as timestamps.

Authentification

Backend authentification was created with a @secure_route function which checked for a valid JSON web token (JWT) on some of the routes. To do this we first had to hash passwords with BCrypt and store it in the database so that BCrypt could compare it against the password given when logging in. We used a hybrid property to securely receive the plain-text password from the user for hashing without storing it in the database. We then added a generate_token function to the user model, which we could invoke on the login route. The secure route function could then get the Authorization header, extract the token from it, decode the token and add the user's sub property (the user id from the payload) to the universal g object that Flask makes available across the app.
