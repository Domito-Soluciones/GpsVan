<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';

header('Content-Type: application/json');
$rut = filter_input(INPUT_POST, 'rut');
$id = filter_input(INPUT_POST, 'id');
$clienteDao = new ClienteDao();
$clienteDao->eliminarCliente($rut);
$clienteDao->eliminarCentroCosto($id);
echo "{\"cliente_eliminado\":\"".$rut."\"}";