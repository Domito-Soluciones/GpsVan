/* global alertify, urlBase, urlUtil, POLYLINE_LAT, POLYLINE_LNG, map, google, markers, directionsService, directionsDisplay */
var PAGINA = "PANELC";
var CAMPOS = ["clientes","fechas","hora"];
var clientesArray = [];
var origen;
var destinos = [];
var pasajeros = [];
var INPUT_ACTUAL;
var directionsService;
var idEdit;
var partidaEdit;
var destinoEdit;
var accion = 'agregar';

$(document).ready(function(){
    window.onbeforeunload = function() {
        return "¿Desea recargar la página web?";
    };
    directionsService = new google.maps.DirectionsService();
    PAGINA_ANTERIOR = PAGINA;
    TIPO_USUARIO = 'CLIENTE';
    $("#menu").load("menu.php", function( response, status, xhr ) {
        agregarclase($("#panel_cliente"),"menu-activo");
    });
    $("#solicitar").click(function(){
        crearServicio();
    });
    $("#agregar").click(function(){
        if(accion === 'agregar'){
            agregarPasajeroEspecial();
        }
        else if(accion === 'editar'){
            modificarPasajeroEspecial();
        }
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
    var cliente = $("#clientesNombre").val();
    var fecha = $("#fechas").val();
    var hora = $("#hora").val();
    var cc = $("#ccs").val();
    var observaciones = $("#observacion").val();
    var array = [cliente,fecha,hora];
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
    if(pasajeros.length === 0){
        alertify.error("No hay pasajeros disponibles para esta ruta");
        return;
    }
    if(pasajeros.length > 17){
        alertify.error("Son 17 pasajeros como máximo por servicio");
        return;
    }
    vaciarFormulario();
    var params = {cliente : cliente, fecha : fecha, hora : hora, observaciones : observaciones, estado : 0, tarifa1 : 0,tarifa2 : 0, tipo : 1, cc: cc};
    var url = urlBase + "/servicio/AddServicio.php";
    var success = function(response)
    {
        cerrarSession(response);
        alertify.success('Servicio agregado con id '+response.servicio_id);
        agregarDetalleServicio(response.servicio_id);
        enviarCorreoAsignacion(response.servicio_id,cliente,fecha,hora,cc,observaciones);
        $("#contenedor-pasajero-elegido").html("<div class=\"contenedor_central_titulo_pasajero\">"+
                "<div></div><div class=\"dato_pasajero\">Rut</div><div class=\"dato_pasajero\">Nombre</div>"+
                "<div class=\"dato_pasajero\">Apellido</div><div class=\"dato_pasajero\">Centro Costo</div>"+
                "<div class=\"dir_pasajero\">Dirección</div></div>");
        $("#contenedor_pasajero").html("<div class=\"mensaje_bienvenida\">Sin Información</div>");
        origen = undefined;
        destinos = [];
        pasajeros = [];
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

function enviarCorreoAsignacion(id,cliente,fecha,hora,cc,obs)
{
    var url = urlUtil + "/enviarMail.php";
    var asunto = "Notificación Dómito";
    var mensaje = "Estimado(a), El cliente "+cliente+" a creado un nuevo servicio con el id "+id+"<br> "+
            "<b>Detalle:</b><br>"+
            "<b>Fecha:</b> "+fecha+"<br>"+
            "<b>Hora:</b> "+hora+"<br>"+
            "<b>Centro Costo:</b> "+cc+"<br>"+
            "<b>Observaciones:</b> "+(obs === '' ? 'Sin observaciones' : obs)+"<br>";
            "<br><br><br>";
            destinos.unshift(origen);
            var j = 1;
            let partida;
            let destino;
            for(var i = 0; i < destinos.length;i++)
            {
                if(i%2 === 0 || i === 0){
                    partida = destinos[i];
                }
                else{
                    destino = destinos[i];
                }
                var pasajero = pasajeros[i].split("-");
                var nombre = pasajero[0].replace("_"," ");
                var celular = pasajero[1].replace("_par","").replace("_des","");
                if(i%2 > 0){
                    mensaje += "<b>Pasajero "+j+":</b><br>"+
                    "<table width=\"300px\" cellspacing=\"2\" cellpadding=\"0\" border=\"1\" >"+
                    "<tr><td>Nombre</td><td>"+nombre+"</td></tr>"+
                    "<tr><td>Celular</td><td>"+celular+"</td></tr>"+
                    "<tr><td>Origen</td><td>"+partida+"</td></tr>"+
                    "<tr><td>Destino</td><td>"+destino+"</td></tr></table>";
                    j++;
                }
            }
            
    var params = {asunto : asunto, mensaje : mensaje, extra : ''};
    var success = function(response)
    {
        console.log(response);
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

function agregarDetalleServicio(idServicio)
{
    var pasajeroFinal = "";
    var destinoFinal = origen+"%";
    for(var i = 0; i < destinos.length;i++)
    {
        destinoFinal += destinos[i] + "%";
    }
    for(var i = 0; i < pasajeros.length;i++)
    {
        pasajeroFinal += pasajeros[i] + "%";
    }
    var params = {pasajeros : pasajeroFinal+"" ,destinos : destinoFinal+"", id : idServicio };
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
    markers.set("marker",marker);
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
    if(typeof origen === 'undefined' || destinos.length === 0)
    {
        return;
    }
    eliminarMarkers();
    var largo = destinos.length;
    if(largo === 0)
    {
        return;
    }
    var destinoFinal = '';
    for(var x = 0 ; x < destinos.length;x++){
        if(destinos[x] !== ''){
            destinoFinal = destinos[x];
        }
    }
    var waypoints = [];
    if(largo > 1)
    {
        for(var i = 0 ; i < largo ; i++)
        {
            if(destinos[i]!=='')
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
    }
    setDirections();
    directionsService.route({
        origin: origen,
        waypoints: waypoints,
        optimizeWaypoints: false,
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
function agregarPasajeroEspecial(){
    var nombre = $("#nombres").val().split(" ").join("_");
    var celular = $("#celulars").val();
    var partida = $("#origens").val();
    var destino = $("#destinos").val();
    if(nombre === '' || celular === '' || partida === '' || destino === ''){
        marcarCampoError($("#nombres"));
        marcarCampoError($("#celulars"));
        marcarCampoError($("#origens"));
        marcarCampoError($("#destinos"));
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarNumero(nombre))
    {
        alertify.error("Nombre no debe ser numérico");
        return;
    }
    if(nombre.indexOf("-") !== -1)
    {
        alertify.error("Nombre no debe tener caracteres especiales");
        return;
    }
    if(!validarNumero(celular))
    {
        alertify.error("Celular debe ser numérico");
        return;
    }
    if(pasajeros.length > 15){
        alertify.error("Son 17 pasajeros como máximo por servicio");
        return;
    }
    var id = nombre+"-"+celular.split("+").join("");
    var cont = "<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral-especial\">"
        +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'>"
        +"<div class=\"boton-chico\" id=\"editEspecial"+id+"\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
        +"<div class=\"boton-chico\" id=\"delEspecial"+id+"\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"
        +"<div class=\"cont-mini-pasajero\"><div class=\"punto-especial\" id=\"punto_origen_"+id+"\"></div><div class=\"punto-especial\" id=\"punto_destino_"+id+"\"></div><div>" + celular+"</div></div>";
    $("#contenedor_pasajero .mensaje_bienvenida").remove();
    $("#contenedor_pasajero").append(cont);
    $("#editEspecial"+id).click(()=>{
        editarPasajeroEspecial(formatearCadena(nombre),celular,formatearCadena(partida),formatearCadena(destino),id);
    });
    $("#delEspecial"+id).click(()=>{
        borrarPasajeroEspecial("pasajero_"+id,formatearCadena(partida),formatearCadena(destino));
    });
    $("#punto_origen_"+id).html("<div id=\"punto_"+id+"\"><b>Origen:</b> "+ recortar(partida,50) + "</div>");
    $("#punto_destino_"+id).html("<div id=\"punto_"+id+"\"><b>Destino:</b> "+ recortar(destino,50) + "</div>");
    pasajeros.push(id+"_par");
    pasajeros.push(id+"_des");
    if(typeof  origen === 'undefined'){
        origen = formatearCadena(partida);
    }
    else{
        destinos.push(formatearCadena(partida));
    }
    destinos.push(formatearCadena(destino));
    dibujarRuta();
    $("#nombres").val("");
    $("#celulars").val("");
    $("#origens").val("");
    $("#destinos").val("");
    marcarCampoOk($("#nombres"));
    marcarCampoOk($("#celulars"));
    marcarCampoOk($("#origens"));
    marcarCampoOk($("#destinos"));
}   

function modificarPasajeroEspecial(){
    var nombre = $("#nombres").val().split(" ").join("_");
    var celular = $("#celulars").val();
    var partida = $("#origens").val();
    var destino = $("#destinos").val();
    if(nombre === ''){
        marcarCampoError($("#nombres"));
        alertify.error("Ingrese nombre");
        return;
    }
    else{
        marcarCampoOk($("#nombres"));
    }
    if(celular === ''){
        marcarCampoError($("#celulars"));
        alertify.error("Ingrese celular");
        return;
    }
    else{
        marcarCampoOk($("#celulars"));
    }
    if(partida === ''){
        marcarCampoError($("#origens"));
        alertify.error("Ingrese partida");
        return;
    }
    else{
        marcarCampoOk($("#origens"));
    }
    if(destino === ''){
        marcarCampoError($("#destinos"));
        alertify.error("Ingrese destino");
        return;
    }
    else{
        marcarCampoOk($("#destinos"));
    }
    if(validarNumero(nombre))
    {
        alertify.error("Nombre no debe ser numérico");
        return;
    }
    if(nombre.indexOf("-") !== -1)
    {
        alertify.error("Nombre no debe tener caracteres especiales");
        return;
    }
    if(!validarNumero(celular))
    {
        alertify.error("Celular debe ser numérico");
        return;
    }
    var id = nombre+"-"+celular.split("+").join("");
    $("#editEspecial"+id).click(()=>{
        editarPasajeroEspecial(formatearCadena(nombre),celular,formatearCadena(partida),formatearCadena(destino),id);
    });
    $("#delEspecial"+id).click(()=>{
        borrarPasajeroEspecial("pasajero_"+id,formatearCadena(partida),formatearCadena(destino));
    });
    $("#punto_origen_"+id).html("<div id=\"punto_"+id+"\"><b>Origen:</b> "+ recortar(partida,50) + "</div>");
    $("#punto_destino_"+id).html("<div id=\"punto_"+id+"\"><b>Destino:</b> "+ recortar(destino,50) + "</div>");
    for(var i = 0; i < pasajeros.length; i++)
    {
        if(pasajeros[i] === idEdit)
        {
            pasajeros[i] = id;
        }
    }
    if(origen === partidaEdit){
        origen = partida;
    }
    for(var i = 0; i < destinos.length; i++)
    {
        if(destinos[i] === partidaEdit)
        {
            destinos[i] = partida;
        }
        if(destinos[i] === destinoEdit){
            destinos[i] = destino;
        }
    }
    borrarDirections();
    dibujarRuta();
    $("#nombres").val("");
    $("#celulars").val("");
    $("#origens").val("");
    $("#destinos").val("");
    accion = 'agregar';
    $("#agregar").text("Agregar");
}   

function borrarPasajeroEspecial(obj,partida,destino)
{
    $("#"+obj).remove();
    var id = obj.split("_")[1];
    for(var i = 0; i < pasajeros.length; i++)
    {
        if(pasajeros[i] === id)
        {
            pasajeros.splice(i, 1);
        }
    }
    if(origen === partida){
        origen = undefined;
    }
    for(var i = 0; i < destinos.length; i++)
    {
        if(destinos[i] === partida){
            destinos.splice(i, 1);
        }
        if(destinos[i] === destino){
            destinos.splice(i, 1);
        }
    }
    if(typeof origen === 'undefined'){
        origen = destinos.shift();
    }

    console.log(origen+" "+destinos);
    borrarDirections();
    dibujarRuta();
}

function editarPasajeroEspecial(nombre,celular,origen,destino,id)
{
    idEdit = id;
    partidaEdit = origen;
    destinoEdit = destino;
    accion = 'editar';
    borrarDirections();
    $("#nombres").val(nombre.replace("_"," "));
    $("#celulars").val(celular);
    $("#origens").val(origen);
    $("#destinos").val(destino);
    $("#agregar").text("Modificar");
}
