/* global urlBase, alertify, CREADO, EN_PROCCESO_DE_ASIGNACION, ASIGNADO, ACEPTADO, EN_PROGRESO, FINALIZADO, google, map, markers, directionsDisplay, TIPO_USUARIO */
var ESTADO_SERVICIO;
var REPORTE;
var EMPRESA;
var CC;
var CONDUCTOR;
var DESDE;
var HDESDE;
var HASTA;
var HHASTA;
var PAGINA = 'REPORTES';
$(document).ready(function(){
    window.onbeforeunload = ()=>{};
    PAGINA_ANTERIOR = PAGINA;
    iniciarFecha([$("#desde"),$("#hasta")]);
    iniciarHora([$("#hdesde"),$("#hhasta")]);
    cargarClientes();
    buscarCentrosCosto();
    cargarConductores();
    
    $("#buscar").click(function(){
        let reporte = $("#reporte").val();
        if(reporte !== ''){
            buscarReporte(reporte); 
        }
        else{
            alertify.error("Seleccione el tipo de reporte");
        }
    });
    
    $("#exportar").click(function(){
        if(typeof REPORTE === "undefined")
        {
            alertify.error("No hay datos para exportar");
            return;
        }
        else
        {
            let reporte = $("#reporte").val();
            var params = "empresa="+EMPRESA+"&cc="+CC+"&conductor="+CONDUCTOR+"&desde="+DESDE+"&hdesde="+HDESDE+"&hasta="+HASTA+"&hhasta="+HHASTA;
            if(reporte === '0'){
                exportar('reporte/GetExcelReporteTotal',params);
            }
            else if(reporte === '1'){
                exportar('reporte/GetExcelReporteDetalle',params);
            }
            else{
                alertify.error("Seleccione el tipo de reporte");
            }
            
        }
    });
    $("#exportar2").click(function(){
        if(typeof REPORTE === "undefined")
        {
            alertify.error("No hay datos para exportar");
            return;
        }
        else
        {
            var params = "empresa="+EMPRESA+"&cc="+CC+"&conductor="+CONDUCTOR+"&desde="+DESDE+"&hdesde="+HDESDE+"&hasta="+HASTA+"&hhasta="+HHASTA;
            let reporte = $("#reporte").val();
            if(reporte === '0'){
                window.open(urlBase+"/reporte/GetPdfReporteTotal.php?"+params, '_blank');
            }
            else if(reporte === '1'){
                window.open(urlBase+"/reporte/GetPdfReporteDetalle.php?"+params, '_blank');
            }
            else{
                alertify.error("Seleccione el tipo de reporte");
            }
        }
    });
    
    $("#empresa").change(function(){
        buscarCentrosCosto($(this).val());
    });
});

function buscarReporte(tipo)
{
    REPORTE = '';
    if(tipo === '0'){
        getReporteTotal();
    }
    else if(tipo === '1'){
        getReporteDetalle();
    }
}

function getReporteTotal(){
    EMPRESA = $("#empresa option:selected").text() === 'Seleccione' ? '' : $("#empresa option:selected").text();
    CC = $("#cc").val();
    CONDUCTOR = $("#conductores").val();
    DESDE = $("#desde").val();
    HDESDE = $("#hdesde").val();
    HASTA = $("#hasta").val();
    HHASTA = $("#hhasta").val();
    var params = {empresa : EMPRESA, cc : CC, conductor : CONDUCTOR,
        desde : DESDE, hdesde : HDESDE, hasta : HASTA, hhasta : HHASTA};
    var url = urlBase + "/reporte/GetReporteTotal.php";
    var success = function(response)
    {
        cerrarSession(response);
        var reporte = $("#contenedor_central");
        reporte.html("");
        reporte.append("<div class=\"contenedor_central_titulo\"><div class=\"item_reporte\">Item</div><div class=\"total_reporte\">Total</div></div>");
            var asignar = response.servicio_asignar;
            var realizar = response.servicio_realizar;
            var ruta = response.servicio_ruta;
            var finalizado = response.servicio_finalizado;
            var cancelado = response.servicio_cancelado;
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio Pendiente Asignación</div><div class=\"total_reporte\">"+asignar+"</div></div>");
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio Aceptado</div><div class=\"total_reporte\">"+realizar+"</div></div>");
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio en Ruta</div><div class=\"total_reporte\">"+ruta+"</div></div>");
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio Finalizado</div><div class=\"total_reporte\">"+finalizado+"</div></div>");
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio Cancelado</div><div class=\"total_reporte\">"+cancelado+"</div></div>");
    };
    postRequest(url,params,success);
}

