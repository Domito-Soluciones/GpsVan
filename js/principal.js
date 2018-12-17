/* global google */
var map;
var markers = [];
var flightPath;
var position = [-33.440616, -70.6514212];
$(document).ready(function(){
    $("#menu").load("menu.html", function( response, status, xhr ) {
        agregarclase($("#principal"),"menu-activo");
    });    
    $("#contenido-central").load("home.html");
    getfecha();
    setInterval(function(){getfecha();},5000);
    $.getScript( 
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDcQylEsZAzuEw3EHBdWbsDAynXvU2Ljzs&libraries=places&callback=initMap",
    function( data, textStatus, jqxhr ) {
        
    });
    
});

function initMap() {
    var latlng = new google.maps.LatLng(position[0], position[1]);
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