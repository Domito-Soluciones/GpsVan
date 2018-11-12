<?php
include '../../util/validarPeticion.php';

include '../../query/ConductorDao.php';
header('Content-Type: application/json');
$respuesta = 0;
$nombre = $_REQUEST['usuario'];
$password = $_REQUEST['password'];
$conductorDao = new ConductorDao();
$id = $conductorDao->getConductor($nombre, $password);
echo "{\"id\":".$id."}";