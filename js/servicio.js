/* global urlBase, alertify, CREADO, EN_PROCCESO_DE_ASIGNACION, ASIGNADO, ACEPTADO, EN_PROGRESO, FINALIZADO, google, map, markers, directionsDisplay, TIPO_USUARIO */
var SERVICIOS;
var ESTADO_SERVICIO;
var RUTA;
var conductores = new Map();
var conductoresNick = new Map();
var MOVILES = {};
var PAGINA = 'SERVICIOS';
var CAMPOS = ["clienteServicio","rutaServicio","fechaServicio","inicioServicio","estadoServicio","movilServicio","conductorServicio"];
$(document).ready(function(){
    borrarDirections();
    PAGINA_ANTERIOR = PAGINA;
    eliminarMarkers();
    iniciarFecha([$("#desde"),$("#hasta")]);
    iniciarHora([$("#hdesde"),$("#hhasta")]);
    buscarServicio();
    cargarMoviles();
    $("#exportar").click(function(){
        exportarServicio(); 
    });
    
    $("#buscar").click(function(){
        buscarServicio(); 
    });
    
    if(TIPO_USUARIO === 'CLIENTE')
    {
        cambiarPropiedad($("#cont_empresa"),"display","none");
    }
});

function buscarServicio()
{
    var id = $("#id").val();
    var empresa = $("#empresa").val();
    if(TIPO_USUARIO === 'CLIENTE')
    {
        empresa = $("#clientes").val();
    }
    var movil = $("#movil").val();
    var desde = $("#desde").val();
    var hdesde = $("#hdesde").val();
    var hasta = $("#hasta").val();
    var hhasta = $("#hhasta").val();
    var params = {id : id, empresa : empresa, movil : movil,
        desde : desde, hdesde : hdesde, hasta : hasta, hhasta : hhasta};
    var url = urlBase + "/servicio/GetServicios.php";
    var success = function(response)
    {
        cerrarSession(response);
        var servicios = $("#contenedor_central");
        servicios.html("");
        SERVICIOS = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        servicios.append("<div class=\"contenedor_central_titulo\"><div></div><div>ID Servicio</div><div>Empresa</div><div>Fecha</div><div>Estado</div><div>Vehículo</div></div>")
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].servicio_id;
            var cliente = response[i].servicio_cliente;
            var fecha = response[i].servicio_fecha;
            var hora = response[i].servicio_hora;
            var estado = response[i].servicio_estado;
            var conductor = response[i].servicio_movil;
            servicios.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\" onClick=\"abrirBuscador('"+id+"')\">"+
                    "<div>"+id+"</div>"+
                    "<div>"+cliente+"</div>"+
                    "<div>"+fecha+" "+hora+"</div>"+
                    "<div>"+obtenerEstadoServicio(estado)+"</div>"+
                    "<div>"+conductor+"</div></div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function exportarServicio()
{
    
}

function cargarMoviles()
{
    var params = {busqueda : ''};
    var url = urlBase + "/movil/GetMoviles.php";
    var success = function(response)
    {
        for(var i = 0 ; i < response.length ; i++)
        {
            var conductor = response[i].movil_conductor_nombre;
            var nick = response[i].movil_conductor_nick;
            conductores.set(nick,conductor);
            conductoresNick.set(conductor,nick);
            MOVILES = response;
        }
    };
    postRequest(url,params,success,false);
}

function abrirBuscador(id)
{
    AGREGAR = false;
    ID_SERVICIO = id;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_servicio.html", function( response, status, xhr ) {
        if(TIPO_USUARIO === 'CLIENTE')
        {
            cambiarPropiedad($("#p_ruta"),"display","none");
            $("#rutaServicio").prop("readonly",true);
            $("#fechaServicio").prop("readonly",true);
            $("#inicioServicio").prop("readonly",true);
            $("#estadoServicio").prop("disabled",true);
            $("#movilServicio").prop("disabled",true);
            $("#tarifaServicio").prop("readonly",true);
            $("#tarifa2Servicio").prop("readonly",true);
            cambiarPropiedad($("#guardar"),"display","none");
        }
        else if(TIPO_USUARIO === 'ADMIN')
        {
            cargarClientes();
            cargarRutas();
            $("#rutaServicio").prop("readonly",false);
            $("#fechaServicio").prop("disabled",false);
            $("#inicioServicio").prop("disabled",false);
            $("#estadoServicio").prop("disabled",false);
            $("#movilServicio").prop("disabled",false);
            $("#tarifaServicio").prop("readonly",false);
            $("#tarifa2Servicio").prop("readonly",false);
            iniciarFecha([$("#fechaServicio")]);
            iniciarHora([$("#inicioServicio")]);
        }
        cambioEjecutado();
        iniciarPestanias();
        var servicio;
        for(var i = 0 ; i < SERVICIOS.length; i++)
        {
            if(SERVICIOS[i].servicio_id === id)
            {
                servicio = SERVICIOS[i];
            }
        }
        $("#idServicio").val(servicio.servicio_id);
        $("#clienteServicio").val(servicio.servicio_cliente);
        $("#rutaServicio").val(servicio.servicio_ruta);
        $("#estadoServicio").val(servicio.servicio_estado);
        ESTADO_SERVICIO = servicio.servicio_estado;
        cargarRutas();
        var conductorReal = "";
        for(var i = 0 ; i < MOVILES.length; i++)
        {
            var sel = "";
            var conductor = conductores.get(MOVILES[i].movil_conductor_nick);
            if(MOVILES[i].movil_nombre === servicio.servicio_movil)
            {
                conductorReal = conductor;
                sel = " selected ";
            }
            var movil = MOVILES[i].movil_nombre;
            
            if(conductor.length === 1)
            {
                conductor = "No Definido";
            }
            $("#movilServicio").append("<option value='"+movil+"'"+sel+">"+movil+" / "+conductor+"</option>");
        }
        $("#conductorServicio").val(conductorReal.length===1?"No Definido":conductorReal);
        $("#inicioServicio").val(servicio.servicio_hora);
        $("#fechaServicio").val(servicio.servicio_fecha);
        $("#tarifaServicio").val(servicio.servicio_tarifa1);
        $("#tarifa2Servicio").val(servicio.servicio_tarifa2);        
        $("#clienteServicio").on('input',function () {
            cargarRutas();
        });
        $("#volver").click(function(){
            buscarServicio();
        });
        $("#movilServicio").change(function () {
            if($(this).val() !== "")
            {
                var conductor = $(this).children("option").filter(":selected").text().split(" / ")[1];
                $("#conductorServicio").val(conductor);
            }
            else
            {
                $("#conductorServicio").val("");
            }
        });
        $("#guardar").click(function(){
            modificarServicio();
        });
        
        $("#eliminar").click(function (){
            confirmar("Eliminar servicio","Esta seguro que desea eliminar el servicio "+ID_SERVICIO,
            function(){
                    eliminarServicio();
                },null);
        });
    });
}

