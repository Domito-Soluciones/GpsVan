/* global urlBase */

var options = {};

$(document).ready(function(){
    validarServicios();
    getDashBoard();
    
    $("#servicios_pendientes_link").click(function(){
        mostrarServiciosPendientes();
    });
    
});

function generarGraficoDona(canvas,data,options)
{    
    new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: options
    });
}

function getDashBoard()
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
            $("#pDiaria").html("$ "+response.produccion_diaria);
        }
        if(response.produccion_mensual !== '')
        {
            $("#pMensual").html("$ "+response.produccion_mensual);
        }
        if(response.produccion_minterno !== '')
        {
            $("#pInterno").html("$ "+response.produccion_minterno);
        }
        var cont = $("#vConvenio");
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
//        var dataVehiculo = {
//            labels: [
//                "Activos",
//                "Inactivos"
//            ],
//            datasets: [
//                {
//                    data: [response.movil_activo, response.movil_inactivo],
//                    backgroundColor: [
//                        "#008000",
//                        "#0000ff"
//                    ]
//                }]
//        };
//        var dataServicio =  {
//            labels: convenios,
//            datasets: [{
//                data: totales,
//                fillColor: ["rgba(220,220,220,0.5)", "navy", "red", "orange"],
//                strokeColor: "rgba(220,220,220,0.8)",
//                highlightFill: "rgba(220,220,220,0.75)",
//                highlightStroke: "rgba(220,220,220,1)",
//                borderWidth: 2,
//                hoverBorderWidth: 0
//            }]
//        };
//        var optionsVehiculo = {
//            percentageInnerCutout: 10,
//            animationEasing: 'easeOutCirc',
//            segmentShowStroke: false
//        };
//        
//        var optionsServicio = {
//            scales: {
//                yAxes: [{
//                    barPercentage: 1
//                }]
//            },
//            elements: {
//                rectangle: {
//                    borderSkipped: 'left'
//                }
//            }
//        };
//        generarGraficoDona($("#vActivos"),dataVehiculo,optionsVehiculo);
//        generarGraficoBarra($("#vConvenio"),dataServicio,optionsServicio);
    };
    postRequest(url,params,success);
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


