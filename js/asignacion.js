/* global urlBase, alertify, google */

$(document).ready(function(){
    setInterval('validarServicios()', 5000);
});

    
function abrirServicio(ids,clientes,fechas,hora,observacion)
{
    cambiarModulo('panel',{ids:ids,clientes:clientes,fechas:fechas,hora:hora,observacion:observacion});
}