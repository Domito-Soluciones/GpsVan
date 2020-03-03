<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json; charset=utf-8');
$idServicio = filter_input(INPUT_POST, 'id');
$cc = filter_input(INPUT_POST, 'cc');
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getPasajerosServicios($idServicio,$cc);
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicio = $servicios[$i];
    $id = $servicio->getId();
    $pasajero = $servicio->getPasajero();
    $hora = $servicio->getHora();
    $estado = $servicio->getEstado();
    $estadoCancelacion = $servicio->getEstadoCancelacion();
    $destino = $servicio->getDestino();
    $lat = $servicio->getLatDestino();
    $lon = $servicio->getLonDestino();
        echo "{\"servicio_id\":\"".$id."\","
            . "\"servicio_pasajero\":\"".$pasajero."\","
            . "\"servicio_hora_destino\":\"".$hora."\","
            . "\"servicio_estado\":\"".$estado."\","
            . "\"servicio_estado_cancelacion\":\"".trim($estadoCancelacion)."\","
            . "\"servicio_lat_destino\":\"".$lat."\","
            . "\"servicio_lon_destino\":\"".$lon."\","
            . "\"servicio_destino\":\"".$destino."\"}";
        if (($i+1) != count($servicios))
        {
            echo ",";
        }
}
echo "]";
Log::write_log("GETPASAJEROSSERVICIO", 0);


