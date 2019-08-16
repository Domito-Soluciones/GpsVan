<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$estado = filter_input(INPUT_POST, 'estado');
$observacion = filter_input(INPUT_POST, 'observacion');
$servicioDao = new ServicioDao();
$idServicio = $servicioDao->cambiarEstadoServicio($id, $estado, $observacion);
echo "{\"servicio_id\":\"".$idServicio."\"}";
Log::write_log("MODESTADOSERVICIO: ".$id." ".$estado." ".$observacion, 0);
