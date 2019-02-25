<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';

header('Content-Type: application/json');
$respuesta = 0;
//$nick = filter_input(INPUT_POST, 'id');
$nick = $_REQUEST['id'];
$conductorDao = new ConductorDao();
$datos = $conductorDao->getDatosConductor($nick);
echo "{\"conductor_nombre\":\"".$datos[0]."\","
        ."\"conductor_estado\":\"".$datos[1]."\""
        . "}";