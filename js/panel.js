/* global POLYLINE, alertify, urlBase, PLACES_AUTOCOMPLETE_API, POSITION, API_KEY, PLACES_DETAILS_API, google, map, DIRECTIONS_API, EN_PROCCESO_DE_ASIGNACION, markers, TIPO_SERVICIO, markersPanel, directionsService, directionsDisplay, geocoder, MENU_VISIBLE, GOOGLE_MAPS_API */
var CLIENTES = {};
var moviles = [];
var clientesArray = [];
var TARIFAS = {};
var SERVICIOS_PENDIENTES;
var PAGINA = "PANEL";
var objAnterior;
var origen;
var destinos= [];
var pasajeros = [];
var direccion_empresa;
var NOMBRE_CLIENTE;
var conductores = new Map();
var TIPO = 'NORMAL';

var CAMPOS = ["clientes","ruta","fechas","hora","vehiculos","tarifa1","tarifa2"];

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    init();
    if($("#ids").val() !== "")
    {
        cargarRutas();
    }
    if(TIPO_SERVICIO === 1)
    {
        $("#ruta").prop("disabled",true);
        cambiarPropiedad($(".buscador-pasajero"),"display","initial");
        agregarclase($("#contenedor_mapa"),"mapa_bajo");
        cargarPasajeros();
    }
    $("#clientes").keyup(function () {
        cargarClientes();
    });
    $("#clientes").on('input',function () {
        cargarRutas();
    });
    $("#ruta").on('input',function () {
        origen = undefined;
        destinos = [];
        cambiarPropiedad($(".buscador-pasajero"),"display","initial");
        agregarclase($("#contenedor_mapa"),"mapa_bajo");
        for(var i = 0; i < TARIFAS.length; i++)
        {
            if(TARIFAS[i].tarifa_nombre === $(this).val())
            {
                $("#tarifa1").val(TARIFAS[i].tarifa_valor1);
                $("#tarifa2").val(TARIFAS[i].tarifa_valor2);
                break;
            }
        }
        cargarPasajeros();
    });
    
    $("#vehiculos").change(function () {
        if($(this).val() !== "")
        {
            var conductor = $(this).children("option").filter(":selected").text().split(" / ")[1];
            $("#conductores").html("Conductor: "+conductor);
            $("#conductorH").val(conductores.get(conductor));
        }
        else
        {
            $("#conductores").html("");
        }
    });
    
    $("#vehiculos2").change(function () {
        if($(this).val() !== "")
        {
            var conductor = $(this).children("option").filter(":selected").text().split(" / ")[1];
            $("#conductores2").html("Conductor: "+conductor);
            $("#conductor2").val(conductores.get(conductor));
        }
        else
        {
            $("#conductores2").html("");
        }
    });
    
    $("#clientes").on('blur',function () {
        if(TIPO !== 'ESPECIAL')
        {
            var noExiste = validarInexistencia($("#clientes").val(),clientesArray);
            if(noExiste)
            {
                alertify.error("Cliente inexistente");
                $("#clientes").val("");

            }
        }
        else
        {
            $("#ruta").val($("#clientes").val()+"-XX-ESP");
            cambiarPropiedad($(".buscador-pasajero"),"display","initial");
            agregarclase($("#contenedor_mapa"),"mapa_bajo");
            cargarPasajerosEspecial();
        }
    });

    $("#vehiculos").keyup(function(){
        cargarMoviles();
    });

    $("#solicitar").click(function () {
        agregarServicio();
    });
    $("#solicitar2").click(function () {
        agregarServicioEspecial();
    });
    
    $("#normal").click(function(){
        cambiarServicioNormal();
    });
    $("#especial").click(function(){
        cambiarServicioEspecial();
    });
    
    $("#busqueda").keyup(function(){
        cargarPasajerosBusqueda();
    });
    
    $("#addPasajero").click(function(){
        abrirAddPasajero();
    });
    $("#agregarPasajero").click(function(){
        var nombre = $("#agregaNombre").val();
        var direccion = $("#agregaDireccion").val();
        var celular = $("#agregaCelular").val();
        if(nombre !== '' && direccion !== '' && celular !== '')
        {
            agregarPasajero('0',nombre,direccion,celular);
            $("#agregaNombre").val("");
            $("#agregaDireccion").val("");
            $("#agregaCelular").val("");
        }
        else
        {
            alertify.error("Ingrese todos los campos necesarios");
        }
    });
    $("#cerrarAgregar").click(function(){
        cerrarAddPasajero();
    });
    
});

