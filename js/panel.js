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
    setInterval(function(){
        cargarServiciosPendientes();        
    },5000);
    if(typeof POLYLINE !== "undefined")
    {
        POLYLINE.setMap(null);
    }
    $("html").click(function() {
        ocultarDatalistNormal($("#lcliente"));
        ocultarDatalistNormal($("#lusuario"));
        ocultarDatalistNormal($("#ltransportista"));
        ocultarDatalistNormal($("#lvehiculo"));
        ocultarDatalistNormal($("#ltipo"));
        ocultarDatalistNormal($("#ltarifa"));
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
    /** CLIENTE **/
    $("#cliente").keyup(function () {
        cargarClientes();
    });
    $("#cliente").click(function (e) {
        e.stopPropagation();
        mostrarDatalistNormal($("#lcliente"));
    });
    $("#cliente").on('blur',function () {
        var noExiste = validarInexistencia($("#cliente").val(),clientes);
        if(noExiste)
        {
            alertify.error("Cliente inexistente");
            $("#cliente").val("");
            
        }
    });
    /** TRANSPORTISTA **/
    $("#transportista").on('input',function () {
        mostrarDatalist($("#ltransportista"));
    });
    
    $("#transportista").click(function (e) {
        e.stopPropagation();
        mostrarDatalistNormal($("#ltransportista"));
    });
    $("#transportista").on('blur',function () {
        var noExiste = validarInexistencia($("#transportista").val(),transportistas);
        if(noExiste)
        {
            alertify.error("Transportista inexistente");
            $("#transportista").val("");
        }
    });
    $("#usuario").on('input',function () {
        cargarUsuarios();
    });
    
    $("#usuario").click(function (e) {
        e.stopPropagation();
        mostrarDatalistNormal($("#lusuario"));
    });
    
    $("#usuario").on('blur',function () {
        var noExiste = validarInexistencia($("#usuario").val(),usuarios);
        if(noExiste)
        {
            alertify.error("Pasajero inexistente");
            $("#usuario").val("");
        }
    });
    $("#vehiculo").on('input', function(){
        cargarMoviles();
    });
    $("#vehiculo").click(function (e) {
        e.stopPropagation();
        mostrarDatalistNormal($("#lvehiculo"));
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
    
    $("#tipo").click(function (e) {
        e.stopPropagation();
        mostrarDatalistNormal($("#ltipo"));
    });
    $("#tarifas").click(function (e) {
        e.stopPropagation();
        mostrarDatalistNormal($("#ltarifa"));
    });
    $("#solicitar").click(function () {
        agregarServicio();
    });
});

function init()
{
    cargarClientes();
    cargarTransportistas();
    cargarUsuarios();
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
            $("#lcliente").append("<div class=\"option-datalist\" onclick=\"selecionar('"+nombre+"','cliente')\">"+nombre+"</div>");
            clientes.push(nombre);
        }
    };
    getRequest(url,success,false);
}

function cargarUsuarios(html = true)
{
    var busqueda = $('#cliente').val();
    var url = urlBase + "/pasajero/GetPasajeros.php?busqueda="+busqueda;
    var success = function(response)
    {
        $("#lusuario").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].pasajero_nombre;
            $("#lusuario").append("<div class=\"option-datalist\" onclick=\"selecionar('"+nombre+"','usuario')\">"+nombre+"</div>");
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
            $("#ltransportista").append("<div class=\"option-datalist\" onclick=\"selecionar('"+nombre+"','transportista')\">"+nombre+"</div>");
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
            $("#lvehiculo").append("<div class=\"option-datalist\" onclick=\"selecionar('"+nombre+"','movil')\">"+nombre+"</div>");
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
            $("#ltarifa").append("<div class=\"option-datalist\" onclick=\"selecionar('"+nombre+"','tarifa')\">"+nombre+"</div>");
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

function buscarServicio()
{
    var id = $("#ids").val();
    var cliente = $("#cliente").val();
    var usuario = $("#usuario").val();
    var transportista = $("#transportista").val();
    var movil = $("#movil").val();
    var desde = $("#tipo").val();
    var hasta = $("#tarifa").val();
    var limit = 1;
    var array = [id,cliente,usuario,transportista,movil,desde,hasta];
    if(!validarCamposAnd(array))
    {
        alertify.error("Ingrese algun criterio de busqueda");
        return;
    }
    var data = "id="+id+"&cliente="+cliente+"&usuario="
            +usuario+"&transportista="+transportista+"&movil="+movil+"&desde="+desde+"&hasta="+hasta+"&limit="+limit;
    var url = urlBase + "/servicio/Servicios.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        for(var i = 0 ; i < response.length; i++)
        {
            alertify.success("servicio encontrado con id "+response[i].servicio_id);
            calculateAndDisplayRoute(response[i].servicio_partida, response[i].servicio_destino);

        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    getRequest(url,success);
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
            datalist.append(
                    "<div class=\"option-datalist\" onclick=\"selecionarPlace('"+descripcion+"','"+campo+"')\"><img src=\"img/ubicacion.svg\" width=\"12\" heifgt=\"12\">"+descripcion+"</div>");
        }
    };
    getRequest(url,success);
}

function selecionarPlace(val,obj)
{
    $("#"+obj).val(val);
    var partida = $("#partida").val();
    var destino = $("#destino").val();
    if(partida !== '' && destino !== '')
    {
        dibujarRuta(partida,destino);
    }
}
function selecionar(val,obj)
{
    $("#"+obj).val(val);
    $("#l"+obj).html("");
}
function dibujarRuta(origen,destino)
{
    var url = CORS_PROXY + DIRECTIONS_API + "origin="+origen+"&destination="+destino+"&key="+API_KEY;
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

function mostrarDatalistNormal(datalist)
{
    if(datalist.css("display") === "none")
    {
        cambiarPropiedad(datalist,"display","block");
    }
    else if(datalist.css("display") === "block")
    {
        cambiarPropiedad(datalist,"display","none");
    }
}
function ocultarDatalistNormal(datalist)
{
    cambiarPropiedad(datalist,"display","none");
}