<?php
include '../../util/validarSession.php';
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$lat = filter_input(INPUT_POST, 'lat');
$lon = filter_input(INPUT_POST, 'lon');
$pasajeros = explode("%", filter_input(INPUT_POST, 'pasajeros'));
$destinos = explode("%", filter_input(INPUT_POST, 'destinos'));
$id = filter_input(INPUT_POST, 'id');
$servicioDao = new ServicioDao();
$servicioDao->addServicioDetalle($lat, $lon,$pasajeros,$destinos, $id);
echo "{\"servicio_id\":\"".$id."\"}";
Log::write_log("ADDSERVICIODETALLE", 0);