<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';
include '../../cripto/Cripto.php';

header('Content-Type: application/json');
$nombre = filter_input(INPUT_POST, 'usuario');
$password = base64_encode(Cripto::encriptar(filter_input(INPUT_POST, 'password')));
$pasajeroDao = new PasajeroDao();
$id = $pasajeroDao->getUsuario($nombre, $password);
echo "{\"id\":".$id."}";