function modificarServicio()
{
    var id = ID_SERVICIO;
    var cliente = $("#clienteServicio").val();
    var ruta = $("#rutaServicio").val();
    var fecha = $("#fechaServicio").val();
    var hora = $("#inicioServicio").val();
    var estado = $("#estadoServicio").val();
    var movil = $("#movilServicio").val();
    var conductor = conductoresNick.get($("#conductorServicio").text());
    var tarifa1 = $("#tarifaServicio").val();
    var tarifa2 = $("#tarifa2Servicio").val();
    var array = [cliente,ruta,fecha,hora,estado,movil,tarifa1,tarifa2];
    var params = {id : id,cliente : cliente,ruta : ruta,fecha : fecha, hora : hora,
        estado : estado,movil : movil, conductor : conductor, tarifa1 : tarifa1, tarifa2 : tarifa2};
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var url = urlBase + "/servicio/ModServicio.php";
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            alertify.success("Servicio Modificado");
            buscarServicio();
        };
        postRequest(url,params,success);
    }
}

function eliminarServicio()
{
    var params = {id : ID_SERVICIO};
    var url = urlBase + "/servicio/DelServicio.php";
    var success = function(response)
    {
        alertify.success("Servicio eliminado");
        cerrarSession(response);
        buscarServicio();
    };
    postRequest(url,params,success);
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_pasajero").click(function(){
        cambiarPestaniaPasajero();
        obtenerPasajeros();
    });
    $("#p_ruta").click(function(){
        if(ESTADO_SERVICIO < 5)
        {
            $("#contenedor_mapa").html("<div class=\"mensaje_bienvenida\">El servicio debe estar finalizado para ver la ruta</div>");
        }
        else
        {
            for(var i = 0; i < markers.length;i++)
            {
                markers[i].setMap(null);
            }
            mostrarMapa();
        }
        cambiarPestaniaRuta();
        dibujarRutaReal();
    });
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_pasajero"),"display","none");
    cambiarPropiedad($("#cont_ruta"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_pasajero"),"dispose");
    agregarclase($("#p_ruta"),"dispose");
}

function cambiarPestaniaPasajero()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_pasajero"),"display","block");
    cambiarPropiedad($("#cont_ruta"),"display","none");
    quitarclase($("#p_pasajero"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_ruta"),"dispose");
}
function cambiarPestaniaRuta()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_pasajero"),"display","none");
    cambiarPropiedad($("#cont_ruta"),"display","block");
    quitarclase($("#p_ruta"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_pasajero"),"dispose");
}

function obtenerEstadoServicio(servicio)
{
    if(servicio === CREADO)
    {
        return "Creado"; 
    }
    else if(servicio === EN_PROCCESO_DE_ASIGNACION)
    {
        return "En proceso de asignaci&oacute;n";            
    }
    else if(servicio === ASIGNADO)
    {
        return "Asignado";     
    }
    else if(servicio === ACEPTADO)
    {
        return "Aceptado";            
    }
    else if(servicio === EN_PROGRESO)
    {
        return "En Ruta";
    }
    else if(servicio === FINALIZADO)
    {
        return "Finalizado"; 
    }
}

function dibujarRutaReal()
{
    var params = {id : ID_SERVICIO};
    var url = urlBase + "/servicio/GetDetalleServicioReal.php";
    var success = function(response)
    {
        var polyline = [];
        for(var i = 0 ; i < response.length; i++)
        {
            var servicio = response[i];
            polyline.push({lat: parseFloat(servicio.servicio_lat), lng: parseFloat(servicio.servicio_lon)});
        }
        var flightPath = new google.maps.Polyline({
            path: polyline,
            geodesic: true,
            strokeColor: '#7394e7',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
        flightPath.setMap(map);
        var bounds = new google.maps.LatLngBounds();
        polyline.forEach(function(LatLng) {
            bounds.extend(LatLng);
        });
        map.fitBounds(bounds);
    };
    postRequest(url,params,success);
}

function obtenerPasajeros()
{
    var params = {id : ID_SERVICIO};
    var url = urlBase + "/servicio/GetPasajerosServicio.php";
    var success = function(response)
    {
        $("#pasajeros_contenido").html("");
        for(var i = 0; i < response.length; i++)
        {
            var pasajero = response[i].servicio_pasajero;
            var horaDestino = response[i].servicio_hora_destino === '00:00:00'?"-":response[i].servicio_hora_destino;
            var estado = '';
            if(response[i].servicio_estado === '0')
            {
                estado = "Pendiente";
            }
            else if (response[i].servicio_estado === '1')
            {
                estado = "En Ruta";
            }
            else if (response[i].servicio_estado === '2')
            {
                estado = "Cancelado";
            }
            else if (response[i].servicio_estado === '2')
            {
                estado = "Entregado";
            }
            var destino = response[i].servicio_destino;
            $("#pasajeros_contenido").append("<div class=\"fila_contenedor fila_contenedor_servicio\">"+
                    "<div class=\"nombre_pasajero\">"+pasajero+"</div>"+
                    "<div class=\"dir_pasajero\">"+destino+"</div>"+
                    "<div class=\"dato_pasajero\">"+horaDestino+"</div>"+
                    "<div class=\"dato_pasajero\">"+estado+"</div></div>");
        }
    };
    postRequest(url,params,success);
}

function cargarClientes()
{
    var params = {busqueda : '',buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        $("#lcliente").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].cliente_razon;
            $("#lcliente").append("<option value=\""+nombre+"\">"+nombre+"</option>");
        }
    };
    postRequest(url,params,success,false);
}

function cargarRutas()
{
    var clientes = $('#clienteServicio').val();
    NOMBRE_CLIENTE = clientes;
    var params = {empresa : clientes};
    var url = urlBase + "/tarifa/GetTarifasEmpresa.php";
    var success = function(response)
    {
        $("#lruta").html("");
        var ruta = "";
        for(var i = 0 ; i < response.length ; i++)
        {
            TARIFAS = response;
            var descripcion = response[i].tarifa_descripcion;
            if(response[i].tarifa_descripcion !== ruta)
            {
                $("#lruta").append("<option value=\""+descripcion+"\">"+descripcion+"</option>");
                ruta = response[i].tarifa_descripcion;
            }
        }
    };
    postRequest(url,params,success,false);
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

function validarTipoDato()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var tarifa1 = $("#tarifaServicio");
    var tarifa2 = $("#tarifa2Servicio");
    if(!validarNumero(tarifa1.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(tarifa1);
        alertify.error('Tarifa 1 debe ser numerico');
        return false;
    }
    if(!validarNumero(tarifa2.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(tarifa2);
        alertify.error('Tarifa 2 debe ser numerico');
        return false;
    }
    
   return true;
}