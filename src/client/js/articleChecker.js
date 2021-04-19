function checkArticle(inputText) {
    console.log("::: Running checkArticle :::", inputText);
    if(inputText == '' || inputText ==null )
    {
        alert("article is  mandatory");
        return false;
    }
    else
    {
        return true ;
    }
}

export { checkArticle }