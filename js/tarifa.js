/* global urlBase, alertify */
var TARIFAS;
var AGREGAR = true;
var PAGINA = 'TARIFAS';
var CAMPOS = ["nombre","origen","destino","valor1","valor2"];
$(document).ready(function(){
    buscarTarifa();
    $("#agregar").click(function(){
        MODIFICADO = true;
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_tarifa.html", function( response, status, xhr ) {
            $("#nombre").blur(function (){
                if(validarExistencia('nombre',$(this).val()))
                {
                    alertify.error("El nombre "+$(this).val()+" ya existe");
                    $("#rut").val("");
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
            agregarTarifa();
        }
        else
        {
            modificarTarifa();
        }
        MODIFICADO = false;
    });
    $("#busqueda").keyup(function(){
        buscarTarifa($(this).val());
    });
    
    $("#eliminar").click(function (){
            alertify.confirm("Eliminar tarifa","Esta seguro que desea eliminar la tarifa "+$("#nombre").val(),
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
    var array = [nombre,origen,destino,valor1,valor2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "nombre="+nombre+"&origen="+origen+"&destino="+destino
        +"&valor1="+valor1+"&valor2="+valor2;
        var url = urlBase + "/tarifa/AddTarifa.php?"+data;
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Tarifa Agregada");
            vaciarFormulario($("#agregar input"));
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario(PAGINA);
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
    var array = [nombre,origen,destino,valor1,valor2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "nombre="+nombre+"&origen="+origen+"&destino="+destino
        +"&valor1="+valor1+"&valor2="+valor2;
        var url = urlBase + "/tarifa/ModTarifa.php?"+data;
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetBotones();
            cerrarSession(response);
            alertify.success("Tarifa Modificada");
            vaciarFormulario($("#agregar input"));
            resetFormulario(PAGINA);
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
            tarifas.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"abrirModificar('"+id+"')\">"+nombre+"</div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function abrirModificar(id)
{
    MODIFICADO = true;
    AGREGAR = false;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_tarifa.html", function( response, status, xhr ) {
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
        resetFormulario(PAGINA);
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


