<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TarifaDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$tarifaDao = new TarifaDao();
$tarifaDao->eliminarTarifa($id);
echo "{\"tarifa_eliminada\":\"".$id."\"}";
Log::write_log("DELTARIFA: ".$id, 0);