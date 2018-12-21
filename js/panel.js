/* global PLACES_API, CORS_PROXY, POSITION, API_KEY */

var clientes = new Array();
var usuarios = new Array();
var transportistas = new Array();
var moviles = new Array();

$(document).ready(function(){

//    new AutocompleteDirectionsHandler(map);
//    directionsDisplay = new google.maps.DirectionsRenderer;
//    directionsDisplay.setMap(map);
    
    $("#partida").keyup(function(){
        var datalistPartida = $("#partidal");
        var url = CORS_PROXY + PLACES_API + "input="+$(this).val()+
                "&location="+POSITION[0]+","+POSITION[1]+"&sensor=true&radius=1000&key="+API_KEY;
        var success = function(response)
        {
            datalistPartida.html("");
            var places =  response.predictions;
            for(var i = 0 ; i < places.length;i++)
            {
                datalistPartida.append("<option value="+places[i].description+">"+places[i].description+"</option>");
            }
        };
        getRequest(url,success);
    });
        
    $("#destino").keyup(function(){
        var datalistDestino = $("#destinol");
        var url = CORS_PROXY + PLACES_API + "input="+$(this).val()+
                "&location="+POSITION[0]+","+POSITION[1]+"&sensor=true&radius=1000&key="+API_KEY;
        var success = function(response)
        {
            datalistDestino.html("");
            var places =  response.predictions;
            for(var i = 0 ; i < places.length;i++)
            {
                datalistDestino.append("<option value="+places[i].description+">"+places[i].description+"</option>");
            }
        };
        getRequest(url,success);
    });
    
    $("#entrar").click(function () {
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
    cargarIds();
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
        cambiarPropiedad($("#loader"),"visibility","hidden");
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
    var partida_id = $("#partida_hidden").val();
    var destino = $("#destino").val();
    var destino_id = $("#destino_hidden").val();
    var cliente = $("#cliente").val();
    var usuario = $("#usuario").val();
    var transportista = $("#transportista").val();
    var movil = $("#vehiculo").val();
    var tipo = $("#tipo").val();
    var tarifa = $("#tarifas").val();
    var array = [partida,partida_id,destino,destino_id,cliente,usuario,transportista,movil,tipo,tarifa];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var data = "partida="+partida+"&partidaId="+partida_id+"&destino="+destino+"&destinoId="+destino_id+"&cliente="+cliente+"&usuario="
            +usuario+"&transportista="+transportista+"&movil="+movil+"&tipo="+tipo+"&tarifa="+tarifa+"&gestion="+GESTIONANDO_TICKET;
    var url = urlBase + "/servicio/AddServicio.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        GESTIONANDO_TICKET = 0;
        alertify.success('servicio agregado con id '+response);
        vaciarFormulario($("#asignar input"));
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
        init();
        removeMap();
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