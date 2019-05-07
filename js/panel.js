/* global POLYLINE, alertify, urlBase, PLACES_AUTOCOMPLETE_API, POSITION, API_KEY, PLACES_DETAILS_API, google, map, DIRECTIONS_API, EN_PROCCESO_DE_ASIGNACION, markers, TIPO_SERVICIO, directionsService, directionsDisplay, geocoder, MENU_VISIBLE, GOOGLE_MAPS_API, flightPath */
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
var GEOCODING = false;
var INPUT_ACTUAL;
var CAMPOS = ["clientes","ruta","truta","fechaDesde","hora","vehiculos","tarifa1","tarifa2"];
var buscaPartida = false;
var buscaDestino = false;

$(document).ready(function(){
    if((TIPO_SERVICIO === 1 || TIPO_SERVICIO === 2) && ASIGNANDO)
    {
        $("#ruta").val("ESP");
        $("#truta").val("XX-ESP");
        $("#especial").prop("checked",true);
        $("#tarifa2").prop("disabled",false);
        $("#ruta").prop("disabled",true);
        $("#truta").prop("disabled",true);
        cambiarPropiedad($(".buscador-pasajero"),"display","initial");
        agregarclase($("#contenedor_mapa"),"mapa_bajo");
        cargarPasajerosEspecial();
        ASIGNANDO = false;
    }
    else
    {
        TIPO_SERVICIO = 0;
    }
    PAGINA_ANTERIOR = PAGINA;
    map.setZoom(11);
    var center = new google.maps.LatLng(POSITION[0], POSITION[1]);
    map.panTo(center);
    init();
    cambioEjecutado();
    if($("#ids").val() !== "")
    {
        cargarRutas();
    }
    $("#clientes").keyup(function () {
        cargarClientes();
    });
    $("#clientes").on('input',function () {
        if($(this).val() !== '')
        {
            cargarRutas();
        }
    });
    $("#ruta").on('input',function(){
        $("#ltruta").html("");
        for(var i = 0; i < TARIFAS.length; i++)
        {
            $("#ltruta").append("<option val=\""+TARIFAS[i].tarifa_nombre+"\">"+TARIFAS[i].tarifa_nombre+"</option>");   
        }
    });
    $("#truta").on('input',function () {
        origen = undefined;
        destinos = [];
        cambiarPropiedad($(".buscador-pasajero"),"display","initial");
        agregarclase($("#contenedor_mapa"),"mapa_bajo");
        for(var i = 0; i < TARIFAS.length; i++)
        {
            if(TARIFAS[i].tarifa_nombre === $(this).val())
            {
                $("#hora").val(TARIFAS[i].tarifa_hora);
                $("#tarifa1").val(TARIFAS[i].tarifa_valor1);
                if(TIPO_SERVICIO === 1 || TIPO_SERVICIO === 2)
                {
                    $("#tarifa2").val(TARIFAS[i].tarifa_valor2);
                }
                else
                {
                    $("#tarifa2Hidden").val(TARIFAS[i].tarifa_valor2);
                }
            }
        }
        cargarPasajeros();
    });
    
    $("#vehiculos").change(function () {
        if($(this).val() !== "")
        {
            var conductor = $(this).children("option").filter(":selected").text().split(" / ")[1];
            $("#conductorV").val(conductor);
            $("#conductorH").val(conductores.get(conductor));
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
        if(TIPO_SERVICIO === 0)
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
            $("#ruta").val("ESP");
            $("#truta").val("XX-ESP");
            $("#partida").prop("disabled",false);
            $("#destino").prop("disabled",false);
            cambiarPropiedad($(".buscador-pasajero"),"display","initial");
            agregarclase($("#contenedor_mapa"),"mapa_bajo");
            cargarPasajerosEspecial();
        }
    });

    $("#vehiculos").keyup(function(){
        cargarMoviles();
    });

    $("#solicitar").click(function () {
        var f1 = $("#fechaDesde").val();
        var f2 = $("#fechaHasta").val();
        var dias = 1;
        if(f2 !== '')
        {
            dias += diasDiferencia(f1,f2);
        }
        var fecha = $("#fechaDesde").val();
        for(var i = 0 ; i < dias; i++)
        {
            agregarServicio(fecha);
            fecha = sumarDias(fecha,1);
        }
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
        if(TIPO_SERVICIO !== 0)
        {
            if(nombre !== '' && direccion !== '')
            {
                agregarPasajero('0',nombre,direccion,celular);
            }
            else
            {
                alertify.error("Ingrese todos los campos necesarios");
            }
        }
        else
        {
            if(nombre !== '' && direccion !== '' && celular !== '')
            {
                agregarPasajero('0',nombre,direccion,celular);
            }
            else
            {
                alertify.error("Ingrese todos los campos necesarios");
            }
        }
    });
    $("#cerrarAgregar").click(function(){
        cerrarAddPasajero();
    });
    
    $("#buscaPartida").click(function(){
        agregarclase($(this),"oculto");
        var contenedor = $("#contenedor_pasajero");
        if($("#partida").val() !== '')
        {
            $("#origen_empresa").remove();
            buscaPartida = true;
            if(typeof origen === 'undefined')
            {
                origen = $("#partida").val();
                $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
            }
            else
            {
                destinos.splice(0, 0, origen);
                origen = $("#partida").val();
                $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
            }
            contenedor.prepend("<div class=\"cont-pasajero-gral\" id=\"origen_empresa\"><input type=\"hidden\" id=\"hidden_origen\" class=\"hidden\" value=\""+origen+"\"><div class=\"cont-pasajero\">Origen</div><div class=\"cont-mini-pasajero\"><div>"+ recortar(origen,30) + "</div><div>");
            pasajeros.splice(0, 0, "Origen");
            dibujarRuta();
        }
        else
        {
            if(buscaPartida){
                var origenReal = destinos.shift();
                pasajeros.shift();
                origen = origenReal;
                dibujarRuta();
                buscaPartida = false;
                $("#origen_empresa").remove();
                $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
            }
        }
});
    
    $("#buscaDestino").click(function(){
        agregarclase($(this),"oculto");
        var contenedor = $("#contenedor_pasajero");
        if($("#destino").val() !== '')
        {
            $("#destino_empresa").remove();
            buscaDestino = true;
            destinos.push($("#destino").val());
            $("#contenedor_punto_destino").html("<b>Destino: </b>"+$("#destino").val());
            contenedor.append("<div class=\"cont-pasajero-gral\" id=\"destino_empresa\"><input type=\"hidden\" id=\"hidden_destino\" class=\"hidden\" value=\""+$("#destino").val()+"\"><div class=\"cont-pasajero\">Destino</div><div class=\"cont-mini-pasajero\"><div>"+ recortar($("#destino").val(),30) + "</div><div>");
            pasajeros.push("Destino");
            dibujarRuta();
        }
        else
        {
            if(buscaDestino){   
                destinos.pop();
                pasajeros.pop();
                $("#destino_empresa").remove();
                if(destinos.length > 0)
                {
                    $("#contenedor_punto_destino").html("<b>Destino: </b>"+destinos[destinos.length-1]);
                }
                else
                {
                    $("#contenedor_punto_destino").html("<b>Destino: </b>");
                }
                dibujarRuta();
                buscaDestino = false;
            }
        }
});
    
    $("#partida").click(function(){
        quitarclase($("#buscaPartida"),"oculto");
    });
    $("#destino").click(function(){
        quitarclase($("#buscaDestino"),"oculto");
    });
    
    initPlacesAutoComplete(document.getElementById("partida"));
    initPlacesAutoComplete(document.getElementById("destino"));
    
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
    limpiarMapa();
    iniciarFecha(['#fechaDesde','#fechaHasta']);
    iniciarHora(['#hora']);
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
    postRequest(url,params,success);
}

function cargarPasajeros()
{
    var id = $("#ids").val();
    var pasajero = $("#busqueda").val();
    var cliente = $('#clientes').val();
    var ruta = $('#truta').val();
    var params = {cliente : cliente, pasajero : pasajero, ruta : ''};
    var url = urlBase + "/pasajero/GetPasajerosRuta.php";
    if(TIPO_SERVICIO === 1 || TIPO_SERVICIO === 2)
    {
        params = {id : id};
        url =  urlBase + "/pasajero/GetPasajerosEspecial.php";
    }
    var success = function(response)
    {
        if(response.length === 0)
        {
            alertify.error("No hay pasajeros disponibles para esta ruta");
            return;
        }
        var contenedorDir = $("#contenedor_punto_encuentro");
        var contenedorDes = $("#contenedor_punto_destino");
        var contenedor = $("#contenedor_pasajero");
        var contenedorEx = $("#contenedor_pasajero_no_asignado");
        contenedor.html("");
        contenedorEx.html("");
        direccion_empresa = response[0].pasajero_empresa_direccion;
        if(ruta.indexOf("ZP") !== -1)
        {
            origen = response[0].pasajero_empresa_direccion;
            contenedorDir.html("<b>Origen:</b> "+origen);
            contenedor.prepend("<div class=\"cont-pasajero-gral\" id=\"origen_empresa\"><div class=\"cont-pasajero\">"+response[0].pasajero_empresa+"</div><div class=\"cont-mini-pasajero\"><div>"+ origen + "</div><div>");
        }
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
                if(ruta.indexOf("RG") !== -1 && partidaExiste)
                {
                    origen = punto;
                    contenedorDir.html("<b>Origen:</b> "+origen);
                    partidaExiste = false;
                }
                
                if(ruta.indexOf("ZP") !== -1 && i === response.length-1)
                {
                    contenedorDes.html("<b>Destino:</b> "+punto);
                    contenedor.append("<div class=\"cont-pasajero-gral\" id=\"destino_empresa\"><div class=\"cont-pasajero\">"+response[0].pasajero_empresa+"</div><div class=\"cont-mini-pasajero\"><div>"+ punto + "</div><div>");
                }
                if(origen !== punto)
                {
                    destinos.push(punto);
                }
                contenedor.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" draggable=\"true\" ondragstart=\"drag(event,$(this))\" ondrop=\"drop(event,$(this))\" ondragover=\"allowDrop(event)\">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'>"
                                 +"<div class=\"boton-chico\" onclick=\"editarPasajero('"+punto+"','punto_"+id+"','hidden_"+id+"')\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
                                 +"<div class=\"boton-chico\" onclick=\"borrarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div id=\"punto_"+id+"\">"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>");
                pasajeros.push(id);
            }
            else if(ruta.indexOf("-ESP") !== -1)
            {
                if(ruta.indexOf("RG") !== -1 && partidaExiste)
                {
                    origen = punto;
                    contenedorDir.html("<b>Origen:</b> "+origen);
                    partidaExiste = false;
                }
                
                if(ruta.indexOf("ZP") !== -1 && i === response.length-1)
                {
                    contenedorDes.html("<b>Destino:</b> "+punto);   
                    contenedor.append("<div class=\"cont-pasajero-gral\"><div class=\"cont-pasajero\">"+response[0].pasajero_empresa+"</div><div class=\"cont-mini-pasajero\"><div>"+ punto + "</div><div>");
                }
                contenedor.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" draggable=\"true\" ondragstart=\"drag(event,$(this))\" ondrop=\"drop(event,$(this))\" ondragover=\"allowDrop(event)\">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'>"
                                 +"<div class=\"boton-chico\" onclick=\"editarPasajero('"+punto+"','punto_"+id+"','hidden_"+id+"')\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
                                 +"<div class=\"boton-chico\" onclick=\"borrarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div id=\"punto_"+id+"\">"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>");
                pasajeros.push(id);
            }
            else
            {
                contenedorEx.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" \">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>");
            }
        }
        if(ruta.indexOf("RG") !== -1)
        {
            destinos.push(response[0].pasajero_empresa_direccion);
            contenedorDes.html("<b>Destino:</b> "+response[0].pasajero_empresa_direccion);
            contenedor.append("<div class=\"cont-pasajero-gral\" id=\"destino_empresa\"><div class=\"cont-pasajero\">"+response[0].pasajero_empresa+"</div><div class=\"cont-mini-pasajero\"><div>"+ response[0].pasajero_empresa_direccion + "</div><div>");
        }
        else if(ruta.indexOf("ZP") !== -1)
        {
            contenedorDes.html("<b>Destino:</b> "+destinos[destinos.length-1]);
        }
        dibujarRuta();
    };
    postRequest(url,params,success);
}

