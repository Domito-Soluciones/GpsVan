$(document).ready(function(){
    $("#menu").load("menu.html", function( response, status, xhr ) {
        agregarclase($("#principal"),"menu-activo");
    });    
    fecha = $("#fecha").append(getfecha());

});