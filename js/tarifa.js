/* global urlBase, alertify, NOMBRE_CLIENTE, ID_CLIENTE, markers, map, google, API_KEY */
var ID_TARIFA;
var TARIFAS;
var AGREGAR = true;
var PAGINA = 'TARIFAS';
var CAMPOS = ["tipo","horario","descripcion","numero","hora","nombre","valor1","valor2"];
var clientes_tarifa = [];
var DIRECCION_EMPRESA;
var mapa_oculto = true;
var input_direccion;

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarClienteTarifa();
    buscarTarifasAll(true);
    $("#agregar").click(function(){
        AGREGAR = true;
        $("#lista_busqueda_tarifa_detalle").load("html/datos_tarifa.html", function( response, status, xhr ) {
            initPlacesAutoComplete(document.getElementById("origen"));
            initPlacesAutoComplete(document.getElementById("destino"));
            iniciarHora([$("#hora")]);
            quitarclase($("#guardar"),"oculto");
            cambiarPropiedad($("#agregar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
            $("#clientes").val(NOMBRE_CLIENTE);
            cambioEjecutado();
            cargarClientes();
            $("#clientes").on('input',function(){
                generarNombre('cliente');
            });
            $("#tipo").change(function(){
                generarNombre('tipo');
                var tipo = $(this).val();
                if(tipo === 'RG')
                {
                    $("#destino").val(DIRECCION_EMPRESA);
                    $("#origen").val("");
                }
                else if(tipo === 'ZP')
                {
                    $("#origen").val(DIRECCION_EMPRESA);
                    $("#destino").val("");
                }
            });
            $("#horario").change(function(){
                generarNombre('horario');
            });

            $("#nombre").blur(function (){
                if(validarExistencia('nombre',$(this).val()))
                {
                    alertify.error("El nombre "+$(this).val()+" ya existe");
                    return;
                }
            });
            $("#clientes").on('blur',function () {
                if($("#clientes").val() === "")
                {
                    //cargarPasajeros();
                }
                var noExiste = validarInexistencia($("#clientes").val(),clientes);
                if(noExiste)
                {
                    alertify.error("Cliente inexistente");
                    $("#clientes").val("");

                }
            });
            
            $("#volver").click(function(){
                ocultarSubMapa();
                ocultarMapa();
                buscarTarifas(NOMBRE_CLIENTE,ID_CLIENTE);
                if(typeof ID_CLIENTE === "undefined")
                {
                    cambiarPropiedad($("#agregar"),"visibility","hidden");
                }   
                else
                {
                    cambiarPropiedad($("#agregar"),"visibility","visible");
                }
                cambiarPropiedad($("#guardar"),"visibility","hidden");
                cambiarPropiedad($("#eliminar"),"visibility","hidden");

            });
            
            $("#origen").focus(function(){
                input_direccion = $("#origen");
            });
            
            $("#destino").focus(function(){
                input_direccion = $("#destino");
            });
            
            $("#buscaOrigen").click(function(){
                input_direccion = $("#origen");
                if(mapa_oculto)
                {
                    colocarMarcadorPlacesTarifa();
                    quitarclase($("#contenedor_mapa"),"oculto");
                    quitarclase($("#contenedor_mapa2"),"oculto");
                    mapa_oculto = false;
                }
                else
                {
                    agregarclase($("#contenedor_mapa"),"oculto");
                    agregarclase($("#contenedor_mapa2"),"oculto");
                    mapa_oculto = true;
                }
            });
            
            $("#buscaDestino").click(function(){
                input_direccion = $("#destino");
                if(mapa_oculto)
                {
                    colocarMarcadorPlacesTarifa();
                    quitarclase($("#contenedor_mapa"),"oculto");
                    quitarclase($("#contenedor_mapa2"),"oculto");
                    mapa_oculto = false;
                }
                else
                {
                    agregarclase($("#contenedor_mapa"),"oculto");
                    agregarclase($("#contenedor_mapa2"),"oculto");
                    mapa_oculto = true;
                }
            });    
            mostrarMapa();
            mostrarSubMapa();
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
    });

    $("#busqueda").keyup(function(){
        buscarClienteTarifa($(this).val());
    });
                
    $("#guardar").click(function (){
        if(AGREGAR)
        {
            agregarTarifa();
        }
        else
        {
            modificarTarifa();
        }
    });
});

function initPlacesAutoComplete(input) {
    var autocomplete = new google.maps.places.Autocomplete(input,
    {componentRestrictions:{'country': 'cl'}});
    places = new google.maps.places.PlacesService(map);
    autocomplete.addListener('place_changed', function(){
        input_direccion = input.id;
        if(input.id === 'origen')
        {
            quitarclase($("#buscaOrigen"),"oculto");
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
        input_direccion.val("Cargando...");
        var query = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + POSITION[0] +','+ POSITION[1]+'&key=' + API_KEY;
        $.getJSON(query, function (data) {
            if (data.status === 'OK') { 
                var zero = data.results[0];
                var address = zero.formatted_address;
                input_direccion.val(address);     
            } 
        });
    });
}