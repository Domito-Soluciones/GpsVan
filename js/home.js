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

function graficoVehiculosConectados()
{
    var url = urlBase + "/estadistica/GetDashBoard.php";
    var params = {};
    var success = function (response)
    {
        $("#sFinalizado").html(response.servicio_finalizado);
        $("#sRuta").html(response.servicio_ruta);
        $("#sRealizar").html(response.servicio_realizar);
        $("#sAsignar").html(response.servicio_asignar);
        var data = {
            labels: [
                "Activos",
                "Inactivos"
            ],
            datasets: [
                {
                    data: [response.movil_activo, response.movil_inactivo],
                    backgroundColor: [
                        "#008000",
                        "#0000ff"
                    ]
                }]
        };
        generarGraficoDona($("#vActivos"),data,[]);
    };
    postRequest(url,params,success);
}

function getDashBoard()
{
    graficoVehiculosConectados();
}

function mostrarServiciosPendientes()
{
    cambiarPropiedad($(".contenedor-servicios"),"display","initial");
}
function ocultarServiciosPendientes()
{
    cambiarPropiedad($(".contenedor-servicios"),"display","none");
}


