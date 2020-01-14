/* global google, urlBase, alertify, MENU_VISIBLE, urlUtil */
var NICK_GLOBAL;
var map;
var POLYLINE;
var POLYLINE_LAT = '';
var POLYLINE_LNG = '';
var POSITION = [-33.440616, -70.6514212];
var TIPO_SERVICIO = 0;
var flightPath;
var ASIGNANDO = false;
var menus = new Map();

$(document).ready(function(){
    
    setMenuMap();
    TIPO_USUARIO = 'ADMIN';
    $.getScript(GOOGLE_MAPS_API+"key="+API_KEY+"&callback=initMap&libraries=places",function(){
        getLocation();
        $("#menu").load("menu.php", function( response, status, xhr ) {
            agregarclase($("#principal"),"menu-activo");

            $(".opcion-menu").mouseover(function (){
                if(!MENU_VISIBLE)
                {
                    abrirTooltip("tooltip_"+$(this).attr("id"));
                }
            });

            $(".opcion-menu").mouseout(function (){
                cerrarTooltip("tooltip_"+$(this).attr("id"));
            });

        });    
        $("#contenido-central").load("home.html");
        getUsuario();
        getfecha();
        setInterval(function(){getfecha();},20000);

        $("#menu-telefono").click(function(){
            if($("#menu-telefono").attr('src') === 'img/menu.svg')
            {
                cambiarPropiedad($("#menu"),"display","block");
                $("#menu-telefono").attr("src","img/cancelar.svg");
            }
            else
            {
                cambiarPropiedad($("#menu"),"display","none");
                $("#menu-telefono").attr("src","img/menu.svg");
            }
        });

        $("#btn_menu").click(function () {
            abrirMenu();
        });

        $("#enlace-salir").click(function() {
            salir();
        }); 
    });
});

function initMap() {
    //$.getJSON("js/map/map_style.json", function(json) {
        var latlng = new google.maps.LatLng(POSITION[0], POSITION[1]);
        var myOptions = {
            zoom: 11,
            center: latlng,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            //,
            //styles: json
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);
        geocoder = new google.maps.Geocoder();
    //});
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

    function validarServicios()
    {
        var params = {};
        var url = urlBase + "/servicio/GetServiciosPendientes.php";
        postRequest(url,params,function(response){
            var cont = $("#contenedor_servicios");
            cont.html("");
            if(response.length === 0)
            {
                cont.html("No hay servicios pendientes");
                return;
            }
            for(var i = 0; i < response.length ; i++)
            {
                var id = response[i].servicio_id;
                var cliente = response[i].servicio_cliente;
                var ruta = response[i].servicio_ruta;
                var fecha = response[i].servicio_fecha;
                var hora = response[i].servicio_hora;
                var observacion = response[i].servicio_observacion;
                var tipo = response[i].servicio_tipo;
                if(tipo === '0')
                {
//                    enviarCorreoDesasignacion("",id);
                }
                cont.append("<div id=\""+id+"\" class=\"pendiente\"><div  onclick=\"abrirServicio('"+id+"','"+cliente+"','"+ruta+"','"+fecha+"','"+hora+"','"+observacion+"')\">"+id+" - "+cliente+"</div><img onclick=\"cancelarServicio("+id+")\" width=\"15\" height=\"15\" src=\"img/cancelar_rojo.svg\"></div>");
            }
            alertify.success("Hay "+response.length+": servicio(s) sin asignar");
        },false);
    }
    
function enviarCorreoDesasignacion(mail,id)
{
    var url = urlUtil + "/enviarMail.php";
    var asunto = "Notificación Dómito";
    var mensaje = "Estimado(a), el servicio "+id+" a sido rechazado por el conductor favor reasignar ";
    var params = {email : mail,asunto : asunto, mensaje : mensaje, extra : ''};
    var success = function(response)
    {
    };
    postRequest(url,params,success);
}

    
function getLocation()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            POSITION = [position.coords.latitude,position.coords.longitude];
        }, function (error) {
            console.log(error);
        });
    }
}

function setMenuMap()
{
    menus.set("HOME","home");
    menus.set("PANEL","panel");
    menus.set("VEHICULOS","movil");
    menus.set("CONDUCTORES","conductor");
    menus.set("CLIENTES","cliente");
    menus.set("PASAJEROS","pasajero");
    menus.set("SERVICIOS","servicios");
    menus.set("MONITOREO","monitoreo");
    menus.set("REPORTES","reportes");
    menus.set("LIQUIDACION","liquidaciones");
    menus.set("RENDICIONES","rendiciones");
    menus.set("CONTRATOS","contrato");
    menus.set("TARIFAS","tarifa");
    menus.set("AGENTES","agente");
    menus.set("CONFIGURACION","configuracion");
}

function cancelarServicio(id){
    confirmar("Cancelar servicio","Esta seguro que desea cancelar el servicio "+id+" ?",function(){
        var params = {id : id,observacion : 'cancelado por administrador', estado : 6};
        var url = urlBase + "/servicio/ModEstadoServicio.php";
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Servicio Cancelado");
            $("#"+id).remove();
        };
        postRequest(url,params,success);
    },function(){});
}