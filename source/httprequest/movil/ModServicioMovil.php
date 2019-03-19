<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$respuesta = 0;
$servicio = filter_input(INPUT_POST, 'servicio');
$conductor = filter_input(INPUT_POST, 'conductor');
$movilDao = new MovilDao();
$movilDao->modificarServicio($conductor,$servicio);
echo "{\"movil_conductor\":".$conductor."}";