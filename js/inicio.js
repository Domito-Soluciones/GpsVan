
var markerArr = [];
var markers = []; // Create a marker array to hold your markers
$(document).ready(function () {


//    var lays = [];
    
    var incidente = [];
    var imagen = 'img/verde';
    var imagen2 = 'img/rojo';
    var imagen3 = 'img/amarillo';
    






//    expandir();


//    function CustomMarker(latlng, map,) {
//        
//        this.latlng_ = latlng ;
////        alert(this.latlng_);
//        // Once the LatLng and text are set, add the overlay to the map.  This will
//        // trigger a call to panes_changed which should in turn call draw.
//        this.setMap(map);
//    }
//    CustomMarker.prototype.onRemove = function () {
//            this.div_.parentNode.removeChild(this.div_);
//            this.div_ = null;
//        };
//
//
//CustomMarker.prototype = new google.maps.OverlayView();


    function setMarkers() {
        var infowindow = new google.maps.InfoWindow();
        for (var i = 0; i < beaches.length; i++) {
            var myLatLng = new google.maps.LatLng(beaches[i].latitud, beaches[i].longitud);
            if (beaches[i].estadoOnOff === 'encendido') {
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: imagen + beaches[i].patente + '.png',
                });
            } else if (beaches[i].estadoOnOff === 'apagado') {
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: imagen2 + beaches[i].patente + '.png',

                });
            } else if (beaches[i].estadoOnOff === 'sin signal') {
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: imagen3 + beaches[i].patente + '.png',

                });
            }
            // Push marker to markers array
            markers.push(marker);


            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent('<b>Patrulla</b>');
                    setTimeout(function () {
                        infowindow.open(map, marker);
                    }, 3000);
                };
            })
                    (marker, i));
//            CustomMarker.prototype.draw = function () {
//
//                var me = this;
////                alert('div creado');
//                // Check if the div has been created.
//                var div = this.div_;
//                
//                if (!div) {
//                    // Create a overlay text DIV
//                    div = this.div_ = document.createElement('DIV');
//                    // Create the DIV representing our CustomMarker
//                    div.style.position = 'absolute';
//                    div.style.paddingLeft = '0px';
//                    div.style.cursor = 'pointer';
//                    div.style.width = '40px';
//                    div.style.height = '20px';
//                    div.style.fontSize = '8px';
//                    div.style.fontWeight = '200';
//                    div.innerHTML = '<b class=\"patente_patrulla\">HSXR32</b>';
//                    
//                    google.maps.event.addDomListener(div, "click", function (event) {
//                        google.maps.event.trigger(me, "click");
//                    });
//                    
//                    // Then add the overlay to the DOM
//                    var panes = this.getPanes();
//                    panes.overlayImage.appendChild(div);
//                }
//
//                // Position the overlay 
//                var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
//                if (point) {
//                    div.style.left = (point.x - 15) + 'px';
//                    div.style.top = (point.y - 15) + 'px';
//                }
//            };
//            CustomMarker.prototype.onRemove = function () {
//            this.div_.parentNode.removeChild(this.div_);
//            this.div_ = null;
//        };
//            lays.push(new CustomMarker(myLatLng, map));



        }
    }








    function initialize() {

        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(beaches[0].latitud, beaches[beaches.length - 1].longitud),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

        setMarkers();

        $.ajax({
            async: false,
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            url: 'MarcarIncidenteEnMapaInicio',
            timeout: 10000,
            success:
                    function (json) {
                        incidente = json.incidentes;
                        var infowindow = new google.maps.InfoWindow();
                        for (var i = 0; i < incidente.length; i++) {
                            var myLatLng = new google.maps.LatLng(incidente[i].lat, incidente[i].lon);
                            var marker = new google.maps.Marker({
                                position: myLatLng,
                                map: map,
                                icon: 'img/incidente.png',
                                optimized: false
                            });
                            markerArr.push(marker);
                            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                                return function () {
                                    infowindow.setContent('<b>incidente</b>');
                                    setTimeout(function () {
                                        infowindow.open(map, marker);
                                    }, 3000);
                                };
                            })
                                    (marker, i));
                            var myoverlay = new google.maps.OverlayView();
                            myoverlay.draw = function () {
                                // add an id to the layer that includes all the markers so you can use it in CSS
                                this.getPanes().markerLayer.id = 'markerLayer';
                            };
                            myoverlay.setMap(map);
                        }
                    }
        });

        // Bind event listener on button to reload markers
        window.setInterval(function () {
            reloadMarkers();
        }, 2000);
    }

    window.setTimeout(function () {initialize();}, 4000);





    function reloadMarkers() {

        // Loop through markers and set map to null for each
        for (var i = 0; i < markers.length; i++) {

            markers[i].setMap(null);
//            lays[i].setMap(null);




        }
        // Reset the markers array
        markers = [];



        // Call set markers to re-add markers

//        lays = [];
        setMarkers();
    }

