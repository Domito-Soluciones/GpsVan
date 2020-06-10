/* global urlBase, google, alertify, flightPath, markers, map, directionsDisplay, POLYLINE, POSITION, TIPO_USUARIO, NOMBRE_CLIENTE, CLIENTE */
var servicios_diarios = [];
var moviles_diarios = [];
var pasajeros_diarios = [];
var PAGINA = "MONITOREO";
var interval;
var PATENTE;
var ESTADOS_ANTERIORES = new Map();

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    limpiarMapa();
    map.setZoom(11);
    var center = new google.maps.LatLng(POSITION[0], POSITION[1]);
    map.panTo(center);
    cargarMovilesMapa(true);
    interval = setInterval('moverMovilesMapa()',3000);
    
    $("#busqueda").keyup(function(e){
        cargarMovilesMapa();
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
    };
    getRequest(url,success);
}

function cargarMovilesMapa(cargar = false)
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url;
    if(TIPO_USUARIO === 'CLIENTE')
    {
        url = urlBase + "/movil/GetMovilesEmpresa.php";
    }
    else{
        url = urlBase + "/movil/GetMoviles.php";
    }
    var success = function(response)
    {
        var moviles = $("#lista_busqueda_monitoreo");
        moviles.html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var patente = response[i].movil_patente;
            var nombre = response[i].movil_nombre;
            var estado = response[i].movil_estado;
            var empresa = response[i].movil_cliente_nombre;
            if(TIPO_USUARIO === 'CLIENTE'){
                if(CLIENTE === empresa){
                    var imgEstado = '';
                    if(estado === '0')
                    {
                        imgEstado = "<div id=\""+patente+"-img\" class=\"img-estado-no\"></div>";
                    }
                    else
                    {
                        imgEstado = "<div id=\""+patente+"-img\" class=\"img-estado-ok\"></div>";   
                    }
                    moviles.append("<div class=\"fila_contenedor\" id=\""+patente+"\" onClick=\"animarMovil('"+patente+"')\">"+imgEstado+nombre+"</div>");
                }
            }
            else{
                var imgEstado = '';
                if(estado === '0')
                {
                    imgEstado = "<div id=\""+patente+"-img\" class=\"img-estado-no\"></div>";
                }
                else
                {
                    imgEstado = "<div id=\""+patente+"-img\" class=\"img-estado-ok\"></div>";   
                }
                moviles.append("<div class=\"fila_contenedor\" id=\""+patente+"\" onClick=\"animarMovil('"+patente+"')\">"+imgEstado+nombre+"</div>");
            
            }    
        }
    };
    postRequest(url,params,success,cargar);
}

function moverMovilesMapa()
{
    if(PAGINA_ANTERIOR !== 'MONITOREO')
    {
        return;
    }
    var url = urlBase + "/movil/GetMovilesEmpresa.php?busqueda=";
    var success = function(response)
    {
        var vacio = true;
        for(var i = 0 ; i < response.length ; i++)
        {
            var patente = response[i].movil_patente;
            var nombre = response[i].movil_nombre;
            var servicio = response[i].movil_servicio;
            var servicioEstado = response[i].movil_servicio_estado;
            var lat = parseFloat(response[i].movil_lat);
            var lon = parseFloat(response[i].movil_lon);
            var conductor = response[i].movil_conductor_nombre;
            var estado = response[i].movil_estado;
            var color = response[i].movil_cliente_color;
            var empresa = response[i].movil_cliente_nombre;
            if(TIPO_USUARIO === 'CLIENTE'){
                if(CLIENTE === empresa){
                    vacio = false;
                    moverMovil(patente,nombre,estado,lat,lon,servicio,conductor,color,servicioEstado);
                }
                
            }
            else{
                moverMovil(patente,nombre,estado,lat,lon,servicio,conductor,color,servicioEstado);
            }
        }
        if(TIPO_USUARIO === 'CLIENTE' && vacio){
            alertify.success("No hay servicios en ruta");
        }
    };
    getRequest(url,success,false);
}

function dibujarMarcador(id,lat,lon,nombre,servicio,conductor,color,estadoServicio)
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
    var back = "";
    var estiloMovil = " style='font-size:14px;font-weight:bold;' ";
    if(servicio !== '')
    {
        divServicio = "<div style='font-size:10px;font-weight:bold;'>N: "+servicio+"</div>";
        estiloMovil = " style='font-size:8px;font-weight:bold;' ";
        back = "background-color:"+color;
    }
    var contentString = "<div style='height:35px;"+back+"'>"+divServicio+"<div "+estiloMovil+">"+id+"</div><div "+estiloMovil+">"+nombre+" - "+conductor+"</div>";
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    infowindow.open(map,marker);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
    markers.set(id,marker);
    if(estadoServicio === ""){
        estadoServicio = "1";
    }
    ESTADOS_ANTERIORES.set(id,estadoServicio);
    return marker;
}

function dibujarServicio(id)
{
    borrarDirections();
    var params = {id : id};
    var url = urlBase + "/servicio/GetDetalleServicio.php";
    var success = function(response){
        var servicioEstado = response[0].estado;
        alert("1 "+servicioEstado);
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
            console.log("dibujandp marcador 1");
            dibujarMarcador(patente,parseFloat(lat),parseFloat(lng),patente,id,conductor,'white',servicioEstado);
        };
        getRequest(url,success);
    };
    postRequest(url,params,success);
}

function animarMovil(patente)
{
    marcarFilaActiva(patente);
    PATENTE = patente;
    if(markers.get(patente) !== undefined)
    {
        var latLng = markers.get(patente).getPosition(); 
        map.setCenter(latLng); 
        map.setZoom(18);  
    }
}

function moverMovil(patente,nombre,estado,lat,lon,servicio,conductor,color,estadoServicio){
    if(estado === '0')
    {
        quitarclase($("#"+patente+"-img"),"img-estado-ok");
        agregarclase($("#"+patente+"-img"),"img-estado-no");             
        let marker = markers.get(patente);
        if(marker !== undefined){
            marker.setMap(null);
            marker.delete(patente);
        }
    }
    else
    {
        var marker = undefined;
        if(markers.get(patente) === undefined)
        {
            console.log("dibujandp marcador 2");
            marker = dibujarMarcador(patente,lat,lon,nombre,servicio,conductor,color,estadoServicio);
            quitarclase($("#"+patente+"-img"),"img-estado-no");
            agregarclase($("#"+patente+"-img"),"img-estado-ok");
        }
        else
        {
            marker = markers.get(patente);
            var estadoAnterior = ESTADOS_ANTERIORES.get(patente);
            if((parseInt(estadoAnterior) < 4 && estadoServicio === '4') || 
               (estadoAnterior === "4" && estadoServicio === '')){
                console.log("redibujando marcador "+patente+" "+lat+" "+lon+" "+nombre+" "+servicio+" "+conductor+" "+color+" "+estado);
                marker.setMap(null);
                markers.delete(patente);
                console.log(markers);
                console.log("dibujandp marcador 3");
                dibujarMarcador(patente,lat,lon,nombre,servicio,conductor,color,estadoServicio);
            }
        }
        var latlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lon));
        marker.setPosition(latlng);
    }
}