/* global urlBase */

var options = {};

$(document).ready(function(){
    validarServicios();
    getDashBoard();
    
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
        $("#sDiarios").html(response.servicio_diario);
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

function graficoServiciosDiarios()
{
    
}

function getDashBoard()
{
    graficoServiciosDiarios();
    graficoVehiculosConectados();
}


