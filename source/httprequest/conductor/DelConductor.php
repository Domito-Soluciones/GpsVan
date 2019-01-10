<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';

$rut = filter_input(INPUT_POST, 'rut');
$conductorDao = new ConductorDao();
$conductorDao->eliminarConductor($rut);
echo "{\"conductor_eliminado\":\"".$rut."\"}";
