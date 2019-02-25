/* global urlBase, alertify, obj */
var CLIENTES;
var AGREGAR = true;
var PAGINA = 'CLIENTES';
var ID_CLIENTE;
var CENTROS_COSTO = [];
var CAMPOS = ["rut","razon","tipo","direccion","nombre","telefono","mail","mail2"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarCliente();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_cliente.html", function( response, status, xhr ) {
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
            $("#agregar_cc").click(function(){
                agregarCentroCosto();
            });

            $("#quitar_cc").click(function(){
                quitarCentroCosto();
            });
            
            $("#direccion").on("input",function(){
                mostrarDatalist($(this).val(),$("#partida"),'direccion');
            });
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
            agregarCliente();
        }
        else
        {
            modificarCliente();
        }
    });
    $("#busqueda").keyup(function(){
        buscarCliente($(this).val());
    });
    
    $("#eliminar").click(function (){
        confirmar("Eliminar cliente"
        ,"Esta seguro que desea eliminar al cliente "+$("#rut").val(),
        function(){
                eliminarCliente();
            },null);
    });
    
});

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
    var contrato = $("#contratoOculta").val();
    var cc = $(".centro_costo");
    cc.each(
        function (index){
            if($(this).val() !== '')
            {   
                CENTROS_COSTO.push($(this).val());
            }
        });
    var array = [rut,razon,tipo,direccion,nombre,telefono,mail,mail2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var params = { razon : razon, tipo : tipo, rut : rut, direccion : direccion, nombre : nombre,
                telefono : telefono, mail : mail, mail2 : mail2 , contrato : contrato, centros : CENTROS_COSTO + ""};
        var url = urlBase+"/cliente/AddCliente.php";
        var success = function(response)
        {
            ID_CLIENTE = undefined;
            cerrarSession(response);
            alertify.success("Cliente Agregado");
            cambiarPestaniaGeneral();
            vaciarFormulario();
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario();
            buscarCliente();
            CENTROS_COSTO = [];
            $(".contenedor_contrato_movil").html("");
        };
        postRequest(url,params,success);
    }
}

function modificarCliente()
{
    var id = ID_CLIENTE;
    var razon = $("#razon").val();
    var tipo = $("#tipo").val();
    var rut = $("#rut").val();
    var direccion = $("#direccion").val();
    var nombre = $("#nombre").val();
    var telefono = $("#telefono").val();
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    var contrato = $("#contratoOculta").val();
    var cc = $(".centro_costo");
    cc.each(
        function (index){
            if($(this).val() !== '')
            {   
                CENTROS_COSTO.push($(this).val());
            }
        });
    var array = [rut,razon,tipo,direccion,nombre,telefono,mail,mail2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var params = { id : id, razon : razon, tipo : tipo, rut : rut, direccion : direccion, nombre : nombre,
            telefono : telefono, mail : mail, mail2 : mail2, contrato : contrato , centros : CENTROS_COSTO+""};
        var url = urlBase + "/cliente/ModCliente.php";
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            cambiarPestaniaGeneral();
            alertify.success("Cliente Modificado");
            resetFormulario();
            buscarCliente();
            CENTROS_COSTO = [];
        };
        postRequest(url,params,success);
    }
}

