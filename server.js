// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = process.env.PORT || 3000;
const server = app.listen(port, listening);

function listening() {
    console.log(`Listening on Port: ${port}`)
}

// GET route
// Return Endpoint Data
app.get('/sendData', sendData);

function sendData (request, response) {
    response.send(projectData);
};

// POST route
app.post('/addData', addData);

function addData (request,response) {
    projectData.Date = request.body.Date;
    projectData.Temerature = request.body.Temerature;
    projectData.Feeling = request.body.Feeling;
};