function init()
{
    if(MENU_VISIBLE)
    {
        cambiarPropiedad($(".asignacion_buscador"),"margin-left","calc(37% - 21px)");
        cambiarPropiedad($(".asignacion_buscador"),"width","calc(70% - 51px)"); 
    }
    else
    {
        cambiarPropiedad($(".asignacion_buscador"),"margin-left","calc(37% - 24px)");
        cambiarPropiedad($(".asignacion_buscador"),"width","calc(70% - 67px)");
    }
    cargarClientes();
    cargarMoviles();
    directionsService = new google.maps.DirectionsService();
    if(directionsDisplay === null)
    {
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
    }
    for(var i = 0; i < markers.length;i++)
    {
        markers[i].setMap(null);
    }
    iniciarFecha(['#fechas','#fechas2']);
    iniciarHora(['#hora','#hora2']);
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
            CLIENTES = response;
            clientesArray.push(nombre);
        }
    };
    postRequest(url,params,success,false);
}

function cargarPasajeros()
{
    cambiarPropiedad($("#loader_pasajero"),"visibility","visible");
    var id = $("#ids").val();
    var pasajero = $("#busqueda").val();
    var cliente = $('#clientes').val();
    var ruta = $('#ruta').val();
    var params = {cliente : cliente, pasajero : pasajero, ruta : ''};
    var url = urlBase + "/pasajero/GetPasajerosRuta.php";
    if(TIPO_SERVICIO === 1)
    {
        params = {id : id};
        url =  urlBase + "/pasajero/GetPasajerosEspecial.php";
    }
    var success = function(response)
    {
        if(response.length === 0)
        {
            cambiarPropiedad($("#loader_pasajero"),"visibility","hidden");
            alertify.error("No hay pasajeros disponibles para esta ruta");
            return;
        }
        cambiarPropiedad($("#loader_pasajero"),"visibility","hidden");
        var contenedorDir = $("#contenedor_punto_encuentro");
        var contenedorDes = $("#contenedor_punto_destino");
        var contenedor = $("#contenedor_pasajero");
        var contenedorEx = $("#contenedor_pasajero_no_asignado");
        contenedor.html("");
        contenedorEx.html("");
        direccion_empresa = response[0].pasajero_empresa_direccion;
        if(ruta.indexOf("-ZP-") !== -1)
        {
            origen = response[0].pasajero_empresa_direccion;
        }
        contenedorDir.html("<b>Origen:</b> "+origen);
        pasajeros = [];
        destinos = [];
        var partidaExiste = true;
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].pasajero_id;
            var nombre = response[i].pasajero_nombre + " " + response[i].pasajero_papellido;
            var punto = response[i].pasajero_punto_encuentro;
            var celular = response[i].pasajero_celular;
            if(ruta === response[i].pasajero_ruta)
            {
                if(ruta.indexOf("-RG-") !== -1 && partidaExiste)
                {
                    origen = punto;
                    contenedorDir.html("<b>Origen:</b> "+origen);
                    partidaExiste = false;
                }
                
                if(ruta.indexOf("-ZP-") !== -1 && i === response.length-1)
                {
                    contenedorDes.html("<b>Destino:</b> "+punto);                    
                }
                //if(i > 0)
                //{
                    destinos.push(punto);
                //}
                contenedor.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" draggable=\"true\" ondragstart=\"drag(event,$(this))\" ondrop=\"drop(event,$(this))\" ondragover=\"allowDrop(event)\">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'>"
                                 +"<div class=\"boton-chico\" onclick=\"editarPasajero('"+punto+"','punto_"+id+"','hidden_"+id+"')\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
                                 +"<div class=\"boton-chico\" onclick=\"borrarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div id=\"punto_"+id+"\">"+ punto + "</div><div>" + celular+"</div></div>");
                pasajeros.push(id);
            }
            else if(ruta.indexOf("-ESP") !== -1)
            {
                if(ruta.indexOf("-RG-") !== -1 && partidaExiste)
                {
                    origen = punto;
                    contenedorDir.html("<b>Origen:</b> "+origen);
                    partidaExiste = false;
                }
                
                if(ruta.indexOf("-ZP-") !== -1 && i === response.length-1)
                {
                    contenedorDes.html("<b>Destino:</b> "+punto);                    
                }
                contenedor.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" draggable=\"true\" ondragstart=\"drag(event,$(this))\" ondrop=\"drop(event,$(this))\" ondragover=\"allowDrop(event)\">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'>"
                                 +"<div class=\"boton-chico\" onclick=\"editarPasajero('"+punto+"','punto_"+id+"','hidden_"+id+"')\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
                                 +"<div class=\"boton-chico\" onclick=\"borrarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div id=\"punto_"+id+"\">"+ punto + "</div><div>" + celular+"</div></div>");
                pasajeros.push(id);
            }
            else
            {
                contenedorEx.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" \">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ punto + "</div><div>" + celular+"</div></div>");
            }
        }
        if(ruta.indexOf("-RG-") !== -1)
        {
            destinos.push(response[0].pasajero_empresa_direccion);
            contenedorDes.html("<b>Destino:</b> "+response[0].pasajero_empresa_direccion);
        }
        
        dibujarRuta(origen,destinos);
        console.log(destinos+"");
    };
    postRequest(url,params,success,false);
}

