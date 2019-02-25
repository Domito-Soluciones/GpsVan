<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/NotificacionDao.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$notificacionDao = new NotificacionDao();
$notificacionDao->modificarEstadoNotificacion($id);
echo "{\"notificacion_id\":\"".$id."\"}";
