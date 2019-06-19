<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';
include '../../cripto/Cripto.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$respuesta = 0;
$nombre = "rgarcia";
$password = "4ON3Yooisb3Gm4WhcgyjDA==";
$conductorDao = new ConductorDao();
$datos = $conductorDao->getConductor($nombre, $password);
echo "{\"conductor_id\":".$datos[0].",\"conductor_equipo\":\"".$datos[1]."\"}";
Log::write_log("LOGIN", 0);