/* global urlBase */

$(document).ready(function(){
    getDashBoard();
});

function getDashBoard()
{
    var cliente = $("#clientes").val();
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
            cont.append("<div class=\"mensaje_bienvenida\" style=\"padding-top: 20%\">No hay datos registrados</div>");
        }
        if(response.ganancia_cc.length === 0)
        {
            cont2.append("<div class=\"mensaje_bienvenida\" style=\"padding-top: 20%\">No hay datos registrados</div>");
        }
        for(var i = 0 ; i < response.servicio_cc.length;i++)
        {
            var aux = response.servicio_cc[i];
            cont.append("<div><div class=\"titulo_barra\">"+aux.cc_nombre+"</div><div class=\"barra\" id=\"barra"+i+"\"></div><div class=\"fin_barra\">"+aux.cc_cantidad+"</div></div>");
            cambiarPropiedad($("#barra"+i),"width","100px");
        }
        for(var i = 0 ; i < response.ganancia_cc.length;i++)
        {
            var aux = response.ganancia_cc[i];
            cont2.append("<div><div class=\"titulo_barra\">"+aux.cc_nombre+"</div><div class=\"barra\" id=\"barra2"+i+"\"></div><div class=\"fin_barra\"> $ "+aux.cc_cantidad+"</div></div>");
            cambiarPropiedad($("#barra2"+i),"width","100px");
        }
    };
    postRequest(url,params,success);
}



