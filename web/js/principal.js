var clientes = new Array();
var usuarios = new Array();
var transportistas = new Array();
var moviles = new Array();

$(document).ready(function(){
    $("#cabecera").load("html/cabecera.html");
    $("#menu").load("html/menu.html");
    agregarclase($("#principal"),"menu-activo");
    iniciarFecha();
    $("#entrar").click(function () {
        agregarServicio();
    });
    $("#boton-buscar").click(function () {
        buscarServicio();
    });
    $("#cliente").on('input',function () {
        preCargarUsuarios(); 
    });
    $("#transportista").on('input',function () {
        preCargarMoviles(); 
    });
    $("#cliente").on('input',function () {
        preCargarUsuarios(); 
    });
    $("#transportista").on('input',function () {
        preCargarMoviles(); 
    });
    $("#pestanaBuscar").click(function () {
        cambiarPropiedad($("#asignar"),"display","none");
        cambiarPropiedad($("#buscar"),"display","initial");
        agregarclase($("#pestanaBuscar"),"pestana-activa");
        quitarclase($("#pestanaAsignar"),"pestana-activa");
        $("#cliente").on('input',function () {
            preCargarUsuarios(); 
        });
        $("#transportista").on('input',function () {
            preCargarMoviles(); 
        });
    });
    $("#pestanaAsignar").click(function () {
        cambiarPropiedad($("#buscar"),"display","none");
        cambiarPropiedad($("#asignar"),"display","initial");
        agregarclase($("#pestanaAsignar"),"pestana-activa");
        quitarclase($("#pestanaBuscar"),"pestana-activa");
        $("#cliente").on('input',function () {
            preCargarUsuarios(); 
        });
        $("#transportista").on('input',function () {
            preCargarMoviles(); 
        });
    });
    cargarIds();
    cargarClientes();
    cargarTransportistas();
});

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
    if(cliente !== '')
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
        cambiarPropiedad($("#loader"),"visibility","hidden");
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
    if(transportista !== '')
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

function agregarServicio()
{
    var partida = $("#partida").val();
    var partida_id = $("#partida_hidden").val();
    var destino = $("#destino").val();
    var destino_id = $("#destino_hidden").val();
    var cliente = clientes[$("#cliente").val()];
    var usuario = usuarios[$("#usuario").val()];
    var transportista = transportistas[$("#transportista").val()];
    var movil = moviles[$("#movil").val()];
    var tipo = $("#tipo").val();
    var tarifa = $("#tarifa").val();
    var array = [partida,partida_id,destino,destino_id,cliente,usuario,transportista,movil,tipo,tarifa];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var data = "partida="+partida+"&partidaId="+partida_id+"&destino="+destino+"&destinoId="+destino_id+"&cliente="+cliente+"&usuario="
            +usuario+"&transportista="+transportista+"&movil="+movil+"&tipo="+tipo+"&tarifa="+tarifa;
    var url = "../source/httprequest/AddServicio.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        alertify.success('servicio agregado con id '+response);
        vaciarFormulario($("#asignar input"));
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    postRequest(url,success);
}

function buscarServicio()
{
    var id = $("#ids").val();
    var cliente = clientes[$("#cliente").val()] === undefined ? "" : clientes[$("#cliente").val()];
    var usuario = usuarios[$("#usuario").val()] === undefined ? "" : usuarios[$("#usuario").val()];
    var transportista = transportistas[$("#transportista").val()] === undefined ? "" : transportistas[$("#transportista").val()];
    var movil = moviles[$("#movil").val()] === undefined ? "" : moviles[$("#movil").val()];
    var desde = $("#tipo").val();
    var hasta = $("#tarifa").val();
    var array = [id,cliente,usuario,transportista,movil,desde,hasta];
    if(!validarCamposAnd(array))
    {
        alertify.error("Ingrese algun criterio de busqueda");
        return;
    }
    var data = "id="+id+"&cliente="+cliente+"&usuario="
            +usuario+"&transportista="+transportista+"&movil="+movil+"&desde="+desde+"&hasta="+hasta;
    var url = "../source/httprequest/Servicios.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        for(var i = 0 ; i < response.length; i++)
        {
            alertify.success("servicio encontrado con id "+response[i].servicio_id);
            calculateAndDisplayRoute(response[i].servicio_partida, response[i].servicio_destino);

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