function cargarPasajerosEspecial()
{
    var pasajero = $("#busqueda").val();
    var cliente = $('#clientes').val();
    var params = {cliente : cliente, pasajero : pasajero, ruta : ''};
    var url = urlBase + "/pasajero/GetPasajerosCliente.php";
    var success = function(response)
    {
        if(response.length === 0)
        {
            alertify.error("No hay pasajeros disponibles para esta ruta");
            return;
        }
        var contenedorDir = $("#contenedor_punto_encuentro");
        var contenedorDes = $("#contenedor_punto_destino");
        var contenedor = $("#contenedor_pasajero");
        var contenedorEx = $("#contenedor_pasajero_no_asignado");
        contenedor.html("");
        contenedorEx.html("");
        contenedorDir.html("<b>Origen:</b> "+origen);
        //contenedor.prepend("<div class=\"cont-pasajero-gral\"><div class=\"cont-pasajero\">"+response[0].pasajero_empresa+"</div><div class=\"cont-mini-pasajero\"><div>"+ origen + "</div><div>");
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
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+ punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>");
        }
    };
    postRequest(url,params,success);
}

function cargarPasajerosBusqueda()
{
    var pasajero = $("#busqueda").val();
    var cliente = $('#clientes').val();
    var ruta = $('#truta').val();
    var params = {cliente : cliente, pasajero : pasajero, ruta : ruta, pasajeros : pasajeros+""};
    var url = urlBase + "/pasajero/GetPasajerosRuta.php";
    var success = function(response)
    {
        if(response.length === 0)
        {
            alertify.error("No hay pasajeros disponibles para esta ruta");
            return;
        }
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
                        "<div class=\"cont-mini-pasajero\"><div>"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>");
        }
        
    };
    postRequest(url,params,success);
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
    postRequest(url,params,success);
}

