function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);

    
    if(inputText == '' || inputText ==null )
    {
        alert("name is  mandatory");
        return false;
    }else
    {
        return true ;
    }
}

export { checkForName }
