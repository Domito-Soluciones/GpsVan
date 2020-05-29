/* global urlBase, alertify, NICK_GLOBAL, KEY */
var ID_AGENTE;
var AGENTES;
var AGREGAR = true;
var clientesArray = [];
var PAGINA = 'AGENTES';
var CLIENTE = '';
var CAMPOS = ["rut","nombre","papellido","mapellido","celular","direccion","mail","perfil","clientes","nick","password","password2"];
$(document).ready(function(){
   PAGINA_ANTERIOR = PAGINA;
    buscarAgente(true);
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_agente.html", function( response, status, xhr ) {
            iniciarPestanias();
            cambioEjecutado();
            $("#rut").blur(function (){
                if(validarExistencia('rut',$(this).val()))
                {
                    alertify.error("El rut "+$(this).val()+" ya existe");
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
            
            $("#perfil").change(function(){
                if($(this).val() === '1')
                {
                    $("#clientes").val("");
                    cargarClientes();
                    quitarclase($("#empresa"),"oculto");
                }      
                else
                {
                    agregarclase($("#empresa"),"oculto")
                    $("#clientes").val("-");   
                }
            });
            
//            $("#clientes").on('blur',function () {
//                var noExiste = validarInexistencia($("#clientes").val(),clientesArray);
//                if(noExiste)
//                {
//                    alertify.error("Cliente inexistente");
//                    $("#clientes").val("");
//
//                }
//            });
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","hidden");
    });
    $("#cancelar").click(function(){
        validarCancelar(PAGINA);
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
    });
    
    $("#busqueda").keyup(function(){
        buscarAgente();
    });
    
    $("#eliminar").click(function (){
            confirmar("Eliminar administrador",
            "Esta seguro que desea eliminar al administrador "+$("#rut").val(),
            function(){
                eliminarAgente();
            },null);
    });
    
});

function agregarAgente()
{
    var rut = formatearCadena($("#rut").val());
    var nombre = formatearCadena($("#nombre").val());
    var papellido = formatearCadena($("#papellido").val());
    var mapellido = formatearCadena($("#mapellido").val());
    var telefono = formatearCadena($("#telefono").val());
    var celular = formatearCadena($("#celular").val());
    var direccion = formatearCadena($("#direccion").val());
    var mail = formatearCadena($("#mail").val());
    var nick = formatearCadena($("#nick").val());
    var password = formatearCadena($("#password").val());
    var password2 = formatearCadena($("#password2").val());
    var perfil = formatearCadena($("#perfil").val());
    var empresa = formatearCadena($("#clientes").val());
    var array = [rut,nombre,papellido,mapellido,celular,direccion,mail,perfil,empresa,nick,password,password2];
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
        var params = {nombre: nombre,papellido :papellido, mapellido : mapellido, rut : rut,
                        nick: nick, password : btoa(password), telefono: telefono, celular : celular,
                        direccion : direccion, mail : mail, perfil : perfil, empresa : empresa};
        var url = urlBase + "/agente/AddAgente.php";
        var success = function(response)
        {
            ID_AGENTE = undefined;
            cerrarSession(response);
            alertify.success("Administrador Agregado");
            cambiarPestaniaGeneral();
            vaciarFormulario();
            resetFormulario();
            enviarCorreoCreaAdmin(mail,nick,password);
            buscarAgente();
        };
        postRequest(url,params,success);
    }
}

function modificarAgente()
{
    var id = ID_AGENTE;
    var rut = formatearCadena($("#rut").val());
    var nombre = formatearCadena($("#nombre").val());
    var papellido = formatearCadena($("#papellido").val());
    var mapellido = formatearCadena($("#mapellido").val());
    var telefono = formatearCadena($("#telefono").val());
    var celular = formatearCadena($("#celular").val());
    var direccion = formatearCadena($("#direccion").val());
    var mail = formatearCadena($("#mail").val());
    var nick = formatearCadena($("#nick").val());
    var password = formatearCadena($("#password").val());
    var password2 = formatearCadena($("#password2").val());
    var perfil = formatearCadena($("#perfil").val());
    var empresa = formatearCadena($("#clientes").val());
    var array;
    var params = {id : id,nombre: nombre,papellido :papellido, mapellido : mapellido, rut : rut,
            nick: nick, telefono: telefono, celular : celular,
            direccion : direccion, mail : mail, perfil : perfil, empresa : empresa};
    if(password !== '' || password2 !== '')
    {
        if(password !== password2)
        {
            marcarCampoError($("#password"));
            marcarCampoError($("#password2"));
            alertify.error("La password no coincide");
            return;
        }
        array = [rut,nombre,papellido,mapellido,celular,direccion,mail,perfil,empresa,nick,password,password2];
        params.password = btoa(password);
    }
    else
    {
        array = [nombre,papellido,mapellido,rut,celular,direccion,mail,perfil,empresa,nick];   
    }
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var url = urlBase + "/agente/ModAgente.php";
        var success = function(response)
        {
            cerrarSession(response);
            cambiarPestaniaGeneral();
            alertify.success("Administrador Modificado");
            resetFormulario();
            buscarAgente();
        };
        postRequest(url,params,success);
    }
}

