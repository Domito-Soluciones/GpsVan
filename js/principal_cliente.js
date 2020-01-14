
/* global API_KEY, GOOGLE_MAPS_API */

var POSITION = [-33.440616, -70.6514212];

var menus = new Map();
$(document).ready(function(){
    menus.set("HOMEC","home_cliente");
    menus.set("PANELC","panel_cliente");
    menus.set("SERVICIOS","servicios");
    TIPO_USUARIO = 'CLIENTE';
    $.getScript(GOOGLE_MAPS_API+"key="+API_KEY+"&callback=initMap&libraries=places",function(){
        $("#menu").load("menu.php", function( response, status, xhr ) {
            agregarclase($("#home_cliente"),"menu-activo");
        });
    
        $("#contenido-central").load("home_cliente.html");

        getUsuario();
        getfecha();
    //    setInterval(function(){getfecha();},5000);
        $("#enlace-salir").click(function() {
            salir();
        });

    //    $("#solicitar").click(function(){
    //        crearServicio();
    //    });
    //    iniciarFecha(['#fechas']);
    //    iniciarHora(['#hora']);
    //    buscarPasajeroCliente($("#clientes").val());

        $("#menu-telefono").click(function(){
            if($("#menu-telefono").attr('src') === 'img/menu.svg')
            {
                cambiarPropiedad($("#menu"),"display","block");
                $("#menu-telefono").attr("src","img/cancelar.svg");
            }
            else
            {
                cambiarPropiedad($("#menu"),"display","none");
                $("#menu-telefono").attr("src","img/menu.svg");
            }
        });
    });

    
    
});


function initMap() {
    //$.getJSON("js/map/map_style.json", function(json) {
        var latlng = new google.maps.LatLng(POSITION[0], POSITION[1]);
        var myOptions = {
            zoom: 11,
            center: latlng,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            //,
            //styles: json
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);
        geocoder = new google.maps.Geocoder();
    //});
}