function cargarRutas()
{
    var clientes = $('#clientes').val();
    $("#ruta").val("");
    $("#truta").val("");
    NOMBRE_CLIENTE = clientes;
    var params = {empresa : clientes};
    var url = urlBase + "/tarifa/GetTarifasEmpresa.php";
    var success = function(response)
    {
        cerrarSession(response);
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
    postRequest(url,params,success);
}

function agregarServicio(fecha)
{
    var id = $("#ids").val();
    var cliente = $("#clientes").val();
    var ruta = $("#ruta").val();
    var truta = $("#truta").val();
    var hora = $("#hora").val();
    var movil = $("#vehiculos").val();
    var conductor = $("#conductorH").val();
    var tarifa1 = $("#tarifa1").val();
    var tarifa2 = $("#tarifa2").val() === '' ? $("#tarifa2Hidden").val() : $("#tarifa2").val();
    var observaciones = $("#observacion").val();
    var tipo = TIPO_SERVICIO;
    var array = [cliente,ruta,truta,fecha,hora,movil,tarifa1,tarifa2];
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
        alertify.error("Debe seleccionar una fecha válida");
        return;
    }
    if(pasajeros.length === 0)
    {
        alertify.error("No hay pasajeros asignados a este servicio");
        return;
    }
    if(typeof origen === 'undefined' || destinos.length === 0)
    {
        alertify.error("Seleccione origen y destino");
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
        var params = {cliente : cliente, ruta : ruta,truta : truta,fecha : fecha, hora : hora,movil : movil,
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
            MODIFICADO = false;
            cerrarSession(response);
            agregarDetalleServicio(response.servicio_id);
            vaciarFormulario();
            origen = undefined;
            borrarDirections();
            cambiarPropiedad($(".contenedor_agregar"),"display","none");
            cambiarPropiedad($(".contenedor_editar"),"display","none");
            quitarclase($("#contenedor_mapa"),"mapa_agregar");
            quitarclase($("#contenedor_mapa"),"mapa_editar");
            alertify.success('Servicio agregado con id '+response.servicio_id);
            $("#contenedor_pasajero_no_asignado").html("");
            $("#ruta").prop("disabled",false);
            $("#truta").prop("disabled",false);
            cambiarPropiedad($(".buscador-pasajero"),"display","none");
            quitarclase($("#contenedor_mapa"),"mapa_bajo");
            notificarConductor(response.servicio_id,conductor);
            notificarServicioFuturo(response.servicio_id,conductor,fecha,hora);
        };
        postRequest(url,params,success);
    }
}

