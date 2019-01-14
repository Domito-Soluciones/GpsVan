<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include_once '../../query/MovilDao.php';

header('Content-Type: application/json');
$conductor = filter_input(INPUT_POST, 'usuario');
$estado = filter_input(INPUT_POST, 'estado');
$movilDao = new MovilDao();
$movilDao->cambiarEstadoConductor($estado, $conductor);
echo "{\"conductor_nick\":".$conductor.","
    . "\"conductor_estado\":".$estado."}";

