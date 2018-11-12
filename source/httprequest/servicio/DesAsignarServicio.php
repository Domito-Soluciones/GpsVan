<?php
include '../../util/validarPeticion.php';

include '../../query/ServicioDao.php';


header('Content-Type: application/json; charset=utf-8');
$id = $_REQUEST['id'];
$conductor = $_REQUEST['conductor'];
$servicioDao = new ServicioDao();
$servicio = $servicioDao->desAsignarServicio($id);
$servicioDao->actualizarMovil($conductor);
if($servicio > 0)
{
    $movil = $servicioDao->obtenerMovilDisponible();
    $servicioDao->asignarServicio($id, $movil);
}
    
    echo "{\"servicio_id\":\"".$servicio."\"}";

