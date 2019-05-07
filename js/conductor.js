/* global urlBase, alertify, ADJUNTANDO */
var ID_CONDUCTOR;
var ID_TRANSPORTISTA;
var CONDUCTORES;
var AGREGAR = true;
var PAGINA = 'CONDUCTORES';
var CAMPOS = ["tipo","rut","nombre","papellido","mapellido","celular","direccion","mail","nacimiento","tipoLicencia",
                "vlicencia","renta","tipoContrato","afp","isapre","isapread","mutual","seguroInicio","descuento",
                "nick","password","password2"];
var TIPO = '';
var ID_GRUPO = '4';
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarConductor();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#lista_busqueda_conductor_detalle").load("html/datos_conductor.html", function( response, status, xhr ) {
            iniciarPestanias();
            cambioEjecutado();
            iniciarFecha(['#nacimiento','#seguroInicio','#vlicencia']);
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
            $("#tipo").change(function () {
                TIPO = $(this).val();
                if(TIPO === '2')
                {
                    quitarclase($("input:checkbox"),"checkbox-oculto");
                }
                else
                {
                    agregarclase($("input:checkbox"),"checkbox-oculto");
                }
                validarTipo();
            });
            
            obtenerChecks();
            $("#volver").click(function(){
                if(typeof ID_GRUPO === 'undefined')
                {
                    buscarConductor();
                }
                else if(ID_GRUPO === '0' || ID_GRUPO === '1' || ID_GRUPO === '2' || ID_GRUPO === '3')
                {
                    buscarConductorGrupo(ID_GRUPO);
                }
                else if(ID_GRUPO === '4')
                {
                    buscarConductorTodo();
                }
                cambiarPropiedad($("#agregar"),"visibility","visible");
                cambiarPropiedad($("#guardar"),"visibility","hidden");
                cambiarPropiedad($("#eliminar"),"visibility","hidden");
            });
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#elimianr"),"visibility","hidden");
    });
    
    $("#cancelar").click(function(){
        validarCancelar(PAGINA);
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
        confirmar("Eliminar conductor","Esta seguro que desea eliminar al conductor "+$("#rut").val(),
        function(){
                eliminarConductor();
            },null);
    });
});

function agregarConductor()
{
    var tipo = $("#tipo").val();
    var rut = $("#rut").val();
    var nombre = $("#nombre").val();
    var papellido = $("#papellido").val();
    var mapellido = $("#mapellido").val();
    var telefono = $("#telefono").val();
    var celular = $("#celular").val();
    var direccion = $("#direccion").val();
    var mail = $("#mail").val();
    var nacimiento = formato_fecha($("#nacimiento").val());
    var tipoLicencia = $("#tipoLicencia").val();
    var vlicencia = $("#vlicencia").val();
    var banco = $("#banco").val();
    var ncuenta = $("#ncuenta").val();
    var tcuenta = $("#tcuenta").val();
    var renta = $("#renta").val();
    var contrato = $("#tipoContrato").val();
    var afp = $("#afp").val();
    var isapre = $("#isapre").val();
    var isapread = $("#isapread").val();
    var mutual = $("#mutual").val();
    var seguroInicio = formato_fecha($("#seguroInicio").val());
    var descuento = $("#descuento").val();
    var transportista = $("#transportista").val();
    var nick = $("#nick").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();
    var array = [tipo,rut,nombre,papellido,mapellido,celular,direccion,mail,nacimiento,tipoLicencia,
                renta,contrato,vlicencia,banco,ncuenta,tcuenta,afp,isapre,isapread,mutual,seguroInicio,descuento,nick,
                password,password2];
    var exp = obtenerExcepciones();
    if(ADJUNTANDO)
    {
            alertify.error("Espere a que se adjunten los documentos");
        return;
    }
    if(!validarCamposOr(array,exp))
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
        var imagen = $("#imagenOculta").val();
        var archivoContrato = $("#contratoOculta").val();
        var params = {nombre : nombre, papellido : papellido, mapellido : mapellido,
        rut : rut, nick : nick, password : btoa(password), telefono : telefono, celular : celular, 
        direccion : direccion, mail : mail, tipoLicencia : tipoLicencia, vlicencia : vlicencia,
        banco : banco, ncuenta : ncuenta, tcuenta : tcuenta,
        nacimiento : nacimiento, renta : renta, contrato : contrato, afp : afp,
        isapre : isapre, isapread : isapread, mutual : mutual, seguroInicio : seguroInicio,
        descuento : descuento, transportista : transportista,
        imagen : imagen, archivoContrato : archivoContrato, tipo : tipo};
        var url = urlBase + "/conductor/AddConductor.php";
        var success = function(response)
        {
            ID_CONDUCTOR = undefined;
            ID_GRUPO = undefined;
            cerrarSession(response);
            alertify.success("Conductor Agregado");
            cambiarPestaniaGeneral();
            vaciarFormulario();
            resetFormulario();
            buscarConductor();
            cambiarPropiedad($(".imagen"),"background-image","url('img/usuario-hombre.svg')");
            enviarCorreoPassword(mail,btoa(password));
            $(".contenedor_contrato_movil").html("");
        };
        postRequest(url,params,success);
    }
}

