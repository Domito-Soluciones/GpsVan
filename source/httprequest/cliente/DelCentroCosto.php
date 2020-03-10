<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$clienteDao = new ClienteDao();
$clienteDao->eliminarCentroCostoUnico($id);
echo "{\"cc_eliminado\":\"".$id."\"}";
Log::write_log("DELCENTROCOSTO: ".$id, 0);