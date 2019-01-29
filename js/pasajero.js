/* global urlBase, alertify */
var ID_PASAJERO;
var ID_EMPRESA;
var PASAJEROS;
var AGREGAR = true;
var PAGINA = 'PASAJEROS';
var CC;
var CAMPOS = ["rut","nombre","papellido","mapellido","celular","direccion","centro","empresa","nick"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarPasajero();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_pasajero.html", function( response, status, xhr ) {
            iniciarPestanias();
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
            cargarCentroCosto('','');
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
    });
    $("#cancelar").click(function(){
        validarCancelar(PAGINA);
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
            confirmar("Eliminar pasajero","Esta seguro que desea eliminar al pasajero "+$("#rut").val(),
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
    var centro = $("#centro").val();
    var empresa = $("#empresa").val();
    var ruta = $("#ruta").val();
    var array = [nombre,papellido,mapellido,rut,celular,direccion,centro,empresa,nick,password,password2];
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
        var params = {nombre : nombre, papellido : papellido, mapellido : mapellido,
            rut : rut, nick : nick, password : btoa(password), telefono : telefono, celular : celular,
            direccion : direccion, mail : mail, cargo : cargo, centro : centro, empresa : empresa, ruta : ruta};
        var url = urlBase + "/pasajero/AddPasajero.php";
        var success = function(response)
        {
            ID_PASAJERO = undefined;
            cerrarSession(response);
            alertify.success("Pasajero Agregado");
            cambiarPestaniaGeneral();
            vaciarFormulario();
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario();
            buscarPasajero();
        };
        postRequest(url,params,success);
    }
}

function modificarPasajero()
{
    var id = ID_PASAJERO;
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
    var centro = $("#centro").val();
    var empresa = $("#empresa").val();
    var ruta = $("#ruta").val();
    var array;
    var params = {id : id, nombre : nombre, papellido : papellido, mapellido : mapellido,
        rut : rut, nick : nick, telefono : telefono, celular : celular,
        direccion : direccion, mail : mail, cargo : cargo, centro : centro, empresa : empresa, ruta : ruta};
    if(password !== '' || password2 !== '')
    {
        if(password !== password2)
        {
            marcarCampoError($("#password"));
            marcarCampoError($("#password2"));
            alertify.error("La password no coincide");
            return;
        }
        array = [rut,nombre,papellido,mapellido,celular,direccion,centro,empresa,
        nick,password,password2];
        params.password = btoa(password);
    }
    else
    {
        array = [rut,nombre,papellido,mapellido,celular,direccion,centro,empresa,nick];   
    }
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var url = urlBase + "/pasajero/ModPasajero.php";
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            cambiarPestaniaGeneral();
            alertify.success("Pasajero Modificado");
            resetFormulario();
            buscarPasajero();
        };
        postRequest(url,params,success);
    }
}

function buscarPasajero()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/pasajero/GetPasajeros.php";
    var success = function(response)
    {
        cerrarSession(response);
        var pasajeros = $("#lista_busqueda_pasajero");
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
            var rut = response[i].pasajero_rut;
            var nombre = response[i].pasajero_nombre;
            var papellido = response[i].pasajero_papellido;
            var mapellido = response[i].pasajero_mapellido;
            var titulo = recortar(rut+" / "+nombre+" "+papellido+" "+mapellido);
            if (typeof ID_PASAJERO !== "undefined" && ID_PASAJERO === id)
            {
                pasajeros.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
                pasajeros.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function cambiarFila(id)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de pasajero",
        "?Desea cambiar de pasajero sin guardar los cambios?",
        function()
        {
            MODIFICADO = false;
            abrirModificar(id);
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        abrirModificar(id);
    }
}

function abrirModificar(id)
{
    AGREGAR = false;
    ID_PASAJERO = id;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_pasajero.html", function( response, status, xhr ) {
        iniciarPestanias();
        cambioEjecutado();
        $("#nick").blur(function (){
            if(validarExistencia('nick',$(this).val()))
            {
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
        $("#cargo").val(pasajero.pasajero_cargo);
        $("#centro").val(pasajero.pasajero_centro_costo);
        $("#empresa").val(pasajero.pasajero_empresa);
        $("#ruta").val(pasajero.pasajero_ruta);
        ID_EMPRESA = pasajero.pasajero_cliente;
        cargarCentroCosto(ID_EMPRESA,pasajero.pasajero_centro_costo);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarPasajero()
{
    var rut = $("#rut").val();
    var params = {rut : rut};
    var url = urlBase + "/pasajero/DelPasajero.php";
    var success = function(response)
    {
        alertify.success("Pasajero eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarPasajero();
    };
    postRequest(url,params,success);
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
            if(valor === PASAJEROS[i].pasajero_nick)
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
        marcarCampoOk(telefono);
        cambiarPestaniaGeneral();
        marcarCampoError(telefono);
        alertify.error('Telefono debe ser numerico');
        return false;
    }
    if(!validarNumero(celular.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(celular);
        alertify.error('Celular debe ser numerico');
        return false;
    }
    if(!validarEmail(mail.val()))
    {
        if(mail.val() !== '')
        {
            cambiarPestaniaGeneral();
            marcarCampoError(mail);
            alertify.error('E-mail invalido');
            return false;
        }
    }
    
    return true;
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_empresa").click(function(){
        cambiarPestaniaEmpresa();
    });
    $("#p_app").click(function(){
        cambiarPestaniaAplicacion();
    });
}

function cargarCentroCosto(empresa,centro)
{
    var params = {cliente : empresa};
    var url = urlBase + "/cliente/GetCentroCosto.php";
    var success = function(response)
    {
        cerrarSession(response);
        var cc = $("#centro");
        cc.html("");
        CC = response;
        cc.append("<option value=\"\">Seleccione</option>");
        if(response.length === 0)
        {
            alertify.error("No hay centros de costo asociados");
            return;
        }
        for(var i = 0 ; i < response.length; i++){
            if(centro === response[i].cc_nombre)
            {
                cc.append("<option value=\""+response[i].cc_nombre+"\" selected>"+response[i].cc_nombre+"</option>");
            }
            else
            {
                cc.append("<option value=\""+response[i].cc_nombre+"\">"+response[i].cc_nombre+"</option>");
            }
        }
    };
    postRequest(url,params,success);
}

function activarPestania(array)
{
    var general = false;
    var empresa = false;
    var app = false;
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        if(array[i] === '')
        {
            if(i < 6)
            {
                general = true;
            }
            if(i > 5 && i < 8)
            {
                if(!general)
                {
                    empresa = true;
                }
            }
            if(i > 7)
            {
                if(!empresa)
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
    else if(empresa)
    {
        cambiarPestaniaEmpresa();
    }
    else if(app)
    {
        cambiarPestaniaAplicacion();
    }
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_empresa"),"display","none");
    cambiarPropiedad($("#cont_app"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_empresa"), "dispose");
    agregarclase($("#p_app"),"dispose");
}

function cambiarPestaniaEmpresa()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_empresa"),"display","block");
    cambiarPropiedad($("#cont_app"),"display","none");
    quitarclase($("#p_empresa"),"dispose");
    agregarclase($("#p_general"), "dispose");
    agregarclase($("#p_app"), "dispose");
}

function cambiarPestaniaAplicacion()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_empresa"),"display","none");
    cambiarPropiedad($("#cont_app"),"display","block");
    quitarclase($("#p_app"),"dispose");
    agregarclase($("#p_general"), "dispose");
    agregarclase($("#p_empresa"), "dispose");
}

