/* global urlBase, google, alertify */
var map;
var markers = [];
var flightPath;
var position = [-33.440616, -70.6514212];
var servicios_diarios = [];
var moviles_diarios = [];
var pasajeros_diarios = [];
$(document).ready(function(){
    iniciarPestaniasMonitoreo();
    buscarServicio();
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
    cargarMovilesMapa();
    setInterval('moverMovilesMapa()',5000);

}

function buscarServicio()
{
    var busqueda = $("#busqueda").val();
    var url = urlBase + "/servicio/GetServicios.php?busqueda="+busqueda;
    var success = function(response)
    {
        cerrarSession(response);
        var servicios = $("#lista_busqueda");
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
            var cliente = response[i].servicio_usuario;
            servicios.append(" <div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"dibujarServicio('"+id+"','"+movil+"')\">"+id+" "+movil+"</div>");
            servicios_diarios.push(id);
            moviles_diarios.push(movil);
            pasajeros_diarios.push(cliente);
        }
        for(var j = 0 ; j < servicios_diarios.length; j++)
        {
            lista_servicio.append("<option value=\""+servicios_diarios[j]+"\">"+servicios_diarios[j]+"</option>");
        }
        for(var k = 0 ; k < moviles_diarios.length; k++)
        {
            lista_movil.append("<option value=\""+moviles_diarios[k]+"\">"+moviles_diarios[k]+"</option>");
        }
        for(var l = 0 ; l < pasajeros_diarios.length; l++)
        {
            lista_pasajero.append("<option value=\""+pasajeros_diarios[l]+"\">"+pasajeros_diarios[l]+"</option>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function cargarMovilesMapa()
{
    var url = urlBase + "/movil/GetMoviles.php?busqueda=";
    var success = function(response)
    {
        if(response.length === 0)
        {
            alertify.error("No hay veh&iacute;culos conectados");
            return;
        }
        for(var i = 0 ; i < response.length ; i++)
        {
            var patente = response[i].movil_patente;
            var nombre = response[i].movil_nombre;
            var lat = response[i].movil_lat;
            var lon = response[i].movil_lon;
            var estado = response[i].movil_estado;
            var servicio = response[i].movil_servicio;
            if(estado !== '0')
            {
                dibujarMarcador(patente,parseFloat(lat),parseFloat(lon),nombre,servicio);
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success,false);
}

function moverMovilesMapa()
{
    var url = urlBase + "/movil/GetMoviles.php?busqueda=";
    var success = function(response)
    {
        for(var i = 0 ; i < response.length ; i++)
        {
            for(var j = 0 ; i < markers.length; i++)
            {                
                var patente = response[i].movil_patente;
                var nombre = response[i].movil_nombre;
                var lat = response[i].movil_lat;
                var lon = response[i].movil_lon;
                var estado = response[i].movil_estado;
                var servicio = response[i].movil_servicio;
                if(estado !== '0')
                {
                    if(markers[j].get("idMarker") === patente)
                    {
                        var latlng = new google.maps.LatLng(lat, lon);
                        markers[j].setPosition(latlng);
                    }
                }
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success,false);
}

function dibujarMarcador(id,lat,lon,nombre,servicio)
{
    var myLatLng = {lat: lat, lng: lon};
    var icon = {
        url: "img/marker.png", // url
        scaledSize: new google.maps.Size(70, 30),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
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
    if(servicio !== '')
    {
        divServicio = "<div style='font-size:10px;font-weight:bold;'>N: "+servicio+"</div>";
        estiloMovil = " style='font-size:8px;font-weight:bold;' ";
    }
    var contentString = "<div style='height:23px;'>"+divServicio+"<div "+estiloMovil+">"+id+"</div>";
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    infowindow.open(map,marker);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

    markers.push(marker);

}

function iniciarPestaniasMonitoreo()
{
    $("#p_monitoreo").click(function(){
        quitarclase($(this),"dispose");
        agregarclase($("#p_buscador"),"dispose");
        quitarclase($("#contenedor_mapa"),"monitoreo_buscador");
        agregarclase($("#contenedor_mapa"),"monitoreo");
        agregarclase($("#buscador"),"contenedor_oculto");
        flightPath.setMap(null);
        cargarMovilesMapa();
    });
    $("#p_buscador").click(function(){
        quitarclase($(this),"dispose");
        agregarclase($("#p_monitoreo"),"dispose");
        quitarclase($("#contenedor_mapa"),"monitoreo");
        agregarclase($("#contenedor_mapa"),"monitoreo_buscador");
        quitarclase($("#buscador"),"contenedor_oculto");
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

    });
}

function dibujarServicio(id,movil)
{
    var url = urlBase + "/servicio/GetDetalleServicio.php?id="+id;
    var success = function(response){
        flightPath = new google.maps.Polyline({
          path: response,
          geodesic: true,
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 5
        });
        flightPath.setMap(map);
        var latLng = new google.maps.LatLng(response[0].lat, response[0].lng);
        map.panTo(latLng); 
    };
    getRequest(url,success);


}

