<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TransportistaDao.php';

header('Content-Type: application/json');
$rut = filter_input(INPUT_POST, 'rut');
$transportistaDao = new TransportistaDao();
$transportistaDao->eliminarTransportista($rut);
echo "{\"transportista_eliminado\":\"".$nombre."\"}";
