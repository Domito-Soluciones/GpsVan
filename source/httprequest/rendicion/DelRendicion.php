<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/RendicionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$rendicionDao = new RendicionDao();
$rendicionDao->eliminarRendicion($id);
echo "{\"rendicion_eliminada\":\"".$id."\"}";
Log::write_log("DELRENDICION", 0);