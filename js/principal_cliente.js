/* global alertify, urlBase */

var CAMPOS = ["clientes","fechas","hora"];
var clientesArray = [];

$(document).ready(function(){
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
    var asunto = "Nueva creacion de servicio";
    var mensaje = "Estimado, el cliente "+cliente+" a creado un nuevo servicio con el id "+id+", ";
    var params = {email : mail,asunto : asunto, mensaje : mensaje, extra : ''};
    var success = function(response)
    {
    };
    postRequest(url,params,success);
}
