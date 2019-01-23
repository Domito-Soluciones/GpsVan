<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$respuesta = 0;
$lat = filter_input(INPUT_POST, 'lat');
$lon = filter_input(INPUT_POST, 'lon');
$nombre = filter_input(INPUT_POST, 'conductor');
$movilDao = new MovilDao();
$id = $movilDao->modificarUbicacion($nombre, $lat, $lon);
echo "{\"movil_id\":".$id.",\"movil_lat\":".$lat.",\"movil_lng\":".$lon."}";