function modificarConductor()
{
    var id = ID_CONDUCTOR;
    var tipo = $("#tipo").val();
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
    var vlicencia = $("#vlicencia").val();
    var banco = $("#banco").val();
    var ncuenta = $("#ncuenta").val();
    var tcuenta = $("#tcuenta").val();
    var nacimiento = $("#nacimiento").val();
    var renta = $("#renta").val();
    var contrato = $("#tipoContrato").val();
    var afp = $("#afp").val();
    var isapre = $("#isapre").val();
    var isapread = $("#isapread").val();
    var mutual = $("#mutual").val();
    var seguroInicio = $("#seguroInicio").val();
    var descuento = $("#descuento").val();
    var transportista = $("#transportista").val();
    var imagen = $("#imagenOculta").val();
    var archivoContrato = $("#contratoOculta").val();
    var array;
    var params = {id : id, rut : rut, nombre : nombre, papellido : papellido, mapellido : mapellido, direccion : direccion, telefono : telefono, celular : celular, 
        mail : mail, nick : nick, tipoLicencia : tipoLicencia, vlicencia : vlicencia, banco : banco, ncuenta : ncuenta, tcuenta : tcuenta, nacimiento : nacimiento,
        renta : renta, contrato : contrato, afp : afp, isapre : isapre, isapread : isapread, mutual : mutual, 
        seguroInicio : seguroInicio, descuento : descuento, transportista : transportista,
        imagen : imagen, archivoContrato : archivoContrato, tipo : tipo};
    if(ADJUNTANDO)
    {
        alertify.error("Espere a que se adjunten los documentos");
        return;
    }
    if(password !== '' || password2 !== '')
    {
        if(password !== password2)
        {
            alertify.error("La password no coincide");
            marcarCampoError(password);
            marcarCampoError(password2);
            return;
        }
            
        array = [tipo,rut,nombre,papellido,mapellido,celular,direccion,mail,nacimiento,tipoLicencia,vlicencia,
            renta,contrato,afp,isapre,isapread,mutual,seguroInicio,descuento,
        nick,password,password2];
        params.password = btoa(password);
    }
    else
    {
        array = [tipo,rut,nombre,papellido,mapellido,celular,direccion,mail,nacimiento,
        tipoLicencia,vlicencia,renta,contrato,afp,isapre,isapread,mutual,seguroInicio,descuento,
        nick];   
    }
    var exp = obtenerExcepciones();
    if(!validarCamposOr(array,exp))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var url = urlBase + "/conductor/ModConductor.php";
        var success = function(response)
        {
            cerrarSession(response);
            cambiarPestaniaGeneral();
            alertify.success("Conductor Modificado");
            resetFormulario();
            //buscarConductor();
            if(password !== '')
            {
                $("#password").val("");
                $("#password2").val("");
                enviarCorreoPassword(mail,btoa(password));
            }
        };
        postRequest(url,params,success);
    }
}

