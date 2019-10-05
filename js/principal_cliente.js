var menus = new Map();
$(document).ready(function(){
    menus.set("HOME","home_cliente");
    menus.set("PANEL","panel_cliente");
    menus.set("SERVICIOS","servicios");
    TIPO_USUARIO = 'CLIENTE';
    $("#menu").load("menu.php", function( response, status, xhr ) {
        agregarclase($("#home_cliente"),"menu-activo");
    
    });
    
    $("#contenido-central").load("home_cliente.html");

    getUsuario();
    getfecha();
//    setInterval(function(){getfecha();},5000);
    $("#enlace-salir").click(function() {
        salir();
    });
    
//    $("#solicitar").click(function(){
//        crearServicio();
//    });
//    iniciarFecha(['#fechas']);
//    iniciarHora(['#hora']);
//    buscarPasajeroCliente($("#clientes").val());

    $("#menu-telefono").click(function(){
        if($("#menu-telefono").attr('src') === 'img/menu.svg')
        {
            cambiarPropiedad($("#menu"),"display","block");
            $("#menu-telefono").attr("src","img/cancelar.svg");
        }
        else
        {
            cambiarPropiedad($("#menu"),"display","none");
            $("#menu-telefono").attr("src","img/menu.svg");
        }
    });


    
});

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
    };
    postRequest(url,params,success);
}

