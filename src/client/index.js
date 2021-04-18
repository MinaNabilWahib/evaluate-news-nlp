
import './styles/style.scss'



// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */
function performAction(e)
{
    const article = document.getElementById('Article').value;
    if(article == '')
    {
        alert("No article was entered please enter an article");
    }else
    {
        postData('/getReview',{article:article})
      // getReview(baseURL,apiKey,article)
        .then(function(data)
        {
            // Add data
            //console.log(data);
            postData('/addReview', {model: data.model,score_tag: data.score_tag,agreement: data.agreement,subjectivity: data.subjectivity,confidence: data.confidence, irony: data.irony} );
            updateUI()
        })
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
      document.getElementById('model').innerHTML = 'model is:  '+allData.model;
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


