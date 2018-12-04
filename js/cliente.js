/* global urlBase, alertify */
var CLIENTES;
var AGREGAR = true;
var PAGINA = 'CLIENTES';
$(document).ready(function(){
    $("#menu").load("menu.html", function( response, status, xhr ) {
        agregarclase($("#cliente"),"menu-activo");
    });
    
    buscarCliente();
    $("#agregar").click(function(){
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_cliente.html", function( response, status, xhr ) {
            $("#rut").blur(function (){
                if(validarExistencia('rut',$(this).val()))
                {
                    alertify.error("El rut "+$(this).val()+" ya existe");
                    $("#rut").val("");
                    return;
                }
            });

        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
    });
    $("#cancelar").click(function(){
        resetFormulario(PAGINA);
        resetBotones();
    });
    $("#guardar").click(function(){
        if(AGREGAR)
        {
            agregarCliente();
        }
        else
        {
            modificarCliente();
        }
    });
    $("#busqueda").keyup(function(){
        buscarCliente($(this).val());
    });
    
    $("#eliminar").click(function (){
            alertify.confirm("Eliminar cliente","Esta seguro que desea eliminar al cliente "+$("#rut").val(),
            function(){
                eliminarCliente();
            },null);
    });
});

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
    if(validarTipoDato())
    {
        var data = "razon="+razon+"&tipo="+tipo+"&rut="+rut+"&direccion="+direccion+"&nombre="+nombre+
                "&telefono="+telefono+"&mail="+mail+"&mail2="+mail2+"&centros="+cc;
        var url = urlBase+"/cliente/AddCliente.php?"+data;
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Cliente Agregado");
            vaciarFormulario($("#agregar input"));
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario(PAGINA);
            buscarCliente();
        };
        postRequest(url,success);
    }
}

function modificarCliente()
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
    if(validarTipoDato())
    {
        var data = "razon="+razon+"&tipo="+tipo+"&rut="+rut+"&direccion="+direccion+"&nombre="+nombre
                +"&telefono="+telefono+"&mail="+mail+"&mail2="+mail2+"&centros="+cc;
        var url = urlBase + "/cliente/ModCliente.php?"+data;
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetBotones();
            cerrarSession(response);
            alertify.success("Cliente Modificado");
            vaciarFormulario($("#agregar input"));
            resetFormulario(PAGINA);
            buscarCliente();
        };
        postRequest(url,success);
    }
}

function buscarCliente()
{
    var busqueda = $("#busqueda").val();
    var url = urlBase + "/cliente/GetClientes.php?busqueda="+busqueda;
    var success = function(response)
    {
        cerrarSession(response);
        var clientes = $("#lista_busqueda");
        clientes.html("");
        CLIENTES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].cliente_id;
            var nombre = response[i].cliente_razon_social;
            clientes.append("<div class=\"fila_contenedor\" onClick=\"abrirModificar('"+id+"')\">"+nombre+"</div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function validarTipoDato()
{
    var rut = $("#rut").val();
    var telefono = $("#telefono").val();
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    if(!validarRut(rut))
    {
        alertify.error('Rut invalido');
        return false;
    }
    if(!validarNumero(telefono))
    {
        alertify.error('Telefono debe ser numerico');
        return false;
    }
    if(!validarEmail(mail))
    {
        alertify.error('E-mail contacto invalido');
        return false;
    }
    if(!validarEmail(mail2))
    {
        alertify.error('E-mail facturaci?n invalido');
        return false;
    }
    
    return true;
}