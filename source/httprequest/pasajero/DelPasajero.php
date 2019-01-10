<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';

$rut = filter_input(INPUT_POST, 'rut');
$pasajeroDao = new PasajeroDao();
$pasajeroDao->eliminarPasajero($rut);
echo "{\"pasajero_eliminado\":\"".$rut."\"}";
