/* global urlBase, alertify */
var PASAJEROS;
var AGREGAR = true;
var PAGINA = 'PASAJEROS';
$(document).ready(function(){
    $("#menu").load("menu.html", function( response, status, xhr ) {
        agregarclase($("#pasajero"),"menu-activo");
    });
    
    buscarPasajero();
    $("#agregar").click(function(){
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_pasajero.html", function( response, status, xhr ) {
            iniciarPestaniasPasajero();
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
        resetBotones();
    });
    $("#guardar").click(function(){
        if(AGREGAR)
        {
            agregarPasajero();
        }
        else
        {
            modificarPasajero();
        }
    });
    $("#busqueda").keyup(function(){
        buscarPasajero($(this).val());
    });
    
    $("#eliminar").click(function (){
            alertify.confirm("Eliminar pasajero","Esta seguro que desea eliminar al pasajero "+$("#rut").val(),
            function(){
                eliminarPasajero();
            },null);
    });
    });

function agregarPasajero()
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
    var cargo = $("#cargo").val();
    var nivel = $("#nivel").val();
    var array = [nombre,papellido,mapellido,rut,celular,direccion,mail,
        nick,password,password2,cargo,nivel];
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
    if(validarTipoDato())
    {
        var data = "nombre="+nombre+"&papellido="+papellido+"&mapellido="+mapellido
        +"&rut="+rut+"&nick="+nick+"&password="+password+"&telefono="+telefono+"&celular="+celular+"&direccion="+direccion
        +"&mail="+mail+"&cargo="+cargo+"&nivel="+nivel;
        var url = urlBase + "/pasajero/AddPasajero.php?"+data;
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Pasajero Agregado");
            vaciarFormulario($("#agregar input"));
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario(PAGINA);
            buscarPasajero();
        };
        postRequest(url,success);
    }
}

function modificarPasajero()
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
    var cargo = $("#cargo").val();
    var nivel = $("#nivel").val();
    var array;
    var claveData = '';
    if(password !== '' || password2 !== '')
    {
        if(password !== password2)
        {
            alertify.error("La password no coincide");
            return;
        }
        array = [nombre,papellido,mapellido,rut,celular,direccion,mail,
        nick,password,password2,cargo,nivel];
        claveData = "&password="+password;
    }
    else
    {
        array = [nombre,papellido,mapellido,rut,celular,direccion,mail,nick,cargo,nivel];   
    }
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "nombre="+nombre+"&papellido="+papellido+"&mapellido="+mapellido
        +"&rut="+rut+"&nick="+nick+claveData+"&telefono="+telefono+"&celular="+celular+"&direccion="+direccion
        +"&mail="+mail+"&cargo="+cargo+"&nivel="+nivel;
        var url = urlBase + "/pasajero/ModPasajero.php?"+data;
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetBotones();
            cerrarSession(response);
            alertify.success("Pasajero Modificado");
            vaciarFormulario($("#agregar input"));
            resetFormulario(PAGINA);
            buscarPasajero();
        };
        postRequest(url,success);
    }
}

function buscarPasajero()
{
    var busqueda = $("#busqueda").val();
    var url = urlBase + "/pasajero/GetPasajeros.php?busqueda="+busqueda;
    var success = function(response)
    {
        cerrarSession(response);
        var pasajeros = $("#lista_busqueda");
        pasajeros.html("");
        PASAJEROS = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].pasajero_id;
            var nombre = response[i].pasajero_nombre;
            var papellido = response[i].pasajero_papellido;
            pasajeros.append("<div class=\"fila_contenedor\" onClick=\"abrirModificar('"+id+"')\">"+nombre+" "+papellido+"</div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function abrirModificar(id)
{
    AGREGAR = false;
    $("#contenedor_central").load("html/datos_pasajero.html", function( response, status, xhr ) {
        iniciarPestaniasPasajero();
        $("#nick").blur(function (){
            if(validarExistencia('nick',$(this).val()))
            {
                alertify.error("El nick "+$(this).val()+" no se encuentra disponible");
                $("#nick").val("");
                return;
            }
        });
        var pasajero;
        for(var i = 0 ; i < PASAJEROS.length; i++)
        {
            if(PASAJEROS[i].pasajero_id === id)
            {
                pasajero = PASAJEROS[i];
            }
        }
        $("#rut").val(pasajero.pasajero_rut);
        $("#rut").prop("readonly",true);
        $("#nombre").val(pasajero.pasajero_nombre);
        $("#papellido").val(pasajero.pasajero_papellido);
        $("#mapellido").val(pasajero.pasajero_mapellido);
        $("#nick").val(pasajero.pasajero_nick);
        $("#telefono").val(pasajero.pasajero_telefono);
        $("#celular").val(pasajero.pasajero_celular);
        $("#direccion").val(pasajero.pasajero_direccion);
        $("#mail").val(pasajero.pasajero_mail);
        $("#cargo").val(pasajero.pasajero_tipoLicencia);
        $("#nivel").val(pasajero.pasajero_nacimiento);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarPasajero()
{
    var rut = $("#rut").val();
    var url = urlBase + "/pasajero/DelPasajero.php?rut="+rut;
    var success = function(response)
    {
        alertify.success("Pasajero eliminado");
        cerrarSession(response);
        resetFormulario(PAGINA);
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarPasajero();
    };
    getRequest(url,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < PASAJEROS.length ; i++)
    {
        if(tipo === 'rut')
        {
            if(valor === PASAJEROS[i].pasajero_rut)
            {
                return true;
            }
        }
        if(tipo === 'nick')
        {
            if(valor === PASAJEROS[i].pasajero_rut)
            {
                alertify.error("El nick "+valor+" no se encuentra disponible");
                $("#nick").val("");
                $("#nick").focus();
                return ;
            }
        }
    }    
}

function validarTipoDato()
{
    var rut = $("#rut").val();
    var telefono = $("#telefono").val();
    var celular = $("#celular").val();
    var mail = $("#mail").val();
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
    if(!validarNumero(celular))
    {
        alertify.error('Celular debe ser numerico');
        return false;
    }
    if(!validarEmail(mail))
    {
        alertify.error('E-mail invalido');
        return false;
    }
    
    return true;
}

function iniciarPestaniasPasajero()
{
    $("#p_general").click(function(){
        cambiarPropiedad($("#cont_general"),"display","block");
        cambiarPropiedad($("#cont_app"),"display","none");
        quitarclase($(this),"dispose");
        agregarclase($("#p_app"),"dispose");
    });
    $("#p_app").click(function(){
        cambiarPropiedad($("#cont_general"),"display","none");
        cambiarPropiedad($("#cont_app"),"display","block");
        quitarclase($(this),"dispose");
        agregarclase($("#p_general"),"dispose");
    });
}