function dibujarRuta()
{
    GEOCODING = false;
    if(typeof origen === 'undefined')
    {
        return;
    }
    eliminarMarkers();
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
    var esRecogida = $("#truta").val().indexOf("RG") !== -1;
    var esEspecial = $("#truta").val().indexOf("ESP") !== -1;
    if(esRecogida)
    {
        destinos.splice(0, 0, origen);
        destinos.pop();
    }
    if(esEspecial)
    {
        destinos.splice(0, 0, origen);
    }
    console.log("estos son los destinos");
    for(var i = 0; i < destinos.length;i++)
    {
        destinoFinal += destinos[i] + "%";
        pasajeroFinal += pasajeros[i] + "%";
    }
    params = { lat : POLYLINE_LAT, lon : POLYLINE_LNG, pasajeros : pasajeroFinal ,destinos : destinoFinal, id : idServicio};
    var url = urlBase + "/servicio/AddServicioDetalle.php";
    postRequest(url,params,null);
}

function notificarConductor(idServicio,llave)
{
    var texto = "Nuevo servicio asignado con id: "+idServicio;
    var tipo = 0;
    var params = {texto  : texto, tipo : tipo, llave : llave, idServicio : idServicio};        
    var url = urlBase + "/notificacion/AddNotificacion.php";
    postRequest(url,params,null);
}

