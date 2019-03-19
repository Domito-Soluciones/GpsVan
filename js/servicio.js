/* global urlBase, alertify, CREADO, EN_PROCCESO_DE_ASIGNACION, ASIGNADO, ACEPTADO, EN_PROGRESO, FINALIZADO, google, map, markers, directionsDisplay */
var SERVICIOS;
var ESTADO_SERVICIO;
var RUTA;
var conductores = new Map();
var conductoresNick = new Map();
var MOVILES = {};
var PAGINA = 'SERVICIOS';
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    if (directionsDisplay !== null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
    }
    for(var i = 0; i < markers.length;i++)
    {
        markers[i].setMap(null);
    }
    iniciarFecha([$("#desde"),$("#hasta")]);
    iniciarHora([$("#hdesde"),$("#hhasta")]);
    buscarServicio();
    cargarMoviles();
    $("#exportar").click(function(){
        exportarServicio(); 
    });
    
    $("#buscar").click(function(){
        buscarServicio(); 
    });
});

function buscarServicio()
{
    var id = $("#id").val();
    var empresa = $("#empresa").val();
    var movil = $("#empresa").val();
    var desde = $("#desde").val();
    var hdesde = $("#hdesde").val();
    var hasta = $("#hasta").val();
    var hhasta = $("#hhasta").val();
    var params = {id : id, empresa : empresa, movil : movil,
        desde : desde, hdesde : hdesde, hasta : hasta, hhasta : hhasta};
    var url = urlBase + "/servicio/GetServicios.php";
    var success = function(response)
    {
        cerrarSession(response);
        var servicios = $("#contenedor_central");
        servicios.html("");
        SERVICIOS = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        servicios.append("<div class=\"contenedor_central_titulo\"><div></div><div>ID Servicio</div><div>Empresa</div><div>Fecha</div><div>Estado</div><div>Vehículo</div></div>")
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].servicio_id;
            var cliente = response[i].servicio_cliente;
            var fecha = response[i].servicio_fecha;
            var hora = response[i].servicio_hora;
            var estado = response[i].servicio_estado;
            var conductor = response[i].servicio_movil;
            servicios.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\" onClick=\"abrirBuscador('"+id+"')\">"+
                    "<div>"+id+"</div>"+
                    "<div>"+cliente+"</div>"+
                    "<div>"+fecha+" "+hora+"</div>"+
                    "<div>"+obtenerEstadoServicio(estado)+"</div>"+
                    "<div>"+conductor+"</div></div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function exportarServicio()
{
    
}

function cargarMoviles()
{
    var params = {busqueda : ''};
    var url = urlBase + "/movil/GetMoviles.php";
    var success = function(response)
    {
        for(var i = 0 ; i < response.length ; i++)
        {
            var conductor = response[i].movil_conductor_nombre;
            var nick = response[i].movil_conductor_nick;
            conductores.set(nick,conductor);
            conductoresNick.set(conductor,nick);
            MOVILES = response;
        }
    };
    postRequest(url,params,success,false);
}

function abrirBuscador(id)
{
    AGREGAR = false;
    ID_SERVICIO = id;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_servicio.html", function( response, status, xhr ) {
        cambioEjecutado();
        iniciarPestanias();
        iniciarFecha([$("#fechaServicio")]);
        iniciarHora([$("#inicioServicio")]);
        var servicio;
        for(var i = 0 ; i < SERVICIOS.length; i++)
        {
            if(SERVICIOS[i].servicio_id === id)
            {
                servicio = SERVICIOS[i];
            }
        }
        $("#idServicio").html(servicio.servicio_id);
        $("#clienteServicio").html(servicio.servicio_cliente);
        $("#rutaServicio").html(servicio.servicio_ruta);
        $("#estadoServicio").val(servicio.servicio_estado);
        ESTADO_SERVICIO = servicio.servicio_estado;
        var conductorReal = "";
        for(var i = 0 ; i < MOVILES.length; i++)
        {
            var sel = "";
            var conductor = conductores.get(MOVILES[i].movil_conductor_nick);
            if(MOVILES[i].movil_nombre === servicio.servicio_movil)
            {
                conductorReal = conductor;
                sel = " selected ";
            }
            var movil = MOVILES[i].movil_nombre;
            
            if(conductor.length === 1)
            {
                conductor = "No Definido";
            }
            $("#movilServicio").append("<option value='"+movil+"'"+sel+">"+movil+" / "+conductor+"</option>");
        }
        $("#conductorServicio").html(conductorReal.length===1?"No Definido":conductorReal);
        $("#inicioServicio").val(servicio.servicio_hora);
        $("#fechaServicio").val(servicio.servicio_fecha);
        $("#tarifaServicio").html(servicio.servicio_tarifa1);
        $("#tarifa2Servicio").html(servicio.servicio_tarifa2);        
        if(ESTADO_SERVICIO === FINALIZADO || ESTADO_SERVICIO === EN_PROGRESO)
        {
            $("#fechaServicio").prop("disabled",true);
            $("#inicioServicio").prop("disabled",true);
            $("#movilServicio").prop("disabled",true);
            $("#estadoServicio").prop("disabled",true);
            cambiarPropiedad($("#guardar"),"display","none");
            cambiarPropiedad($("#eliminar"),"display","none");
        }
        $("#volver").click(function(){
            buscarServicio();
        });
        $("#movilServicio").change(function () {
            if($(this).val() !== "")
            {
                var conductor = $(this).children("option").filter(":selected").text().split(" / ")[1];
                $("#conductorServicio").html(conductor);
            }
            else
            {
                $("#conductores").html("");
            }
        });
        $("#guardar").click(function(){
            modificarServicio();
        });
        
        $("#eliminar").click(function (){
            confirmar("Eliminar servicio","Esta seguro que desea eliminar el servicio "+ID_SERVICIO,
            function(){
                    eliminarServicio();
                },null);
        });
    });
}

