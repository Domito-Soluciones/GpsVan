/* global google, urlBase, alertify */
var NICK_GLOBAL;
var map;
var markers = [];
var POLYLINE;
var POLYLINE_LAT = '';
var POLYLINE_LNG = '';
var POSITION = [-33.440616, -70.6514212];
var API_KEY = "AIzaSyDcQylEsZAzuEw3EHBdWbsDAynXvU2Ljzs";
var GOOGLE_MAPS_API = "https://maps.googleapis.com/maps/api/js?";
var CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
var DIRECTIONS_API = "https://maps.googleapis.com/maps/api/directions/json?";
var PLACES_AUTOCOMPLETE_API = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
var PLACES_DETAILS_API = "https://maps.googleapis.com/maps/api/place/details/json?";
var GEOCODER_API = "https://maps.googleapis.com/maps/api/geocode/json?";
var PAGINA_ANTERIOR;
var INTERVAL_SERVICIOS;
var CREADO = "0";
var EN_PROCCESO_DE_ASIGNACION = "1";
var ASIGNADO = "2";
var ACEPTADO = "3";
var EN_PROGRESO = "4";
var FINALIZADO = "5";
var CANCELADO = "6";
var servicios = new Map();
var TIPO_SERVICIO = 0;

var MENU_VISIBLE = false;

$(document).ready(function(){
    getLocation();
    $("#menu").load("menu.php", function( response, status, xhr ) {
        agregarclase($("#principal"),"menu-activo");
        
        $(".opcion-menu").mouseover(function (){
            if(!MENU_VISIBLE)
            {
                abrirTooltip("tooltip_"+$(this).attr("id"));
            }
        });
        
        $(".opcion-menu").mouseout(function (){
            cerrarTooltip("tooltip_"+$(this).attr("id"));
        });
    
    });    
    $("#contenido-central").load("home.html");
    getUsuario();
    getfecha();
    setInterval(function(){getfecha();},5000);
    $.getScript(GOOGLE_MAPS_API+"key="+API_KEY+"&callback=initMap&libraries=places",null);
    
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
    
    $("#btn_menu").click(function () {
        abrirMenu();
    });
    
    $("#enlace-salir").click(function() {
        salir();
    });
    
});

function initMap() {
    //$.getJSON("js/map/map_style.json", function(json) {
        var latlng = new google.maps.LatLng(POSITION[0], POSITION[1]);
        var myOptions = {
            zoom: 11,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP] 
            }
            //,
            //styles: json
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);
    //});
}

function decodePolyline(encoded) {
    if (!encoded) {
        return [];
    }
    var poly = [];
    var index = 0, len = encoded.length;
    var lat = 0, lng = 0;

    while (index < len) {
        var b, shift = 0, result = 0;

        do {
            b = encoded.charCodeAt(index++) - 63;
            result = result | ((b & 0x1f) << shift);
            shift += 5;
        } while (b >= 0x20);

        var dlat = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
        lat += dlat;

        shift = 0;
        result = 0;

        do {
            b = encoded.charCodeAt(index++) - 63;
            result = result | ((b & 0x1f) << shift);
            shift += 5;
        } while (b >= 0x20);

        var dlng = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
        lng += dlng;

        var p = {
            lat: lat / 1e5,
            lng: lng / 1e5
        };
        poly.push(p);
    }
    return poly;
}

    function validarServicios()
    {
        var params = {};
        var url = urlBase + "/servicio/GetServiciosPendientes.php";
        postRequest(url,params,function(response){
            var cont = $("#contenedor_servicios");
            cont.html("");
            if(response.length === 0)
            {
                cont.html("No hay servicios pendientes");
                return;
            }
            for(var i = 0; i < response.length ; i++)
            {
                var id = response[i].servicio_id;
                var cliente = response[i].servicio_cliente;
                var ruta = response[i].servicio_ruta;
                var fecha = response[i].servicio_fecha;
                var hora = response[i].servicio_hora;
                var observacion = response[i].servicio_observacion;
                if(typeof servicios.get(id) === 'undefined')
                {
                    alertify.success("nuevo servicio para asignar: "+id);
                }
                cont.append("<div class=\"pendiente\" onclick=\"abrirServicio('"+id+"','"+cliente+"','"+ruta+"','"+fecha+"','"+hora+"','"+observacion+"')\" >"+id+" - "+cliente+"</div>");
                servicios.set(id,id);                
            }
        });
    }
    
    function getLocation()
    {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords.latitude);
                POSITION = [position.coords.latitude,position.coords.longitude];
            }, function (error) {
                console.log(error);
            });
        }
    }

