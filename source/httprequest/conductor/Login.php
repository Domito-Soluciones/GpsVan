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
$datos = $conductorDao->getConductor($nombre, $password);
echo "{\"conductor_id\":".$datos[0].",\"conductor_equipo\":\"".$datos[1]."\",\"conductor_nombre\":\"".$datos[2]."\"}";
Log::write_log("LOGIN: ".$nombre, 0);