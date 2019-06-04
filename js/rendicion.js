/* global urlBase, alertify, ADJUNTANDO */
var ID_CONDUCTOR;
var AGREGAR = true;
var PAGINA = 'RENDICIONES';
var CAMPOS = ["dato","valor","tipo"];
var RENDICIONES;
var ID_RENDICION;
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarConductor();
    verRendiciones('',true);
    $("#busqueda").keyup(function(){
        buscarConductor($(this).val());
    });
    
    $("#agregar").click(function(){
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#lista_busqueda_rendicion_detalle").load("html/datos_rendicion.html", function( response, status, xhr ) {
            cambioEjecutado();
            $("#volver").click(function(){
                verRendiciones(ID_CONDUCTOR);
                cambiarPropiedad($("#agregar"),"visibility","visible");
                cambiarPropiedad($("#guardar"),"visibility","hidden");
                cambiarPropiedad($("#eliminar"),"visibility","hidden");
            });
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#elimianr"),"visibility","hidden");
    });
    
    $("#guardar").click(function(){
        if(AGREGAR)
        {
            agregarRendicion();
        }
        else
        {
            modificarRendicion();
        }
    });
    
    $("#eliminar").click(function (){
        confirmar("Eliminar rendición","Esta seguro que desea eliminar la rendición "+ID_RENDICION+"?",
        function(){
                    eliminarRendicion();
            },null);
    });
});

function agregarRendicion()
{
    var dato = $("#dato").val();
    var valor = $("#valor").val();
    var d = new Date();
    var mes = d.getMonth() < 10 ? "0"+(d.getMonth()+1) : d.getMonth()+1;
    var anio = d.getFullYear();
    var fecha = mes+"-"+anio;
    var tipo = $("#tipo").val();
    var array = [dato,valor];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var params = {conductor : ID_CONDUCTOR,dato : dato, valor : valor, fecha : fecha, tipo : tipo};
        var url = urlBase + "/rendicion/AddRendicion.php";
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Rendición Agregada");
            vaciarFormulario();
            resetFormulario();
        };
        postRequest(url,params,success);
    }
}

function modificarRendicion()
{
    var dato = $("#dato").val();
    var valor = $("#valor").val();
    var tipo = $("#tipo").val();
    var array = [dato,valor,tipo];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var params = {id : ID_RENDICION,dato : dato, valor : valor, tipo : tipo};
        var url = urlBase + "/rendicion/ModRendicion.php";
        var success = function(response)
        {
            cerrarSession(response);
            resetFormulario();
            alertify.success("Rendición Modificada");
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
        var conductores = $("#lista_busqueda_contrato");
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
            var rut = response[i].conductor_rut;
            var nombre = response[i].conductor_nombre;
            var papellido = response[i].conductor_papellido;
            var mapellido = response[i].conductor_mapellido;
            var titulo = recortar(id+" / "+nombre+" "+papellido+" "+ mapellido);            
            if (typeof ID_CONDUCTOR !== "undefined" && ID_CONDUCTOR === id)
            {
                conductores.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"verRendiciones('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
            conductores.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"verRendiciones('"+id+"')\">"+ titulo +"</div>");
            }
        }
    };
    postRequest(url,params,success);
}

function verRendiciones(conductor,cargar = false)
{
    ID_CONDUCTOR = conductor;
    marcarFilaActiva(conductor);
    if(conductor !== '')
    {
        quitarclase($("#agregar"),"oculto");
    }
    var params = {busqueda : conductor};
    var url = urlBase + "/rendicion/GetRendiciones.php";
    var success = function(response)
    {
        RENDICIONES = response;
        cerrarSession(response);
        var rendiciones = $("#lista_busqueda_rendicion_detalle");
        rendiciones.html("");
        if(response.length === 0)
        {
            rendiciones.html("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
            alertify.error("No hay registros que mostrar");
            return;
        }
        rendiciones.append("<div class=\"contenedor_central_titulo\"><div></div><div class=\"col_dato_rendicion\">Dato</div><div class=\"col_empresa_pasajero\">Valor</div><div class=\"col_empresa_pasajero\">Fecha</div><div>Tipo</div><div></div></div>");
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].rendicion_id;
            var dato = response[i].rendicion_dato;
            var valor = response[i].rendicion_valor;
            var fecha = response[i].rendicion_fecha;
            var tipo = response[i].rendicion_tipo === '0' ? 'Rendición' : 'Descuento';
            rendiciones.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\">"+
                    "<div class=\"col_dato_rendicion\" onClick=\"abrirModificar('"+id+"')\">"+dato+"</div>"+
                    "<div class=\"col_empresa_pasajero\" onClick=\"abrirModificar('"+id+"')\">"+valor+"</div>"+
                    "<div class=\"col_empresa_pasajero\" onClick=\"abrirModificar('"+id+"')\">"+fecha+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"')\">"+tipo+"</div>"+
                    "<div><img onclick=\"preEliminarRendicion('"+id+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success,cargar);
}


function abrirModificar(id)
{
    AGREGAR = false;
    ID_RENDICION = id;
    $("#lista_busqueda_rendicion_detalle").load("html/datos_rendicion.html", function( response, status, xhr ) {
        cambioEjecutado();
        $("#volver").click(function(){
            verRendiciones(ID_CONDUCTOR);
            cambiarPropiedad($("#agregar"),"visibility","visible");
            cambiarPropiedad($("#guardar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
        });
        var rendicion;
        for(var i = 0 ; i < RENDICIONES.length; i++)
        {
            if(RENDICIONES[i].rendicion_id === id)
            {
                rendicion = RENDICIONES[i];
            }
        }
        $("#dato").val(rendicion.rendicion_dato);
        $("#valor").val(rendicion.rendicion_valor);
        $("#tipo").val(rendicion.rendicion_tipo);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function validarTipoDato()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var valor = $("#valor");
    if(!validarNumero(valor.val()))
    {
        marcarCampoError(valor);
        alertify.error('Valor debe ser numerico');
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

function preEliminarRendicion(id)
{
    confirmar("Eliminar connductor","Esta seguro que desea eliminar la rendición "+id,
            function(){
                var params = {id : id};
                var url = urlBase + "/rendicion/DelRendicion.php";
                var success = function(response)
                {
                    alertify.success("Rendición eliminada");
                    cerrarSession(response);
                    resetBotones();
                    verRendiciones(ID_CONDUCTOR);
                    marcarFilaActiva(ID_CONDUCTOR);
                };
                postRequest(url,params,success);
            });
}

function eliminarRendicion()
{
    var params = {id : ID_RENDICION};
    var url = urlBase + "/rendicion/DelRendicion.php";
    var success = function(response)
    {
        alertify.success("Rendición eliminada");
        cerrarSession(response);
        resetBotones();
        verRendiciones(ID_CONDUCTOR);
        marcarFilaActiva(ID_CONDUCTOR);
    };
    postRequest(url,params,success);
}
