<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json; charset=utf-8');
$idServicio = filter_input(INPUT_POST, 'id');
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getServicioReal($idServicio);
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicio = $servicios[$i];
    $id = $servicio->getId();
    $lat = $servicio->getLat();
    $lon = $servicio->getLon();
        echo "{\"servicio_id\":\"".$id."\","
            . "\"servicio_lat\":\"".$lat."\","
            . "\"servicio_lon\":\"".$lon."\"}";
        
        if (($i+1) != count($servicios))
        {
            echo ",";
        }
}
echo "]";
Log::write_log("GETDETALLESERVICIOREAL", 0);


