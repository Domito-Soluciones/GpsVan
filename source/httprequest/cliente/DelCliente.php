<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';

$rut = $_REQUEST['rut'];
$clienteDao = new ClienteDao();
$clienteDao->eliminarCliente($rut);
