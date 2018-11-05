
/* global urlBase */

$(document).ready(function(){
    $("#cabecera").load("html/cabecera.html");
    $("#menu").load("html/menu.html", function( response, status, xhr ) {
        agregarclase($("#clientes"),"menu-activo");
    });
    $("#pestanaBuscar").click(function () {
        cambiarPropiedad($("#agregar"),"display","none");
        cambiarPropiedad($("#buscar"),"display","initial");
        agregarclase($("#pestanaBuscar"),"pestana-activa");
        quitarclase($("#pestanaAgregar"),"pestana-activa")
        cargarDatosClientes();

    });
    $("#pestanaAgregar").click(function () {
        cambiarPropiedad($("#buscar"),"display","none");
        cambiarPropiedad($("#agregar"),"display","initial");
        agregarclase($("#pestanaAgregar"),"pestana-activa");
        quitarclase($("#pestanaBuscar"),"pestana-activa");
    });
    $("#entrar").click(function () {
        agregarCliente();
    });
    $("#boton-buscar").click(function () {
        buscarCliente();
    });
    
    cargarDatosClientes();
});

function cargarDatosClientes()
{
    var url = urlBase+"/cliente/Clientes.php";
    var success = function(response)
    {
        $("#lrut").html("");
        $("#lrazon").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var rut = response[i].cliente_rut;
            var razon = response[i].cliente_razon;
            $("#lrut").append("<option value='"+rut+"'>"+rut+"</option>");
            $("#lrazon").append("<option value='"+razon+"'>"+razon+"</option>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function agregarCliente()
{
    var razon = $("#razon").val();
    var tipo = $("#tipo").val();
    var rut = $("#rut").val();
    var direccion = $("#direccion").val();
    var nombre = $("#nombre").val();
    var telefono = $("#telefono").val();
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    var cc = $("#centros").val();
    var array = [razon,tipo,rut,direccion,nombre,telefono,mail,mail2,cc];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var data = "razon="+razon+"&tipo="+tipo+"&rut="+rut+"&direccion="+direccion+"&nombre="+nombre+
            "&telefono="+telefono+"&mail="+mail+"&mail2="+mail2+"&centros="+cc;
    var url = urlBase+"/cliente/AddCliente.php?"+data;
    var success = function(response)
    {
        alertify.success("Cliente agregado");
        vaciarFormulario($("#agregar input"));
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,success);
}

function buscarCliente()
{
    var razon = $("#razonS").val();
    var tipo = $("#tipoS").val();
    var rut = $("#rutS").val();
    
    var data = "cliente="+razon+"&rut="+rut+"&tipo="+tipo;
    var url = urlBase+"/cliente/Clientes.php?"+data;
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
            var razon = response[i].cliente_razon;
            var tipo = response[i].cliente_tipo;
            var rut = response[i].cliente_rut;
            var direccion = response[i].cliente_direccion;
            var nombre = response[i].cliente_nombre_contacto;
            var fono = response[i].cliente_fono_contacto;
            var mail = response[i].cliente_mail_contacto;
            var mail2 = response[i].cliente_mail_facturacion;
            var centro = response[i].cliente_centro_costo;
            
            tabla.append("<tr class=\"tr_contenido\"><td>"+razon+"</td><td>"+tipo+"</td><td>"+rut+"</td><td>"+direccion
                    +"</td><td>"+nombre+"</td><td>"+fono+"</td><td>"+mail+"</td><td>"+mail2+"</td><td>"+centro+"</td></tr>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    getRequest(url,success);
}