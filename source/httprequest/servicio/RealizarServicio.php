<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$servicioDao = new ServicioDao();
$servicio = $servicioDao->realizarServicio($id);
echo "{\"servicio_id\":\"".$servicio."\""
    . "}";