function cargarPasajerosEspecial()
{
    cambiarPropiedad($("#loader_pasajero"),"visibility","visible");
    var pasajero = $("#busqueda").val();
    var cliente = $('#clientes').val();
    var params = {cliente : cliente, pasajero : pasajero, ruta : ''};
    var url = urlBase + "/pasajero/GetPasajerosCliente.php";
    var success = function(response)
    {
        if(response.length === 0)
        {
            cambiarPropiedad($("#loader_pasajero"),"visibility","hidden");
            alertify.error("No hay pasajeros disponibles para esta ruta");
            return;
        }
        cambiarPropiedad($("#loader_pasajero"),"visibility","hidden");
        var contenedorDir = $("#contenedor_punto_encuentro");
        var contenedorDes = $("#contenedor_punto_destino");
        var contenedor = $("#contenedor_pasajero");
        var contenedorEx = $("#contenedor_pasajero_no_asignado");
        contenedor.html("");
        contenedorEx.html("");
        contenedorDir.html("<b>Origen:</b> "+origen);
        pasajeros = [];
        destinos = [];
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].pasajero_id;
            var nombre = response[i].pasajero_nombre + " " + response[i].pasajero_papellido;
            var punto = response[i].pasajero_punto_encuentro;
            var celular = response[i].pasajero_celular;
            contenedorDir.html("<b>Origen:</b> ");
            contenedorDes.html("<b>Destino:</b> ");                    
            contenedorEx.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" \">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ punto + "</div><div>" + celular+"</div></div>");
        }
    };
    postRequest(url,params,success,false);
}

function cargarPasajerosBusqueda()
{
    cambiarPropiedad($("#loader_pasajero"),"visibility","visible");
    var pasajero = $("#busqueda").val();
    var cliente = $('#clientes').val();
    var ruta = $('#ruta').val();
    var params = {cliente : cliente, pasajero : pasajero, ruta : ruta, pasajeros : pasajeros+""};
    var url = urlBase + "/pasajero/GetPasajerosRuta.php";
    var success = function(response)
    {
        if(response.length === 0)
        {
            cambiarPropiedad($("#loader_pasajero"),"visibility","hidden");
            alertify.error("No hay pasajeros disponibles para esta ruta");
            return;
        }
        cambiarPropiedad($("#loader_pasajero"),"visibility","hidden");
        var contenedorEx = $("#contenedor_pasajero_no_asignado");
        contenedorEx.html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].pasajero_id;
            var nombre = response[i].pasajero_nombre + " " + response[i].pasajero_papellido;
            var punto = response[i].pasajero_punto_encuentro;
            var celular = response[i].pasajero_celular;
                contenedorEx.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" \">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ punto + "</div><div>" + celular+"</div></div>");
        }
        
    };
    postRequest(url,params,success,false);
}


