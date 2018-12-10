/* global urlBase */

var clientes = new Array();
var usuarios = new Array();
var transportistas = new Array();
var moviles = new Array();

$(document).ready(function(){
    iniciarFecha();
    $("#boton-buscar").click(function () {
        buscarServicio(10000);
    });
    init();
});

function init()
{
    cargarIds();
    cargarClientes();
    cargarTransportistas();
    preCargarMoviles();
    preCargarUsuarios();
    buscarServicio(10000);
}

function cargarIds()
{
    var id = $("#ids").val();
    var url = urlBase + "/servicio/IdServicios.php?id="+id;
    var success = function(response)
    {
        $("#lids").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].servicio_id;
            $("#lids").append("<option value='"+id+"'>"+id+"</option>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function cargarClientes()
{
    var cliente = $("#cliente").val();
    var url = urlBase + "/cliente/Clientes.php?cliente="+cliente;
    var success = function(response)
    {
        $("#lcliente").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].cliente_id;
            var nombre = response[i].cliente_razon;
            clientes[nombre] = id;
            $("#lcliente").append("<option value='"+nombre+"'>"+nombre+"</option>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}
function preCargarUsuarios()
{
    var cliente = $('#cliente').val();
    if(cliente === '')
    {
        cargarUsuarios(cliente);
    }
    else
    {
        cargarUsuarios(clientes[cliente]);
    }
}
function cargarUsuarios(idCliente)
{
    var url = urlBase + "/usuario/Usuarios.php?id="+idCliente;
    var success = function(response)
    {
        $("#lusuario").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].usuario_id;
            var nombre = response[i].usuario_nombre;
            usuarios[nombre] = id;
            $("#lusuario").append("<option value='"+nombre+"'>"+nombre+"</option>");
        }
    };
    getRequest(url,success);
}



function cargarTransportistas()
{
    var transportista = $("#transportista").val();
    var url = urlBase + "/transportista/Transportistas.php?transportista="+transportista;
    var success = function(response)
    {
        $("#ltransportista").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].transportista_id;
            var nombre = response[i].transportista_nombre;
            transportistas[nombre] = id;
            $("#ltransportista").append("<option value='"+nombre+"'>"+nombre+"</option>");
        }
    };
    getRequest(url,success);
}
function preCargarMoviles()
{
    var transportista = $('#transportista').val();
    if(transportista === '')
    {
        cargarMoviles(transportista);
    }
    else
    {
        cargarMoviles(transportistas[transportista]);
    }
}
function cargarMoviles(idTransportista)
{
    var url = urlBase + "/movil/Moviles.php?id="+idTransportista;
    var success = function(response)
    {
        $("#lmovil").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].movil_id;
            var nombre = response[i].movil_nombre;
            moviles[nombre] = id;
            $("#lmovil").append("<option value='"+nombre+"'>"+nombre+"</option>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function buscarServicio(limit)
{
    var id = $("#ids").val();
    var cliente = $("#cliente").val();
    var usuario = $("#usuario").val();
    var transportista = $("#transportista").val();
    var movil = $("#movil").val();
    var desde = $("#desde").val();
    var hasta = $("#hasta").val();
    var data = "id="+id+"&cliente="+cliente+"&usuario="
            +usuario+"&transportista="+transportista+"&movil="+movil+"&desde="+formato_fecha(desde)+"&hasta="+formato_fecha(hasta)+"&limit="+limit;
    var url = urlBase + "/servicio/Servicios.php?"+data;
    var success = function(response)
    {
        var tabla = $("#tabla tbody");
        tabla.html("");
        cerrarSession(response);
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].servicio_id;
            var partida = response[i].servicio_partida;
            var destino = response[i].servicio_destino;
            var cliente = response[i].servicio_cliente;
            var pasajero = response[i].servicio_pasajero;
            var transportista = response[i].servicio_transportista;
            var movil = response[i].servicio_movil;
            var tipo = response[i].servicio_tipo;
            var tarifa = response[i].servicio_tarifa;
            var fecha = response[i].servicio_fecha;
            var estado = response[i].servicio_estado;
            tabla.append("<tr class=\"tr_contenido\"><td>"+id+"</td><td></td><td>"+
                    formato_humano(fecha)+"</td><td>"+movil+"<td>"+pasajero+"</td><td>"+tipo+"</td>"
                    +"</td><td>"+tarifa+"</td><td>"+partida+"</td><td>"+destino+"</td><td>"+cliente
                    +"</td><td>"+transportista+"</td></tr>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    getRequest(url,success);
}
