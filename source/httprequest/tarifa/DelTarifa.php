<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TarifaDao.php';

$nombre = filter_input(INPUT_POST, 'nombre');
$tarifaDao = new TarifaDao();
$tarifaDao->eliminarTarifa($nombre);
echo "{\"tarifa_eliminada\":\"".$nombre."\"}";
