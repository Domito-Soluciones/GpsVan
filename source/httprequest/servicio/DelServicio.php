<?php
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';

header('Content-Type: application/json');
$idServicio = filter_input(INPUT_POST, 'id');
$servicioDao = new ServicioDao();
$servicioDao->cancelarServicio($idServicio);
echo "{\"servicio_id\":\"".$idServicio."\""
    . "}";
