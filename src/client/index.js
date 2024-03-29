
import './styles/style.scss'

import {checkArticle} from "./js/articleChecker"



// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */
function performAction(e)
{
    const article = document.getElementById('Article').value;
    if(checkArticle(article))
    {
        try{
              postData('/getReview',{article:article})
          // getReview(baseURL,apiKey,article)
              .then(function(data)
              {
                  // Add data
                  //console.log(data);
                  if(typeof data !== "undefined")
                  {
                    try{
                    postData('/addReview', {score_tag: data.score_tag,agreement: data.agreement,subjectivity: data.subjectivity,confidence: data.confidence, irony: data.irony} );
                    updateUI()
                    }
                    catch(error){
                      console.log("error", error);
                    }
                    
                  }
                
              })
        }catch(error)
        {
          console.log("error", error);
        }
    }
      
}


/* Function to POST data */
const postData = async ( url = '', data = {})=>
{
    console.log(data);
      const response = await fetch(url,
      {
        method: 'POST', 
        credentials: 'same-origin',
        headers: 
        {
            'Content-Type': 'application/json',
        },
      // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
      });

      try 
      {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) 
      {
        console.log("error", error);
      }
  }
  

//update data in website
const updateUI = async () => 
{
    const request = await fetch('/all');
    try
    {
      const allData = await request.json();
      document.getElementById('score_tag').innerHTML = 'score_tag:  '+allData.score_tag;
      document.getElementById('agreement').innerHTML = 'agreement is:  '+allData.agreement;
      document.getElementById('subjectivity').innerHTML = 'subjectivity is:  '+allData.subjectivity;
      document.getElementById('confidence').innerHTML = 'confidence is:  '+allData.confidence;
      document.getElementById('irony').innerHTML = 'irony is:  '+allData.irony;
      
  
    }
    catch(error)
    {
      console.log("error", error);
    }
}



// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}