function buscarConductor()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/conductor/GetConductores.php";
    var success = function(response)
    {
        cerrarSession(response);
        var contGrupos = $("#lista_busqueda_conductor");
        var conductores = $("#lista_busqueda_conductor_detalle");
        conductores.html("");
        contGrupos.html("");
        contGrupos.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\"col_4\" onClick=\"cambiarFila('4')\">Todos</div>");
        contGrupos.append("<div class=\"fila_contenedor\" id=\"col_0\" onClick=\"cambiarFila('0')\">Transportista</div>");
        contGrupos.append("<div class=\"fila_contenedor\" id=\"col_1\" onClick=\"cambiarFila('1')\">Conductor Interno</div>");
        contGrupos.append("<div class=\"fila_contenedor\" id=\"col_2\" onClick=\"cambiarFila('2')\">Conductor Externo</div>");
        contGrupos.append("<div class=\"fila_contenedor\" id=\"col_3\" onClick=\"cambiarFila('3')\">Transportista / Conductor</div>");
        CONDUCTORES = response;
        if(response.length === 0)
        {
            conductores.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
            alertify.error("No hay registros que mostrar");
            return;
        }
        conductores.append("<div class=\"contenedor_central_titulo\"><div></div><div>Rut</div><div>Nombre</div><div>Apellido</div><div class=\"mini_tab\">Tipo</div><div></div></div>")
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].conductor_id;
            var rut = response[i].conductor_rut;
            var nombre = response[i].conductor_nombre;
            var papellido = response[i].conductor_papellido;
            var tipo = '';
            if(response[i].conductor_tipo === '0')
            {
                tipo = 'Transportista';
            }
            else if(response[i].conductor_tipo === '1')
            {
                tipo = 'Conductor interno';
            }
            else if(response[i].conductor_tipo === '2')
            {
                tipo = 'Conductor externo';
            }
            else if(response[i].conductor_tipo === '3')
            {
                tipo = 'Transportista / Conductor';
            }
            conductores.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\">"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+rut+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+papellido+"</div>"+
                    "<div class=\"mini_tab\" onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+tipo+"</div>"+
                    "<div><img onclick=\"preEliminarConductor('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success);
}

