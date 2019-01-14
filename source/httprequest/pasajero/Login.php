<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';

header('Content-Type: application/json');
$respuesta = 0;
$nombre = filter_input(INPUT_POST, 'usuario');
$password = filter_input(INPUT_POST, 'password');
$pasajeroDao = new PasajeroDao();
$id = $pasajeroDao->getUsuario($nombre, $password);
echo "{\"id\":".$id."}";