function cargarMoviles()
{
    var params = {busqueda : ''};
    var url = urlBase + "/movil/GetMoviles.php";
    var success = function(response)
    {
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].movil_nombre;
            var id = response[i].movil_conductor;
            var conductor = response[i].movil_conductor_nombre;
            conductores.set(conductor,id);
            if(conductor.length === 1)
            {
                conductor = "No Definido";
            }
            $("#vehiculos").append("<option value=\""+nombre+"\">"+nombre+" / "+conductor+"</option>");
            $("#vehiculos2").append("<option value=\""+nombre+"\">"+nombre+" / "+conductor+"</option>");
            moviles.push(nombre);
        }
    };
    postRequest(url,params,success,false);
}

function cargarRutas()
{
    var clientes = $('#clientes').val();
    NOMBRE_CLIENTE = clientes;
    var params = {empresa : clientes};
    var url = urlBase + "/tarifa/GetTarifasEmpresa.php";
    var success = function(response)
    {
        $("#lruta").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            TARIFAS = response;
            var nombre = response[i].tarifa_nombre;
            $("#lruta").append("<option value=\""+nombre+"\">"+nombre+"</option>");
        }
    };
    postRequest(url,params,success,false);
}

function agregarServicio()
{
    var id = $("#ids").val();
    var cliente = $("#clientes").val();
    var ruta = $("#ruta").val();
    var fecha = $("#fechas").val();
    var hora = $("#hora").val();
    var movil = $("#vehiculos").val();
    var conductor = $("#conductorH").val();
    var tarifa1 = $("#tarifa1").val();
    var tarifa2 = $("#tarifa2").val();
    var observaciones = $("#observacion").val();
    var tipo = TIPO === 'NORMAL' ? 0 : 2;
    var array = [cliente,ruta,fecha,hora,movil,tarifa1,tarifa2];
    var exp = obtenerExcepciones();
    if(!validarCamposOr(array,exp))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var fechaFormat = fecha.split('/');
    var date = new Date(fechaFormat[2]+"-"+fechaFormat[1]+"-"+fechaFormat[0]+" "+hora);
    var now = new Date();
    if(date < now)
    {
        alertify.error("Debe seleccionar una fecha futura");
        return;
    }
    if(pasajeros.length === 0)
    {
        alertify.error("No hay pasajeros asignados a este servicio");
        return;
    }
    if(conductor === "")
    {
        alertify.error("El veh&iacute;culo "+movil+" no tiene coductor asociado");
        return;
    }
    if(validarTipoDato())
    {
        $("#conductores").html("Conductor: ");
        var params = {cliente : cliente, ruta : ruta,fecha : fecha, hora : hora,movil : movil,
            conductor: conductor ,tarifa1 : tarifa1, tarifa2 : tarifa2, observaciones : observaciones, estado : 1, tipo : tipo};
        var url = urlBase + "/servicio/AddServicio.php";
        if(TIPO_SERVICIO === 1)
        {
            params.id = id;
            params.tipo = 1;
            url = urlBase + "/servicio/ModServicio.php";
        }
        var success = function(response)
        {
            agregarDetalleServicio(response.servicio_id);
            vaciarFormulario();
            origen = undefined;
            cerrarSession(response);
            borrarDirections();
            cambiarPropiedad($(".contenedor_agregar"),"display","none");
            cambiarPropiedad($(".contenedor_editar"),"display","none");
            quitarclase($("#contenedor_mapa"),"mapa_agregar");
            quitarclase($("#contenedor_mapa"),"mapa_editar");
            alertify.success('Servicio agregado con id '+response.servicio_id);
            cambiarPropiedad($("#loader"),"visibility","hidden");
            $("#contenedor_pasajero").html("<div class=\"contenedor-loader\"><div class=\"loader\" id=\"loader_pasajero\">Loading...</div></div>");
            $("#contenedor_pasajero_no_asignado").html("");
            $("#ruta").prop("disabled",false);
            cambiarPropiedad($(".buscador-pasajero"),"display","none");
            quitarclase($("#contenedor_mapa"),"mapa_bajo");
            notificarConductor(response.servicio_id,conductor);
            notificarServicioFuturo(response.servicio_id,conductor,fecha,hora);
            TIPO_SERVICIO = 0;
        };
        postRequest(url,params,success);
    }
}

