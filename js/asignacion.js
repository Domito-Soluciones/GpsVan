/* global urlBase, alertify, google */

var interval;

$(document).ready(function(){
    setInterval('validarServicios()', 60000*10);
});
