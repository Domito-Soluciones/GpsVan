<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$respuesta = 0;
$nombre = filter_input(INPUT_POST, 'conductor');
$estado = filter_input(INPUT_POST, 'estado');
$movilDao = new MovilDao();
$movilDao->modificarEstado($nombre, $estado);
echo "{\"movil_conductor\":".$nombre.",\"movil_estado\":".$estado."}";