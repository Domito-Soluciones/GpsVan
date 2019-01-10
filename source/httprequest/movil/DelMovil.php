<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$patente = filter_input(INPUT_POST, 'patente');
$id = filter_input(INPUT_POST, 'id');
$movilDao = new MovilDao();
$movilDao->eliminarMovil($patente);
$movilDao->desAsociarConductores($id);
echo "{\"conductor_eliminado\":\"".$rut."\"}";
