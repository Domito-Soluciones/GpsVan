/* global alertify, urlBase, urlUtil, POLYLINE_LAT, POLYLINE_LNG, map, google, markers */
var PAGINA = "PANELC";
var CAMPOS = ["clientes","fechas","hora"];
var clientesArray = [];
var destinos = new Map();
var PASAJEROS_ASIGNADOS = new Map();
var PASAJEROS_NO_ASIGNADOS = new Map();
var INPUT_ACTUAL;
$(document).ready(function(){
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
    });
    
    $("#buscaDestino").click(function(){
        eliminarMarkers();
        agregarclase($(this),"oculto");    
    });
    //buscarPasajeroCliente($("#clientes").val());
    initPlacesAutoComplete(document.getElementById("origens"));
    initPlacesAutoComplete(document.getElementById("destinos"));
    
//    $("#busqueda").keyup(function(){
//        var pasajeros = $("#contenedor-pasajero-elegido");
//        pasajeros.html("<div class=\"contenedor_central_titulo_pasajero\">"+
//                "<div></div><div class=\"dato_pasajero\">Rut</div><div class=\"dato_pasajero\">Nombre</div>"+
//                "<div class=\"dato_pasajero\">Apellido</div><div class=\"dato_pasajero\">Centro Costo</div>"+
//                "<div class=\"dir_pasajero\">Dirección</div></div>");
//        for (var [key, value] of PASAJEROS_ASIGNADOS) {
//            if(key.toLowerCase().includes($(this).val().toLowerCase()))
//            {
//                var array = key.split("_");
//                pasajeros.append("<div id=\""+array[0]+"\" class=\"fila_contenedor fila_contenedor_pasajero\">"+
//                "<div class=\"dato_pasajero\">"+array[0]+"</div>"+
//                "<div class=\"dato_pasajero\">"+array[2]+"</div>"+
//                "<div class=\"dato_pasajero\">"+array[3]+"</div>"+
//                "<div class=\"dato_pasajero\">"+array[4]+"</div><div class=\"dir_pasajero\">"+array[5]+"</div><div onclick=\"quitar($('#"+array[0]+"'),'"+array[0]+"','"+array[1]+"','"+array[2]+"','"+array[3]+"','"+array[4]+"','"+array[5]+"')\"><img src=\"img/abajo.svg\" width=\"50\" height=\"15\"></div></div>");
//            }
//        }
//    });
    
//    $("#busqueda1").keyup(function(){
//        var pasajeros = $("#contenedor-pasajero");
//        pasajeros.html("<div class=\"contenedor_central_titulo_pasajero\">"+
//                "<div></div><div class=\"dato_pasajero\">Rut</div><div class=\"dato_pasajero\">Nombre</div>"+
//                "<div class=\"dato_pasajero\">Apellido</div><div class=\"dato_pasajero\">Centro Costo</div>"+
//                "<div class=\"dir_pasajero\">Dirección</div></div>");
//        for (var [key, value] of PASAJEROS_NO_ASIGNADOS) {
//            if(key.toLowerCase().includes($(this).val().toLowerCase()))
//            {
//                var array = key.split("_");
//                pasajeros.append("<div id=\""+array[0]+"\" class=\"fila_contenedor fila_contenedor_pasajero\">"+
//                "<div class=\"dato_pasajero\">"+array[0]+"</div>"+
//                "<div class=\"dato_pasajero\">"+array[2]+"</div>"+
//                "<div class=\"dato_pasajero\">"+array[3]+"</div>"+
//                "<div class=\"dato_pasajero\">"+array[4]+"</div><div class=\"dir_pasajero\">"+array[5]+"</div><div onclick=\"agregar($('#"+array[0]+"'),'"+array[0]+"','"+array[1]+"','"+array[2]+"','"+array[3]+"','"+array[4]+"','"+array[5]+"')\"><img src=\"img/abajo.svg\" width=\"50\" height=\"15\"></div></div>");
//            }
//        }
//    });
    
    
});

function crearServicio()
{
    var cliente = $("#clientes").val();
    var fecha = $("#fechas").val();
    var hora = $("#hora").val();
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
    vaciarFormulario();
    var params = {cliente : cliente, fecha : fecha, hora : hora, observaciones : observaciones, estado : 0, tarifa1 : 0,tarifa2 : 0, tipo : 1};
    var url = urlBase + "/servicio/AddServicio.php";
    var success = function(response)
    {
        cerrarSession(response);
        alertify.success('Servicio agregado con id '+response.servicio_id);
        agregarDetalleServicio(response.servicio_id);
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

function agregarDetalleServicio(idServicio)
{
    var pasajeros = "";
    var destino = "";
    var i = 0;
    for(var [key, value] of PASAJEROS_ASIGNADOS){
        var datos = key.split("_");
        pasajeros += datos[2]+"_"+datos[3]+"-"+datos[1] + "_par" + "%";
        destino += datos[5] + "%";
        i++;
    }
    var params = {pasajeros : pasajeros ,destinos : destino, id : idServicio };
    var url = urlBase + "/servicio/AddServicioDetalle.php";
    postRequest(url,params,null);
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
