// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Global Variables */
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';


var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const fetch = require("node-fetch");
var FormData = require('form-data');



// Personal API Key for meaningcloud API
const apiKey = process.env.API_KEY;
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
const port = 8093;
const server = app.listen(port,listening);

// callback to debug
function listening()
{
    console.log('server running');
    console.log(`running in localhost: ${port}`);
};

const getReview_handler = async (req,res)=>
{

  const formdata = new FormData();
    formdata.append("key",apiKey);
    formdata.append("txt",req.body.article);
    formdata.append("lang", "en");
  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  }; 

    const response = await fetch(baseURL, requestOptions)
    try 
    {
      const data = await response.json();
     // console.log(data)
      return data;
    }
    catch(error) 
    {
      console.log("error", error);
      // appropriately handle the error
    }
}

// Post Route
app.post('/getReview',getReview);

function getReview(req, res)
{
   
    getReview_handler(req,res)
    .then(function(data){
      //console.log(data)
      res.send(data)
    })

}

app.post('/addReview', addReview);

function addReview (req,res)
{
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

