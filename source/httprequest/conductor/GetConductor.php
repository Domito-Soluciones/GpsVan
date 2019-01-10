<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';

header('Content-Type: application/json');
$respuesta = 0;
$rut = filter_input(INPUT_POST, 'rut');
$conductorDao = new ConductorDao();
$datos = $conductorDao->getDatosConductor($rut);
echo "{\"conductor_nombre\":\"".$datos[0]."\","
        ."\"conductor_viajes\":\"".$datos[1]."\""
        . "}";