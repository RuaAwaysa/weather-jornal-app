// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 8000 ;
const exp = require('constants');
// Require Express to run server and routes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const server = app.listen(port, () => {
    console.log("Server is running on port " + port);
});

// Setup Server
app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    const newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
    projectData = newEntry;
    res.send(projectData);
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/website/index.html');
});
