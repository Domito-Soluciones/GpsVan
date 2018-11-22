$(document).ready(function(){
    $("#cabecera").load("html/cabecera.html");
    $("#menu").load("html/menu.html", function( response, status, xhr ) {
        agregarclase($("#contratos"),"menu-activo");
    });
    
    $("#upload_link").click(function(e){
        e.preventDefault();
        $("#upload:hidden").trigger('click');
    });
    
});