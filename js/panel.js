
/* global POLYLINE, alertify, urlBase, PLACES_AUTOCOMPLETE_API, CORS_PROXY, POSITION, API_KEY, PLACES_DETAILS_API, google, map, DIRECTIONS_API, EN_PROCCESO_DE_ASIGNACION */

var transportistas = [];
var clientes = [];
var usuarios = [];
var moviles = [];
var tarifas = [];
var SERVICIOS_PENDIENTES;
var PAGINA = "PANEL";

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    init();
    INTERVAL_SERVICIOS = setInterval(function(){
        cargarServiciosPendientes();        
    },5000);
    if(typeof POLYLINE !== "undefined")
    {
        POLYLINE.setMap(null);
    }
    $(".buscador").click(function(){
        $("#partidal").html("");
        $("#destinol").html("");
    });
    $("#contenedor_mapa").click(function(){
        cambiarPropiedad($("#servicios_pendientes"),"display","none");        
    });
    $("#partida").on("input",function(){
        mostrarDatalist($(this).val(),$("#partidal"),'partida');
    });
    $("#destino").on("input",function(){
         mostrarDatalist($(this).val(),$("#destinol"),'destino');
    });
    
    $("#agregar_destino").click(function(){
        agregarDestino();
    });
    
    $("#quitar_destino").click(function(){
        quitarDestino();
    });
    
    $("#dibujar").click(function(){
        preDibujarRuta();
    });
    
    /** CLIENTE **/
    $("#clientes").keyup(function () {
        cargarClientes();
    });
    $("#clientes").on('input',function () {
        cargarPasajeros();
    });
    $("#clientes").on('blur',function () {
        if($("#clientes").val() === "")
        {
            cargarPasajeros();
        }
        var noExiste = validarInexistencia($("#clientes").val(),clientes);
        if(noExiste)
        {
            alertify.error("Cliente inexistente");
            $("#clientes").val("");
            
        }
    });
    /** TRANSPORTISTA **/
    $("#transportistas").keyup(function () {
        cargarTransportistas();
    });
    
    $("#transportistas").on('input',function () {
        cargarMoviles();
    });
    
    $("#transportistas").on('blur',function () {
        if($("#transportistas").val() === "")
        {
            cargarTransportistas();
        }
        var noExiste = validarInexistencia($("#transportistas").val(),transportistas);
        if(noExiste)
        {
            alertify.error("Transportista inexistente");
            $("#transportistas").val("");
        }
    });
    $("#usuarios").keyup(function () {
        cargarPasajeros();
    });
    
    $("#usuarios").on('blur',function () {
        var noExiste = validarInexistencia($("#usuarios").val(),usuarios);
        if(noExiste)
        {
            alertify.error("Pasajero inexistente");
            $("#usuarios").val("");
        }
    });
    $("#vehiculos").keyup(function(){
        cargarMoviles();
    });
    
    $("#vehiculos").on('blur',function () {
        var noExiste = validarInexistencia($("#vehiculos").val(),moviles);
        if(noExiste)
        {
            alertify.error("Veh&iacute;culo inexistente");
            $("#vehiculos").val("");
        }
    });
    
    $("#titulo_servicios_pendientes").click(function(){
        abrirServiciosPendientes();
    });

    $("#solicitar").click(function () {
        agregarServicio();
    });
});

function init()
{
    cargarClientes();
    cargarTransportistas();
    cargarPasajeros();
    cargarMoviles();
    cargarTarifas();
}

function cargarClientes()
{
    var busqueda = $("#clientes").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        $("#lcliente").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].cliente_razon;
            $("#lcliente").append("<option value=\""+nombre+"\">"+nombre+"</option>");
            clientes.push(nombre);
        }
    };
    postRequest(url,params,success,false);
}

function cargarPasajeros()
{
    var busqueda = $('#clientes').val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/pasajero/GetPasajeros.php";
    var success = function(response)
    {
        $("#lusuario").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].pasajero_nombre + " " + response[i].pasajero_papellido;
            $("#lusuario").append("<option value=\""+nombre+"\">"+nombre+"</option>");
            usuarios.push(nombre);
        }
    };
    postRequest(url,params,success,false);
}

function cargarTransportistas()
{
    var busqueda = $("#transportistas").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/transportista/GetTransportistas.php";
    var success = function(response)
    {
        $("#ltransportista").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].transportista_nombre;
            $("#ltransportista").append("<option value=\""+nombre+"\">"+nombre+"</option>");
            transportistas.push(nombre);
        }
    };
    postRequest(url,params,success,false);
}

