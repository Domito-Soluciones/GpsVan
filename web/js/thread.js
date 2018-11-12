/* global urlBase, alertify */

var ORIGEN;
var ORIGEN_ID;
var DESTINO;
var DESTINO_ID;

$(document).ready(function(){
    setInterval('validarServicios()', 5000);
});

function validarServicios()
{
    var url = urlBase + "/servicio/ServicioPorAsignar.php";
    getRequest(url,function(response){
        if(response.servicio_id !== "")
        {
            alertify.alert("vfvdf");
            ORIGEN = response.servicio_partida;
            ORIGEN_ID = response.servicio_partidaId;
            DESTINO = response.servicio_destino;
            DESTINO_ID = response.servicio_destinoId;
        }
    });
}
