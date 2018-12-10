/* global urlBase, google */
var markers = [];
var position = [-33.440616, -70.6514212];
$(document).ready(function(){
   
    
});

function initMap() {
    var latlng = new google.maps.LatLng(position[0], position[1]);
    var myOptions = {
        zoom: 11,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    cargarMovilesMapa();
    setInterval('moverMovilesMapa()',5000);

}

function cargarMovilesMapa()
{
    var url = urlBase + "/movil/GetMoviles.php?busqueda=";
    var success = function(response)
    {
        for(var i = 0 ; i < response.length ; i++)
        {
            var patente = response[i].movil_patente;
            var nombre = response[i].movil_nombre;
            var lat = response[i].movil_lat;
            var lon = response[i].movil_lon;
            var estado = response[i].movil_estado;
            var servicio = response[i].movil_servicio;
            if(estado !== '0')
            {
                dibujarMarcador(patente,parseFloat(lat),parseFloat(lon),nombre,servicio);
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function moverMovilesMapa()
{
    var url = urlBase + "/movil/GetMoviles.php?busqueda=";
    var success = function(response)
    {
        for(var i = 0 ; i < response.length ; i++)
        {
            for(var j = 0 ; i < markers.length; i++)
            {                
                var patente = response[i].movil_patente;
                var nombre = response[i].movil_nombre;
                var lat = response[i].movil_lat;
                var lon = response[i].movil_lon;
                var estado = response[i].movil_estado;
                var servicio = response[i].movil_servicio;
                if(estado !== '0')
                {
                    if(markers[j].get("idMarker") === patente)
                    {
                        var latlng = new google.maps.LatLng(lat, lon);
                        markers[j].setPosition(latlng);
                    }
                }
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function dibujarMarcador(id,lat,lon,nombre,servicio)
{
    var myLatLng = {lat: lat, lng: lon};
    var icon = {
        url: "img/marker.png", // url
        scaledSize: new google.maps.Size(70, 30),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
    };
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: nombre,
        icon:icon,
        idMarker: id
    });
    var divServicio = "";
    var estiloMovil = " style='font-size:14px;font-weight:bold;' ";
    if(servicio !== '')
    {
        divServicio = "<div style='font-size:10px;font-weight:bold;'>N: "+servicio+"</div>";
        estiloMovil = " style='font-size:8px;font-weight:bold;' ";
    }
    var contentString = "<div style='height:23px;'>"+divServicio+"<div "+estiloMovil+">"+nombre+"</div>";
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    infowindow.open(map,marker);
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

    markers.push(marker);

}

