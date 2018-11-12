<?php
include '../../util/validarPeticion.php';

include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';

header('Content-Type: application/json');
$id = $_REQUEST['id'];
$servicioDao = new ServicioDao();
$servicio = $servicioDao->realizarServicio($id);
echo "{\"servicio_id\":\"".$servicio."\""
    . "}";


