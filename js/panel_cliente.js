/* global alertify, urlBase, urlUtil, POLYLINE_LAT, POLYLINE_LNG, map, google, markers, directionsService, directionsDisplay */
var PAGINA = "PANELC";
var CAMPOS = ["nombres","celulars","origens","destinos","clientes","fechas","hora"];
var clientesArray = [];
var destinos = new Map();
var PASAJEROS_ASIGNADOS = new Map();
var PASAJEROS_NO_ASIGNADOS = new Map();
var INPUT_ACTUAL;
var directionsService;

$(document).ready(function(){
    directionsService = new google.maps.DirectionsService();
    PAGINA_ANTERIOR = PAGINA;
    TIPO_USUARIO = 'CLIENTE';
    $("#menu").load("menu.php", function( response, status, xhr ) {
        agregarclase($("#panel_cliente"),"menu-activo");
    });
    $("#solicitar").click(function(){
        crearServicio();
    });
    iniciarFecha(['#fechas']);
    iniciarHora(['#hora']);
    
    
    $("#origens").click(function(){
        quitarclase($("#buscaPartida"),"oculto");
    });
    $("#destinos").click(function(){
        quitarclase($("#buscaDestino"),"oculto");
    });
    $("#buscaPartida").click(function(){
        eliminarMarkers();
        agregarclase($(this),"oculto");
        dibujarRuta();
    });
    
    $("#buscaDestino").click(function(){
        eliminarMarkers();
        agregarclase($(this),"oculto");   
        dibujarRuta();
    });
    
    buscarCentrosCosto($("#clientes").val());
    initPlacesAutoComplete(document.getElementById("origens"));
    initPlacesAutoComplete(document.getElementById("destinos"));
    
});

function crearServicio()
{
    var cliente = $("#clientes").val();
    var nombre = $("#nombres").val();
    var celular = $("#celulars").val();
    var cc = $("#ccs").val();
    var origen = $("#origens").val();
    var destino = $("#destinos").val();
    var fecha = $("#fechas").val();
    var hora = $("#hora").val();
    var observaciones = $("#observacion").val();
    var array = [nombre,celular,origen,destino,cliente,fecha,hora];
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
        alertify.error("Debe seleccionar una fecha válida");
        return;
    }
    vaciarFormulario();
    var params = {cliente : cliente, fecha : fecha, hora : hora, observaciones : observaciones, estado : 0, tarifa1 : 0,tarifa2 : 0, tipo : 1, cc: cc};
    var url = urlBase + "/servicio/AddServicio.php";
    var success = function(response)
    {
        cerrarSession(response);
        alertify.success('Servicio agregado con id '+response.servicio_id);
        agregarDetalleServicio(response.servicio_id,nombre,celular,origen,destino);
        enviarCorreoAsignacion("jose.sanchez.6397@gmail.com",response.servicio_id,cliente);
        $("#contenedor-pasajero-elegido").html("<div class=\"contenedor_central_titulo_pasajero\">"+
                "<div></div><div class=\"dato_pasajero\">Rut</div><div class=\"dato_pasajero\">Nombre</div>"+
                "<div class=\"dato_pasajero\">Apellido</div><div class=\"dato_pasajero\">Centro Costo</div>"+
                "<div class=\"dir_pasajero\">Dirección</div></div>");
    };
    postRequest(url,params,success);

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

function enviarCorreoAsignacion(mail,id,cliente)
{
    var url = urlUtil + "/enviarMail.php";
    var asunto = "Notificación Dómito";
    var mensaje = "Estimado(a), se informan los siguientes cambios:<br> El cliente "+cliente+" a creado un nuevo servicio con el id "+id+", ";
    var params = {email : mail,asunto : asunto, mensaje : mensaje, extra : ''};
    var success = function(response)
    {
    };
    postRequest(url,params,success);
}

