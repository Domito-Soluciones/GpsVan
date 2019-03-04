/* global POLYLINE, alertify, urlBase, PLACES_AUTOCOMPLETE_API, CORS_PROXY, POSITION, API_KEY, PLACES_DETAILS_API, google, map, DIRECTIONS_API, EN_PROCCESO_DE_ASIGNACION, markers */
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
var NOMBRE_CLIENTE;
var conductores = new Map();

var CAMPOS = ["clientes","ruta","fechas","hora","vehiculos","tarifa1","tarifa2"];
var CAMPOS_ESPECIAL = ["partida","destino","usuarios","celular","fechas2","hora2","vehiculos2","tarifas2"];

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    init();
    if($("#ids").val() !== "")
    {
        cargarRutas();
    }
    $("#clientes").keyup(function () {
        cargarClientes();
    });
    $("#clientes").on('input',function () {
        cargarRutas();
    });
    $("#ruta").on('input',function () {
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
        var noExiste = validarInexistencia($("#clientes").val(),clientesArray);
        if(noExiste)
        {
            alertify.error("Cliente inexistente");
            $("#clientes").val("");
            
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
    
    $("#partida").on("input",function(){
        mostrarDatalist($(this).val(),'partidal','partida');
    });
    $("#destino").on("input",function(){
         mostrarDatalist($(this).val(),'destinol','destino');
    });
    
    $("#normal").click(function(){
        cambiarServicioNormal();
    });
    $("#especial").click(function(){
        cambiarServicioEspecial();
    });
    
    $("#buscaPartida").click(function(){
        colocarMarcador($("#partida"));
    });
    
    $("#buscaDestino").click(function(){
        colocarMarcador($("#destino"));
    });
    
});

function init()
{
    cargarClientes();
    cargarMoviles();
    if(typeof POLYLINE !== "undefined")
    {
        POLYLINE.setMap(null);
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
    var cliente = $('#clientes').val();
    var ruta = $('#ruta').val();
    var params = {cliente : cliente};
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
        var contenedorDir = $("#contenedor_punto_encuentro");
        var contenedorDes = $("#contenedor_punto_destino");
        var contenedor = $("#contenedor_pasajero");
        var contenedorEx = $("#contenedor_pasajero_no_asignado");
        contenedor.html("");
        contenedorEx.html("");
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
                destinos.push(punto);
                contenedor.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" draggable=\"true\" ondragstart=\"drag(event,$(this))\" ondrop=\"drop(event,$(this))\" ondragover=\"allowDrop(event,$(this))\">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"borrarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ punto + "</div><div>" + celular+"</div></div>");
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
            var conductor = response[i].movil_conductor_nombre;
            var nick = response[i].movil_conductor_nick;
            conductores.set(conductor,nick);
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
    var array = [cliente,ruta,fecha,hora,movil,tarifa1,tarifa2];
    if(!validarCamposOr(array))
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
    if(conductor === "No Definido")
    {
        alertify.error("El veh&iacute;culo "+movil+" no tiene coductor asociado");
        return;
    }
    if(validarTipoDato())
    {
        vaciarFormulario();
        var params = {cliente : cliente, ruta : ruta,fecha : fecha, hora : hora,movil : movil,
            conductor: conductor ,tarifa1 : tarifa1, tarifa2 : tarifa2, observaciones : observaciones, estado : 1};
        var url = urlBase + "/servicio/AddServicio.php";
        if(id !== "")
        {
            params.id = id;
            url = urlBase + "/servicio/ModServicio.php";
        }
        var success = function(response)
        {
            cerrarSession(response);
            POLYLINE.setMap(null);
            alertify.success('Servicio agregado con id '+response.servicio_id);
            cambiarPropiedad($("#loader"),"visibility","hidden");
            $("#contenedor_pasajero").html("<div class=\"contenedor-loader\"><div class=\"loader\" id=\"loader_pasajero\">Loading...</div></div>");
            $("#contenedor_pasajero_no_asignado").html("");
            cambiarPropiedad($(".buscador-pasajero"),"display","none");
            quitarclase($("#contenedor_mapa"),"mapa_bajo");
            agregarDetalleServicio(response.servicio_id,false);
            notificarConductor(response.servicio_id,conductor);
            notificarServicioFuturo(response.servicio_id,conductor,fecha,hora);
        };
        postRequest(url,params,success);
    }
}

function agregarServicioEspecial()
{
    var partida = $("#partida").val();
    var destino = $("#destino").val();
    var pasajero = $("#usuarios").val();
    var celular = $("#celular").val();
    var fecha = $("#fechas2").val();
    var hora = $("#hora2").val();
    var movil = $("#vehiculos2").val();
    var conductor = $("#conductor2").val();
    var tarifa = $("#tarifas2").val();
    var observaciones = $("#observacion2").val();
    var array = [partida,destino,pasajero,celular,fecha,hora,movil,tarifa];
    if(!validarCamposOr(array))
    {
        activarPestaniaEspecial(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDatoEspecial())
    {
        var params = {partida : partida, destino : destino,pasajero : pasajero, celular : celular, fecha: fecha,
            hora : hora,movil : movil, conductor: conductor ,tarifa : tarifa, observaciones : observaciones, estado : 1};
        var url = urlBase + "/servicio/AddServicioEspecial.php";
        var success = function(response)
        {
            cerrarSession(response);
            POLYLINE.setMap(null);
            alertify.success('Servicio agregado con id '+response.servicio_id);
            vaciarFormulario();
            cambiarPropiedad($("#loader"),"visibility","hidden");
            agregarDetalleServicio(response.servicio_id,true);
            notificarConductorEspecial(response.servicio_id,conductor);
            notificarServicioFuturo(response.servicio_id,conductor,fecha+" "+hora);
        };
        postRequest(url,params,success);
    }
}

function dibujarRuta(origen,destinos)
{
    var largo = destinos.length;
    var destinoFinal = destinos[largo-1];
    var waypoints = "";
    if(largo > 1)
    {
        waypoints = "&waypoints=";
        for(var i = 0 ; i < largo ; i++)
        {
            if(i === largo)
            {
                continue;
            }
            waypoints += destinos[i] + "|";
        }
        waypoints = waypoints.substring(0,waypoints.length-1);
    }
    var url = CORS_PROXY + DIRECTIONS_API + "origin="+origen+"&destination="+destinoFinal+waypoints+"&key="+API_KEY;
    var success = function(response)
    {
        if(typeof POLYLINE !== "undefined")
        {
            POLYLINE.setMap(null);
        }
        var status = response.status;
        if(status === 'OK')
        {
            var points = response.routes[0].overview_polyline.points;
            var polyline = decodePolyline(points);
            var flightPath = new google.maps.Polyline({
                path: polyline,
                geodesic: true,
                strokeColor: '#7394e7',
                strokeOpacity: 1.0,
                strokeWeight: 3
            });
            POLYLINE = flightPath;
            flightPath.setMap(map);
            var bounds = new google.maps.LatLngBounds();
            POLYLINE_LAT = '';
            POLYLINE_LNG = '';
            polyline.forEach(function(LatLng) {
                bounds.extend(LatLng);
                POLYLINE_LAT+= LatLng.lat + ",";
                POLYLINE_LNG += LatLng.lng + ",";
            });
            map.fitBounds(bounds);
        }
        else if(status === 'NOT_FOUND')
        {
            alertify.error("Ruta no encontrada");
        }
    };
    getRequest(encodeURI(url),success);
}
function agregarDetalleServicio(idServicio,especial)
{
    var params = {};
    var destinoFinal = "";
    var pasajeroFinal = "";
    for(var i = 0; i < destinos.length;i++)
    {
        destinoFinal += destinos[i] + "%";
        pasajeroFinal += pasajeros[i] + "%";
    }
    if(especial)
    {
        params = { lat : POLYLINE_LAT, lon : POLYLINE_LNG, pasajeros : "" ,destinos : destinoFinal, id : idServicio, especial : especial };
    }
    else
    {
        params = { lat : POLYLINE_LAT, lon : POLYLINE_LNG, pasajeros : pasajeroFinal ,destinos : destinoFinal, id : idServicio, especial : especial };        
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
function notificarConductorEspecial(idServicio,llave)
{
    var texto = "Nuevo servicio  especial asignado con id: "+idServicio;
    var tipo = 2;
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

function allowDrop(ev,obj) {
    ev.preventDefault();
}

function drag(ev,obj) {
    objAnterior = obj.attr("id");
    ev.dataTransfer.setData("text", obj.html());
}

function drop(ev,obj) {
    ev.preventDefault();
    $("#"+objAnterior).html(obj.html());
    obj.html(ev.dataTransfer.getData("text"));
    pasajeros = [];
    destinos = [];
    $("#contenedor_pasajero .cont-pasajero-gral .hidden" ).each(function(index) {
        pasajeros.push($(this).attr("id").split("_")[1]);
        destinos.push($(this).val());
        if(index === destinos.length-1)
        {
            $("#contenedor_punto_destino").html("<b>Destino: </b>"+$(this).val());
        }
    });
    dibujarRuta(origen,destinos);
}

function borrarPasajero(obj,nombre,punto,celular)
{
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
    $("#contenedor_punto_destino").html("<b>Destino: </b>"+destinos[destinos.length-1]);
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
    pasajeros.push(id);
    $("#contenedor_punto_destino").html("<b>Destino: </b>"+punto);
    destinos.push(punto);
    var pasajero = $("#"+obj);
    var texto = "<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" draggable=\"true\" ondragstart=\"drag(event,$(this))\" ondrop=\"drop(event,$(this))\" ondragover=\"allowDrop(event,$(this))\">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"borrarPasajero('pasajero_"+id+"','"+nombre+"','"+punto+"','"+celular+"')\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ punto + "</div><div>" + celular+"</div></div>";
    $("#contenedor_pasajero").append(texto);
    pasajero.remove();
    dibujarRuta(origen,destinos);
}

function cambiarServicioNormal()
{
    cambiarPropiedad($("#servicio-normal"),"display","block");
    cambiarPropiedad($("#servicio-especial"),"display","none");
    vaciarFormulario();
    if(typeof POLYLINE !== "undefined")
    {
        POLYLINE.setMap(null);
    }
}

function cambiarServicioEspecial()
{
    cambiarPropiedad($("#servicio-normal"),"display","none");
    cambiarPropiedad($("#servicio-especial"),"display","block");
    $("#contenedor_pasajero").html("<div class=\"contenedor-loader\"><div class=\"loader\" id=\"loader_pasajero\">Loading...</div></div>");
    $("#contenedor_pasajero_no_asignado").html("");
    cambiarPropiedad($(".buscador-pasajero"),"display","none");
    quitarclase($("#contenedor_mapa"),"mapa_bajo");
    vaciarFormulario();
    if(typeof POLYLINE !== "undefined")
    {
        POLYLINE.setMap(null);
    }
}
function mostrarDatalist(val,datalist,campo)
{
    if(val === "") return;
    var url = CORS_PROXY + PLACES_AUTOCOMPLETE_API + "input="+val+
            "&location="+POSITION[0]+","+POSITION[1]+"&sensor=true&radius=500&key="+API_KEY;
    var success = function(response)
    {
        $("#"+datalist).html("");
        var places =  response.predictions;
        for(var i = 0 ; i < places.length;i++)
        {
            var descripcion = places[i].description;
            var placeId = places[i].place_id;
            var encodeDescripcion = descripcion.replace(/'/g,'');
            $("#"+datalist).append(
                    "<div class=\"option-datalist\" onclick=\"selecionarPlace('"+encodeDescripcion+"','"+datalist+"','"+campo+"')\"><img src=\"img/ubicacion.svg\" width=\"12\" heifgt=\"12\">"+descripcion+"</div>");
        }
    };
    getRequest(url,success);
}

function selecionarPlace(val,datalist,obj)
{
    $("#"+obj).val(decodeURI(val));
    $("#"+datalist).html("");
//    var url = CORS_PROXY + PLACES_DETAILS_API + "placeid="+placeId+"&key="+API_KEY;
//    var success = function(response)
//    {
//        var status = response.status;
//        
//        if(status === 'OK')
//        {
//            var marker = new google.maps.Marker({
//                map: map,
//                place: {
//                    placeId: placeId,
//                    location: response.result.geometry.location
//                }
//            });
//            map.setZoom(15);
            //map.panTo(marker.getPosition());
            var origen = $("#partida").val();
            var destino = $("#destino").val();
            if(destino !== "")
            {
                dibujarRuta(origen,[destino]);
            }
//        }
//    };
//    getRequest(url,success);
    
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
function activarPestaniaEspecial(array)
{
    for(var i = 0 ; i < CAMPOS_ESPECIAL.length ; i++)
    {
        if(array[i] === '')
        {
            marcarCampoError($("#"+CAMPOS_ESPECIAL[i]));
        }
        else
        {
            marcarCampoOk($("#"+CAMPOS_ESPECIAL[i]));
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

function validarTipoDatoEspecial()
{
    for(var i = 0 ; i < CAMPOS_ESPECIAL.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS_ESPECIAL[i]));
    }
    var celular = $("#celular");
    var tarifa = $("#tarifas2");
    if(!validarNumero(celular.val()))
    {
        marcarCampoError(celular);
        alertify.error('Celular debe ser numerico');
        return false;
    }
    if(!validarNumero(tarifa.val()))
    {
        marcarCampoError(tarifa);
        alertify.error('Tarifa debe ser numerico');
        return false;
    }
    return true;
}

function colocarMarcador(obj)
{
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map
    });

    map.setZoom(17);
    map.panTo(marker.position);
    
    google.maps.event.addListener(map, "drag", function() {
        marker.setPosition(this.getCenter());
        POSITION = [this.getCenter().lat(),this.getCenter().lng()];
    });
    
    google.maps.event.addListener(map, "dragend", function() {
        var request = {
            location: {lat:POSITION[0],lng:POSITION[1]},
            radius: 10
        };
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status){
            console.log(results[0].name);
            obj.val(results[0].name);
        });
    });
}
