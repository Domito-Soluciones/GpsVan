$(document).ready(function(){
    $("#menu").load("menu.html", function( response, status, xhr ) {
        agregarclase($("#monitoreo"),"menu-activo");
        
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
    
    });
});
