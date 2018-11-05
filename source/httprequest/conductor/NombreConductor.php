<?php

include '../../query/ConductorDao.php';
header('Content-Type: application/json');
$respuesta = 0;
$rut = $_REQUEST['rut'];
$conductorDao = new ConductorDao();
$id = $conductorDao->getConductorNombre($rut);
echo "{\"nombre\":\"".$id."\"}";