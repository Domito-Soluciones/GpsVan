var ruts;
var nombres;
var papellidos;
var mapellidos;
var mails;
var tipoLicencias;


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
        agregarConductor();
    });
    $("#buscar").click(function () {
        buscarConductor();
    });
    
    cargarDatosConductores();
});

function cargarDatosConductores()
{
    var url = "../source/httprequest/Conductores.php";
    var success = function(response)
    {
        $("#lrut").html("");
        $("#lnombre").html("");
        $("#lpapellido").html("");
        $("#lmapellido").html("");
        $("#lmail").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var rut = response[i].conductor_rut;
            var nombre = response[i].conductor_nombre;
            var papellido = response[i].conductor_papellido;
            var mapellido = response[i].conductor_mapellido;
            var mail = response[i].conductor_mail;
            $("#lrut").append("<option value='"+rut+"'>"+rut+"</option>");
            $("#lnombre").append("<option value='"+nombre+"'>"+nombre+"</option>");
            $("#papellido").append("<option value='"+papellido+"'>"+papellido+"</option>");
            $("#mapellido").append("<option value='"+mapellido+"'>"+mapellido+"</option>");
            $("#lmail").append("<option value='"+mail+"'>"+mail+"</option>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function agregarConductor()
{
    var nombre = $("#nombre").val();
    var papellido = $("#papellido").val();
    var mapellido = $("#mapellido").val();
    var rut = $("#rut").val();
    var telefono = $("#telefono").val();
    var celular = $("#celular").val();
    var direccion = $("#direccion").val();
    var mail = $("#mail").val();
    var tipoLicencia = $("#tipoLicencia").val();
    var nacimiento = $("#nacimiento").val();
    var renta = $("#renta").val();
    var contrato = $("#contrato").val();
    var afp = $("#afp").val();
    var isapre = $("#isapre").val();
    var mutual = $("#mutual").val();
    var seguroInicio = $("#seguroInicio").val();
    var seguroRenovacion = $("#seguroRenovacion").val();
    var descuento = $("#descuento").val();
    var anticipo = $("#anticipo").val();
    var array = [nombre,papellido,mapellido,rut,telefono,celular,direccion,mail,
        tipoLicencia,nacimiento,renta,contrato,afp,isapre,mutual,seguroInicio,
        seguroRenovacion,descuento,anticipo];
    if(!validarCamposOr(array))
    {
        addTexto($("#mensaje-error"),"Ingrese todos los campos");
        return;
    }
    var data = "";
    var url = "../source/httprequest/AddConductor.php?agrega=true"+data;
    var success = function(response)
    {
        alert("servicio agregado con id "+response);
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    postRequest(url,success);
}

function buscarConductores()
{
    var rut = $("#rut").val();
    var nombre = $("#nombre").val();
    var papellido = $("#papellido").val();
    var mapellido = $("#mapellido").val();
    var mail = $("#mail").val();
    
    var array = [rut,nombre,papellido,mapellido,mail];
    if(!validarCamposAnd(array))
    {
        addTexto($("#mensaje-error"),"Ingrese todos los campos");
        return;
    }
    var data = "rut="+rut+"&nombre="+nombre+"&papellido="+papellido+"&mapellido="+mapellido+"&mail="+mail;
    var url = "../source/httprequest/Servicios.php?"+data;
    var success = function(response)
    {
        for(var i = 0 ; i < response.length; i++)
        {
            alert("servicio encontrado con id "+response[i].servicio_id);
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    getRequest(url,success);
}
