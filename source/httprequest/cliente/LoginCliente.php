<?php
include '../../util/validarPeticion.php';
include '../../query/ConductorDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$respuesta = 0;
$nombre = filter_input(INPUT_POST, 'usuario');
$password = filter_input(INPUT_POST, 'password');
$conductorDao = new ConductorDao();
$id = $conductorDao->getConductor($nombre, $password);
echo "{\"id\":".$id."}";
Log::write_log("LOGINCLIENTE", 0);