//function buscarPasajeroCliente(cliente)
//{
//    var params = {cliente : cliente};
//    var url = urlBase + "/pasajero/GetPasajerosCliente.php";
//    var success = function(response)
//    {
//        cerrarSession(response);
//        var pasajeros = $("#contenedor-pasajero");
//        var pasajeros2 = $("#contenedor-pasajero-elegido");
//        pasajeros.html("");
//        if(response.length === 0)
//        {
//            pasajeros.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
//            return;
//        }
//        pasajeros.append("<div class=\"contenedor_central_titulo_pasajero\">"+
//                "<div></div><div class=\"dato_pasajero\">Rut</div><div class=\"dato_pasajero\">Nombre</div>"+
//                "<div class=\"dato_pasajero\">Apellido</div><div class=\"dato_pasajero\">Centro Costo</div>"+
//                "<div class=\"dir_pasajero\">Dirección</div></div>");
//        pasajeros2.append("<div class=\"contenedor_central_titulo_pasajero\">"+
//                "<div></div><div class=\"dato_pasajero\">Rut</div><div class=\"dato_pasajero\">Nombre</div>"+
//                "<div class=\"dato_pasajero\">Apellido</div><div class=\"dato_pasajero\">Centro Costo</div>"+
//                "<div class=\"dir_pasajero\">Dirección</div></div><div class=\"mensaje_bienvenida\">NO HAY PASAJEROS ASIGNADOS</div>");
//        for(var i = 0 ; i < response.length; i++)
//        {
//            var id = response[i].pasajero_id;
//            var rut = response[i].pasajero_rut;
//            var nombre = response[i].pasajero_nombre;
//            var papellido = response[i].pasajero_papellido;
//            var celular = response[i].pasajero_celular;
//            var cc = response[i].pasajero_centro_costo;
//            var punto = response[i].pasajero_punto_encuentro;
//            destinos.set(id,punto);
//            var key = rut+"_"+celular+"_"+nombre+"_"+papellido+"_"+cc+"_"+punto;
//            PASAJEROS_NO_ASIGNADOS.set(key,key);
//            pasajeros.append("<div id=\""+rut+"\" class=\"fila_contenedor fila_contenedor_pasajero\">"+
//                    "<div class=\"dato_pasajero\">"+rut+"</div>"+
//                    "<div class=\"dato_pasajero\">"+nombre+"</div>"+
//                    "<div class=\"dato_pasajero\">"+papellido+"</div>"+
//                    "<div class=\"dato_pasajero\">"+cc+"</div><div class=\"dir_pasajero\">"+punto+"</div><div onclick=\"agregar($('#"+rut+"'),'"+rut+"','"+celular+"','"+nombre+"','"+papellido+"','"+cc+"','"+punto+"')\"><img src=\"img/arriba.svg\" width=\"50\" height=\"15\"></div></div>");
//        }
//    };
//    postRequest(url,params,success);
//}

function agregarDetalleServicio(idServicio,nombre,celular,origen,destino)
{
    var pasajeros = "";
    var destinos = "";
    var i = 0;

    pasajeros += nombre+"-"+celular+"_par" + "%";
    pasajeros += nombre+"-"+celular+"_des" + "%";
    destinos += origen + "%";
    destinos += destino + "%";
    var params = {pasajeros : pasajeros ,destinos : destinos, id : idServicio };
    var url = urlBase + "/servicio/AddServicioDetalle.php";
    postRequest(url,params,null);
    borrarDirections();
}

function seleccionarTodo()
{
    $(".checkPasajero").each(function(index)
    {
        if($("#check").prop("checked"))
        {
            $(this).prop("checked",true);
        }
        else
        {
            $(this).prop("checked",false);
        }
    });
}

