<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$estado = filter_input(INPUT_POST, 'estado');
$servicioDao = new ServicioDao();
$idServicio = $servicioDao->cambiarEstadoServicio($id, $estado);
echo "{\"servicio_id\":\"".$idServicio."\"}";
