/* global urlBase, alertify, google */

var interval;
$(document).ready(function(){
    interval = setInterval('validarServicios()', 60000*10);
});
