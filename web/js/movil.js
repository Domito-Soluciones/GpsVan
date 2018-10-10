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
    iniciarFecha();
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
    $("#boton-buscar").click(function () {
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
            $("#lpapellido").append("<option value='"+papellido+"'>"+papellido+"</option>");
            $("#lmapellido").append("<option value='"+mapellido+"'>"+mapellido+"</option>");
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
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var data = "nombre="+nombre+"&papellido="+papellido+"&mapellido="+mapellido
    +"&rut="+rut+"&telefono="+telefono+"&celular="+celular+"&direccion="+direccion
    +"&mail="+mail+"&tipoLicencia="+tipoLicencia+"&nacimiento="+nacimiento
    +"&renta="+renta+"&contrato="+contrato+"&afp="+afp+"&isapre="+isapre
    +"&mutual="+mutual+"&seguroInicio="+seguroInicio+"&seguroRenovacion="+seguroRenovacion
    +"&descuento="+descuento+"&anticipo="+anticipo;
    var url = "../source/httprequest/AddConductor.php?"+data;
    var success = function(response)
    {
        alertify.success("Conductor agregado");
        vaciarFormulario($("#agregar input"));
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,success);
}

function buscarConductor()
{
    var rut = $("#rutS").val();
    var nombre = $("#nombreS").val();
    var papellido = $("#papellidoS").val();
    var mapellido = $("#mapellidoS").val();
    var mail = $("#mailS").val();
    
    var data = "rut="+rut+"&nombre="+nombre+"&papellido="+papellido+"&mapellido="+mapellido+"&mail="+mail;
    var url = "../source/httprequest/Conductores.php?"+data;
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
    jQuery('#nacimiento').datetimepicker(conf);
    jQuery('#seguroInicio').datetimepicker(conf);
    jQuery('#seguroRenovacion').datetimepicker(conf);
}
