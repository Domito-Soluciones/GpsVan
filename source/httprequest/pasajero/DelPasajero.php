<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';

$rut = $_REQUEST['rut'];
$pasajeroDao = new PasajeroDao();
$pasajeroDao->eliminarPasajero($rut);
