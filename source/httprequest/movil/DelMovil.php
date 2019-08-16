<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$patente = filter_input(INPUT_POST, 'patente');
$movilDao = new MovilDao();
$movilDao->eliminarMovil($patente);
echo "{\"movil_eliminado\":\"".$patente."\"}";
Log::write_log("DELMOVIL: ".$patente, 0);