function notificarServicioFuturo(idServicio,llave,fecha,hora)
{
    var texto = "Se aproxima el siguiente servicio: "+idServicio;
    var tipo = 1;
    var params = {texto  : texto, tipo : tipo, llave : llave, fecha : fecha, hora : hora, idServicio : idServicio};            
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
    postRequest(url,params,success);
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
    let ruta = $("#truta").val();
    var total = $("#contenedor_pasajero .cont-pasajero-gral .hidden" ).length;
    $("#contenedor_pasajero .cont-pasajero-gral .hidden" ).each(function(index) {
        console.log("recorriendo : " + $(this).val());
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
                $("#contenedor_punto_origen").html("<b>Origen: </b>"+origen);
                destinos.push($(this).val());
            }
            else if(index > 0)
            {
                destinos.push($(this).val());
            }
        }
        else if(TIPO_SERVICIO === 1 || TIPO_SERVICIO === 2){
            if(total > 1){
                if(index === 0){
                    origen = $(this).val();
                    $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
                }
                else if(index > 0){
                    destinos.push($(this).val());
                }
                
                if(index === total - 1){
                    $("#contenedor_punto_destino").html("<b>Destino: </b>"+$(this).val());
                }
            }
        }
    });
    if(ruta.indexOf("RG") !== -1)
    {
        destinos.push(direccion_empresa);
    }
    dibujarRuta();
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
    if(origen === punto)
    {
        if(destinos.length > 1)
        {
            var destFinal = destinos.shift();
            origen = destFinal;
            $("#contenedor_punto_encuentro").html("<b>Origen:</b> "+origen);
        }
        else
        {
            origen = undefined;
            $("#contenedor_punto_encuentro").html("<b>Origen:</b> ");
            borrarDirections();
        }
    }
    for(var i = 0; i < destinos.length; i++)
    {
        if(destinos[i] === punto)
        {
            destinos.splice(i, 1);
        }
    }
    var ruta = $("#truta").val();
    if(ruta.indexOf("RG") !== -1)
    {
        $("#contenedor_punto_destino").html("<b>Destino: </b>"+destinos[destinos.length-1]);
    }
    if(ruta.indexOf("ZP") === -1)
    {
        if(typeof origen === 'undefined')
        {
            $("#contenedor_punto_encuentro").html("<b>Origen: </b>");
        }
        else
        {
            $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
        }
    }
    if(ruta.indexOf("ESP") !== -1)
    {
        if(destinos.length === 0)
        {
            $("#contenedor_punto_destino").html("<b>Destino: </b>");
        }
        else
        {
            $("#contenedor_punto_destino").html("<b>Destino: </b>"+destinos[destinos.length-1]);
        }
    }
    var pasajero = $("#"+obj);
    var texto = "<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" \">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>";
    $("#contenedor_pasajero_no_asignado").append(texto);
    pasajero.remove();
    dibujarRuta();
}

