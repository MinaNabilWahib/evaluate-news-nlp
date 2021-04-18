// Setup empty JS object to act as endpoint for all routes
projectData = {};

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);

const app = express()

const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

// Setup Server
const port = 8082;
const server = app.listen(port,listening);

// callback to debug
function listening()
{
    console.log('server running');
    console.log(`running in localhost: ${port}`);
};
// Post Route
app.post('/addReview', addReview);

function addReview (req,res)
{
    projectData.model = req.body.model;
    projectData.score_tag = req.body.score_tag;
    projectData.agreement = req.body.agreement;
    projectData.subjectivity = req.body.subjectivity;
    projectData.confidence = req.body.confidence;
    projectData.irony = req.body.irony;
    
    res.send(projectData);
    console.log(projectData);
};
//get
app.get('/all',getData)

function getData(req,res)
{
  res.send(projectData);
  console.log(projectData);
}

