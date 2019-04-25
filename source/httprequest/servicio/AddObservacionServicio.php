<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'idServicio');
$observacion = filter_input(INPUT_POST, 'observacion');
$servicioDao = new ServicioDao();
$servicioDao->addObservacionServicio($id,$observacion);
echo "{\"servicio_id\":\"".$id."\"}";
Log::write_log("ADDOBSERVACIONSERVICIO", 0);