//    window.setTimeout(function () {
//        expandir();
//    }, 3000);



    window.setTimeout(function () {
        $.ajax({
            async: false,
            type: "POST",
            dataType: "html",
            contentType: "application/x-www-form-urlencoded",
            url: 'GraficosDoughnutChart',
            success:
                    function (datos) {
                        $("#contenido_graficos_circulares").html(datos);
                        if (datos.innerHTML === "")
                        {
                            $("#contenido_graficos_circulares").html("Ocurrio un problema al generar el grafico en linea");
                        }
                    },
            error: function (resp)
            {
//                alert("error en carga de graficos" + resp.status);
            }
        });
    }, 6000);
    window.setTimeout(function () {
        reloadMarkers();
    }, 2000);


////se hizo para simular el movimiento de la patrulla    
//    window.setTimeout(function () {
//        $.ajax({
//            async: false,
//            type: "POST",
//            dataType: "html",
//            contentType: "application/x-www-form-urlencoded",
//            url: 'Simular',
//            timeout: 10000,
//            success:
//                    function (datos) {
////                        alert('va a empezar a moverse')
//                    },
//            error: function (resp)
//            {
//                alert("error" + resp.status);
//            }
//        });
//    }, 30000);

});
$('#expandir').click(function expandir() {

    var mapa = $('#mapa_web_contenedor');
    var flecha = $('#flecha');
    var container = $('#container_mapa');
//    $('#hola_mundo').slideToggle('slow', function () {});





    if (flecha.attr('class') === 'flecha_boton') {
        container.animate({
            width: "toggle",
            opacity: "toggle"
        }, 1000);
        $("#hola_mundo").animate({
            with : 'toggle',
            height: 'toggle',
            opacity: "toggle"
        }, 1000);

        container.animate({
            height: "toggle",
            width: "100%",
            opacity: "toggle"
        }, 1000, function () {
            google.maps.event.trigger(map, 'resize');
        });
        container.attr('class', 'container_mapa_boton_expandido');
//        mapa.attr('class', 'contenido_mapa_expandido');//reemplaza la clase 
        flecha.attr('class', 'flecha_boton_otra');
    } else if (flecha.attr('class') === 'flecha_boton_otra') {
        container.animate({
            with : "70%",
            height: "toggle",
            opacity: "toggle"
        }, 1000);

        window.setTimeout(function () {
            $("#hola_mundo").animate({
                with : 'toggle',
                height: 'toggle',
                opacity: "toggle"
            }, 1000);
        }, 1000);
        window.setTimeout(function () {
            container.animate({
                width: "70%",
                height: "toggle",
                opacity: "toggle"
            }, 1000, function () {
                google.maps.event.trigger(map, 'resize');
            });
        }, 2000);
        container.attr('class', 'container_mapa_boton');
//        mapa.attr('class', 'contenido_mapa');//reemplaza la clase 
        flecha.attr('class', 'flecha_boton');
    }




});

$('#add').click(function () {
    $("#container-map").animate({
        height: '50%',
        minHeight: '50%'
    }, 1500, function () {
        google.maps.event.trigger(map, 'resize');
    });
});

