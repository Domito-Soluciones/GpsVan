
$(document).ready(function(){
    $("#cabecera").load("html/cabecera.html");
    $("#menu").load("html/menu.html");
    agregarclase($("#moviles"),"menu-activo");
    $("#pestanaBuscar").click(function () {
        cambiarPropiedad($("#agregar"),"display","none");
        cambiarPropiedad($("#buscar"),"display","initial");
        agregarclase($("#pestanaBuscar"),"pestana-activa");
        quitarclase($("#pestanaAgregar"),"pestana-activa");
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
    $("#buscar").click(function () {
        buscarCliente();
    });
    
    cargarDatosClientes();
});

function cargarDatosClientes()
{
    var url = "../source/httprequest/Clientes.php";
    var success = function(response)
    {
        $("#lrut").html("");
        $("#lrazon").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var rut = response[i].cliente_rut;
            var razon = response[i].cliente_rut;
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
    var url = "../source/httprequest/AddCliente.php?"+data;
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
    
    var data = "razon="+razon+"&rut="+rut+"&tipo="+tipo;
    var url = "../source/httprequest/Clientes.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        var tabla = $("#tabla tbody");
        tabla.html("");
        for(var i = 0 ; i < response.length; i++)
        {
            var nombre = response[i].conductor_nombre;
            var papellido = response[i].conductor_papellido;
            var mapellido = response[i].conductor_mapellido;
            var rut = response[i].conductor_rut;
            var telefono = response[i].conductor_telefono;
            var celular = response[i].conductor_celular;
            var direccion = response[i].conductor_direccion;
            var mail = response[i].conductor_mail;
            var licencia = response[i].conductor_tipoLicencia;
            var contrato = response[i].conductor_contrato;
            tabla.append("<tr><td>"+nombre+"</td><td>"+papellido+"</td><td>"+mapellido
                    +"</td><td>"+rut+"</td><td>"+telefono+"</td><td>"+celular
                    +"</td><td>"+direccion+"</td><td>"+mail+"</td><td>"+licencia
                    +"</td><td>"+contrato+"</td></tr>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    getRequest(url,success);
}