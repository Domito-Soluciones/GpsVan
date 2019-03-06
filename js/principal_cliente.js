/* global alertify, urlBase, urlUtil */

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

function buscarPasajeroCliente(cliente)
{
    ID_CLIENTE = cliente;
    marcarFilaActiva(cliente);
    var params = {cliente : cliente};
    var url = urlBase + "/pasajero/GetPasajerosCliente.php";
    var success = function(response)
    {
        cerrarSession(response);
        var pasajeros = $("#lista_busqueda_pasajero_detalle");
        pasajeros.html("");
        PASAJEROS = response;
        if(response.length === 0)
        {
            pasajeros.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
            return;
        }
        pasajeros.append("<div class=\"contenedor_central_titulo\"><div></div><div>Rut</div><div>Nombre</div><div>Apellido</div><div>Empresa</div></div>")
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].pasajero_id;
            var rut = response[i].pasajero_rut;
            var nombre = response[i].pasajero_nombre;
            var papellido = response[i].pasajero_papellido;
            var empresa = response[i].pasajero_empresa;
            pasajeros.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+
                    "<div>"+rut+"</div>"+
                    "<div>"+nombre+"</div>"+
                    "<div>"+papellido+"</div><div>"+empresa+"</div></div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}
