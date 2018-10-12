var clientes = new Array();
var usuarios = new Array();
var transportistas = new Array();
var moviles = new Array();

$(document).ready(function(){
    $("#cabecera").load("html/cabecera.html");
    $("#menu").load("html/menu.html", function( response, status, xhr ) {
        agregarclase($("#servicios"),"menu-activo");
    });
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
    var url = "../source/httprequest/IdServicios.php?id="+id;
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
    var url = "../source/httprequest/Clientes.php?cliente"+cliente;
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
    var url = "../source/httprequest/Usuarios.php?id="+idCliente;
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
    var url = "../source/httprequest/Transportistas.php?transportista="+transportista;
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
    var url = "../source/httprequest/Moviles.php?id="+idTransportista;
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
    var cliente = clientes[$("#cliente").val()] === undefined ? "" : clientes[$("#cliente").val()];
    var usuario = usuarios[$("#usuario").val()] === undefined ? "" : usuarios[$("#usuario").val()];
    var transportista = transportistas[$("#transportista").val()] === undefined ? "" : transportistas[$("#transportista").val()];
    var movil = moviles[$("#movil").val()] === undefined ? "" : moviles[$("#movil").val()];
    var desde = $("#desde").val();
    var f = new Date();
    if(desde === '')
    {
        desde =  f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " 00:00:00";
    }
    var hasta = $("#hasta").val();
    if(hasta === '')
    {
        hasta = f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() + " 23:59:59";
    }
    var data = "id="+id+"&cliente="+cliente+"&usuario="
            +usuario+"&transportista="+transportista+"&movil="+movil+"&desde="+formato_fecha(desde)+"&hasta="+formato_fecha(hasta)+"&limit="+limit;
    var url = "../source/httprequest/Servicios.php?"+data;
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
            
            tabla.append("<tr class=\"tr_contenido\"><td>"+id+"</td><td>"+formato_humano(fecha)+"</td><td>"+tarifa+"</td><td>"+partida+"</td><td>"+destino+"</td><td>"+cliente
                    +"</td><td>"+pasajero+"</td><td>"+transportista+"</td><td>"+movil
                    +"</td><td>"+tipo+"</td><</tr>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    getRequest(url,success);
}

function iniciarFecha() {
    jQuery.datetimepicker.setLocale('es');
    var conf = {
        i18n:{
            de:{
                months:[
                    'Januar','Februar','März','April',
                    'Mai','Juni','Juli','August',
                    'September','Oktober','November','Dezember'
                ],
                dayOfWeek:[
                    "So.", "Mo", "Di", "Mi", 
                    "Do", "Fr", "Sa."
                ]
            }
        },
        timepicker:false,
        format:'d-m-Y'
    };
    jQuery('#desde').datetimepicker(conf);
    jQuery('#hasta').datetimepicker(conf);
}