function buscarCliente()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda,buscaCC : '1'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        cerrarSession(response);
        var clientes = $("#lista_busqueda_cliente");
        clientes.html("");
        CLIENTES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].cliente_id;
            var rut = response[i].cliente_rut;
            var nombre = response[i].cliente_razon;
            var titulo = recortar(rut+" / "+nombre);
            if (typeof ID_CLIENTE !== "undefined" && ID_CLIENTE === id)
            {
                clientes.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
                clientes.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
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
        confirmar("Cambio de cliente",
        "¿Desea cambiar de cliente sin guardar los cambios?",
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
    ID_CLIENTE = id;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_cliente.html", function( response, status, xhr ) {
        iniciarPestanias();
        cambioEjecutado();
        $("#nick").blur(function (){
            if(validarExistencia('rut',$(this).val()))
            {
                alertify.error("El rut "+$(this).val()+" ya existe");
                $("#rut").val("");
                return;
            }
            if(validarExistencia('razon',$(this).val()))
            {
                alertify.error("La razon social "+$(this).val()+" ya existe");
                $("#razon").val("");
                return;
            }
        });     
        $("#direccion").on("input",function(){
            mostrarDatalist($(this).val(),$("#partida"),'direccion');
        });
        var cliente;
        for(var i = 0 ; i < CLIENTES.length; i++)
        {
            if(CLIENTES[i].cliente_id === id)
            {
                cliente = CLIENTES[i];
            }
        }
        $("#razon").val(cliente.cliente_razon);
        $("#rut").val(cliente.cliente_rut);
        $("#rut").prop("readonly",true);
        $("#tipo").val(cliente.cliente_tipo);
        $("#nombre").val(cliente.cliente_nombre_contacto);
        $("#telefono").val(cliente.cliente_fono_contacto);
        $("#direccion").val(cliente.cliente_direccion);
        $("#mail").val(cliente.cliente_mail_contacto);
        $("#mail2").val(cliente.cliente_mail_facturacion);
        verAdjunto(cliente.cliente_contrato,'');
        var j = 0;
        Object.keys(cliente.cliente_centro_costo).forEach(function(key){
        var value = cliente.cliente_centro_costo[key];
            if(j === 0)
            {
                $("#centros").val(value);
            }
            else if(j > 0)
            {
                agregarCentroCostoValor(j+1,value);
            }
            j++;
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
        $("#agregar_cc").click(function(){
            agregarCentroCosto();
        });

        $("#quitar_cc").click(function(){
            quitarCentroCosto();
        });
        
    });
}

function eliminarCliente()
{
    var rut = $("#rut").val();
    var params = {rut : rut,id : ID_CLIENTE};
    var url = urlBase + "/cliente/DelCliente.php";
    var success = function(response)
    {
        alertify.success("Cliente eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarCliente();
    };
    postRequest(url,params,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < CLIENTES.length ; i++)
    {
        if(tipo === 'rut')
        {
            if(valor === CLIENTES[i].cliente_rut)
            {
                return true;
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
    var mail = $("#mail");
    var mail2 = $("#mail2");
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
    if(!validarEmail(mail.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(mail);
        alertify.error('E-mail contacto invalido');
        return false;
    }
    if(!validarEmail(mail2.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(mail2);
        alertify.error('E-mail facturaci&oacute;n invalido');
        return false;
    }
    
    return true;
}

function activarPestania(array)
{
    var general = false;
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        if(array[i] === '')
        {
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
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_ccosto").click(function(){
        cambiarPestaniaCC();
    });
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_ccosto"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_ccosto"),"dispose");
}

function cambiarPestaniaCC()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_ccosto"),"display","block");
    quitarclase($("#p_ccosto"),"dispose");
    agregarclase($("#p_general"), "dispose");
}

function agregarCentroCosto()
{
    var i = 1;
    $(".centro_costo").each(function(index){
        i++;
    });
    $("#centro_costo").append("<div class=\"contenedor-pre-input\" id=\"cont-pre-cc-"+i+"\">Centro Costo "+i+" (*)</div>"+
            "<div class=\"contenedor-input\" id=\"cont-cc-"+i+"\">"+
                "<input class=\"centro_costo\" type=\"text\" id=\"centros"+i+"\" placeholder=\"Ej: Principal\" maxlength=\"40\">");
    $('#centro_costo').animate({ scrollTop: $('#centro_costo').height() });
}

function agregarCentroCostoValor(i,val)
{
    $("#centro_costo").append("<div class=\"contenedor-pre-input\" id=\"cont-pre-cc-"+i+"\">Centro Costo "+i+" (*)</div>"+
            "<div class=\"contenedor-input\" id=\"cont-cc-"+i+"\"><input class=\"centro_costo\" type=\"text\" id=\"centros"+i+"\" value=\""+val+"\" placeholder=\"Ej: Principal\" maxlength=\"40\">");
}

function quitarCentroCosto()
{
    var i = 1;
    var largo = $(".centro_costo").length;
    if(largo > 1 )
    {
        $(".centro_costo").each(function(index){
            if(i === largo)
            {
                $(this).remove();
                $("#cont-cc-"+i).remove();
                $("#cont-pre-cc-"+i).remove();
            }
            i++;
        });
    }
}

function succesSubirContrato()
{
    var archivo = $("#contratoOculta").val();
    var ext = archivo.split("\.")[1];
    if(ext !== 'pdf'){
        alertify.error("Archivo invalido");
        return;
    }
    else
    {
        var enlace = "<a href=\"source/util/pdf/"+$("#patente").val()+"_"+archivo+"\" target=\"_blanck\">Ver</a>";
        $("#contenedor_contrato").html(enlace);
    }
}