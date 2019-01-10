<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';

header('Content-Type: application/json');
$rut = filter_input(INPUT_POST, 'rut');
$conductorDao = new ConductorDao();
$conductorDao->eliminarConductor($rut);
echo "{\"conductor_eliminado\":\"".$rut."\"}";
