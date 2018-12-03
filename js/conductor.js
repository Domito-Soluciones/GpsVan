/* global urlBase, alertify */
var CONDUCTORES;
var AGREGAR = true;
var PAGINA = 'CONDUCTORES';
$(document).ready(function(){
    $("#menu").load("menu.html", function( response, status, xhr ) {
        agregarclase($("#conductor"),"menu-activo");
    });
    
    buscarConductor();
    $("#agregar").click(function(){
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_conductor.html", function( response, status, xhr ) {
    
            $("#rut").blur(function (){
                if(validarExistencia('rut',$(this).val()))
                {
                    alertify.error("El rut "+$(this).val()+" ya existe");
                    $("#rut").val("");
                    return;
                }
            });

            $("#nick").blur(function (){
                if(validarExistencia('nick',$(this).val()))
                {
                    alertify.error("El nick "+$(this).val()+" no se encuentra disponible");
                    $("#nick").val("");
                    return;
                }
            });
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
    });
    $("#cancelar").click(function(){
        resetFormulario(PAGINA);
        cambiarPropiedad($("#guardar"),"visibility","hidden");
        cambiarPropiedad($("#cancelar"),"visibility","hidden");
        cambiarPropiedad($("#eliminar"),"visibility","hidden");
    });
    $("#guardar").click(function(){
        if(AGREGAR)
        {
            agregarConductor();
        }
        else
        {
            modificarConductor();
        }
    });
    $("#busqueda").keyup(function(){
        buscarConductor($(this).val());
    });
    
    $("#eliminar").click(function (){
        eliminarConductor();
    });
    
});

function agregarConductor()
{
    var rut = $("#rut").val();
    if(!validarRut(rut))
    {
        alertify.error('Rut invalido');
        return;
    }
    var nombre = $("#nombre").val();
    var papellido = $("#papellido").val();
    var mapellido = $("#mapellido").val();
    var telefono = $("#telefono").val();
    var celular = $("#celular").val();
    var direccion = $("#direccion").val();
    var mail = $("#mail").val();
    if(validarEmail(mail))
    {
        alertify.error('E-mail invalido');
        return;
    }
    var nick = $("#nick").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();
    var tipoLicencia = $("#tipoLicencia").val();
    var nacimiento = $("#nacimiento").val();
    var renta = $("#renta").val();
    var contrato = $("#tipoContrato").val();
    var afp = $("#afp").val();
    var isapre = $("#isapre").val();
    var mutual = $("#mutual").val();
    var seguroInicio = $("#seguroInicio").val();
    var seguroRenovacion = $("#seguroRenovacion").val();
    var descuento = $("#descuento").val();
    var anticipo = $("#anticipo").val();
    var array = [nombre,papellido,mapellido,rut,telefono,celular,direccion,mail,
        tipoLicencia,nacimiento,renta,contrato,afp,isapre,mutual,seguroInicio,
        seguroRenovacion,descuento,anticipo,nick,password,password2];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(password !== password2)
    {
        alertify.error("La password no coincide");
        return;
    }
    var imagen = $("#imagenOculta").val();
    var archivoContrato = $("#contratoOculta").val();
    var data = "nombre="+nombre+"&papellido="+papellido+"&mapellido="+mapellido
    +"&rut="+rut+"&nick="+nick+"&password="+password+"telefono="+telefono+"&celular="+celular+"&direccion="+direccion
    +"&mail="+mail+"&tipoLicencia="+tipoLicencia+"&nacimiento="+nacimiento
    +"&renta="+renta+"&contrato="+contrato+"&afp="+afp+"&isapre="+isapre
    +"&mutual="+mutual+"&seguroInicio="+seguroInicio+"&seguroRenovacion="+seguroRenovacion
    +"&descuento="+descuento+"&anticipo="+anticipo+"&imagen="+imagen+"&archivoContrato="+archivoContrato;
    var url = urlBase + "/conductor/AddConductor.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        alertify.success("Conductor Agregado");
        vaciarFormulario($("#agregar input"));
        cambiarPropiedad($("#loader"),"visibility","hidden");
        resetFormulario(PAGINA);
        buscarConductor();
    };
    postRequest(url,success);
}

