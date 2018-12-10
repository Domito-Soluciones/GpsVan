$(document).ready(function(){
    $("#menu").load("menu.html", function( response, status, xhr ) {
        agregarclase($("#principal"),"menu-activo");
    });    
    $("#contenido-central").load("home.html");
    getfecha();
    setInterval(function(){getfecha();},5000);
});