function buscarAgente(cargar = false)
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/agente/GetAgentes.php";
    var success = function(response)
    {
        cerrarSession(response);
        var agentes = $("#lista_busqueda_agente");
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
            var rut = response[i].agente_rut;
            var nombre = response[i].agente_nombre;
            var papellido = response[i].agente_papellido;
            var mapellido = response[i].agente_mapellido;
            var titulo = recortar(rut+" / "+ nombre+" "+papellido+" "+mapellido);
            if (typeof ID_AGENTE !== "undefined" && ID_AGENTE === id)
            {
                agentes.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
                agentes.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
        }
    };
    postRequest(url,params,success);
}

function cambiarFila(id)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de administrador",
        "¿Desea cambiar de administrador sin guardar los cambios?",
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
    ID_AGENTE = id;
    marcarFilaActiva(id);
    $("#contenedor_central").load("html/datos_agente.html", function( response, status, xhr ) {
        iniciarPestanias();
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
                break;
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
        $("#perfil").val(agente.agente_perfil);
        CLIENTE = agente.agente_empresa;
        if(agente.agente_perfil === '1')
        {
            $("#clientes").val("");
            
            cargarClientes();
            quitarclase($("#empresa"),"oculto");
        }
        else
        {
            $("#clientes").val("-");   
        }
        $("#clientes").val(agente.agente_empresa);
        cambiarPropiedad($("#agregar"),"visibility","visible");
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        if(agente.agente_nick !== NICK_GLOBAL)
        {
            cambiarPropiedad($("#eliminar"),"visibility","visible");
        }
        else
        {
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
        }
        $("#perfil").change(function(){
            if($(this).val() === '1')
            {
                $("#clientes").val("");
                cargarClientes();
                quitarclase($("#empresa"),"oculto");
            }
            else
            {
                agregarclase($("#empresa"),"oculto");
                $("#clientes").val("-");   
            }
        });
        
//        $("#clientes").on('blur',function () {
//            var noExiste = validarInexistencia($("#clientes").val(),clientesArray);
//            if(noExiste)
//            {
//                alertify.error("Cliente inexistente");
//                $("#clientes").val("");
//
//            }
//        });
    });
}

function eliminarAgente()
{
    var rut = $("#rut").val();
    var params = { rut : rut };
    var url = urlBase + "/agente/DelAgente.php";
    var success = function(response)
    {
        alertify.success("Administrador eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        resetBotones();
        buscarAgente();
        $("#contenedor_central").html("<div class=\"mensaje_bienvenida\">SELECCIONE OPCIONES PARA AGREGAR EDITAR Y/O MODIFICAR ADMINISTRADORES</div>");
    };
    postRequest(url,params,success);
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
        alertify.error('Telefono debe ser numérico');
        return false;
    }
    if(!validarNumero(celular.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(celular);
        alertify.error('Celular debe ser numérico');
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

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_app").click(function(){
        cambiarPestaniaAplicacion();
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

function cargarClientes()
{
    var busqueda = $("#clientes").val();
    var params = {busqueda : busqueda,buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        $("#clientes").html("<option value=''>Seleccione</option>");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].cliente_id;
            var nombre = response[i].cliente_razon;
            var selected = '';
            if(CLIENTE === id){
                selected = ' selected';
            }
            $("#clientes").append("<option value=\""+id+"\" "+selected+">"+nombre+"</option>");
            CLIENTES = response;
            clientesArray.push(nombre);
        }
    };
    postRequest(url,params,success);
}

