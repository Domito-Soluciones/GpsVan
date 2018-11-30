/* global urlBase */

$(document).ready(function(){
    $("#cabecera").load("html/cabecera.html");
    $("#menu").load("html/menu.html", function( response, status, xhr ) {
        agregarclase($("#estadistica"),"menu-activo");
    });
    
    setArco();
    setTorta();
    setConductoresConectados();
    getBar();
    setInterval('setArco()',2000);
});

function setArco()
{
    var url = urlBase + "/estadistica/CantidadServicios.php?fecha=dia";
    var success = function(response)
    {
        $("#total").html("");
        $("#servicios tHead").html("");
        $("#servicios tBody").html("");
        $("#servicios tHead").append("<tr><th>Tipo</th><th>Cantidad Diaria</th></tr>");
        $("#servicios tbody").append("<tr><td>Recogida</td><td>"+response.servicio_recogida+"</td></tr>");
        $("#servicios tbody").append("<tr><td>Especial</td><td>"+response.servicio_especial+"</td></tr>");
        $("#servicios tbody").append("<tr><td>Reparto</td><td>"+response.servicio_reparto+"</td></tr>");
        $("#total").append(response.servicio_total);
    };
    getRequest(url,success);
}
function setTorta()
{
    var url = urlBase + "/estadistica/CantidadServicios.php?fecha=mes";
    var success = function(response)
    {   
        new Chart(document.getElementById("pie-chart"), {
            type: 'pie',
            data: {
                labels: ["Reparto", "Recogida", "Especial"],
                datasets: [{
                    label: "Population (millions)",
                    backgroundColor: ["orange", "#c6ce25","#56a04b"],
                    data: [response.servicio_reparto,response.servicio_recogida,response.servicio_especial]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Cantidad Servicios (Mensual)',
                    fontColor: "white",
                    fontSize: 20
                },
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 16
                    }
                }
            }
        });

    };
    getRequest(url,success);
}

function getBar()
{
    var url = urlBase + "/estadistica/CantidadServiciosConductor.php?fecha=mes";
    var success = function(response)
    {
        var labels = [];
        var data = [];
        for(var i in response)
        {
            var key = i;
            var val = response[i];
            labels.push(key);
            data.push(val);
        }
        var canvas = document.getElementById("myChart");
        var ctx = canvas.getContext('2d');  
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: ' Cantidad de Servicios',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Cantidad Servicios por Movil Mensual',
                    fontColor: "white",
                    fontSize: 25
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            fontColor: "white",
                            fontSize: 20
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "white",
                            fontSize: 20
                        }
                    }]
                },
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 20
                    }
                }
            }
        });   
    }
    getRequest(url,success);
}

function setConductoresConectados()
{
    var url = urlBase + "/estadistica/ConductoresConectados.php";
    var success = function (response) {
        $("#activos tbody").append("<tr><th>Tipo</th><th>Cantidad</th></tr>");
        $("#activos tbody").append("<tr><td>Activo</td><td>"+response.conductor_conectado+"</td></tr>");
        $("#activos tbody").append("<tr><td>En Servicio</td><td>"+response.conductor_ocupado+"</td></tr>");
        $("#activos tbody").append("<tr><td>Inactivos</td><td>"+response.conductor_desconectado+"</td></tr>");
        $("#activos tbody").append("<tr><td>Total Conductores</td><td>"+response.conductor_total+"</td></tr>");
        dibujarDona(response.conductor_conectado,response.conductor_total);
    };
    getRequest(url,success);
}
function dibujarDona(conectado,total)
{
    new Chart(document.getElementById("chart"), {
    type: 'doughnut',
    data: {
      labels: ["Activos", "Inactivos"],
      datasets: [
        {
          backgroundColor: ["orange","gray"],
          data: [conectado,total]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Conductores Activos',
        fontColor: "white",
        fontSize: 20
      },
      legend: {
            labels: {
                fontColor: "white",
                fontSize: 16
            }
        }
    }
});

}