function agregar(obj,rut,celular,nombre,papellido,cc,punto) {
    obj.remove();
    var key = rut+"_"+celular+"_"+nombre+"_"+papellido+"_"+cc+"_"+punto;
    PASAJEROS_NO_ASIGNADOS.delete(key);
    PASAJEROS_ASIGNADOS.set(key,key);
    $(".mensaje_bienvenida").remove();
    var pasajeros = $("#contenedor-pasajero-elegido");
    pasajeros.append("<div id=\""+rut+"\" class=\"fila_contenedor fila_contenedor_pasajero\">"+
                "<div class=\"dato_pasajero\">"+rut+"</div>"+
                "<div class=\"dato_pasajero\">"+nombre+"</div>"+
                "<div class=\"dato_pasajero\">"+papellido+"</div>"+
                "<div class=\"dato_pasajero\">"+cc+"</div><div class=\"dir_pasajero\">"+punto+"</div><div onclick=\"quitar($('#"+rut+"'),'"+rut+"','"+celular+"','"+nombre+"','"+papellido+"','"+cc+"','"+punto+"')\"><img src=\"img/abajo.svg\" width=\"50\" height=\"15\"></div></div>");
}
function quitar(obj,rut,celular,nombre,papellido,cc,punto) {
    obj.remove();
    var key = rut+"_"+celular+"_"+nombre+"_"+papellido+"_"+cc+"_"+punto;
    PASAJEROS_ASIGNADOS.delete(key);
    PASAJEROS_NO_ASIGNADOS.set(key,key);
    $(".mensaje_bienvenida").remove();
    var pasajeros = $("#contenedor-pasajero");
    pasajeros.append("<div id=\""+rut+"\" class=\"fila_contenedor fila_contenedor_pasajero\">"+
                "<div class=\"dato_pasajero\">"+rut+"</div>"+
                "<div class=\"dato_pasajero\">"+nombre+"</div>"+
                "<div class=\"dato_pasajero\">"+papellido+"</div>"+
                "<div class=\"dato_pasajero\">"+cc+"</div><div class=\"dir_pasajero\">"+punto+"</div><div onclick=\"agregar($('#"+rut+"'),'"+rut+"','"+celular+"','"+nombre+"','"+papellido+"','"+cc+"','"+punto+"')\"><img src=\"img/arriba.svg\" width=\"50\" height=\"15\"></div></div>");
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
            if(INPUT_ACTUAL === 'origens')
            {
                document.getElementById('origens').value = "Cargando...";
            }
            else if(INPUT_ACTUAL === 'destinos')
            {
                document.getElementById('destinos').value = "Cargando...";
            }
            var query = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + POSITION[0] +','+ POSITION[1]+'&key=' + API_KEY;
            $.getJSON(query, function (data) {
                if (data.status === 'OK') { 
                    var zero = data.results[0];
                    var address = zero.formatted_address;
                    if(INPUT_ACTUAL === 'origens')
                    {
                        document.getElementById('origens').value = address;
                    }
                    else if(INPUT_ACTUAL === 'destinos')
                    {
                        document.getElementById('destinos').value = address;
                    }
                } 
            });
        }
    });
}
function dibujarRuta()
{
    GEOCODING = false;
    var origen = $("#origens").val();
    var destino = $("#destinos").val();
    if(origen === '' || destino === '')
    {
        return;
    }
    eliminarMarkers();
    setDirections();
    directionsService.route({
        origin: origen,
        optimizeWaypoints: false,
        destination: destino,
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

function buscarCentrosCosto(cliente)
{
    var params = {cliente : cliente};
    var url = urlBase + "/cliente/GetCentroCosto.php";
    var success = function(response)
    { 
        for(var i = 0; i < response.length ; i++){
            var value = response[i].cc_nombre;
            $("#ccs").append("<option value='"+value+"'>"+value+"</option>");
        }
    };
    postRequest(url,params,success);
    
}

function decodePolyline(encoded) {
    if (!encoded) {
        return [];
    }
    var poly = [];
    var index = 0, len = encoded.length;
    var lat = 0, lng = 0;

    while (index < len) {
        var b, shift = 0, result = 0;

        do {
            b = encoded.charCodeAt(index++) - 63;
            result = result | ((b & 0x1f) << shift);
            shift += 5;
        } while (b >= 0x20);

        var dlat = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
        lat += dlat;

        shift = 0;
        result = 0;

        do {
            b = encoded.charCodeAt(index++) - 63;
            result = result | ((b & 0x1f) << shift);
            shift += 5;
        } while (b >= 0x20);

        var dlng = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
        lng += dlng;

        var p = {
            lat: lat / 1e5,
            lng: lng / 1e5
        };
        poly.push(p);
    }
    return poly;
}