/* global alertify, urlBase, urlUtil, POLYLINE_LAT, POLYLINE_LNG */

var CAMPOS = ["clientes","fechas","hora"];
var clientesArray = [];

$(document).ready(function(){
    $("#menu").load("menu.php", function( response, status, xhr ) {
        agregarclase($("#principal"),"menu-activo");
    
    });   
    getUsuario();
    getfecha();
    setInterval(function(){getfecha();},5000);
    $("#solicitar").click(function(){
        crearServicio();
    });
    $("#enlace-salir").click(function() {
        salir();
    });
    
    iniciarFecha(['#fechas']);
    iniciarHora(['#hora']);
    buscarPasajeroCliente($("#clientes").val());
});

function crearServicio()
{
    var cliente = $("#clientes").val();
    var fecha = $("#fechas").val();
    var hora = $("#hora").val();
    var observaciones = $("#observacion").val();
    var array = [cliente,fecha,hora];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var fechaFormat = fecha.split('/');
    var date = new Date(fechaFormat[2]+"-"+fechaFormat[1]+"-"+fechaFormat[0]+" "+hora);
    var now = new Date();
    if(date < now)
    {
        alertify.error("Debe seleccionar una fecha futura");
        return;
    }
    vaciarFormulario();
    var params = {cliente : cliente, fecha : fecha, hora : hora, observaciones : observaciones, estado : 0, tarifa1 : 0,tarifa2 : 0};
    var url = urlBase + "/servicio/AddServicio.php";
    var success = function(response)
    {
        cerrarSession(response);
        alertify.success('Servicio agregado con id '+response.servicio_id);
        agregarDetalleServicio(response.servicio_id);
        enviarCorreoAsignacion("jose.sanchez.6397@gmail,com",response.servicio_id,cliente);
    };
    postRequest(url,params,success);

}

function activarPestania(array)
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        if(array[i] === '')
        {
            marcarCampoError($("#"+CAMPOS[i]));
        }
        else
        {
            marcarCampoOk($("#"+CAMPOS[i]));
        }
    }
}

function enviarCorreoAsignacion(mail,id,cliente)
{
    var url = urlUtil + "/enviarMail.php";
    var asunto = "Notificación Dómito";
    var mensaje = "Estimado(a), se informan los siguientes cambios:<br> El cliente "+cliente+" a creado un nuevo servicio con el id "+id+", ";
    var params = {email : "jose.sanchez.6397@gmail.com",asunto : asunto, mensaje : mensaje, extra : ''};
    var success = function(response)
    {
    };
    postRequest(url,params,success);
}

function buscarPasajeroCliente(cliente)
{
    var params = {cliente : cliente};
    var url = urlBase + "/pasajero/GetPasajerosCliente.php";
    var success = function(response)
    {
        cerrarSession(response);
        var pasajeros = $("#contenedor-pasajero");
        pasajeros.html("");
        PASAJEROS = response;
        if(response.length === 0)
        {
            pasajeros.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
            return;
        }
        pasajeros.append("<div class=\"contenedor_central_titulo_pasajero\"><div><input type=\"checkbox\" id=\"check\" checked></div><div></div><div>Rut</div><div>Nombre</div><div>Apellido</div><div>Centro Costo</div><div>Dirección</div></div>")
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].pasajero_id;
            var rut = response[i].pasajero_rut;
            var nombre = response[i].pasajero_nombre;
            var papellido = response[i].pasajero_papellido;
            var cc = response[i].pasajero_centro_costo;
            var punto = response[i].pasajero_punto_encuentro;
            pasajeros.append("<div class=\"fila_contenedor fila_contenedor_pasajero\">"+
                    "<div><input type=\"checkbox\" class=\"checkPasajero\" id=\"check"+id+"\" checked></div>"+
                    "<div>"+rut+"</div>"+
                    "<div>"+nombre+"</div>"+
                    "<div>"+papellido+"</div><div>"+cc+"</div><div>"+punto+"</div></div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function agregarDetalleServicio(idServicio)
{
    var pasajeros = "";
    $(".checkPasajero:checked").each(function(index){
        pasajeros += $( this ).prop("id").split("check")[1] + "%";
    });
    console.log(pasajeros);
    params = { lat : null, lon : null, pasajeros : pasajeros ,destinos : null, id : idServicio, };
    var url = urlBase + "/servicio/AddServicioDetalle.php";
    postRequest(url,params,null);
}