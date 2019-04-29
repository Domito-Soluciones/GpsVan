<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$idServicio = filter_input(INPUT_POST, 'idServicio');
$idPasajero = filter_input(INPUT_POST, 'idPasajero');
$estado = filter_input(INPUT_POST, 'estado');
$observacion = filter_input(INPUT_POST, 'observacion');
$tipo = filter_input(INPUT_POST, 'tipo');
$lat = filter_input(INPUT_POST, 'lat');
$lon = filter_input(INPUT_POST, 'lon');
$servicioDao = new ServicioDao();
$servicioDao->modificarEstadoServicioPasajero($idServicio, $idPasajero,$estado,$tipo,$observacion,$lat,$lon);
echo "{\"servicio_id\":\"".$idServicio."\"}";
Log::write_log("MODESTADOSERVICIOPASAJERO", 0);
