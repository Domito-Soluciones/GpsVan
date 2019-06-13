<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$respuesta = 0;
$nombre = filter_input(INPUT_POST, 'conductor');
$estado = filter_input(INPUT_POST, 'estado');
$equipo = filter_input(INPUT_POST, 'equipo');
$movilDao = new MovilDao();
$movilDao->modificarEstado($nombre, $estado,$equipo);
echo "{\"movil_conductor\":".$nombre.",\"movil_estado\":".$estado."}";
Log::write_log("MODESTADOMOVIL", 0);