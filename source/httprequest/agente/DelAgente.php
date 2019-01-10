<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/AgenteDao.php';

$rut = filter_input(INPUT_POST, 'rut');
$agenteDao = new AgenteDao();
$agenteDao->eliminarAgente($rut);
echo "{\"agente_eliminado\":\"".$rut."\"}";
