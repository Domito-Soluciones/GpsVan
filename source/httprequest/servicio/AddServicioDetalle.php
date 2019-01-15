<?php

include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';

header('Content-Type: application/json');
$lat = filter_input(INPUT_POST, 'lat');
$lon = filter_input(INPUT_POST, 'lon');
$id = filter_input(INPUT_POST, 'id');
$servicioDao = new ServicioDao();
$servicioDao->addServicioDetalle($lat, $lon, $id);
echo "{\"servicio_id\":\"".$id."\"}";

