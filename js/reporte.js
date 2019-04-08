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
        buscarReporte(); 
    });
    
    $("#exportar").click(function(){
        if(typeof REPORTE === "undefined")
        {
            alertify.error("No hay datos para exportar");
            return;
        }
        else
        {
            var params = "empresa="+EMPRESA+"&conductor="+CONDUCTOR+"&desde="+DESDE+"&hdesde="+HDESDE+"&hasta="+HASTA+"&hhasta="+HHASTA;
            exportar('reporte/GetExcelReporte',params);
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
            window.open(urlBase+"/reporte/GetPdfReporte.php?"+params, '_blank');
        }
    });
});

function buscarReporte()
{
    REPORTE = '';
    EMPRESA = $("#empresa").val();
    CONDUCTOR = $("#conductores").val();
    DESDE = $("#desde").val();
    HDESDE = $("#hdesde").val();
    HASTA = $("#hasta").val();
    HHASTA = $("#hhasta").val();
    var params = {empresa : EMPRESA, conductor : CONDUCTOR,
        desde : DESDE, hdesde : HDESDE, hasta : HASTA, hhasta : HHASTA};
    var url = urlBase + "/reporte/GetReporte.php";
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
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio Pendiente Asignación</div><div class=\"total_reporte\">"+asignar+"</div></div>");
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio Aceptado</div><div class=\"total_reporte\">"+realizar+"</div></div>");
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio en Ruta</div><div class=\"total_reporte\">"+ruta+"</div></div>");
            reporte.append("<div class=\"fila_contenedor fila_contenedor_servicio\"><div class=\"item_reporte\">Servicio Finalizado</div><div class=\"total_reporte\">"+finalizado+"</div></div>");
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
    postRequest(url,params,success,false);
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
    postRequest(url,params,success,false);
}


