<?php
include '../../util/validarPeticion.php';

include '../../query/MovilDao.php';
header('Content-Type: application/json');
$respuesta = 0;
$lat = $_REQUEST['lat'];
$lon = $_REQUEST['lon'];
$nombre = $_REQUEST['conductor'];
$movilDao = new MovilDao();
$id = $movilDao->modificarUbicacion($nombre, $lat, $lon);
echo "{\"id\":".$id."}";