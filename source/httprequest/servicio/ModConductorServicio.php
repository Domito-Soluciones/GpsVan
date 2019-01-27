<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';

header('Content-Type: application/json; charset=utf-8');
$id = filter_input(INPUT_POST, 'id');
$conductor = filter_input(INPUT_POST, 'conductor');
$servicioDao = new ServicioDao();
$servicio = $servicioDao->desAsignarServicio($id,$conductor);
$servicioDao->actualizarMovil($conductor);
if($id > 0)
{
    $movil = $servicioDao->obtenerMovilDisponible();
    $servicioDao->asignarServicio($id, $movil);
}
    
echo "{\"servicio_id\":\"".$servicio."\"}";