function dibujarRuta(origen,destinos)
{
    for(var i = 0 ; i < markersPanel.length;i++)
    {
        markersPanel[i].setMap(null);
    }
    var largo = destinos.length;
    if(largo === 0)
    {
        return;
    }
    var destinoFinal = destinos[largo-1];
    var waypoints = [];
    if(largo > 1)
    {
        for(var i = 0 ; i < largo ; i++)
        {
            if(i === largo-1)
            {
                break;
            }
            waypoints.push({
                location: destinos[i],
                stopover: true
            });
        }
    }
    setDirections();
    directionsService.route({
        origin: origen,
        waypoints: waypoints,
        optimizeWaypoints: true,
        destination: destinoFinal,
        travelMode: 'DRIVING'
    },  function(response, status){
        if(status === 'OK')
        {
            directionsDisplay.setDirections(response);
            var points = response.routes[0].overview_polyline;
            var polyline = decodePolyline(points);
            POLYLINE_LAT = '';
            POLYLINE_LNG = '';
            polyline.forEach(function(latLng) {
                POLYLINE_LAT+= latLng.lat + ",";
                POLYLINE_LNG += latLng.lng + ",";
            });
        }
        else if(status === 'NOT_FOUND')
        {
            alertify.error("Ruta no encontrada");
        }
    });
}
function agregarDetalleServicio(idServicio)
{
    var params = {};
    var destinoFinal = "";
    var pasajeroFinal = "";
//    if($("#ruta").val().indexOf("-RG-") !== -1)
//    {
//        destinoFinal += origen + "%";
//    }
    for(var i = 0; i < destinos.length;i++)
    {
        destinoFinal += destinos[i] + "%";
        pasajeroFinal += pasajeros[i] + "%";
    }
    if(TIPO_SERVICIO === 1)
    {
        params = { lat : POLYLINE_LAT, lon : POLYLINE_LNG, pasajeros : "" ,destinos : destinoFinal, id : idServicio };
    }
    else
    {
        params = { lat : POLYLINE_LAT, lon : POLYLINE_LNG, pasajeros : pasajeroFinal ,destinos : destinoFinal, id : idServicio};        
    }
    var url = urlBase + "/servicio/AddServicioDetalle.php";
    postRequest(url,params,null);
}

function notificarConductor(idServicio,llave)
{
    var texto = "Nuevo servicio asignado con id: "+idServicio;
    var tipo = 0;
    var params = {texto  : texto, tipo : tipo, llave : llave};        
    var url = urlBase + "/notificacion/AddNotificacion.php";
    postRequest(url,params,null);
}

function notificarServicioFuturo(idServicio,llave,fecha,hora)
{
    var texto = "Se aproxima el siguiente servicio: "+idServicio;
    var tipo = 1;
    var params = {texto  : texto, tipo : tipo, llave : llave, fecha : fecha, hora : hora};        
    var url = urlBase + "/notificacion/AddNotificacion.php";
    postRequest(url,params,null);
}

function abrirServiciosPendientes()
{
    cambiarPropiedad($("#servicios_pendientes"),"display","block");

}


function marcarServicioEnProceso(idServicio)
{
    var params = {id : idServicio, estado : EN_PROCCESO_DE_ASIGNACION};
    var url = urlBase + "/servicio/ModEstadoServicio.php";
    var success = function(response)
    {
        alertify.success("Servicio "+response.servicio_id +" se encuentra en proceso asignaci&oacute;n");
    };
    postRequest(url,params,success,false);
}


