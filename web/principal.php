<?php
session_start(); 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            Maps
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="stylesheet" href="css/principal.css">
        <link rel="stylesheet" href="css/loader.css">
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/principal.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">
            
        </div>
        <div id="menu" class="menu">
           
        </div>
        <div class="contenedor-lateral">
            <div class="lateral">
                <div class="pestana pestana-activa" id="pestanaAsignar">
                    Asignar
                </div>
                <div class="pestana" id="pestanaBuscar">
                    Buscar
                </div>
                <div class="asignar" id="asignar">
                    <div class="contenedor-pre-input">
                        Partida
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lorigen" id="partida" onkeyup="obtenerDireccion('partida')" placeholder="Partida">
                        <datalist id="lorigen"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Destino
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ldestino" id="destino" onkeyup="obtenerDireccion('destino')" placeholder="Destino">
                        <datalist id="ldestino"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Cliente
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lcliente" id="cliente" placeholder="Cliente" onkeyup="cargarClientes()">
                        <datalist id="lcliente" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Usuario
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lusuario" id="usuario" placeholder="Usuario">
                        <datalist id="lusuario" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Transportista
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltransportista" id="transportista" placeholder="Transportista" onkeyup="cargarTransportistas()">
                        <datalist id="ltransportista"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        N° movil
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lmovil" id="movil" placeholder="N° Movil">
                        <datalist id="lmovil"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Tipo servicio
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltipo" id="tipo" placeholder="Tipo Servicio">
                        <datalist id="ltipo">
                            <option value="Recogida">Recogida</option>
                            <option value="Reparto">Reparto</option>
                            <option value="Servicio Especial">Servicio especial</option>
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Tarifa
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltarifa" id="tarifa" placeholder="Tarifa">
                        <datalist id="ltarifa">
                            <option value="1000">1000</option>
                            <option value="3000">3000</option>
                            <option value="5000">5000</option>
                            <option value="7000">7000</option>
                            <option value="10000">10000</option>
                            <option value="15000">15000</option>
                            <option value="20000">20000</option>
                            <option value="30000">30000</option>
                        </datalist>
                    </div>
                    <div class="contenedor-boton">
                        <div class="button-succes">
                            <a class="enlace-succes" id="entrar">
                                ASIGNAR
                            </a>
                        </div>
                    </div>
                </div>
                <div class="buscar" id="buscar">
                    <div class="contenedor-pre-input">
                        Id Servicio
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lids" id="ids" placeholder="Id servicio" onkeyup="cargarIds()">
                        <datalist id="lids"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Cliente
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lcliente" id="cliente" placeholder="Cliente">
                        <datalist id="lcliente" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Usuario
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lusuario" id="usuario" placeholder="Usuario">
                        <datalist id="lusuario" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Transportista
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltransportista" id="transportista" placeholder="Transportista">
                        <datalist id="ltransportista"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        N° movil
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lmovil" id="movil" placeholder="N° movil">
                        <datalist id="lmovil"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Fecha desde
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="desde" placeholder="Fecha desde">
                        
                    </div>
                    <div class="contenedor-pre-input">
                        Fecha hasta
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="hasta" placeholder="Fecha hasta">
                        
                    </div>
                    <div class="contenedor-boton">
                        <div class="button-succes">
                            <a class="enlace-succes" id="buscar">
                                BUSCAR
                            </a>
                        </div>
                    </div>
                </div>
                <div id="mensaje-error" class="mensaje-error">
                
                </div>
                <div class="contenedor-loader">
                    <div class="loader" id="loader">Loading...</div>
                </div>
            </div>
        </div>
        <div class="contendor_mapa">
            <div class="map" id="map">
                <!--
                aqui va el mapa
                -->
            </div>    
        </div>   
        <script>
                
        var map,infoWindow;
                function initMap() 
                {
                    infoWindow = new google.maps.InfoWindow;
                    var directionsService = new google.maps.DirectionsService;
                    var directionsDisplay = new google.maps.DirectionsRenderer;
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 17
                    });
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                          var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                          };

                          infoWindow.setPosition(pos);
                          infoWindow.setContent('Location found.');
                          infoWindow.open(map);
                          map.setCenter(pos);
                        }, function() {
                          handleLocationError(true, infoWindow, map.getCenter());
                        });
                      } else {
                        // Browser doesn't support Geolocation
                        handleLocationError(false, infoWindow, map.getCenter());
                      }

                    directionsDisplay.setMap(map);

                    var onChangeHandler = function() {
                      calculateAndDisplayRoute(directionsService, directionsDisplay);
                    };
                    //document.getElementById('start').addEventListener('change', onChangeHandler);
                    //document.getElementById('end').addEventListener('change', onChangeHandler);
                  }
/*
                  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                    directionsService.route({
                      origin: document.getElementById('start').value,
                      destination: document.getElementById('end').value,
                      travelMode: 'DRIVING'
                    }, function(response, status) {
                      if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                      } else {
                        window.alert('Directions request failed due to ' + status);
                      }
                    });
                  }*/

                     function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
  

        function obtenerDireccion(opcion)
        {
            var busca = document.getElementById(opcion).value;
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+busca+"&key=AIzaSyDfPGTUHN5DXdLh9XN52mFKEay6vtTrmos&location=-33.440616,-70.6514212&radius=500000&strictbounds&language=es",
                method:'GET',
                dataType: 'json',
                beforeSend: function (xhr) {
                
                },
                success: function(response) {
                    if(opcion === 'partida') {
                        $("#lorigen").html("");
                        for(var i = 0 ; i < response.predictions.length ; i++){
                            $("#lorigen").append("<option>"+response.predictions[i].description+"</option>");
                        }
                    }
                    else if(opcion === 'destino'){
                        $("#ldestino").html("");
                        for(var i = 0 ; i < response.predictions.length ; i++){
                            $("#ldestino").append("<option>"+response.predictions[i].description+"</option>");
                        }
                    }       
                },
                error: function (resposeError){
                    //alert(resposeError.status);
                }
            });
        }
               
            </script>
            <script async defer
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfPGTUHN5DXdLh9XN52mFKEay6vtTrmos&callback=initMap">
            </script>
    </body>
</html>