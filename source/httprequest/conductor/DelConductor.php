<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$rut = filter_input(INPUT_POST, 'rut');
$conductorDao = new ConductorDao();
$conductorDao->eliminarConductor($rut);
echo "{\"conductor_eliminado\":\"".$rut."\"}";
Log::write_log("DELCONDUCTOR: ".$rut, 0);
