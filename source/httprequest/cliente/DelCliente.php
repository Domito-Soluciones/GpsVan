<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';

$rut = filter_input(INPUT_POST, 'rut');
$id = filter_input(INPUT_POST, 'id');
$clienteDao = new ClienteDao();
$clienteDao->eliminarCliente($rut);
$clienteDao->desAsociarPasajeros($id);
echo "{\"cliente_eliminado\":\"".$rut."\"}";

