/* global urlBase, alertify, CREADO, EN_PROCCESO_DE_ASIGNACION, ASIGNADO, ACEPTADO, EN_PROGRESO, FINALIZADO, google, map, markers, directionsDisplay, TIPO_USUARIO */
var ESTADO_SERVICIO;
var PAGINA = 'REPORTES';
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    iniciarFecha([$("#desde"),$("#hasta")]);
    iniciarHora([$("#hdesde"),$("#hhasta")]);

    $("#exportar").click(function(){
        exportarReporte(); 
    });
    
    $("#buscar").click(function(){
        buscarReporte(); 
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


