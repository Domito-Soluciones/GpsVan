/* global PLACES_API, CORS_PROXY, POSITION, API_KEY, DIRECTIONS_API, map, google, urlBase, alertify, flightPath, POLYLINE */

var clientes = new Array();
var usuarios = new Array();
var transportistas = new Array();
var moviles = new Array();

$(document).ready(function(){
    if(typeof POLYLINE !== "undefined")
    {
        POLYLINE.setMap(null);
    }
    $("#partida").on("input",function(){
        mostrarDatalist($(this).val(),$("#partidal"),'partida');
    });
    $("#destino").on("input",function(){
         mostrarDatalist($(this).val(),$("#destinol"),'destino');
    });
    $(".buscador").click(function(){
        $("#partidal").html("");
        $("#destinol").html("");
    });
    
    $("#solicitar").click(function () {
        agregarServicio();
    });
    
    $("#cliente").on('input',function () {
        preCargarUsuarios(); 
    });
    
    $("#transportista").on('input',function () {
        preCargarMoviles(); 
    });
    
    $("#cliente").on('input',function () {
        preCargarUsuarios(); 
    });
    
    $("#transportista").on('input',function () {
        preCargarMoviles(); 
    });
    
    init();
});

function init()
{
    cargarClientes();
    cargarTransportistas();
    preCargarUsuarios(); 
    preCargarMoviles();
}

