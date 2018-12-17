<?php
//include '../../util/validarPeticion.php';

include '../../query/PasajeroDao.php';
header('Content-Type: application/json');
$respuesta = 0;
$nombre = $_REQUEST['usuario'];
$password = $_REQUEST['password'];
$pasajeroDao = new PasajeroDao();
$id = $pasajeroDao->getUsuario($nombre, $password);
echo "{\"id\":".$id."}";