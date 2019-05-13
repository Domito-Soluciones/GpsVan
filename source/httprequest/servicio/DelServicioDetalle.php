<?php
include '../../util/validarSession.php';
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$servicioDao = new ServicioDao();
$servicioDao->delServicioDetalle($id);
echo "{\"servicio_id\":\"".$id."\"}";
Log::write_log("DELSERVICIODETALLE", 0);