function quitarDestino()
{
    var i = 1;
    var largo = $(".destino").length;
    if(largo > 1 )
    {
        $(".destino").each(function(index){
            if(i === largo)
            {
                $(this).remove();
                $("#cont-destino"+i).remove();
            }
            i++;
        });
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev,obj) {
    objAnterior = obj.attr("id");
    ev.dataTransfer.setData("text", obj.html());
}

function drop(ev,obj) {
    ev.preventDefault();
    $("#"+objAnterior).html(obj.html());
    var idAnt = $("#"+objAnterior).attr("id");
    obj.html(ev.dataTransfer.getData("text"));
    var id = obj.attr("id");
    $("#"+objAnterior).attr("id",id);
    obj.attr("id",idAnt);
    pasajeros = [];
    destinos = [];
    let ruta = $("#ruta").val();
    var total = $("#contenedor_pasajero .cont-pasajero-gral .hidden" ).length;
    $("#contenedor_pasajero .cont-pasajero-gral .hidden" ).each(function(index) {
        pasajeros.push($(this).attr("id").split("_")[1]);
        if(ruta.indexOf("RG") !== -1)
        {
            if(index === 0)
            {
                origen = $(this).val();
                $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
            }
            else if( index > 0 )
            {
                destinos.push($(this).val());
            }
        }
        else if(ruta.indexOf("ZP") !== -1)
        {
            if(index === 0)
            {
                origen = direccion_empresa;
                $("#contenedor_punto_destino").html("<b>Origen: </b>"+origen);
            }
            if(index > 0)
            {
                destinos.push($(this).val());
            }
        }
        else if(TIPO === 'ESPECIAL')
        {
            if(index === 0)
            {
                origen = $(this).val();
                $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
            }
            else if(index > 0)
            {
                destinos.push($(this).val());
            }
            if(index === total - 1)
            {
                $("#contenedor_punto_destino").html("<b>Destino: </b>"+$(this).val());
            }
            
        }
    });
    if(ruta.indexOf("RG") !== -1)
    {
        destinos.push(direccion_empresa);
    }
    dibujarRuta(origen,destinos);
}

function borrarPasajero(obj,nombre,punto,celular)
{
    cambiarPropiedad($(".contenedor_editar"),"display","none");
    quitarclase($("#contenedor_mapa"),"mapa_editar");
    var id = obj.split("_")[1];
    for(var i = 0; i < pasajeros.length; i++)
    {
        if(pasajeros[i] === id)
        {
            pasajeros.splice(i, 1);
        }
    }
    for(var i = 0; i < destinos.length; i++)
    {
        if(destinos[i] === punto)
        {
            destinos.splice(i, 1);
        }
    }
    var ruta = $("#ruta").val();
    if(ruta.indexOf("RG") === -1)
    {
        $("#contenedor_punto_destino").html("<b>Destino: </b>"+destinos[destinos.length-1]);
    }
    if(ruta.indexOf("ZP") === -1)
    {
        $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
    }
    var pasajero = $("#"+obj);
    var texto = "<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" \">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ punto + "</div><div>" + celular+"</div></div>";
    $("#contenedor_pasajero_no_asignado").append(texto);
    pasajero.remove();
    dibujarRuta(origen,destinos);
}

function agregarPasajero(obj,nombre,punto,celular)
{
    var id = obj.split("_")[1];
    var ruta = $('#ruta').val();
    if(ruta.indexOf("RG") !== -1)
    {
        pasajeros.push(id);
        $("#contenedor_punto_destino").html("<b>Destino: </b>"+direccion_empresa);
        var d = destinos.pop();
        destinos.push(punto);
        destinos.push(direccion_empresa);
    }
    else if(ruta.indexOf("ZP") !== -1)
    {
        pasajeros.push(id);
        $("#contenedor_punto_destino").html("<b>Destino: </b>"+punto);
        destinos.push(punto);
    }
    else if(ruta.indexOf("XX-ESP") !== -1)
    {
        if(typeof origen === "undefined")
        {
            $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+punto);
            origen = punto; 
        }
        else
        {
            $("#contenedor_punto_destino").html("<b>Destino: </b>"+punto);
            destinos.push(punto);
        }
        pasajeros.push(id);
    }
    var pasajero = $("#"+obj);
    var texto = "<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" draggable=\"true\" ondragstart=\"drag(event,$(this))\" ondrop=\"drop(event,$(this))\" ondragover=\"allowDrop(event)\">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'>"
                                 +"<div class=\"boton-chico\" onclick=\"editarPasajero('"+punto+"','punto_"+id+"','hidden_"+id+"')\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
                                 +"<div class=\"boton-chico\" onclick=\"borrarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"
                                 +"<div class=\"cont-mini-pasajero\"><div id=\"punto_"+id+"\">"+ punto + "</div><div>" + celular+"</div></div>";
    $("#contenedor_pasajero").append(texto);
    pasajero.remove();
    dibujarRuta(origen,destinos);
}

