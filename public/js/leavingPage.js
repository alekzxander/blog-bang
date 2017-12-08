window.onbeforeunload = () => {
    if(contentInPage){
        alert("Vous êtes sur le point de quitter la page sans sauvegarder");
    }
    
    return undefined;
}