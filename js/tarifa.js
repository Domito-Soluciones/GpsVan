/* global urlBase, alertify */
var ID_TARIFA;
var ID_CLIENTE;
var TARIFAS;
var AGREGAR = true;
var PAGINA = 'TARIFAS';
var CAMPOS = ["clientes","tipo","horario","nombre","valor1","valor2"];
var clientes = [];

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarCliente();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#lista_busqueda_tarifa_detalle").load("html/datos_tarifa.html", function( response, status, xhr ) {
            cambioEjecutado();
            cargarClientes();
            $("#clientes").on('input',function(){
                generarNombre('cliente');
            });
            $("#tipo").change(function(){
                generarNombre('tipo');
            });
            $("#horario").change(function(){
                generarNombre('horario');
            });

            $("#nombre").blur(function (){
                if(validarExistencia('nombre',$(this).val()))
                {
                    alertify.error("El nombre "+$(this).val()+" ya existe");
                    $("#nombre").val("");
                    return;
                }
            });
            $("#clientes").on('blur',function () {
                if($("#clientes").val() === "")
                {
                    //cargarPasajeros();
                }
                var noExiste = validarInexistencia($("#clientes").val(),clientes);
                if(noExiste)
                {
                    alertify.error("Cliente inexistente");
                    $("#clientes").val("");

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
        buscarCliente($(this).val());
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
    var cliente = $("#clientes").val();
    var tipo = $("#tipo").val();
    var horario = $("#horario").val();
    var nombre = $("#nombre").val();
    var origen = $("#origen").val();
    var destino = $("#destino").val();
    var valor1 = $("#valor1").val();
    var valor2 = $("#valor2").val();
    var array = [cliente,tipo,horario,nombre,origen,destino,valor1,valor2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var params = {cliente : cliente, tipo : tipo,horario : horario, nombre : nombre, origen : origen,
            destino : destino, valor1 : valor1, valor2 : valor2};
        var url = urlBase + "/tarifa/AddTarifa.php";
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
        postRequest(url,params,success);
    }
}

function modificarTarifa()
{
    var id = ID_TARIFA;
    var cliente = $("#clientes").val();
    var tipo = $("#tipo").val();
    var horario = $("#horario").val();
    var nombre = $("#nombre").val();
    var origen = $("#origen").val();
    var destino = $("#destino").val();
    var valor1 = $("#valor1").val();
    var valor2 = $("#valor2").val();
    var array = [cliente,tipo,horario,nombre,valor1,valor2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var params = {id : id,cliente : cliente, tipo : tipo,horario : horario, nombre : nombre, origen : origen,
            destino : destino, valor1 : valor1, valor2 : valor2};
        var url = urlBase + "/tarifa/ModTarifa.php";
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            alertify.success("Tarifa Modificada");
            resetFormulario();
            buscarTarifa();
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
        var clientes = $("#lista_busqueda_tarifa");
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
                clientes.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+nombre+"\" onClick=\"cambiarFila('"+nombre+"')\">"+titulo+"</div>");
            }
            else
            {
                clientes.append("<div class=\"fila_contenedor\" id=\""+nombre+"\" onClick=\"cambiarFila('"+nombre+"')\">"+titulo+"</div>");
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
        confirmar("Cambio de tarifa",
        "¿Desea cambiar de tarifa sin guardar los cambios?",
        function()
        {
            MODIFICADO = false;
            buscarTarifas(id);
            //abrirModificar(id);
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        buscarTarifas(id);
        //abrirModificar(id);
    }
}
function buscarTarifas(id)
{
    ID_CLIENTE = id;
    marcarFilaActiva(id);
    $("#lista_busqueda_tarifa_detalle").html("");
    cambiarPropiedad($("#lista_busqueda_tarifa_detalle"),"height","calc(100% - 50px)");
    cambiarPropiedad($(".mensaje_bienvenida"),"display","none");
    var busqueda = ID_CLIENTE;
    var params = {busqueda : busqueda};
    var url = urlBase + "/tarifa/GetTarifas.php";
    var success = function(response)
    {
        cambiarPropiedad($("#loaderTarifa"),"display","none");
        cerrarSession(response);
        var tarifas = $("#lista_busqueda_tarifa_detalle");
        tarifas.html("");
        TARIFAS = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        tarifas.append("<div class=\"contenedor_central_titulo_tarifa\"><div>Nombre</div><div>Origen</div><div>Destino</div></div>")
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].tarifa_id;
            var nombre = response[i].tarifa_nombre;
            var origen = response[i].tarifa_origen;
            var destino = response[i].tarifa_destino;
            tarifas.append("<div class=\"fila_contenedor fila_contenedor_tarifa_detalle\" id=\""+id+"\" onClick=\"abrirBuscador('"+id+"')\">"+
                    "<div>"+nombre+"</div>"+
                    "<div>"+origen+"</div>"+
                    "<div>"+destino+"</div></div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
    
}
function abrirBuscador(id)
{
    AGREGAR = false;
    ID_TARIFA = id;
    cambiarPropiedad($("#pie-aniadir"),"display","none");
    $("#lista_busqueda_tarifa_detalle").load("html/datos_tarifa.html", function( response, status, xhr ) {
        cambioEjecutado();
        var tarifa;
        for(var i = 0 ; i < TARIFAS.length; i++)
        {
            if(TARIFAS[i].tarifa_id === id)
            {
                tarifa = TARIFAS[i];
            }
        }
        $("#clientes").on('input',function(){
                generarNombre('cliente');
        });
        $("#tipo").change(function(){
            generarNombre('tipo');
        });
        $("#horario").change(function(){
            generarNombre('horario');
        });
        cargarClientes();
        $("#clientes").val(tarifa.tarifa_cliente);
        $("#tipo").val(tarifa.tarifa_tipo);
        $("#horario").val(tarifa.tarifa_horario);
        $("#nombre").prop("readonly",true);
        $("#nombre").val(tarifa.tarifa_nombre);
        $("#origen").val(tarifa.tarifa_origen);
        $("#destino").val(tarifa.tarifa_destino);
        $("#valor1").val(tarifa.tarifa_valor1);
        $("#valor2").val(tarifa.tarifa_valor2);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
        $("#volver").click(function(){
            buscarTarifas(ID_CLIENTE);
            cambiarPropiedad($("#pie-aniadir"),"display","block");
        });
        
    });
}

function eliminarTarifa()
{
    var nombre = $("#nombre").val();
    var params = {nombre : nombre};
    var url = urlBase + "/tarifa/DelTarifa.php";
    var success = function(response)
    {
        alertify.success("Tarifa eliminada");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarTarifa();
    };
    postRequest(url,params,success);
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
    var busqueda = $("#clientes").val();
    var params = {busqueda : busqueda,buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
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
    postRequest(url,params,success);
}

function generarNombre(op)
{
    var cliente = $("#clientes").val();
    var tipo = $("#tipo").val();
    var horario = $("#horario").val();
    if(op === 'cliente')
    {
        if(tipo === '' && horario === '')
        {
            $("#nombre").val(cliente+"--");
        }
        else if(tipo !== '' && horario === '')
        {
            $("#nombre").val(cliente+"-"+tipo+"-");
        }
        else if(tipo === '' && horario !== '')
        {
            $("#nombre").val(cliente+"--"+horario);
        }
        else if(tipo !== '' && horario !== '')
        {
            $("#nombre").val(cliente+"-"+tipo+"-"+horario);
        }
    }
    if(op === 'tipo')
    {
        if(cliente === '' && horario === '')
        {
            $("#nombre").val("-"+tipo+"-");
        }
        else if(cliente !== '' && horario === '')
        {
            $("#nombre").val(cliente+"-"+tipo+"-");
        }
        else if(cliente === '' && horario !== '')
        {
            $("#nombre").val("-"+tipo+"-"+horario);
        }
        else if(cliente !== '' && horario !== '')
        {
            $("#nombre").val(cliente+"-"+tipo+"-"+horario);
        }
    }
    if(op === 'horario')
    {
        if(cliente === '' && tipo === '')
        {
            $("#nombre").val("--"+horario);
        }
        else if(cliente !== '' && tipo === '')
        {
            $("#nombre").val(cliente+"--"+horario);
        }
        else if(cliente === '' && tipo !== '')
        {
            $("#nombre").val("-"+tipo+"-"+horario);
        }
        else if(cliente !== '' && tipo !== '')
        {
            $("#nombre").val(cliente+"-"+tipo+"-"+horario);
        }
    }
}

