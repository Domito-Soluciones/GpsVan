/* global urlBase */
var PAGINA = "HOME";
var options = {};
var interval;

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    getDashBoard();
    validarServicios();
    
    $("#servicios_pendientes_link").click(function(){
        mostrarServiciosPendientes();
    });
    
    $("#botonCancelar").click(function(){
        ocultarServiciosPendientes();
    });
    
    
    interval = setInterval('getDashBoard(false)',3000);
    
});

function generarGraficoDona(canvas,data,options)
{    
    new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: options
    });
}

function getDashBoard(cargar = true)
{
    var url = urlBase + "/estadistica/GetDashBoard.php";
    var params = {};
    var success = function(response)
    {
        $("#sFinalizado").html(response.servicio_finalizado);
        $("#sRuta").html(response.servicio_ruta);
        $("#sRealizar").html(response.servicio_realizar);
        $("#sAsignar").html(response.servicio_asignar);
        var total = parseInt(response.movil_activo)+parseInt(response.movil_inactivo);
        $("#vActivos").html(response.movil_activo+"/"+total);
        if(response.produccion_diaria !== '')
        {
            $("#pDiaria").html("$ "+formatoMoneda(response.produccion_diaria));
        }
        if(response.produccion_mensual !== '')
        {
            $("#pMensual").html("$ "+formatoMoneda(response.produccion_mensual));
        }
        if(response.produccion_minterno !== '')
        {
            $("#pInterno").html("$ "+formatoMoneda(response.produccion_minterno));
        }
        var cont = $("#vConvenio");
        cont.html("");
        if(response.servicio_convenios.length === 0)
        {
            cont.append("<div class=\"mensaje_bienvenida\" style=\"padding-top: 20%\">No hay datos registrados</div>");
        }
        for(var i = 0 ; i < response.servicio_convenios.length;i++)
        {
            var aux = response.servicio_convenios[i];
            cont.append("<div><div class=\"titulo_barra\">"+aux.convenio_nombre+"</div><div class=\"barra\" id=\"barra"+i+"\"></div><div class=\"fin_barra\">"+aux.convenio_cantidad+"</div></div>");
            cambiarPropiedad($("#barra"+i),"width","100px");
        }
    };
    postRequest(url,params,success,cargar);
}

function mostrarServiciosPendientes()
{
    cambiarPropiedad($(".contenedor-servicios"),"display","initial");
}
function ocultarServiciosPendientes()
{
    cambiarPropiedad($(".contenedor-servicios"),"display","none");
}

function generarGraficoBarra(canvas,data,options)
{
    new Chart(canvas, {
        type: 'horizontalBar',
        data: data,
        options: options
    });
}


    
function abrirServicio(ids,clientes,ruta,fechas,hora,observacion)
{
    ASIGNANDO = true;
    cambiarModulo('panel',{ids:ids,clientes:clientes,ruta:ruta,fechas:fechas,hora:hora,observacion:observacion});
}