function buscarConductorGrupo(grupo)
{
    ID_GRUPO = grupo;
    marcarFilaActiva("col_"+grupo);
    var conductores = $("#lista_busqueda_conductor_detalle");
    conductores.html("");
    conductores.append("<div class=\"contenedor_central_titulo\"><div></div><div>Rut</div><div>Nombre</div><div>Apellido</div><div class=\"mini_tab\" >Grupo</div></div>")
    var noHayRegistros = true;
    for(var i = 0 ; i < CONDUCTORES.length; i++)
    {
        if(CONDUCTORES[i].conductor_tipo === ID_GRUPO)
        {
            noHayRegistros = false;
            var id = CONDUCTORES[i].conductor_id;
            var rut = CONDUCTORES[i].conductor_rut;
            var nombre = CONDUCTORES[i].conductor_nombre;
            var papellido = CONDUCTORES[i].conductor_papellido;            
            var tipo = '';
            if(CONDUCTORES[i].conductor_tipo === '0')
            {
                tipo = 'Transportista';
            }
            else if(CONDUCTORES[i].conductor_tipo === '1')
            {
                tipo = 'Conductor interno';
            }
            else if(CONDUCTORES[i].conductor_tipo === '2')
            {
                tipo = 'Conductor externo';
            }
            else if(CONDUCTORES[i].conductor_tipo === '3')
            {
                tipo = 'Transportista / Conductor';
            }
            conductores.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\">"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+rut+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+papellido+"</div>"+
                    "<div class=\"mini_tab\" onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+tipo+"</div>"+
                    "<div><img onclick=\"preEliminarConductor('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    }
    if(noHayRegistros)
    {
        conductores.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        alertify.error("No hay registros que mostrar");
        return;
    }
}
function buscarConductorTodo()
{
    ID_GRUPO = '4';
    marcarFilaActiva("col_4");
    var conductores = $("#lista_busqueda_conductor_detalle");
    conductores.html("");
    conductores.append("<div class=\"contenedor_central_titulo\"><div></div><div>Rut</div><div>Nombre</div><div>Apellido</div><div class=\"mini_tab\" >Grupo</div></div>")
    var noHayRegistros = true;
    for(var i = 0 ; i < CONDUCTORES.length; i++)
    {
        noHayRegistros = false;
        var id = CONDUCTORES[i].conductor_id;
        var rut = CONDUCTORES[i].conductor_rut;
        var nombre = CONDUCTORES[i].conductor_nombre;
        var papellido = CONDUCTORES[i].conductor_papellido;            
        var tipo = '';
        if(CONDUCTORES[i].conductor_tipo === '0')
        {
            tipo = 'Transportista';
        }
        else if(CONDUCTORES[i].conductor_tipo === '1')
        {
            tipo = 'Conductor interno';
        }
        else if(CONDUCTORES[i].conductor_tipo === '2')
        {
            tipo = 'Conductor externo';
        }
        else if(CONDUCTORES[i].conductor_tipo === '3')
        {
            tipo = 'Transportista / Conductor';
        }
        conductores.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\">"+
                "<div onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+rut+"</div>"+
                "<div onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+nombre+"</div>"+
                "<div onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+papellido+"</div>"+
                "<div class=\"mini_tab\" onClick=\"abrirModificar('"+id+"','"+nombre+"','"+papellido+"')\">"+tipo+"</div>"+
                "<div><img onclick=\"preEliminarConductor('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                "</div>");
    }
    if(noHayRegistros)
    {
        conductores.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        alertify.error("No hay registros que mostrar");
        return;
    }
}

function cambiarFila(id)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de conductor",
        "¿Desea cambiar de conductor sin guardar los cambios?",
        function()
        {
            MODIFICADO = false;
            if(id === '4'){
                buscarConductorTodo();
            }
            else{
                buscarConductorGrupo(id);
            }
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        if(id === '4'){
            buscarConductorTodo();
        }
        else{
            buscarConductorGrupo(id);
        }
    }
}

function abrirModificar(id,nombre,apellido)
{
    ID_CONDUCTOR = id;
    AGREGAR = false;
    $("#lista_busqueda_conductor_detalle").load("html/datos_conductor.html", function( response, status, xhr ) {
        $("#titulo_pagina_conductor").text(id + " ("+nombre+" "+apellido+")");
        cargarTransportistas();
        iniciarPestanias();
        cambioEjecutado();
        iniciarFecha(['#nacimiento','#seguroInicio','#vlicencia']);
        $("#nick").blur(function (){
            if(validarExistencia('nick',$(this).val()))
            {
                alertify.error("El nick "+$(this).val()+" no se encuentra disponible");
                $("#nick").val("");
                return;
            }
        });
        $("#tipo").change(function () {
            TIPO = $(this).val();
            if(TIPO === '2')
            {
                quitarclase($(".check"),"checkbox-oculto");
            }
            else
            {
                agregarclase($(".check"),"checkbox-oculto");
            }
            validarTipo();
        });
        
        $("#volver").click(function(){
            if(typeof ID_GRUPO === 'undefined')
            {
                buscarConductor();
            }
            else if(ID_GRUPO === '0' || ID_GRUPO === '1' || ID_GRUPO === '2' || ID_GRUPO === '3')
            {
                buscarConductorGrupo(ID_GRUPO);
            }
            else if(ID_GRUPO === '4')
            {
                buscarConductorTodo();
            }
            cambiarPropiedad($("#agregar"),"visibility","visible");
            cambiarPropiedad($("#guardar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
        });
       
        
        var conductor;
        for(var i = 0 ; i < CONDUCTORES.length; i++)
        {
            if(CONDUCTORES[i].conductor_id === id)
            {
                conductor = CONDUCTORES[i];
            }
        }
        $("#tipo").val(conductor.conductor_tipo);
        $("#tipo").prop("readonly",true);
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
        $("#vlicencia").val(conductor.conductor_vencLicencia);
        $("#banco").val(conductor.conductor_banco);
        $("#ncuenta").val(conductor.conductor_ncuenta);
        $("#tcuenta").val(conductor.conductor_tcuenta);
        $("#nacimiento").val(conductor.conductor_nacimiento);
        $("#renta").val(conductor.conductor_renta);
        $("#tipoContrato").val(conductor.conductor_tipo_contrato);
        $("#afp").val(conductor.conductor_afp);
        $("#isapre").val(conductor.conductor_isapre);
        $("#isapread").val(conductor.conductor_isapre_ad);
        $("#mutual").val(conductor.conductor_mutual);
        $("#seguroInicio").val(conductor.conductor_seguro_inicio);
        $("#descuento").val(conductor.conductor_descuento);
        $("#transportista").val(conductor.conductor_transportista);
        TIPO = conductor.conductor_tipo;
        if(TIPO === '2')
        {
            quitarclase($("input:checkbox"),"checkbox-oculto");
        }
        else
        {
            agregarclase($("input:checkbox"),"checkbox-oculto");
        }
        validarTipo();
        ID_TRANSPORTISTA = conductor.conductor_transportista;
        var imagen = conductor.conductor_imagen;
        var contrato = conductor.conductor_contrato;
        if(imagen !== '')
        {
            $("#imagenOculta").val(imagen);
            cambiarPropiedad($(".imagen"),"background-image","url('source/util/img/"+imagen+"')");
        }
        if(contrato !== '')
        {
            $("#contratoOculta").val(contrato);
            var enlace = "<a href=\"source/util/pdf/"+contrato+"\" target=\"_blanck\">Ver</a>";
            $("#contenedor_contrato").html(enlace);
        }
        obtenerChecks();
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarConductor()
{
    var rut = $("#rut").val();
    var params = {rut : rut};
    var url = urlBase + "/conductor/DelConductor.php";
    var success = function(response)
    {
        alertify.success("Conductor eliminado");
        cerrarSession(response);
        resetBotones();
        buscarConductor();
        $("#transportista").html("<option value=''>Seleccione</option>");
    };
    postRequest(url,params,success);
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
    var renta = $("#renta");
    var isapread = $("#isapread");
    var descuento = $("#descuento");
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
        cambiarPestaniaGeneral();
        marcarCampoError(mail);
        alertify.error('E-mail invalido');
        return false;
    }
    if(!validarNumero(renta.val()))
    {
        cambiarPestaniaContrato();
        marcarCampoError(renta);
        alertify.error('Renta debe ser numerico');
        return false;
    }
    if(!validarNumero(isapread.val()))
    {
        cambiarPestaniaContrato();
        marcarCampoError(isapread);
        alertify.error('Isapre adicional debe ser numerico');
        return false;
    }
    if(!validarNumero(descuento.val() === '' ? '0' : descuento.val()))
    {
        marcarCampoOk(descuento);
        cambiarPestaniaContrato();
        marcarCampoError(descuento);
        alertify.error('% Descuento debe ser numerico');
        return false;
    }
    
    return true;
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_contrato").click(function(){
        cambiarPestaniaContrato();
    });
    $("#p_app").click(function(){
        cambiarPestaniaAplicacion();
    });
}

function activarPestania(array)
{
    var general = false;
    var contrato = false;
    var aplicacion = false;
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        if(array[i] === '')
        {
            if(i < 11)
            {
                general = true;
            }
            if(i > 10 && i < 19)
            {
                if(!general)
                {
                    contrato = true;
                }
            }
            if(i > 18)
            {
                if(!general && !contrato)
                {
                    aplicacion = true;
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
    if(contrato)
    {
        cambiarPestaniaContrato();
    }
    if(aplicacion)
    {
        cambiarPestaniaAplicacion();
    }
    
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_contrato"),"display","none");
    cambiarPropiedad($("#cont_app"),"display","none");
    cambiarPropiedad($("#cont_movil"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_contrato"),"dispose");
    agregarclase($("#p_app"),"dispose");
    agregarclase($("#p_movil"),"dispose");
}


function cambiarPestaniaContrato()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_contrato"),"display","block");
    cambiarPropiedad($("#cont_app"),"display","none");
    cambiarPropiedad($("#cont_movil"),"display","none");
    quitarclase($("#p_contrato"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_app"),"dispose");
    agregarclase($("#p_movil"),"dispose");
}

function cambiarPestaniaAplicacion()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_contrato"),"display","none");
    cambiarPropiedad($("#cont_app"),"display","block");
    cambiarPropiedad($("#cont_movil"),"display","none");
    quitarclase($("#p_app"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_contrato"),"dispose");
    agregarclase($("#p_movil"),"dispose");
}

function validarTipo()
{
    var renta = $("#renta");
    var afp = $("#afp");
    var isapre = $("#isapre");
    var isapread = $("#isapread");
    var mutual = $("#mutual");
    var descuento = $("#descuento");
    var transportista = $("#transportista");
    var tipoContrato = $("#tipoContrato");
    var noAplica = marcarCampoNoAplicable();
    if(TIPO === '0' || TIPO === '3')
    {
        renta.val(0);
        afp.val(noAplica);
        isapre.val(noAplica);
        isapread.val(0);
        mutual.val(noAplica);
        transportista.val(noAplica);
        descuento.val(20);
        tipoContrato.val() === noAplica ? tipoContrato.val("") : tipoContrato ;
        marcarCampoDisabled(renta);
        renta.attr("disabled",true);
        marcarCampoDisabled(afp);
        afp.attr("disabled",true);
        marcarCampoDisabled(isapre);
        isapre.attr("disabled",true);
        marcarCampoDisabled(isapread);
        isapread.attr("disabled",true);
        marcarCampoDisabled(mutual);
        mutual.attr("disabled",true);
        transportista.attr("disabled",true);
        descuento.attr("disabled",false);
        marcarCampoOk(descuento);
        tipoContrato.attr("disabled",false);
        marcarCampoOk(tipoContrato);
    }
    else if(TIPO === '1')
    {
        cargarTransportistas();
        tipoContrato.val() === noAplica ? tipoContrato.val("") : tipoContrato ;
        renta.val() === noAplica ? renta.val("") : renta ;
        afp.val() === noAplica ? afp.val("") : afp ;
        isapre.val() === noAplica ? isapre.val("") : isapre ;
        isapread.val() === noAplica ? isapread.val("") : isapread ;
        mutual.val() === noAplica ? mutual.val("") : mutual ;
        descuento.val(0);
        descuento.attr("disabled",true);
        marcarCampoDisabled(descuento);
        tipoContrato.attr("disabled",false);
        marcarCampoOk(tipoContrato);
        transportista.val("");
        transportista.attr("disabled",false);
        renta.attr("disabled",false);
        marcarCampoOk(renta);
        afp.attr("disabled",false);
        marcarCampoOk(afp);
        isapre.attr("disabled",false);
        marcarCampoOk(isapre);
        isapread.attr("disabled",false);
        marcarCampoOk(isapread);
        mutual.attr("disabled",false);
        marcarCampoOk(mutual);
    }
    else if(TIPO === '2')
    {
        cargarTransportistas();
        transportista.val("");
        if(renta.val() === '0' || renta.val() === '')
        {
            marcarCampoDisabled(renta);
            renta.attr("disabled",true);
            renta.val("0");
        }
        else
        {
            $("#checkRenta").attr("checked",true);
        }
        if(afp.val() === '-' || afp.val() === '')
        {
            marcarCampoDisabled(afp);
            afp.attr("disabled",true);
            afp.val("-");
        }
        else
        {
            $("#checkAfp").attr("checked",true);
        }
        if(isapre.val() === '-' || isapre.val() === '')
        {
            marcarCampoDisabled(isapre);
            isapre.attr("disabled",true);
            isapre.val("-");
        }
        else
        {
            $("#checkIsapre").attr("checked",true);
        }
        if(isapread.val() === '0' || isapread.val() === '')
        {
            marcarCampoDisabled(isapread);
            isapread.attr("disabled",true);
            isapread.val("0");
        }
        else
        {
            $("#checkIsapreAd").attr("checked",true);
        }
        if(mutual.val() === '-' || mutual.val() === '')
        {
            marcarCampoDisabled(mutual);
            mutual.attr("disabled",true);
            mutual.val("-");
        }
        else
        {
            $("#checkMutual").attr("checked",true);
        }
        if(descuento.val() === '0' || descuento.val() === '')
        {
            marcarCampoDisabled(descuento);
            descuento.attr("disabled",true);
            descuento.val("0");
        }
        else
        {
            $("#checkDescuento").attr("checked",true);           
        }
        if(tipoContrato.val() === '-' || tipoContrato.val() === '')
        {
            marcarCampoDisabled(tipoContrato);
            tipoContrato.attr("disabled",true);
            tipoContrato.val("-");
        }
        else
        {
            $("#checkContrato").attr("checked",true);
        }
        transportista.attr("disabled",false);
    }
}

function obtenerExcepciones()
{
    var exp ='';
    if(TIPO === "0" || TIPO === "3")
    {
        exp += '|11||13||14||15||16||18||';
    }
    else if(TIPO === "1")
    {
        exp += '|17||';
    }
    else if(TIPO === "2")
    {
        if(!$("#checkRenta").is(":checked"))
        {
            exp += '|10|';
        }
        if(!$("#checkContrato").is(":checked"))
        {
            exp += '|11|';
        }
        if(!$("#checkAfp").is(":checked"))
        {
            exp += '|13|';
        }
        if(!$("#checkIsapre").is(":checked"))
        {
            exp += '|14|';
        }
        if(!$("#checkIsapreAd").is(":checked"))
        {
            exp += '|15|';
        }
        if(!$("#checkMutual").is(":checked"))
        {
            exp += '|16|';
        }
        if(!$("#checkDescuento").is(":checked"))
        {
            exp += '|18|';
        }
    }
    return exp;
}

function cargarTransportistas()
{
    var url = urlBase + "/conductor/GetTransportistas.php";
    var params = {};
    var success = function(response)
    {
        $("#transportista").html("<option value='0'>Seleccione</option>");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].conductor_id;
            var nombre = response[i].conductor_nombre + " " + response[i].conductor_papellido;
            var sel = "";
            if(id === ID_TRANSPORTISTA)
            {
                sel = " selected";
            }
            $("#transportista").append("<option value=\""+id+"\" "+sel+">"+nombre+"</option>");
        }
    };
    postRequest(url,params,success);
}

function obtenerChecks()
{
    $("#checkRenta").click(function(){
        if($(this).is(":checked"))
        {
            $("#renta").prop("disabled",false);
            $("#renta").val("");
            marcarCampoOk($("#renta"));
        }
        else
        {
            marcarCampoDisabled($("#renta"));
            $("#renta").prop("disabled",true);
            $("#renta").val("0");
        }
    });
    $("#checkContrato").click(function(){
        if($(this).is(":checked"))
        {
            $("#tipoContrato").prop("disabled",false);
            $("#tipoContrato").val("");
            marcarCampoOk($("#tipoContrato"));
        }
        else
        {
            marcarCampoDisabled($("#tipoContrato"));
            $("#tipoContrato").prop("disabled",true);
            $("#tipoContrato").val("-");
        }
    });
    $("#checkAfp").click(function(){
        if($(this).is(":checked"))
        {
            $("#afp").prop("disabled",false);
            $("#afp").val("");
            marcarCampoOk($("#afp"));
        }
        else
        {
            marcarCampoDisabled($("#afp"));
            $("#afp").prop("disabled",true);
            $("#afp").val("-");
        }
    });
    $("#checkIsapre").click(function(){
        if($(this).is(":checked"))
        {
            $("#isapre").prop("disabled",false);
            $("#isapre").val("");
            marcarCampoOk($("#isapre"));
        }
        else
        {
            marcarCampoDisabled($("#isapre"));
            $("#isapre").prop("disabled",true);
            $("#isapre").val("-");
        }
    });
    $("#checkIsapreAd").click(function(){
        if($(this).is(":checked"))
        {
            $("#isapread").prop("disabled",false);
            $("#isapread").val("");
            marcarCampoOk($("#isapread"));
        }
        else
        {
            marcarCampoDisabled($("#isapread"));
            $("#isapread").prop("disabled",true);
            $("#isapread").val("0");
        }
    });
    $("#checkMutual").click(function(){
        if($(this).is(":checked"))
        {
            $("#mutual").prop("disabled",false);
            $("#mutual").val("");
            marcarCampoOk($("#mutual"));
        }
        else
        {
            marcarCampoDisabled($("#mutual"));
            $("#mutual").prop("disabled",true);
            $("#mutual").val("-");
        }
    });
    $("#checkDescuento").click(function(){
        if($(this).is(":checked"))
        {
            $("#descuento").prop("disabled",false);
            $("#descuento").val("");
            marcarCampoOk($("#descuento"));
        }
        else
        {
            marcarCampoDisabled($("#descuento"));
            $("#descuento").prop("disabled",true);
            $("#descuento").val("0");
        }
    });
}

function preEliminarConductor(id)
{
    confirmar("Eliminar connductor","Esta seguro que desea eliminar al conductor "+id,
            function(){
                var params = {rut : id};
                var url = urlBase + "/conductor/DelConductor.php";
                var success = function(response)
                {
                    alertify.success("Conductor eliminado");
                    cerrarSession(response);
                    resetBotones();
                    buscarConductor();

                };
                postRequest(url,params,success);
            });
}