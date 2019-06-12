// Read the environment variable.
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { databaseService } = require('./services');
const { jwt, errorHandler } = require('./utils');
const controllers = require('./controllers');

// Create a connection to database.
const connection = databaseService.connect(process.env.DB_CONNECTION_URL);

connection.on('error', error =>
  console.log(`Error while connecting database`, error)
);

connection.on('open', () =>
  console.log('Yay!! Connected to data successfully')
);

const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

// cookies parser will add cookies to req.cookies object.
app.use(cookieParser());

// JSON Web Token middleware.
app.use(jwt());

// Middlewares to parse body and make it available to req.body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Settings up controllers for routes.
app.use(controllers);

// global error handler.
app.use(errorHandler);

// Set up server to listen at PORT
app.listen(process.env.PORT, () =>
  console.log(`Server is running at http://localhost:${process.env.PORT}`)
);
