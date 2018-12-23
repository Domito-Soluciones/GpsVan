/* global google */
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
var PLACES_API = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";

$(document).ready(function(){
    $("#menu").load("menu.html", function( response, status, xhr ) {
        agregarclase($("#principal"),"menu-activo");
    });    
    $("#contenido-central").load("home.html");
    getUsuario();
    getfecha();
    setInterval(function(){getfecha();},5000);
    $.getScript(GOOGLE_MAPS_API+"key="+API_KEY+"&callback=initMap",null);
    
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
    
    $("#enlace-salir").click(function() {
        salir();
    });
    
});

function initMap() {
    var latlng = new google.maps.LatLng(POSITION[0], POSITION[1]);
    var myOptions = {
        zoom: 11,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: { 
            mapTypeIds: [google.maps.MapTypeId.ROADMAP] 
        } 
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
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