function getReporteDetalle(){ 
    EMPRESA = $("#empresa option:selected").text() === 'Seleccione' ? '' : $("#empresa option:selected").text();
    CC = $("#cc").val();
    CONDUCTOR = $("#conductores").val();
    DESDE = $("#desde").val();
    HDESDE = $("#hdesde").val();
    HASTA = $("#hasta").val();
    HHASTA = $("#hhasta").val();
    var params = {empresa : EMPRESA, cc : CC, conductor : CONDUCTOR,
        desde : DESDE, hdesde : HDESDE, hasta : HASTA, hhasta : HHASTA};
    var url = urlBase + "/reporte/GetReporteDetalle.php";
    var success = function(response)
    {
        cerrarSession(response);
        var reporte = $("#contenedor_central");
        reporte.html("");
        reporte.append("<div class=\"contenedor_central_titulo_amplio\"><div>ID</div><div>Cliente</div><div>Ruta</div><div>Tipo Ruta</div>\n\
                            <div>Fecha</div><div>Tarifa 1</div><div>Tarifa 2</div>"+(CC === "-1" ? "<div>Centro de costo</div>" : "") +"<div>Movil</div><div>Conductor</div>\n\
                            <div>Estado</div><div style=\"width:20%\">Observación adicional</div></div>");
        for(var i = 0 ; i < response.length; i++){
            let servicio = response[i];
            let id = servicio.servicio_id;
            let cliente = servicio.servicio_cliente;
            let ruta = servicio.servicio_ruta === '' ? '-' : servicio.servicio_ruta;
            let truta = servicio.servicio_truta === '' ? '-' : servicio.servicio_truta;
            let fecha = servicio.servicio_fecha;
            let hora = servicio.servicio_hora;
            let movil = servicio.servicio_movil === '' ? '-' : servicio.servicio_movil;
            let conductor = servicio.servicio_conductor === ' ' ? '-' : servicio.servicio_conductor;
            let tarifa1 = servicio.servicio_tarifa1;
            let tarifa2 = servicio.servicio_tarifa2;
            var cantidad = response[i].servicio_cpasajeros;
            var cantidadCC = response[i].servicio_cpasajeros_cc;
            var pasajeroCC = response[i].servicio_pasajero_cc === '' ? '-' : response[i].servicio_pasajero_cc ;
            var aux = 0;
            var aux1 = 0;
            if(cantidad > 0){
                aux = tarifa1 / cantidad;
                aux1 = tarifa2 / cantidad;
            }
            tarifa1 = Math.round(aux * cantidadCC);
            tarifa2 = Math.round(aux1 * cantidadCC);
            let estado = obtenerEstadoServicio(servicio.servicio_estado);
            let observacion = servicio.servicio_observacion_adicional;
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio_reporte\">"+
                            "<div>"+id+"</div>"+
                            "<div>"+cliente+"</div>"+
                            "<div>"+ruta+"</div>"+
                            "<div>"+truta+"</div>"+
                            "<div>"+fecha+" "+hora+"</div>"+
                            "<div>$ "+tarifa1+"</div>"+
                            "<div>$ "+tarifa2+"</div>"+
                            (CC === "-1" ? "<div>"+pasajeroCC+"</div>" : "") +
                            "<div>"+movil+"</div>"+
                            "<div>"+conductor+"</div>"+
                            "<div>"+estado+"</div>"+
                            "<div style=\"width:20%\">"+observacion+"</div></div>");
    
        }
    };
    postRequest(url,params,success);
}

function cargarClientes()
{
    var params = {busqueda : '',buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        $("#empresa").html("<option value=\"\">Seleccione</option>");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].cliente_id;
            var nombre = response[i].cliente_razon;
            $("#empresa").append("<option value=\""+id+"\">"+nombre+"</option>");
        }
    };
    postRequest(url,params,success);
}
function cargarConductores()
{
    var params = {busqueda : ''};
    var url = urlBase + "/conductor/GetConductores.php";
    var success = function(response)
    {
        $("#conductores").html("<option value=\"\">Seleccione</option>");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].conductor_id;
            var nombre = id + " / " + response[i].conductor_nombre + " " + response[i].conductor_papellido;
            $("#conductores").append("<option value=\""+id+"\">"+nombre+"</option>");
        }
    };
    postRequest(url,params,success);
}

function obtenerEstadoServicio(servicio)
{
    if(servicio === CREADO)
    {
        return "Creado"; 
    }
    else if(servicio === EN_PROCCESO_DE_ASIGNACION)
    {
        return "En asignaci&oacute;n";            
    }
    else if(servicio === ASIGNADO)
    {
        return "Asignado";     
    }
    else if(servicio === ACEPTADO)
    {
        return "Aceptado";            
    }
    else if(servicio === EN_PROGRESO)
    {
        return "En Ruta";
    }
    else if(servicio === FINALIZADO)
    {
        return "Finalizado"; 
    }
    else if(servicio === CANCELADO)
    {
        return "Cancelado"; 
    }
}

function buscarCentrosCosto(cliente = '')
{
    var params = {cliente : cliente};
    var url = urlBase + "/cliente/GetCentroCosto.php";
    var success = function(response)
    { 
        $("#cc").html("<option value=\"\">Seleccione</option></option><option value=\"-1\">Todos</option>");
        for(var i = 0; i < response.length ; i++){
            var value = response[i].cc_nombre;
            $("#cc").append("<option value='"+value+"'>"+value+"</option>");
        }
    };
    postRequest(url,params,success);
    
}