function cargarMoviles()
{
    var busqueda = $('#transportistas').val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/movil/GetMoviles.php";
    var success = function(response)
    {
        $("#lvehiculo").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].movil_nombre;
            $("#lvehiculo").append("<option value=\""+nombre+"\">"+nombre+"</option>");
            moviles.push(nombre);
        }
    };
    postRequest(url,params,success,false);
}

function cargarTarifas()
{
    var busqueda = $('#tarifas').val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/tarifa/GetTarifas.php";
    var success = function(response)
    {
        $("#ltarifa").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].tarifa_nombre;
            $("#ltarifa").append("<option value=\""+nombre+"\">"+nombre+"</option>");
            tarifas.push(nombre);
        }
    };
    postRequest(url,params,success,false);
}

function agregarServicio()
{
    var partida = $("#partida").val();
    var destino = $("#destino").val();
    var cliente = $("#clientes").val();
    var usuario = $("#usuarios").val();
    var transportista = $("#transportistas").val();
    var movil = $("#vehiculos").val();
    var tipo = $("#tipos").val();
    var tarifa = $("#tarifas").val();
    var array = [partida,destino,cliente,usuario,transportista,movil,tipo,tarifa];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var params = {partida : partida, destino : destino, cliente : cliente, usuario : usuario,
        transportista : transportista, movil : movil, tipo : tipo, tarifa : tarifa};
    var url = urlBase + "/servicio/AddServicio.php";
    var success = function(response)
    {
        cerrarSession(response);
        POLYLINE.setMap(null);
        alertify.success('Servicio agregado con id '+response.servicio_id);
        vaciarFormulario();
        cambiarPropiedad($("#loader"),"visibility","hidden");
        agregarDetalleServicio(response.servicio_id);
    };
    postRequest(url,params,success);
}
      
