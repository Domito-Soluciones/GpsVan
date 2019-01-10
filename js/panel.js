/* global PLACES_API, CORS_PROXY, POSITION, API_KEY, DIRECTIONS_API, map, google, urlBase, alertify, flightPath, POLYLINE, EN_PROCCESO_DE_ASIGNACION */

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
    $("#cliente").keyup(function () {
        cargarClientes();
    });
    $("#cliente").on('input',function () {
        cargarPasajeros();
    });
    $("#cliente").on('blur',function () {
        if($("#cliente").val() === "")
        {
            cargarPasajeros();
        }
        var noExiste = validarInexistencia($("#cliente").val(),clientes);
        if(noExiste)
        {
            alertify.error("Cliente inexistente");
            $("#cliente").val("");
            
        }
    });
    /** TRANSPORTISTA **/
    $("#transportista").keyup(function () {
        cargarTransportistas();
    });
    
    $("#transportista").on('input',function () {
        cargarMoviles();
    });
    
    $("#transportista").on('blur',function () {
        if($("#transportista").val() === "")
        {
            cargarTransportistas();
        }
        var noExiste = validarInexistencia($("#transportista").val(),transportistas);
        if(noExiste)
        {
            alertify.error("Transportista inexistente");
            $("#transportista").val("");
        }
    });
    $("#usuario").keyup(function () {
        cargarPasajeros();
    });
    
    $("#usuario").on('blur',function () {
        var noExiste = validarInexistencia($("#usuario").val(),usuarios);
        if(noExiste)
        {
            alertify.error("Pasajero inexistente");
            $("#usuario").val("");
        }
    });
    $("#vehiculo").keyup(function(){
        cargarMoviles();
    });
    
    $("#vehiculo").on('blur',function () {
        var noExiste = validarInexistencia($("#vehiculo").val(),moviles);
        if(noExiste)
        {
            alertify.error("Veh&iacute;culo inexistente");
            $("#vehiculo").val("");
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
    var busqueda = $("#cliente").val();
    var url = urlBase + "/cliente/GetClientes.php?busqueda="+busqueda;
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
    getRequest(url,success,false);
}

function cargarPasajeros()
{
    var busqueda = $('#cliente').val();
    var url = urlBase + "/pasajero/GetPasajeros.php?busqueda="+busqueda;
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
    getRequest(url,success,false);
}

function cargarTransportistas()
{
    var busqueda = $("#transportista").val();
    var url = urlBase + "/transportista/GetTransportistas.php?busqueda="+busqueda;
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
    getRequest(url,success,false);
}

function cargarMoviles()
{
    var busqueda = $('#transportista').val();
    var url = urlBase + "/movil/GetMoviles.php?busqueda="+busqueda;
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
    getRequest(url,success,false);
}

function cargarTarifas()
{
    var busqueda = $('#tarifas').val();
    var url = urlBase + "/tarifa/GetTarifas.php?busqueda="+busqueda;
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
    getRequest(url,success,false);
}

function agregarServicio()
{
    var partida = $("#partida").val();
    var destino = $("#destino").val();
    var cliente = $("#cliente").val();
    var usuario = $("#usuario").val();
    var transportista = $("#transportista").val();
    var movil = $("#vehiculo").val();
    var tipo = $("#tipo").val();
    var tarifa = $("#tarifas").val();
    var array = [partida,destino,cliente,usuario,transportista,movil,tipo,tarifa];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var data = "partida="+partida+"&destino="+destino+"&cliente="+cliente+"&usuario="
            +usuario+"&transportista="+transportista+"&movil="+movil+"&tipo="+tipo+"&tarifa="+tarifa;
    var url = urlBase + "/servicio/AddServicio.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        POLYLINE.setMap(null);
        alertify.success('Servicio agregado con id '+response.servicio_id);
        vaciarFormulario();
        cambiarPropiedad($("#loader"),"visibility","hidden");
        agregarDetalleServicio(response.servicio_id);
    };
    postRequest(url,success);
}
      
function mostrarDatalist(val,datalist,campo)
{
    if(val === "") return;
    var url = CORS_PROXY + PLACES_API + "input="+val+
            "&location="+POSITION[0]+","+POSITION[1]+"&sensor=true&radius=500&key="+API_KEY;
    var success = function(response)
    {
        datalist.html("");
        var places =  response.predictions;
        for(var i = 0 ; i < places.length;i++)
        {
            var descripcion = places[i].description;
            var encodeDescripcion = descripcion.replace(/'/g,'');
            datalist.append(
                    "<div class=\"option-datalist\" onclick=\"selecionarPlace('"+encodeDescripcion+"','"+campo+"')\"><img src=\"img/ubicacion.svg\" width=\"12\" heifgt=\"12\">"+descripcion+"</div>");
        }
    };
    getRequest(url,success);
}

function selecionarPlace(val,obj)
{
    $("#"+obj).val(decodeURI(val));
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
    var data = "lat="+POLYLINE_LAT+"&lon="+POLYLINE_LNG+"&id="+idServicio;
    var url = urlBase + "/servicio/AddServicioDetalle.php?"+data;
    postRequest(url,null);
}

function validarInexistencia(val,array)
{
    if(val === '')
    {
        return false;
    }
    else
    {
        for(var i = 0 ; i < array.length ; i++)
        {
            if(array[i] === val)
            {
                return false;
            }
        }
    }
    return true;
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
        $("#cliente").val(cliente);
        $("#usuario").val(pasajero);
    }
    marcarServicioEnProceso(idServicio);
    cambiarPropiedad($("#servicios_pendientes"),"display","none");
    dibujarRuta(partida,destino);
}

function marcarServicioEnProceso(idServicio)
{
    var url = urlBase + "/servicio/ModEstadoServicio.php?id="+idServicio+"&estado="+EN_PROCCESO_DE_ASIGNACION;
    var success = function(response)
    {
        alertify.success("Servicio "+response.servicio_id +" se encuentra en proceso asignaci&oacute;n");
    };
    postRequest(url,success,false);
}

function agregarDestino()
{
    var i = 1;
    $(".destino").each(function(index){
        i++;
    });
    $("#destinos").append("<div class=\"cont-pre-monitor\" id=\"cont-destino"+i+"\">Destino "+i+"</div><input type=\"text\" class=\"input_asignar destino\" id=\"destino"+i+"\" placeholder=\"Ej: Av los pinos 723\">");
    $("#destino"+i).on('input',function(){
        mostrarDatalist($(this).val(),$("#destinol"),'destino'+i);
    });
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