function cargarIds()
{
    var id = $("#ids").val();
    var url = urlBase + "/servicio/IdServicios.php?id="+id;
    var success = function(response)
    {
        $("#lids").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].servicio_id;
            $("#lids").append("<option value='"+id+"'>"+id+"</option>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function cargarClientes()
{
    var busqueda = $("#cliente").val();
    var url = urlBase + "/cliente/GetClientes.php?busqueda"+busqueda;
    var success = function(response)
    {
        $("#lcliente").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].cliente_id;
            var nombre = response[i].cliente_razon;
            clientes[nombre] = id;
            $("#lcliente").append("<option value='"+nombre+"'>"+nombre+"</option>");
        }
    };
    getRequest(url,success);
}
function preCargarUsuarios()
{
    var cliente = $('#cliente').val();
    if(cliente === '')
    {
        cargarUsuarios('');
    }
    else
    {
        cargarUsuarios(cliente);
    }
}
function cargarUsuarios(busqueda)
{
    var url = urlBase + "/pasajero/GetPasajeros.php?busqueda="+busqueda;
    var success = function(response)
    {
        $("#usuario").val("");
        $("#lusuario").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].pasajero_nombre;
            $("#lusuario").append("<option value='"+nombre+"'>"+nombre+"</option>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}



function cargarTransportistas()
{
    var busqueda = $("#transportista").val();
    var url = urlBase + "/transportista/GetTransportistas.php?busqueda="+busqueda;
    var success = function(response)
    {
        $("#ltransportista").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].transportista_id;
            var nombre = response[i].transportista_nombre;
            $("#ltransportista").append("<option value='"+nombre+"'>"+nombre+"</option>");
        }
    };
    getRequest(url,success);
}
function preCargarMoviles()
{
    var transportista = $('#transportista').val();
    cargarMoviles(transportista);
}
function cargarMoviles(busqueda)
{
    var url = urlBase + "/movil/GetMoviles.php?busqueda="+busqueda;
    var success = function(response)
    {
        $("#movil").val("");
        $("#lmovil").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].movil_id;
            var nombre = response[i].movil_nombre;
            var lat = response[i].movil_lat;
            var lon = response[i].movil_lon;
            var estado = response[i].movil_estado;
            var servicio = response[i].movil_servicio;
            $("#lmovil").append("<option value='"+nombre+"'>"+nombre+"</option>");
            if(estado !== '0')
            {
                dibujarMarcador(parseFloat(lat),parseFloat(lon),nombre,servicio);
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function agregarServicio()
{
    var partida = $("#partida").val();
    var destino = $("#destino").val();
    var cliente = $("#cliente").val();
    var usuario = $("#usuario").val();
    var transportista = $("#transportista").val();
    var movil = $("#vehiculo").val();
    var tipo = $("#tipo").val();
    var tarifa = $("#tarifas").val();
    var array = [partida,destino,cliente,usuario,transportista,movil,tipo,tarifa];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var data = "partida="+partida+"&destino="+destino+"&cliente="+cliente+"&usuario="
            +usuario+"&transportista="+transportista+"&movil="+movil+"&tipo="+tipo+"&tarifa="+tarifa;
    var url = urlBase + "/servicio/AddServicio.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        POLYLINE.setMap(null);
        alertify.success('Servicio agregado con id '+response.servicio_id);
        vaciarFormulario();
        cambiarPropiedad($("#loader"),"visibility","hidden");
        agregarDetalleServicio(response.servicio_id);
    };
    postRequest(url,success);
}

function buscarServicio()
{
    var id = $("#ids").val();
    var cliente = $("#cliente").val();
    var usuario = $("#usuario").val();
    var transportista = $("#transportista").val();
    var movil = $("#movil").val();
    var desde = $("#tipo").val();
    var hasta = $("#tarifa").val();
    var limit = 1;
    var array = [id,cliente,usuario,transportista,movil,desde,hasta];
    if(!validarCamposAnd(array))
    {
        alertify.error("Ingrese algun criterio de busqueda");
        return;
    }
    var data = "id="+id+"&cliente="+cliente+"&usuario="
            +usuario+"&transportista="+transportista+"&movil="+movil+"&desde="+desde+"&hasta="+hasta+"&limit="+limit;
    var url = urlBase + "/servicio/Servicios.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        for(var i = 0 ; i < response.length; i++)
        {
            alertify.success("servicio encontrado con id "+response[i].servicio_id);
            calculateAndDisplayRoute(response[i].servicio_partida, response[i].servicio_destino);

        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    getRequest(url,success);
}

function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        var originInput = document.getElementById('partida');
        var destinationInput = document.getElementById('destino');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});
        this.travelMode = 'DRIVING';
        this.route();
        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
    }       

    AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.place_id) {
                window.alert("Please select an option from the dropdown list.");
                return;
            }
            if (mode === 'ORIG') {
                me.originPlaceId = place.place_id;
                document.getElementById("partida_hidden").value = place.place_id;
            }
            else {
                me.destinationPlaceId = place.place_id;
                document.getElementById("destino_hidden").value = place.place_id;
                //deleteMarkers();
            }
        me.route();
        });
    };

    AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    };
    
    function calculateAndDisplayRoute(partida,destino) {
        directionsService.route({
          origin: partida,
          destination: destino,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      
      
function mostrarDatalist(val,datalist,campo)
{
    if(val === "") return;
    var url = CORS_PROXY + PLACES_API + "input="+val+
            "&location="+POSITION[0]+","+POSITION[1]+"&sensor=true&radius=500&key="+API_KEY;
    var success = function(response)
    {
        datalist.html("");
        var places =  response.predictions;
        for(var i = 0 ; i < places.length;i++)
        {
            var descripcion = places[i].description;
            datalist.append(
                    "<div class=\"option-datalist\" onclick=\"selecionarPlace('"+descripcion+"','"+campo+"')\"><img src=\"img/ubicacion.svg\" width=\"12\" heifgt=\"12\">"+descripcion+"</div>");
        }
    };
    getRequest(url,success);
}

function selecionarPlace(val,obj)
{
    $("#"+obj).val(val);
    var partida = $("#partida").val();
    var destino = $("#destino").val();
    if(partida !== '' && destino !== '')
    {
        dibujarRuta(partida,destino);
    }
}
function dibujarRuta(origen,destino)
{
    var url = CORS_PROXY + DIRECTIONS_API + "origin="+origen+"&destination="+destino+"&key="+API_KEY;
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
                strokeColor: '#FFFFF',
                strokeOpacity: 1.0,
                strokeWeight: 6
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
    };
    getRequest(url,success);
}
function agregarDetalleServicio(idServicio)
{
    var data = "lat="+POLYLINE_LAT+"&lon="+POLYLINE_LNG+"&id="+idServicio;
    var url = urlBase + "/servicio/AddServicioDetalle.php?"+data;
    postRequest(url,null);
}