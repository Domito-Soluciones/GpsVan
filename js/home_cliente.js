/* global urlBase */

var interval;
var PAGINA = "HOMEC";
var CLIENTE;
var colores = ["red","blue","green","yellow","pink","brown","purple","yellowgreen"];

$(document).ready(function(){
    window.onbeforeunload = function() {
        return "¿Desea recargar la página web?";
    };
    PAGINA_ANTERIOR = PAGINA;
    getDashBoard();
    interval = setInterval('getDashBoard(false)',3000);
});

function getDashBoard(cargar = true)
{
    var cliente = $("#clientesNombre").val();
    CLIENTE = cliente;
    var url = urlBase + "/estadistica/GetDashBoardCliente.php";
    var params = {cliente: cliente};
    var success = function(response)
    {
        $("#sFinalizado").html(response.servicio_finalizado);
        $("#sRuta").html(response.servicio_ruta);
        $("#sRealizar").html(response.servicio_realizar);
        $("#sAsignar").html(response.servicio_asignar);
        var cont = $("#vCantCC");
        var cont2 = $("#vGanCC");
        if(response.servicio_cc.length === 0)
        {
            cont.html("");
            cont.append("<div class=\"mensaje_bienvenida\" style=\"padding-top: 20%\">No hay datos registrados</div>");
        }
        else
        {
            var ctx = document.getElementById("canvas1");
            var labelAux = [];
            var dataAux = [];
            for(var i = 0 ; i < response.servicio_cc.length;i++)
            {
                var aux = response.servicio_cc[i];
                labelAux.push(aux.cc_nombre);
                dataAux.push(aux.cc_cantidad);
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
        if(response.ganancia_cc.length === 0)
        {
            cont2.html("");
            cont2.append("<div class=\"mensaje_bienvenida\" style=\"padding-top: 20%\">No hay datos registrados</div>");
        }
        else
        {
            var ctx = document.getElementById("canvas2");
            var labelAux = [];
            var dataAux = [];
            for(var i = 0 ; i < response.ganancia_cc.length;i++)
            {
                var aux = response.ganancia_cc[i];
                labelAux.push(aux.cc_nombre);
                dataAux.push(aux.cc_cantidad);
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



