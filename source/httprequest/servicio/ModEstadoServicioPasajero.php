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
$servicioDao = new ServicioDao();
$servicioDao->modificarEstadoServicioPasajero($idServicio, $idPasajero,$estado,$observacion);
echo "{\"servicio_id\":\"".$idServicio."\"}";
Log::write_log("MODESTADOSERVICIOPASAJERO", 0);
