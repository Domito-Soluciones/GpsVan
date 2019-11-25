/* global urlBase, alertify, CREADO, EN_PROCCESO_DE_ASIGNACION, ASIGNADO, ACEPTADO, EN_PROGRESO, FINALIZADO, google, map, markers, directionsDisplay, TIPO_USUARIO */
var ESTADO_SERVICIO;
var REPORTE;
var EMPRESA;
var CONDUCTOR;
var DESDE;
var HDESDE;
var HASTA;
var HHASTA;
var PAGINA = 'REPORTES';
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    iniciarFecha([$("#desde"),$("#hasta")]);
    iniciarHora([$("#hdesde"),$("#hhasta")]);
    cargarClientes();
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
            var params = "empresa="+EMPRESA+"&conductor="+CONDUCTOR+"&desde="+DESDE+"&hdesde="+HDESDE+"&hasta="+HASTA+"&hhasta="+HHASTA;
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
            var params = "empresa="+EMPRESA+"&conductor="+CONDUCTOR+"&desde="+DESDE+"&hdesde="+HDESDE+"&hasta="+HASTA+"&hhasta="+HHASTA;
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
    EMPRESA = $("#empresa").val();
    CONDUCTOR = $("#conductores").val();
    DESDE = $("#desde").val();
    HDESDE = $("#hdesde").val();
    HASTA = $("#hasta").val();
    HHASTA = $("#hhasta").val();
    var params = {empresa : EMPRESA, conductor : CONDUCTOR,
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
    EMPRESA = $("#empresa").val();
    CONDUCTOR = $("#conductores").val();
    DESDE = $("#desde").val();
    HDESDE = $("#hdesde").val();
    HASTA = $("#hasta").val();
    HHASTA = $("#hhasta").val();
    var params = {empresa : EMPRESA, conductor : CONDUCTOR,
        desde : DESDE, hdesde : HDESDE, hasta : HASTA, hhasta : HHASTA};
    var url = urlBase + "/reporte/GetReporteDetalle.php";
    var success = function(response)
    {
        cerrarSession(response);
        var reporte = $("#contenedor_central");
        reporte.html("");
        reporte.append("<div class=\"contenedor_central_titulo_amplio\"><div>ID</div><div>Cliente</div><div>Ruta</div><div>Tipo Ruta</div>\n\
                            <div>Fecha</div><div>Hora</div><div>Movil</div><div>Conductor</div>\n\
                            <div>Tarifa 1</div><div>Tarifa 2</div><div>Estado</div><div style=\"width:20%\">Observación adicional</div></div>");
        for(var i = 0 ; i < response.length; i++){
            let servicio = response[i];
            let id = servicio.servicio_id;
            let cliente = servicio.servicio_cliente;
            let ruta = servicio.servicio_ruta;
            let truta = servicio.servicio_truta;
            let fecha = servicio.servicio_fecha;
            let hora = servicio.servicio_hora;
            let movil = servicio.servicio_movil === '' ? '-' : servicio.servicio_movil;
            let conductor = servicio.servicio_conductor === '' ? '-' : servicio.servicio_conductor;
            let tarifa1 = servicio.servicio_tarifa1;
            let tarifa2 = servicio.servicio_tarifa2;
            let estado = obtenerEstadoServicio(servicio.servicio_estado);
            let observacion = servicio.servicio_observacion_adicional;
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio_reporte\"><div>"+id+"</div><div>"+cliente+"</div><div>"+ruta+"</div><div>"+truta+"</div>\n\
                            <div>"+fecha+"</div><div>"+hora+"</div><div>"+movil+"</div><div>"+conductor+"</div>\n\
                            <div>"+tarifa1+"</div><div>"+tarifa2+"</div><div>"+estado+"</div><div style=\"width:20%\">"+observacion+"</div></div>");
    
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
            var nombre = response[i].cliente_razon;
            $("#empresa").append("<option value=\""+nombre+"\">"+nombre+"</option>");
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
        return "En proceso de asignaci&oacute;n";            
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