function modificarServicio()
{
    var id = ID_SERVICIO;
    var fecha = $("#fechaServicio").val();
    var hora = $("#inicioServicio").val();
    var estado = $("#estadoServicio").val();
    var movil = $("#movilServicio").val();
    var conductor = conductoresNick.get($("#conductorServicio").text());
    var array = ["fechaServicio","inicioServicio","estadoServicio","movilServicio","conductorServicio"];
    var params = {id : id,fecha : fecha, hora : hora, estado : estado,movil : movil, conductor : conductor};
    if($("#conductorServicio").text() === 'No Definido')
    {
        alertify.error("Debe seleccionar un vehículo con conductor");
        return;
    }
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var url = urlBase + "/servicio/ModServicio.php";
    var success = function(response)
    {
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        cerrarSession(response);
        alertify.success("Servicio Modificado");
        buscarServicio();
    };
    postRequest(url,params,success);
}

function eliminarServicio()
{
    var params = {id : ID_SERVICIO};
    var url = urlBase + "/servicio/DelServicio.php";
    var success = function(response)
    {
        alertify.success("Servicio eliminado");
        cerrarSession(response);
        buscarServicio();
    };
    postRequest(url,params,success);
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_pasajero").click(function(){
        cambiarPestaniaPasajero();
        obtenerPasajeros();
    });
    $("#p_ruta").click(function(){
        if(ESTADO_SERVICIO < 5)
        {
            $("#contenedor_mapa").html("<div class=\"mensaje_bienvenida\">El servicio de estar finalizado para ver la ruta</div>");
        }
        else
        {
            for(var i = 0; i < markers.length;i++)
            {
                markers[i].setMap(null);
            }
            mostrarMapa();
        }
        cambiarPestaniaRuta();
        dibujarRutaReal();
    });
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_pasajero"),"display","none");
    cambiarPropiedad($("#cont_ruta"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_pasajero"),"dispose");
    agregarclase($("#p_ruta"),"dispose");
}

function cambiarPestaniaPasajero()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_pasajero"),"display","block");
    cambiarPropiedad($("#cont_ruta"),"display","none");
    quitarclase($("#p_pasajero"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_ruta"),"dispose");
}
function cambiarPestaniaRuta()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_pasajero"),"display","none");
    cambiarPropiedad($("#cont_ruta"),"display","block");
    quitarclase($("#p_ruta"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_pasajero"),"dispose");
}

function obtenerEstadoServicio(servicio)
{
    if(servicio === CREADO)
    {
        return "Creado"; 
    }
    else if(servicio === EN_PROCCESO_DE_ASIGNACION)
    {
        return "En proceso de asignaci&oacute;n";            
    }
    else if(servicio === ASIGNADO)
    {
        return "Asignado";     
    }
    else if(servicio === ACEPTADO)
    {
        return "Confirmado";            
    }
    else if(servicio === EN_PROGRESO)
    {
        return "En Ruta";
    }
    else if(servicio === FINALIZADO)
    {
        return "Finalizado"; 
    }
}

function dibujarRutaReal()
{
    var params = {id : ID_SERVICIO};
    var url = urlBase + "/servicio/GetDetalleServicioReal.php";
    var success = function(response)
    {
        var polyline;
        for(var i = 0 ; i < response.length; i++)
        {
            var servicio = response[i];
            polyline += {lat: servicio.servicio_lat, lng: servicio.servicio_lon}
        }
        var flightPath = new google.maps.Polyline({
            path: polyline,
            geodesic: true,
            strokeColor: '#7394e7',
            strokeOpacity: 1.0,
            strokeWeight: 3
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
    };
    postRequest(url,params,success);
}

function obtenerPasajeros()
{
    var params = {id : ID_SERVICIO};
    var url = urlBase + "/servicio/GetPasajerosServicio.php";
    var success = function(response)
    {
        $("#pasajeros_contenido").html("");
        for(var i = 0; i < response.length; i++)
        {
            var pasajero = response[i].servicio_pasajero;
            var horaDestino = response[i].servicio_hora_destino === '00:00:00'?"-":response[i].servicio_hora_destino;
            var estado = '';
            if(response[i].servicio_estado === '0')
            {
                estado = "En Ruta";
            }
            else if (response[i].servicio_estado === '1')
            {
                estado = "Entregado";
            }
            else if (response[i].servicio_estado === '2')
            {
                estado = "Cancelado";
            }
            var destino = response[i].servicio_destino;
            $("#pasajeros_contenido").append("<div class=\"nombre_pasajero\">"+pasajero+"</div>"+
            "<div class=\"dir_pasajero\">"+destino+"</div><div class=\"dato_pasajero\">"+horaDestino+"</div><div class=\"dato_pasajero\">"+estado+"</div>");
        }
    };
    postRequest(url,params,success);
}