function agregarPasajero(obj,nombre,punto,celular)
{
    if(validarNumero(nombre))
    {
        alertify.error("Nombre no debe ser numerico");
        return;
    }
    if(nombre.indexOf("-") !== -1)
    {
        alertify.error("Nombre no debe ser numerico");
        return;
    }
    if(!validarNumero(celular))
    {
        alertify.error("Celular debe ser numerico");
        return;
    }
    $("#agregaNombre").val("");
    $("#agregaDireccion").val("");
    $("#agregaCelular").val("");
    var id = obj.split("_")[1];
    if(typeof id === 'undefined')
    {
        id = nombre+"-"+celular;
    }
    var ruta = $('#truta').val();
    if(ruta.indexOf("RG") !== -1)
    {
        console.log("agregando pasajero "+id);
        pasajeros.push(id);
        $("#contenedor_punto_destino").html("<b>Destino: </b>"+direccion_empresa);
        var final = destinos.pop();
        if(typeof origen !== 'undefined')
        {
            destinos.push(punto);
        }
        destinos.push(final);
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
            if($("#destino").val() === '')
            {
                $("#contenedor_punto_destino").html("<b>Destino: </b>"+punto);
                destinos.push(punto);
            }
            else
            {
                var destinoFinal = destinos.pop();
                $("#contenedor_punto_destino").html("<b>Destino: </b>"+destinoFinal);
                destinos.push(punto);
                destinos.push(destinoFinal);
            }
        }
        pasajeros.push(id);
    }
    var pasajero = $("#"+obj);
    var texto = "<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" draggable=\"true\" ondragstart=\"drag(event,$(this))\" ondrop=\"drop(event,$(this))\" ondragover=\"allowDrop(event)\">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'>"
                                 +"<div class=\"boton-chico\" onclick=\"editarPasajero('"+punto+"','punto_"+id+"','hidden_"+id+"')\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
                                 +"<div class=\"boton-chico\" onclick=\"borrarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"
                                 +"<div class=\"cont-mini-pasajero\"><div id=\"punto_"+id+"\">"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>";
    if(ruta.indexOf("RG") !== -1)
    {
        if(typeof origen === 'undefined')
        {
            origen = punto;
            $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+punto);
        }
        $(texto).insertBefore($("#destino_empresa"));
    }
    else if(ruta.indexOf("ZP") !== -1)
    {
        $("#contenedor_pasajero").append(texto);
    }
    else
    {
        if($("#destino").val() === '')
        {
            $("#contenedor_pasajero").append(texto);
        }
        else
        {
            var finalHtml = $("#destino_empresa").html();
            $("#destino_empresa").remove();
            $("#contenedor_pasajero").append(texto);
            $("#contenedor_pasajero").append("<div id=\"destino_empresa\" class=\"cont-pasajero-gral\">"+finalHtml+"</div>");
            
        }
    }
    pasajero.remove();
    dibujarRuta();
}

function cambiarServicioNormal()
{
    TIPO_SERVICIO = 0;
    $("#ruta").prop("readonly",false);
    $("#truta").prop("readonly",false);
    vaciarFormulario();
    borrarDirections();
    eliminarMarkers();
    cambiarPropiedad($(".buscador-pasajero"),"display","none");
    cambiarPropiedad($(".contenedor_agregar"),"display","none");
    cambiarPropiedad($(".contenedor_editar"),"display","none");
    agregarclase($("#buscaPartida"),"oculto");
    agregarclase($("#buscaDestino"),"oculto");
    quitarclase($("#contenedor_mapa"),"mapa_bajo");
    quitarclase($("#contenedor_mapa"),"mapa_agregar");
    quitarclase($("#contenedor_mapa"),"mapa_editar");
    $("#tarifa2").prop("disabled",true);
    $("#partida").prop("disabled",true);
    $("#destino").prop("disabled",true);
    cambiarPropiedad($("#tarifa2"),"background-color","#e5e7e9");
    cambiarPropiedad($("#partida"),"background-color","#e5e7e9");
    cambiarPropiedad($("#destino"),"background-color","#e5e7e9");
    $("#tarifa2").val("");
}
function cambiarServicioEspecial()
{
    TIPO_SERVICIO = 2;
    destinos = [];
    pasajeros = [];
    origen = undefined;
    $("#tarifa2").prop("disabled",false);
    $("#tarifa2").val("");
    cambiarPropiedad($("#tarifa2"),"background-color","white");
    $("#ruta").prop("readonly",true);
    $("#truta").prop("readonly",true);
    vaciarFormulario();
    borrarDirections();
    eliminarMarkers();
    cambiarPropiedad($(".buscador-pasajero"),"display","none");
    cambiarPropiedad($(".contenedor_agregar"),"display","none");
    cambiarPropiedad($(".contenedor_editar"),"display","none");
    quitarclase($("#contenedor_mapa"),"mapa_bajo");
    quitarclase($("#contenedor_mapa"),"mapa_agregar");
    quitarclase($("#contenedor_mapa"),"mapa_editar");
    cambiarPropiedad($("#partida"),"background-color","#fff");
    cambiarPropiedad($("#destino"),"background-color","#fff");
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
    else if(TIPO_SERVICIO === 0)
    {
        exp += '||7||';
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
        $("#"+obj).html(recortar($("#input_editar").val(),30));
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
        dibujarRuta();
    });
}

