/* global urlBase, alertify, google */

var PAGINA = 'ASIGNACION';

$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    setInterval('validarServicios()', 5000);
});

    
function abrirServicio(ids,clientes,ruta,fechas,hora,observacion)
{
    cambiarModulo('panel',{ids:ids,clientes:clientes,ruta:ruta,fechas:fechas,hora:hora,observacion:observacion});
}