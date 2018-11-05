<?php
include_once '../../query/ClienteDao.php';

$cliente = $_REQUEST['usuario'];
$clienteDao = new ClienteDao();
$clienteDao->cambiarEstadoConductor(1, $cliente);