function cambiarServicioNormal()
{
    TIPO = 'NORMAL';
    $("#ruta").prop("readonly",false);
    vaciarFormulario();
    borrarDirections();
    cambiarPropiedad($(".buscador-pasajero"),"display","none");
    quitarclase($("#contenedor_mapa"),"mapa_bajo");
}
function cambiarServicioEspecial()
{
    TIPO = 'ESPECIAL';
    destinos = [];
    pasajeros = [];
    origen = undefined;
    $("#ruta").prop("readonly",true);
    vaciarFormulario();
    borrarDirections();
    cambiarPropiedad($(".buscador-pasajero"),"display","none");
    quitarclase($("#contenedor_mapa"),"mapa_bajo");
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
    var tarifa1 = $("#tarifa1");
    var tarifa2 = $("#tarifa2");
    if(!validarNumero(tarifa1.val()))
    {
        marcarCampoError(tarifa1);
        alertify.error('Tarifa 1 debe ser numerico');
        return false;
    }
    if(!validarNumero(tarifa2.val()))
    {
        marcarCampoError(tarifa2);
        alertify.error('Tarifa 2 debe ser numerico');
        return false;
    }
    return true;
}

function obtenerExcepciones()
{
    var exp = "";
    if(TIPO_SERVICIO === 1)
    {
        exp += '||1||';
    }
    return exp;
}

function editarPasajero(valor,obj,hidden)
{
    borrarDirections();
    initPlacesAutoComplete(document.getElementById('input_editar'));
    cambiarPropiedad($(".contenedor_editar"),"display","block");
    cambiarPropiedad($(".contenedor_agregar"),"display","none");
    agregarclase($("#contenedor_mapa"),"mapa_editar");
    quitarclase($("#contenedor_mapa"),"mapa_agregar");
    $("#input_editar").val(valor);
    $("#input_editar").select();
    $("#boton_place").off('click');
    $("#boton_place").click(function(){
        cambiarPropiedad($(".contenedor_editar"),"display","none");
        quitarclase($("#contenedor_mapa"),"mapa_editar");
        $("#"+obj).html($("#input_editar").val());
        var existe = false;
        for(var i = 0; i < destinos.length; i++)
        { 
            if(destinos[i] === valor)
            {
                existe = true;
                $("#"+hidden).val($("#input_editar").val());
                destinos[i] = $("#input_editar").val();
                break;
            }
        }
        if(!existe)
        {
            origen = $("#input_editar").val();
            $("#"+hidden).val($("#input_editar").val());
            $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
        }
        if(directionsDisplay === null)
        {
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
        }
        dibujarRuta(origen,destinos);
    });
}

function initPlacesAutoComplete(input) {
    autocomplete = new google.maps.places.Autocomplete(input,
    {componentRestrictions:{'country': 'cl'}});
    places = new google.maps.places.PlacesService(map);
    autocomplete.addListener('place_changed', function(){
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            colocarMarcadorPlaces(input);
        }
    });
}

function colocarMarcadorPlaces(input)
{
    for(var i = 0 ; i < markersPanel.length;i++)
    {
        markersPanel[i].setMap(null);
    }
    var icon = {
        url: "img/marcador.svg",
        scaledSize: new google.maps.Size(70, 30),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
    };
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        icon : icon,
        map: map
    });
    
    markersPanel.push(marker);

    map.setZoom(17);
    map.panTo(marker.position);
    
    google.maps.event.addListener(map, "drag", function() {
        marker.setPosition(this.getCenter());
        POSITION = [this.getCenter().lat(),this.getCenter().lng()];
    });
    
    google.maps.event.addListener(map, "dragend", function() {
        var latlng = new google.maps.LatLng(POSITION[0], POSITION[1]);
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                var zero = results[0];
                var address = zero.formatted_address;
                var punto = input;
                punto.value =address;                
            }
            else
            {
                alertify.error('Geocoder failed due to: ' + status);
            }
        });
    });
}

function borrarDirections()
{
    if (directionsDisplay !== null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
    }
}

function abrirAddPasajero()
{
    initPlacesAutoComplete(document.getElementById('agregaDireccion'));
    cambiarPropiedad($(".contenedor_editar"),"display","none");
    cambiarPropiedad($(".contenedor_agregar"),"display","block");
    quitarclase($("#contenedor_mapa"),"mapa_editar");
    agregarclase($("#contenedor_mapa"),"mapa_agregar");
}

function cerrarAddPasajero()
{
    cambiarPropiedad($(".contenedor_agregar"),"display","none");
    quitarclase($("#contenedor_mapa"),"mapa_agregar");   
}

function setDirections()
{
    if(directionsDisplay === null)
    {
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
    }
}