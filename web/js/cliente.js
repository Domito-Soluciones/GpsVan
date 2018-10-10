
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
        addTexto($("#mensaje-error"),"Ingrese todos los campos");
        return;
    }
    var data = "razon="+razon+"&rut="+rut+"&dureccion="+direccion+"&nombre="+nombre+
            "&telefono="+telefono+"&mail="+mail+"&mail2="+mail2+"&cc="+cc;
    var url = "../source/httprequest/AddCliente.php?"+data;
    var success = function(response)
    {
        alert("cliente agregado con id "+response);
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    postRequest(url,success);
}
