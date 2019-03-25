<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$servicio = filter_input(INPUT_POST, 'servicio');
$lat = filter_input(INPUT_POST, 'lat');
$lon = filter_input(INPUT_POST, 'lon');
$servicioDao = new ServicioDao();
$servicioDao->addServicioDetalleReal($lat, $lon,$servicio);
echo "{\"servicio_id\":\"".$servicio."\"}";
Log::write_log("ADDSERVICIOdETALLEREAL", 0);