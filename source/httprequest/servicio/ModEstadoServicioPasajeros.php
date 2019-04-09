<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$idServicio = filter_input(INPUT_POST, 'idServicio');
$estado = filter_input(INPUT_POST, 'estado');
$servicioDao = new ServicioDao();
$servicioDao->modificarEstadoServicioPasajeros($idServicio,$estado);
echo "{\"servicio_id\":\"".$idServicio."\"}";
Log::write_log("MODESTADOSERVICIOPASAJERO", 0);
