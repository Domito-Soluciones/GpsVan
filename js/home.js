/* global urlBase */
var PAGINA = "HOME";
var options = {};
var interval;
var colores = ["red","blue","green","yellow","pink","brown","purple","yellowgreen"];
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
        if(response.servicio_convenios.length === 0)
        {
            cont.html("");
            cont.append("<div class=\"mensaje_bienvenida\" style=\"padding-top: 20%\">No hay datos registrados</div>");
        }
        else
        {
            var ctx = document.getElementById("canvasConvenio");
            var labelAux = [];
            var dataAux = [];
            for(var i = 0 ; i < response.servicio_convenios.length;i++)
            {
                var aux = response.servicio_convenios[i];
                labelAux.push(aux.convenio_nombre);
                dataAux.push(aux.convenio_cantidad);
            }
            new Chart(ctx, {
                  type: 'pie',
                  data: {
                      labels: labelAux,
                      datasets: [{
                          backgroundColor: colores,
                          data: dataAux
                      }]
                  },
                  options: {
                    animation: false,
                    maintainAspectRatio: false,
                    responsive: true
                  }      
            });
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


    
function abrirServicio(ids,clientes,ruta,fechas,hora,observacion,tipo)
{
    ASIGNANDO = true;
    cambiarModulo('panel',{ids:ids,clientes:clientes,ruta:ruta,fechas:fechas,hora:hora,observacion:observacion,tipo:tipo});
}