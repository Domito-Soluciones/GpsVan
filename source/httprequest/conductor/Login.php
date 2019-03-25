<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';
include '../../cripto/Cripto.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$respuesta = 0;
$nombre = filter_input(INPUT_POST, 'usuario');
$password = base64_encode(Cripto::encriptar(filter_input(INPUT_POST, 'password')));
$conductorDao = new ConductorDao();
$id = $conductorDao->getConductor($nombre, $password);
echo "{\"conductor_id\":".$id."}";
Log::write_log("LOGIN", 0);