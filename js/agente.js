/* global urlBase, alertify */
var AGENTES;
var AGREGAR = true;
var PAGINA = 'AGENTES';
var CAMPOS = ["rut","nombre","papellido","mapellido","celular","direccion","mail","cargo","perfil","nick"];
$(document).ready(function(){
    buscarAgente();
    $("#agregar").click(function(){
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_agente.html", function( response, status, xhr ) {
            iniciarPestaniasAgente();
            cambioEjecutado();
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
        resetFormularioEliminar(PAGINA);
        resetBotones();
    });
    $("#guardar").click(function(){
        if(AGREGAR)
        {
            agregarAgente();
        }
        else
        {
            modificarAgente();
        }
        MODIFICADO = false;
    });
    
    $("#busqueda").keyup(function(){
        buscarAgente($(this).val());
    });
    
    $("#eliminar").click(function (){
            confirmar("Eliminar agente",
            "Esta seguro que desea eliminar al agente "+$("#rut").val(),
            function(){
                eliminarAgente();
            },null);
    });
    
});

function agregarAgente()
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
    var array = [nombre,papellido,mapellido,rut,celular,direccion,mail,cargo,nivel,nick,password,password2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(password !== password2)
    {
        marcarCampoError($("#password"));
        marcarCampoError($("#password2"));
        alertify.error("La password no coincide");
        return;
    }
    if(validarTipoDato())
    {
        var data = "nombre="+nombre+"&papellido="+papellido+"&mapellido="+mapellido
        +"&rut="+rut+"&nick="+nick+"&password="+password+"&telefono="+telefono+"&celular="+celular+"&direccion="+direccion
        +"&mail="+mail+"&cargo="+cargo+"&nivel="+nivel;
        var url = urlBase + "/agente/AddAgente.php?"+data;
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Agente Agregado");
            vaciarFormulario($("#agregar input"));
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario();
            buscarAgente();
        };
        postRequest(url,success);
    }
}

function modificarAgente()
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
            marcarCampoError($("#password"));
            marcarCampoError($("#password2"));
            alertify.error("La password no coincide");
            return;
        }
        array = [nombre,papellido,mapellido,rut,celular,direccion,mail,cargo,nivel,nick,password,password2];
        claveData = "&password="+password;
    }
    else
    {
        array = [nombre,papellido,mapellido,rut,celular,direccion,mail,cargo,nivel,nick];   
    }
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "nombre="+nombre+"&papellido="+papellido+"&mapellido="+mapellido
        +"&rut="+rut+"&nick="+nick+claveData+"&telefono="+telefono+"&celular="+celular+"&direccion="+direccion
        +"&mail="+mail+"&cargo="+cargo+"&nivel="+nivel;
        var url = urlBase + "/agente/ModAgente.php?"+data;
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetBotones();
            cerrarSession(response);
            alertify.success("Agente Modificado");
            vaciarFormulario($("#agregar input"));
            resetFormulario();
            buscarAgente();
        };
        postRequest(url,success);
    }
}

function buscarAgente()
{
    var busqueda = $("#busqueda").val();
    var url = urlBase + "/agente/GetAgentes.php?busqueda="+busqueda;
    var success = function(response)
    {
        cerrarSession(response);
        var agentes = $("#lista_busqueda");
        agentes.html("");
        AGENTES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].agente_id;
            var nombre = response[i].agente_nombre;
            var papellido = response[i].agente_papellido;
            agentes.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"abrirModificar('"+id+"')\">"+nombre+" "+papellido+"</div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function abrirModificar(id)
{
    AGREGAR = false;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_agente.html", function( response, status, xhr ) {
        iniciarPestaniasAgente();
        cambioEjecutado();
        $("#nick").blur(function (){
            if(validarExistencia('nick',$(this).val()))
            {
                alertify.error("El nick "+$(this).val()+" no se encuentra disponible");
                $("#nick").val("");
                return;
            }
        });
        var agente;
        for(var i = 0 ; i < AGENTES.length; i++)
        {
            if(AGENTES[i].agente_id === id)
            {
                agente = AGENTES[i];
            }
        }
        $("#rut").val(agente.agente_rut);
        $("#rut").prop("readonly",true);
        $("#nombre").val(agente.agente_nombre);
        $("#papellido").val(agente.agente_papellido);
        $("#mapellido").val(agente.agente_mapellido);
        $("#nick").val(agente.agente_nick);
        $("#telefono").val(agente.agente_telefono);
        $("#celular").val(agente.agente_celular);
        $("#direccion").val(agente.agente_direccion);
        $("#mail").val(agente.agente_mail);
        $("#cargo").val(agente.agente_cargo);
        $("#nivel").val(agente.agente_nivel);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarAgente()
{
    var rut = $("#rut").val();
    var url = urlBase + "/agente/DelAgente.php?rut="+rut;
    var success = function(response)
    {
        alertify.success("Agente eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarAgente();
    };
    getRequest(url,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < AGENTES.length ; i++)
    {
        if(tipo === 'rut')
        {
            if(valor === AGENTES[i].agente_rut)
            {
                return true;
            }
        }
        if(tipo === 'nick')
        {
            if(valor === AGENTES[i].agente_nick)
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
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var rut = $("#rut");
    var telefono = $("#telefono");
    var celular = $("#celular");
    var mail = $("#mail");
    if(!validarRut(rut.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(rut);
        alertify.error('Rut invalido');
        return false;
    }
    if(!validarNumero(telefono.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(telefono);
        alertify.error('Telefono debe ser numerico');
        return false;
    }
    if(!validarNumero(celular.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(mail);
        alertify.error('Celular debe ser numerico');
        return false;
    }
    if(!validarEmail(mail.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(mail);
        alertify.error('E-mail invalido');
        return false;
    }
    
    return true;
}

function iniciarPestaniasAgente()
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


function activarPestania(array)
{
    var general = false;
    var app = false;
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        if(array[i] === '')
        {
            if(i < 9)
            {
                general = true;
            }
            else if(i > 8)
            {
                if(!general)
                {
                    app = true;
                }
            }
            marcarCampoError($("#"+CAMPOS[i]));
        }
        else
        {
            marcarCampoOk($("#"+CAMPOS[i]));
        }
    }
    
    if(general)
    {
        cambiarPestaniaGeneral();
    }
    else if(app)
    {
        cambiarPestaniaAplicacion();
    }
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_app"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_app"),"dispose");
}

function cambiarPestaniaAplicacion()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_app"),"display","block");
    quitarclase($("#p_app"),"dispose");
    agregarclase($("#p_general"), "dispose");
}