function mostrarDatalist(val,datalist,campo)
{
    if(val === "") return;
    var url = CORS_PROXY + PLACES_AUTOCOMPLETE_API + "input="+val+
            "&location="+POSITION[0]+","+POSITION[1]+"&sensor=true&radius=500&key="+API_KEY;
    var success = function(response)
    {
        datalist.html("");
        var places =  response.predictions;
        for(var i = 0 ; i < places.length;i++)
        {
            var descripcion = places[i].description;
            var placeId = places[i].place_id;
            var encodeDescripcion = descripcion.replace(/'/g,'');
            datalist.append(
                    "<div class=\"option-datalist\" onclick=\"selecionarPlace('"+encodeDescripcion+"','"+placeId+"','"+campo+"')\"><img src=\"img/ubicacion.svg\" width=\"12\" heifgt=\"12\">"+descripcion+"</div>");
        }
    };
    getRequest(url,success);
}

function selecionarPlace(val,placeId,obj)
{
    $("#"+obj).val(decodeURI(val));
    var url = CORS_PROXY + PLACES_DETAILS_API + "placeid="+placeId+"&key="+API_KEY;
    var success = function(response)
    {
        var status = response.status;
        
        if(status === 'OK')
        {
            var marker = new google.maps.Marker({
                map: map,
                place: {
                    placeId: placeId,
                    location: response.result.geometry.location
                }
            });
            map.setZoom(15);
            map.panTo(marker.getPosition());
        }
    };
    getRequest(url,success);
}
function preDibujarRuta()
{
    var partida = $("#partida").val();
    var destinos = $(".destino");
    var completado = false;
    destinos.each(function (index){
        if($(this).val() !== '')
        {   
            completado = true;
        }
    });
    if(partida !== '' && completado)
    {
        dibujarRuta(partida,destinos);
    }    
}

function dibujarRuta(origen,destinos)
{
    var largo = destinos.length;
    var destinoFinal = encodeURI(destinos[largo-1].value);
    var waypoints = "";
    if(largo > 1)
    {
        waypoints = "&waypoints=";
        for(var i = 0 ; i < largo ; i++)
        {
            if(i === largo)
            {
                continue;
            }
            waypoints += encodeURI(destinos[i].value) + "|";
        }
        waypoints = waypoints.substring(0,waypoints.length-1);
    }
    var url = CORS_PROXY + DIRECTIONS_API + "origin="+encodeURI(origen)+"&destination="+destinoFinal+waypoints+"&key="+API_KEY;
    var success = function(response)
    {
        if(typeof POLYLINE !== "undefined")
        {
            POLYLINE.setMap(null);
        }
        var status = response.status;
        if(status === 'OK')
        {
            var points = response.routes[0].overview_polyline.points;
            var polyline = decodePolyline(points);
            var flightPath = new google.maps.Polyline({
                path: polyline,
                geodesic: true,
                strokeColor: '#FFFFF',
                strokeOpacity: 1.0,
                strokeWeight: 6
            });
            POLYLINE = flightPath;
            flightPath.setMap(map);
            var bounds = new google.maps.LatLngBounds();
            POLYLINE_LAT = '';
            POLYLINE_LNG = '';
            polyline.forEach(function(LatLng) {
                bounds.extend(LatLng);
                POLYLINE_LAT+= LatLng.lat + ",";
                POLYLINE_LNG += LatLng.lng + ",";
            });
            map.fitBounds(bounds);
        }
        else if(status === 'NOT_FOUND')
        {
            alertify.error("Ruta no encontrada");
        }
    };
    getRequest(url,success);
}
function agregarDetalleServicio(idServicio)
{
    var params = { lat : POLYLINE_LAT, lon : POLYLINE_LNG, id : idServicio };
    var url = urlBase + "/servicio/AddServicioDetalle.php";
    postRequest(url,params,null);
}


function cargarServiciosPendientes()
{
    var contenedor = $("#servicios_pendientes");
    var servicios = $("#contenedor_servicios");
    var url = urlBase + "/servicio/GetServiciosPendientes.php";
    var success = function(response)
    {
        SERVICIOS_PENDIENTES = response;
        servicios.html("");
        for(var i = 0 ; i < SERVICIOS_PENDIENTES.length ; i++)
        {
            var id = SERVICIOS_PENDIENTES[i].servicio_id;
            servicios.append("<div class=\"opcion_servicios\" onclick=\"abrirServicio("+id+")\">"+id+"</div>");
        }
        if(SERVICIOS_PENDIENTES.length > 0)
        {
            cambiarPropiedad(contenedor,"display","block");
        }
        else
        {
            servicios.html("No hay servicios pendientes");
            cambiarPropiedad(contenedor,"display","none");
            return;
        }
    };
    getRequest(url,success,false);
}

function abrirServiciosPendientes()
{
    cambiarPropiedad($("#servicios_pendientes"),"display","block");

}

function abrirServicio(idServicio)
{
    for(var i = 0 ; i < SERVICIOS_PENDIENTES.length ; i++)
    {
        var servicio = SERVICIOS_PENDIENTES[i];
        var partida = servicio.servicio_partida;
        var destino = servicio.servicio_destino;
        var cliente = servicio.servicio_cliente;
        var pasajero = servicio.servicio_pasajero;
        $("#idServicio").val(idServicio);
        $("#partida").val(partida);
        $("#test").html(partida);
        $("#destino").val(destino);
        $("#clientes").val(cliente);
        $("#usuarios").val(pasajero);
    }
    marcarServicioEnProceso(idServicio);
    cambiarPropiedad($("#servicios_pendientes"),"display","none");
    dibujarRuta(partida,destino);
}

function marcarServicioEnProceso(idServicio)
{
    var params = {id : idServicio, estado : EN_PROCCESO_DE_ASIGNACION};
    var url = urlBase + "/servicio/ModEstadoServicio.php";
    var success = function(response)
    {
        alertify.success("Servicio "+response.servicio_id +" se encuentra en proceso asignaci&oacute;n");
    };
    postRequest(url,params,success,false);
}

function agregarDestino()
{
    var i = 1;
    $(".destino").each(function(index){
        if(i < 4)
        {
            i++;
        }
    });
    if(i <= 4)
    {
        $("#destinos").append("<div class=\"cont-pre-monitor\" id=\"cont-destino"+i+"\">Destino "+i+"</div><input type=\"text\" class=\"input_asignar destino\" id=\"destino"+i+"\" placeholder=\"Ej: Av los pinos 723\">");
        $("#destino"+i).on('input',function(){
            mostrarDatalist($(this).val(),$("#destinol"),'destino'+i);
        });
    }
}

function quitarDestino()
{
    var i = 1;
    var largo = $(".destino").length;
    if(largo > 1 )
    {
        $(".destino").each(function(index){
            if(i === largo)
            {
                $(this).remove();
                $("#cont-destino"+i).remove();
            }
            i++;
        });
    }
}