function initPlacesAutoComplete(input) {
    var autocomplete = new google.maps.places.Autocomplete(input,
    {componentRestrictions:{'country': 'cl'}});
    places = new google.maps.places.PlacesService(map);
    autocomplete.addListener('place_changed', function(){
        INPUT_ACTUAL = input.id;
        if(input.id === 'partida')
        {
            quitarclase($("#buscaPartida"),"oculto");
        }
        else if(input.id === 'destino')
        {
            quitarclase($("#buscaDestino"),"oculto");
        }
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            colocarMarcadorPlaces();
        }
    });
}

function colocarMarcadorPlaces()
{
    eliminarMarkers();
    GEOCODING = true;
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map
    });
    markers.push(marker);
    map.setZoom(17);
    map.panTo(marker.position);
    
    google.maps.event.addListener(map, "drag", function() {
        marker.setPosition(this.getCenter());
        POSITION = [this.getCenter().lat(),this.getCenter().lng()];
    });
    
    google.maps.event.addListener(map, "dragend", function() {
        if(GEOCODING)
        {
            if(INPUT_ACTUAL === 'partida')
            {
                document.getElementById('partida').value = "Cargando...";
            }
            else if(INPUT_ACTUAL === 'destino')
            {
                document.getElementById('destino').value = "Cargando...";
            }
            else if(INPUT_ACTUAL === 'agregaDireccion')
            {
                document.getElementById('agregaDireccion').value = "Cargando...";
            }
            else if(INPUT_ACTUAL === 'input_editar')
            {
                document.getElementById('input_editar').value = "Cargando...";
            }
            var query = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + POSITION[0] +','+ POSITION[1]+'&key=' + API_KEY;
            $.getJSON(query, function (data) {
                if (data.status === 'OK') { 
                    var zero = data.results[0];
                    var address = zero.formatted_address;
                    if(INPUT_ACTUAL === 'partida')
                    {
                        document.getElementById('partida').value = address;
                    }
                    else if(INPUT_ACTUAL === 'destino')
                    {
                        document.getElementById('destino').value = address;
                    }
                    else if(INPUT_ACTUAL === 'agregaDireccion')
                    {
                        document.getElementById('agregaDireccion').value = address;
                    }
                    else if(INPUT_ACTUAL === 'input_editar')
                    {
                        document.getElementById('input_editar').value = address;
                    }
                } 
            });
        }
    });
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
    $("#agregaNombre").val("");
    $("#agregaCelular").val("");
    $("#agregaDireccion").val("");
    cambiarPropiedad($(".contenedor_agregar"),"display","none");
    quitarclase($("#contenedor_mapa"),"mapa_agregar");   
    eliminarMarkers();
}

function diasDiferencia(f1,f2)
{
    f1A = f1.split("/");
    f2A = f2.split("/");
    f1 = f1A[2]+"-"+f1A[1]+"-"+f1A[0];
    f2 = f2A[2]+"-"+f2A[1]+"-"+f2A[0];
    var fecha1 = moment(f1);
    var fecha2 = moment(f2);
    return fecha2.diff(fecha1, 'days');
}

function sumarDias(fecha, dias){
  var f = fecha.split("/");
  var date = new Date(parseInt(f[2]),parseInt(f[1])-1,parseInt(f[0]));
  date.setDate(date.getDate() + dias);
  var day = date.getDate();
  var monthIndex = date.getMonth()+1;
  var year = date.getFullYear();
  return day+"/"+monthIndex+"/"+year;
}