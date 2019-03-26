/* global alertify, urlBase, urlUtil, POLYLINE_LAT, POLYLINE_LNG */

var CAMPOS = ["clientes","fechas","hora"];
var clientesArray = [];
var destinos = new Map();
$(document).ready(function(){
    TIPO_USUARIO = 'CLIENTE';
    $("#menu").load("menu.php", function( response, status, xhr ) {
        agregarclase($("#panel_cliente"),"menu-activo");
    
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
        alertify.error("Debe seleccionar una fecha válida");
        return;
    }
    var pasajeros = [];
    $(".checkPasajero:checked").each(function(index)
    {
        pasajeros.push('');
    });
    if(pasajeros.length === 0)
    {
        alertify.error("No hay pasajeros asignados a este servicio");
        return;
    }
    vaciarFormulario();
    var params = {cliente : cliente, fecha : fecha, hora : hora, observaciones : observaciones, estado : 0, tarifa1 : 0,tarifa2 : 0, tipo : 1};
    var url = urlBase + "/servicio/AddServicio.php";
    var success = function(response)
    {
        cerrarSession(response);
        alertify.success('Servicio agregado con id '+response.servicio_id);
        agregarDetalleServicio(response.servicio_id);
        enviarCorreoAsignacion("jose.sanchez.6397@gmail.com",response.servicio_id,cliente);
        seleccionarTodo();
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
    var params = {email : mail,asunto : asunto, mensaje : mensaje, extra : ''};
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
        pasajeros.append("<div class=\"contenedor_central_titulo_pasajero\">"+
                "<div class=\"check_pasajero\"><input type=\"checkbox\" id=\"check\" checked onclick=\"seleccionarTodo()\"></div>"+
                "<div></div><div class=\"dato_pasajero\">Rut</div><div class=\"dato_pasajero\">Nombre</div>"+
                "<div class=\"dato_pasajero\">Apellido</div><div class=\"dato_pasajero\">Centro Costo</div>"+
                "<div class=\"dir_pasajero\">Dirección</div></div>");
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].pasajero_id;
            var rut = response[i].pasajero_rut;
            var nombre = response[i].pasajero_nombre;
            var papellido = response[i].pasajero_papellido;
            var cc = response[i].pasajero_centro_costo;
            var punto = response[i].pasajero_punto_encuentro;
            destinos.set(id,punto);
            pasajeros.append("<div class=\"fila_contenedor fila_contenedor_pasajero\">"+
                    "<div class=\"check_pasajero\"><input type=\"checkbox\" class=\"checkPasajero\" id=\"check"+id+"\" checked></div>"+
                    "<div class=\"dato_pasajero\">"+rut+"</div>"+
                    "<div class=\"dato_pasajero\">"+nombre+"</div>"+
                    "<div class=\"dato_pasajero\">"+papellido+"</div>"+
                    "<div class=\"dato_pasajero\">"+cc+"</div><div class=\"dir_pasajero\">"+punto+"</div></div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function agregarDetalleServicio(idServicio)
{
    var pasajeros = "";
    var destino = "";
    $(".checkPasajero:checked").each(function(index){
        var id = $( this ).prop("id").split("check")[1];
        pasajeros += id + "%";
        destino += destinos.get(id) + "%";
    });
    var params = {pasajeros : pasajeros ,destinos : destino, id : idServicio };
    var url = urlBase + "/servicio/AddServicioDetalle.php";
    postRequest(url,params,null);
}

function seleccionarTodo()
{
    $(".checkPasajero").each(function(index)
    {
        if($("#check").prop("checked"))
        {
            $(this).prop("checked",true);
        }
        else
        {
            $(this).prop("checked",false);
        }
    });
}