<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';


header('Content-Type: application/json');
$respuesta = 0;
$rut = $_REQUEST['rut'];
$conductorDao = new ConductorDao();
$datos = $conductorDao->getDatosConductor($rut);
echo "{\"nombre\":\"".$datos[0]."\","
        ."\"viajes\":\"".$datos[1]."\""
        . "}";