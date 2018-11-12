$(document).ready(function(){
    $("#cabecera").load("html/cabecera.html");
    $("#menu").load("html/menu.html", function( response, status, xhr ) {
        agregarclase($("#liquidaciones"),"menu-activo");
    });
    
});