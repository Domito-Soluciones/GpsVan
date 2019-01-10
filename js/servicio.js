/* global urlBase, alertify, CREADO, EN_PROCCESO_DE_ASIGNACION, ASIGNADO, ACEPTADO, EN_PROGRESO, FINALIZADO */
var SERVICIOS;
var PAGINA = 'SERVICIOS';
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    iniciarFecha([$("#desde"),$("#hasta")]);
    buscarServicio();
    $("#exportar").click(function(){
        exportarServicio(); 
    });
    
    $("#buscar").click(function(){
        buscarServicio(); 
    });
    
    $("#servicio").keyup(function(){
        buscarServicio(); 
    });
});

function buscarServicio()
{
    var busqueda = $("#busqueda").val();
    var desde = $("#desde").val();
    var hasta = $("#hasta").val();
    var url = urlBase + "/servicio/GetServicios.php?busqueda="+busqueda+
            "&desde="+desde+"&hasta="+hasta;
    var success = function(response)
    {
        cerrarSession(response);
        var servicios = $("#lista_busqueda");
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
            servicios.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"abrirBuscador('"+id+"')\">"+id+"</div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function exportarServicio()
{
    
}

function abrirBuscador(id)
{
    AGREGAR = false;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_servicio.html", function( response, status, xhr ) {
        iniciarPestanias();
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
        $("#pasajeroServicio").html(servicio.servicio_pasajero);
        $("#estadoServicio").html(obtenerEstadoServicio(servicio.servicio_estado));
        $("#tipoServicio").html(servicio.servicio_tipo);
        $("#transportistaServicio").html(servicio.servicio_transportista);
        $("#conductorServicio").html(servicio.servicio_conductor);
        $("#movilServicio").html(servicio.servicio_movil);
        $("#origenServicio").html(servicio.servicio_partida);
        $("#horaOrigenServicio").html(servicio.servicio_hora_partida);
        $("#destinoServicio").html(servicio.servicio_destino);
        $("#horaDestinoServicio").html(servicio.servicio_hora_destino);        
        $("#tarifaServicio").html(servicio.servicio_tarifa);
        
        cambiarPropiedad($("#exportar"),"visibility","visible");
        
    });
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_transportista").click(function(){
        cambiarPestaniaTransportista();
    });
    $("#p_viaje").click(function(){
        cambiarPestaniaViaje();
    });
    $("#p_tarifa").click(function(){
        cambiarPestaniaTarifa();
    });
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_transportista"),"display","none");
    cambiarPropiedad($("#cont_viaje"),"display","none");
    cambiarPropiedad($("#cont_tarifa"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_transportista"),"dispose");
    agregarclase($("#p_viaje"),"dispose");
    agregarclase($("#p_tarifa"),"dispose");
}

function cambiarPestaniaTransportista()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_transportista"),"display","block");
    cambiarPropiedad($("#cont_viaje"),"display","none");
    cambiarPropiedad($("#cont_tarifa"),"display","none");
    quitarclase($("#p_transportista"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_viaje"),"dispose");
    agregarclase($("#p_tarifa"),"dispose");
}

function cambiarPestaniaViaje()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_transportista"),"display","none");
    cambiarPropiedad($("#cont_viaje"),"display","block");
    cambiarPropiedad($("#cont_tarifa"),"display","none");
    quitarclase($(this),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_transportista"),"dispose");
    agregarclase($("#p_tarifa"),"dispose");
}

function cambiarPestaniaTarifa()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_transportista"),"display","none");
    cambiarPropiedad($("#cont_viaje"),"display","none");
    cambiarPropiedad($("#cont_tarifa"),"display","block");
    quitarclase($(this),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_transportista"),"dispose");
    agregarclase($("#p_viaje"),"dispose");
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
        return "En proceso";
    }
    else if(servicio === FINALIZADO)
    {
        return "Finalizado"; 
    }
}