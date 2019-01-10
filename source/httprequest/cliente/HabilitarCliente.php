<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include_once '../../query/ClienteDao.php';

header('Content-Type: application/json');
$cliente = filter_input(INPUT_POST, 'usuario');
$clienteDao = new ClienteDao();
$clienteDao->cambiarEstadoConductor(1, $cliente);
echo "{\"cliente_habilitado\":\"".$cliente."\"}";

