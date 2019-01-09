/* global urlBase, alertify */
var ID_TARIFA;
var TARIFAS;
var AGREGAR = true;
var PAGINA = 'TARIFAS';
var CAMPOS = ["nombre","origen","destino","valor1","valor2","cliente","ruta"];
var clientes = [];

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarTarifa();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_tarifa.html", function( response, status, xhr ) {
            cambioEjecutado();
            cargarClientes();
            $("#nombre").blur(function (){
                if(validarExistencia('nombre',$(this).val()))
                {
                    alertify.error("El nombre "+$(this).val()+" ya existe");
                    $("#nombre").val("");
                    return;
                }
            });
            $("#cliente").on('blur',function () {
                if($("#cliente").val() === "")
                {
                    cargarPasajeros();
                }
                var noExiste = validarInexistencia($("#cliente").val(),clientes);
                if(noExiste)
                {
                    alertify.error("Cliente inexistente");
                    $("#cliente").val("");

                }
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
            agregarTarifa();
        }
        else
        {
            modificarTarifa();
        }
    });
    $("#busqueda").keyup(function(){
        buscarTarifa($(this).val());
    });
    
    $("#eliminar").click(function (){
            confirmar("Eliminar tarifa","Esta seguro que desea eliminar la tarifa "+$("#nombre").val(),
            function(){
                eliminarTarifa();
            },null);
    });
});

function agregarTarifa()
{
    var nombre = $("#nombre").val();
    var origen = $("#origen").val();
    var destino = $("#destino").val();
    var valor1 = $("#valor1").val();
    var valor2 = $("#valor2").val();
    var cliente = $("#cliente").val();
    var ruta = $("#ruta").val();
    var array = [nombre,origen,destino,valor1,valor2,cliente,ruta];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "nombre="+nombre+"&origen="+origen+"&destino="+destino
        +"&valor1="+valor1+"&valor2="+valor2+"&cliente="+cliente+"&ruta="+ruta;
        var url = urlBase + "/tarifa/AddTarifa.php?"+data;
        var success = function(response)
        {
            ID_TARIFA = undefined;
            cerrarSession(response);
            alertify.success("Tarifa Agregada");
            vaciarFormulario();
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario();
            buscarTarifa();
        };
        postRequest(url,success);
    }
}

function modificarTarifa()
{
    var nombre = $("#nombre").val();
    var origen = $("#origen").val();
    var destino = $("#destino").val();
    var valor1 = $("#valor1").val();
    var valor2 = $("#valor2").val();
    var cliente = $("#cliente").val();
    var ruta = $("#ruta").val();
    var array = [nombre,origen,destino,valor1,valor2,cliente,ruta];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "id="+ID_TARIFA+"&nombre="+nombre+"&origen="+origen+"&destino="+destino
        +"&valor1="+valor1+"&valor2="+valor2+"&cliente="+cliente+"&ruta="+ruta;
        var url = urlBase + "/tarifa/ModTarifa.php?"+data;
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            alertify.success("Tarifa Modificada");
            resetFormulario();
            buscarTarifa();
        };
        postRequest(url,success);
    }
}

function buscarTarifa()
{
    var busqueda = $("#busqueda").val();
    var url = urlBase + "/tarifa/GetTarifas.php?busqueda="+busqueda;
    var success = function(response)
    {
        cerrarSession(response);
        var tarifas = $("#lista_busqueda");
        tarifas.html("");
        TARIFAS = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].tarifa_id;
            var nombre = response[i].tarifa_nombre;
            var titulo = recortar(nombre);
            if (typeof ID_TARIFA !== "undefined" && ID_TARIFA === id)
            {
                tarifas.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
                tarifas.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}
function cambiarFila(id)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de tarifa",
        "¿Desea cambiar de tarifa sin guardar los cambios?",
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
    ID_TARIFA = id;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_tarifa.html", function( response, status, xhr ) {
        cambioEjecutado();
        var tarifa;
        for(var i = 0 ; i < TARIFAS.length; i++)
        {
            if(TARIFAS[i].tarifa_id === id)
            {
                tarifa = TARIFAS[i];
            }
        }
        $("#nombre").prop("readonly",true);
        $("#nombre").val(tarifa.tarifa_nombre);
        $("#origen").val(tarifa.tarifa_origen);
        $("#destino").val(tarifa.tarifa_destino);
        $("#valor1").val(tarifa.tarifa_valor1);
        $("#valor2").val(tarifa.tarifa_valor2);
        $("#cliente").val(tarifa.tarifa_cliente);
        cargarClientes();
        $("#ruta").val(tarifa.tarifa_ruta);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarTarifa()
{
    var nombre = $("#nombre").val();
    var url = urlBase + "/tarifa/DelTarifa.php?nombre="+nombre;
    var success = function(response)
    {
        alertify.success("Tarifa eliminada");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarTarifa();
    };
    getRequest(url,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < TARIFAS.length ; i++)
    {
        if(tipo === 'nombre')
        {
            if(valor === TARIFAS[i].tarifa_nombre)
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
    var valor1 = $("#valor1");
    var valor2 = $("#valor2");
    if(!validarNumero(valor1.val()))
    {
        marcarCampoError(valor1);
        alertify.error('Valor 1 debe ser numerico');
        return false;
    }
    if(!validarNumero(valor2.val()))
    {
        marcarCampoError(valor2);
        alertify.error('Valor 2 debe ser numerico');
        return false;
    }
    return true;
}

function activarPestania(array)
{
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
}

function cargarClientes()
{
    var busqueda = $("#cliente").val();
    var url = urlBase + "/cliente/GetClientes.php?busqueda="+busqueda;
    var success = function(response)
    {
        $("#lcliente").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].cliente_razon;
            $("#lcliente").append("<option value=\""+nombre+"\">"+nombre+"</option>");
            clientes.push(nombre);
        }
    };
    getRequest(url,success,false);
}


