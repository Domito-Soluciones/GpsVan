/* global urlBase, google, alertify, flightPath, markers, map, directionsDisplay, POLYLINE, POSITION */
var servicios_diarios = [];
var moviles_diarios = [];
var pasajeros_diarios = [];
var PAGINA = "MONITOREO";
var interval;
var PATENTE;
var MOVILES_DIBUJADOS = new Map();

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    limpiarMapa();
    map.setZoom(11);
    var center = new google.maps.LatLng(POSITION[0], POSITION[1]);
    map.panTo(center);
    cargarMovilesMapa(true);
    interval = setInterval('moverMovilesMapa()',3000);
    
    $("#busqueda").keyup(function(e){
        cargarMovilesMapa(false);
    });
    
    google.maps.event.addListener(map,'zoom_changed',function(){});
    
});

function buscarServicio()
{
    servicios_diarios.length = 0;
    moviles_diarios.length = 0;
    pasajeros_diarios.length = 0;
    var servicio = $("#servicio").val();
    var movil = $("#movil").val();
    var pasajero = $("#pasajero").val();
    var busqueda = servicio + movil + pasajero;
    var url = urlBase + "/servicio/GetServicios.php?busqueda="+busqueda;
    var success = function(response)
    {
        cerrarSession(response);
        var servicios = $("#lista_busqueda_monitoreo");
        var lista_servicio = $("#lservicio");
        var lista_movil = $("#lmovil");
        var lista_pasajero = $("#lpasajero");
        servicios.html("");
        SERVICIOS = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].servicio_id;
            var movil = response[i].servicio_movil;
            var cliente = response[i].servicio_pasajero;
            servicios.append(" <div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"dibujarServicio('"+id+"')\">"+id+" "+movil+"</div>");
            servicios_diarios.push(id);
            moviles_diarios.push(movil);
            pasajeros_diarios.push(cliente);
        }
        lista_servicio.html("");
        lista_movil.html("");
        lista_pasajero.html("");
        for(var j = 0 ; j < servicios_diarios.length; j++)
        {
            var servicio = servicios_diarios[j];
            if(servicio !== '')
            {
                lista_servicio.append("<option value=\""+servicio+"\">"+servicio+"</option>");
            }
        }
        for(var k = 0 ; k < moviles_diarios.length; k++)
        {
            var movil = moviles_diarios[k];
            if(movil !== '')
            {
                lista_movil.append("<option value=\""+movil+"\">"+movil+"</option>");
            }
        }
        for(var l = 0 ; l < pasajeros_diarios.length; l++)
        {
            var pasajero = pasajeros_diarios[l];
            if(pasajero !== '')
            {
                lista_pasajero.append("<option value=\""+pasajero+"\">"+pasajero+"</option>");
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function cargarMovilesMapa(monitor)
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/movil/GetMoviles.php";
    var success = function(response)
    {
        var moviles = $("#lista_busqueda_monitoreo");
        moviles.html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var patente = response[i].movil_patente;
            var nombre = response[i].movil_nombre;
            var estado = response[i].movil_estado;
            var imgEstado = '';
            if(estado === '0')
            {
                imgEstado = "<div id=\""+patente+"-img\" class=\"img-estado-no\"></div>";
            }
            else
            {
                imgEstado = "<div id=\""+patente+"-img\" class=\"img-estado-ok\"></div>";   
            }
//            if(monitor && lat !== '0.0000000' && lon !== '0.0000000' && estado !== '0')
//            {
//                dibujarMarcador(patente,parseFloat(lat),parseFloat(lon),nombre,servicio);
//            }
            moviles.append("<div class=\"fila_contenedor\" id=\""+patente+"\" onClick=\"animarMovil('"+patente+"')\">"+imgEstado+nombre+"</div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function moverMovilesMapa()
{
    var url = urlBase + "/movil/GetMoviles.php?busqueda=";
    var success = function(response)
    {
        for(var i = 0 ; i < response.length ; i++)
        {
            var patente = response[i].movil_patente;
            var nombre = response[i].movil_nombre;
            var servicio = response[i].movil_servicio;
            var lat = parseFloat(response[i].movil_lat);
            var lon = parseFloat(response[i].movil_lon);
            var conductor = response[i].movil_conductor_nombre;
            var estado = response[i].movil_estado;
            if(estado === '0')
            {
                for(var j = 0  ; j < markers.length;j++)
                {           
                    if(markers[j].get("idMarker") === patente)
                    {
                        quitarclase($("#"+patente+"-img"),"img-estado-ok");
                        agregarclase($("#"+patente+"-img"),"img-estado-no");
                        markers[j].setMap(null);
                        MOVILES_DIBUJADOS.delete(patente);
                        break;
                    }
                }
            }
            else
            {
                var marker = undefined;
                if(typeof MOVILES_DIBUJADOS.get(patente) === 'undefined')
                {
                    marker = dibujarMarcador(patente,lat,lon,nombre,servicio,conductor);
                    MOVILES_DIBUJADOS.set(patente,patente);
                    quitarclase($("#"+patente+"-img"),"img-estado-no");
                    agregarclase($("#"+patente+"-img"),"img-estado-ok");
                }
                else
                {
                    for(var j = 0  ; j < markers.length;j++)
                    {           
                        if(markers[j].get("idMarker") === patente)
                        {
                            marker = markers[j];
                            break;
                        }
                    }
                }
                var latlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lon));
                marker.setPosition(latlng);
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success,false);
}

function dibujarMarcador(id,lat,lon,nombre,servicio,conductor)
{
    var myLatLng = {lat: lat, lng: lon};
    var icon = {
        url: "img/furgon.svg",
        scaledSize: new google.maps.Size(70, 30),
        origin: new google.maps.Point(0,0)
    };
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: nombre,
        icon:icon,
        idMarker: id
    });
    var divServicio = "";
    var estiloMovil = " style='font-size:14px;font-weight:bold;' ";
    if(servicio !== '0')
    {
        divServicio = "<div style='font-size:10px;font-weight:bold;'>N: "+servicio+"</div>";
        estiloMovil = " style='font-size:8px;font-weight:bold;' ";
    }
    var contentString = "<div style='height:35px;'>"+divServicio+"<div "+estiloMovil+">"+id+"</div><div "+estiloMovil+">"+nombre+" - "+conductor+"</div>";
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    infowindow.open(map,marker);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
    
    markers.push(marker);
    return marker;
}

function dibujarServicio(id)
{
    borrarDirections();
    var params = {id : id};
    var url = urlBase + "/servicio/GetDetalleServicio.php";
    var success = function(response){
        flightPath = new google.maps.Polyline({
            path: response,
            geodesic: true,
            strokeColor: '#FFFFF',
            strokeOpacity: 1.0,
            strokeWeight: 6
        });
        flightPath.setMap(map);
        POLYLINE = flightPath;
        var bounds = new google.maps.LatLngBounds();
        response.forEach(function(LatLng) {
                bounds.extend(LatLng);
        });
        map.fitBounds(bounds);
        var url = urlBase + "/movil/GetMovil.php?busqueda="+id;
        var success = function(response)
        {
            var patente = response.movil_patente;
            var lat = response.movil_lat;
            var lng = response.movil_lon;
            var conductor = response.movil_conductor_nombre;
            dibujarMarcador(patente,parseFloat(lat),parseFloat(lng),patente,id,conductor);
        };
        getRequest(url,success);
    };
    postRequest(url,params,success);
}

function animarMovil(patente)
{
    marcarFilaActiva(patente);
    PATENTE = patente;
    for(var i = 0 ; i < markers.length; i++)
    {
        if(markers[i].get("idMarker") === PATENTE)
        {
            var latLng = markers[i].getPosition(); 
            map.setCenter(latLng); 
            map.setZoom(18);  
            break;
        }
    } 
    
}