function modificarConductor()
{
    var rut = $("#rut").val();
    var nombre = $("#nombre").val();
    var papellido = $("#papellido").val();
    var mapellido = $("#mapellido").val();
    var telefono = $("#telefono").val();
    var celular = $("#celular").val();
    var direccion = $("#direccion").val();
    var mail = $("#mail").val();
    var nick = $("#nick").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();
    var tipoLicencia = $("#tipoLicencia").val();
    var nacimiento = $("#nacimiento").val();
    var renta = $("#renta").val();
    var contrato = $("#tipoContrato").val();
    var afp = $("#afp").val();
    var isapre = $("#isapre").val();
    var mutual = $("#mutual").val();
    var seguroInicio = $("#seguroInicio").val();
    var seguroRenovacion = $("#seguroRenovacion").val();
    var descuento = $("#descuento").val();
    var anticipo = $("#anticipo").val();
    var array;
    var claveData = '';
    if(password !== '' || password2 !== '')
    {
        array = [nombre,papellido,mapellido,rut,telefono,celular,direccion,mail,
        tipoLicencia,nacimiento,renta,contrato,afp,isapre,mutual,seguroInicio,
        seguroRenovacion,descuento,anticipo,nick,password,password2];
        claveData = "&password="+password;
    }
    else
    {
        array = [nombre,papellido,mapellido,rut,telefono,celular,direccion,mail,
        tipoLicencia,nacimiento,renta,contrato,afp,isapre,mutual,seguroInicio,
        seguroRenovacion,descuento,anticipo,nick];   
    }
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(password !== password2)
    {
        alertify.error("La password no coincide");
        return;
    }
    var imagen = $("#imagenOculta").val();
    var archivoContrato = $("#contratoOculta").val();
    var data = "nombre="+nombre+"&papellido="+papellido+"&mapellido="+mapellido
    +"&rut="+rut+"&nick="+nick+claveData+"&telefono="+telefono+"&celular="+celular+"&direccion="+direccion
    +"&mail="+mail+"&tipoLicencia="+tipoLicencia+"&nacimiento="+nacimiento
    +"&renta="+renta+"&contrato="+contrato+"&afp="+afp+"&isapre="+isapre
    +"&mutual="+mutual+"&seguroInicio="+seguroInicio+"&seguroRenovacion="+seguroRenovacion
    +"&descuento="+descuento+"&anticipo="+anticipo+"&imagen="+imagen+"&archivoContrato="+archivoContrato;
    var url = urlBase + "/conductor/ModConductor.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        alertify.success("Conductor Modificado");
        vaciarFormulario($("#agregar input"));
        cambiarPropiedad($("#loader"),"visibility","hidden");
        resetFormulario(PAGINA);
        buscarConductor();
    };
    postRequest(url,success);
}

function buscarConductor()
{
    var busqueda = $("#busqueda").val();
    var url = urlBase + "/conductor/GetConductores.php?busqueda="+busqueda;
    var success = function(response)
    {
        cerrarSession(response);
        var conductores = $("#lista_busqueda");
        conductores.html("");
        CONDUCTORES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].conductor_id;
            var nombre = response[i].conductor_nombre;
            var papellido = response[i].conductor_papellido;
            conductores.append("<div class=\"fila_contenedor\" onClick=\"abrirModificar('"+id+"')\">"+nombre+" "+papellido+"</div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    getRequest(url,success);
}

function abrirModificar(id)
{
    AGREGAR = false;
    $("#contenedor_central").load("html/datos_conductor.html", function( response, status, xhr ) {
        iniciarFecha(['#nacimiento','#seguroInicio','#seguroRenovacion']);
        var conductor;
        for(var i = 0 ; i < CONDUCTORES.length; i++)
        {
            if(CONDUCTORES[i].conductor_id === id)
            {
                conductor = CONDUCTORES[i];
            }
        }
        $("#rut").val(conductor.conductor_rut);
        $("#rut").prop("readonly",true);
        $("#nombre").val(conductor.conductor_nombre);
        $("#papellido").val(conductor.conductor_papellido);
        $("#mapellido").val(conductor.conductor_mapellido);
        $("#nick").val(conductor.conductor_nick);
        $("#telefono").val(conductor.conductor_telefono);
        $("#celular").val(conductor.conductor_celular);
        $("#direccion").val(conductor.conductor_direccion);
        $("#mail").val(conductor.conductor_mail);
        $("#tipoLicencia").val(conductor.conductor_tipoLicencia);
        $("#nacimiento").val(conductor.conductor_nacimiento);
        $("#renta").val(conductor.conductor_renta);
        $("#tipoContrato").val(conductor.conductor_tipo_contrato);
        $("#afp").val(conductor.conductor_afp);
        $("#isapre").val(conductor.conductor_isapre);
        $("#mutual").val(conductor.conductor_mutual);
        $("#seguroInicio").val(conductor.conductor_seguro_inicio);
        $("#seguroRenovacion").val(conductor.conductor_seguro_renovacion);
        $("#descuento").val(conductor.conductor_descuento);
        $("#anticipo").val(conductor.conductor_anticipo);
        var imagen = conductor.conductor_imagen;
        var contrato = conductor.conductor_contrato;
        if(imagen !== '')
        {
            cambiarPropiedad($(".imagen"),"background-image","url('../img/conductor/"+imagen+"')");
        }
        
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarConductor()
{
    var rut = $("#rut").val();
    var url = urlBase + "/conductor/DelConductor.php?rut="+rut;
    var success = function(response)
    {
        cerrarSession(response);
        resetFormulario(PAGINA);
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
        cambiarPropiedad($("#guardar"),"visibility","hidden");
        cambiarPropiedad($("#cancelar"),"visibility","hidden");
        cambiarPropiedad($("#eliminar"),"visibility","hidden");
        buscarConductor();
    };
    getRequest(url,success);
}

function succesSubirImagen()
{
    var archivo = $("#archivo").val();
    cambiarPropiedad($(".imagen"),"background-image","url('source/util/img/"+archivo+"')");
}
function succesSubirContrato()
{
    var archivo = $("#archivo").val();
    //cambiarPropiedad($(".imagen"),"background-image","url('source/util/img/"+archivo+"')");
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < CONDUCTORES.length ; i++)
    {
        if(tipo === 'rut')
        {
            if(valor === CONDUCTORES[i].conductor_rut)
            {
                return true;
            }
        }
        if(tipo === 'nick')
        {
            if(valor === CONDUCTORES[i].conductor_nick)
            {
                alertify.error("El nick "+valor+" no se encuentra disponible");
                $("#nick").val("");
                $("#nick").focus();
                return ;
            }
        }
    }    
}