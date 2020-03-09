<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$nombre = filter_input(INPUT_POST, 'nombre');
$clienteDao = new ClienteDao();
$clienteDao->modificarCentroCosto($id,$nombre);
echo "{\"cc_modificado\":\"".$id."\"}";
Log::write_log("MODCENTROCOSTO: ".$id, 0);