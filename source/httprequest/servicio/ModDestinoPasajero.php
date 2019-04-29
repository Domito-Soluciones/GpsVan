<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$servicio = filter_input(INPUT_POST, 'servicio');
$pasajero = filter_input(INPUT_POST, 'pasajero');
$destino = filter_input(INPUT_POST, 'destino');
$lat = filter_input(INPUT_POST, 'lat');
$lon = filter_input(INPUT_POST, 'lon');
$servicioDao = new ServicioDao();
$servicioDao->cambiarDestinoPasajero($servicio,$pasajero, $destino,$lat,$lon);
echo "{\"servicio_id\":\"".$servicio."\"}";
Log::write_log("MODDESTINOPASAJERO", 0);