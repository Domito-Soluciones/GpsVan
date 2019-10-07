<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/NotificacionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$estado = filter_input(INPUT_POST, 'estado');
$notificacionDao = new NotificacionDao();
$notificacionDao->resetNotificacion($id,$estado);
echo "{\"notificacion_id\":\"".$id."\"}";
Log::write_log("RESETNOTIFICACION: ".$id, 0);