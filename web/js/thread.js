/* global urlBase, alertify, google */

var map;
var directionsService;
var directionsDisplay;
var markers = [];
var ORIGEN;
var ORIGEN_ID;
var DESTINO;
var DESTINO_ID;
var GESTIONANDO_TICKET = 0;

$(document).ready(function(){
    setInterval('validarServicios()', 5000);
});

    function validarServicios()
    {
        var url = urlBase + "/servicio/ServicioPorAsignar.php";
        getRequest(url,function(response){
            JSON.stringify(response);
            if(GESTIONANDO_TICKET === 0)
            {
                if(response.servicio_id !== "")
                {
                    GESTIONANDO_TICKET = response.servicio_id;
                    var isOpen = alertify.alert().isOpen(); 
                    if(!isOpen)
                    {    
                        alertify.alert('Nuevo servicio', 'Nuevo servicio para asignar: '+
                                response.servicio_id, function(){
                                    $("#partida").val(response.servicio_partida);
                                    $("#partida_hidden").val(response.servicio_partidaId);
                                    $("#destino").val(response.servicio_destino);
                                    $("#destino_hidden").val(response.servicio_destinoId);
                                    calculateAndDisplayRoute(response.servicio_partidaId,response.servicio_destinoId);
                                });
                    }
                }
            }
        });
    }
    
    function initMap() {
        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;
        map = new google.maps.Map(document.getElementById('map'), {
            mapTypeControl: false,
            streetViewControl: false,
            center: {lat: -33.440616, lng: -70.6514212},
                zoom: 11
            });
        new AutocompleteDirectionsHandler(map);
        directionsDisplay.setMap(map);
    }

    function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        var originInput = document.getElementById('partida');
        var destinationInput = document.getElementById('destino');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});
        this.travelMode = 'DRIVING';
        this.route();
        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
    }       

    AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.place_id) {
                window.alert("Please select an option from the dropdown list.");
                return;
            }
            if (mode === 'ORIG') {
                me.originPlaceId = place.place_id;
                document.getElementById("partida_hidden").value = place.place_id;
            }
            else {
                me.destinationPlaceId = place.place_id;
                document.getElementById("destino_hidden").value = place.place_id;
                deleteMarkers();
            }
        me.route();
        });
    };

    AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    };
    
    function calculateAndDisplayRoute(partida,destino) {
        directionsService.route({
          origin: partida,
          destination: destino,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }



function dibujarMarcador(lat,lon,nombre,servicio)
{
    var myLatLng = {lat: lat, lng: lon};
    var icon = {
        url: "img/marker.png", // url
        scaledSize: new google.maps.Size(70, 30), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: nombre,
        icon:icon
    });
    var divServicio = "";
    var estiloMovil = " style='font-size:14px;font-weight:bold;' ";
    if(servicio !== '')
    {
        divServicio = "<div style='font-size:10px;font-weight:bold;'>N°: "+servicio+"</div>";
        estiloMovil = " style='font-size:8px;font-weight:bold;' ";
    }
    var contentString = "<div style='height:23px;'>"+divServicio+"<div "+estiloMovil+">"+nombre+"</div>";
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    infowindow.open(map,marker);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

    markers.push(marker);

}

function removeMap()
{
    initMap();
    preCargarMoviles();
}
            

function deleteMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
}


