<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';

header('Content-Type: application/json; charset=utf-8');
$idServicio = filter_input(INPUT_POST, 'id');
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getPasajerosServicios($idServicio);
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicio = $servicios[$i];
    $id = $servicio->getId();
    $pasajero = $servicio->getPasajero();
    $hora = $servicio->getHora();
    $estado = $servicio->getEstado();
    $destino = $servicio->getDestino();
        echo "{\"servicio_id\":\"".$id."\","
            . "\"servicio_pasajero\":\"".$pasajero."\","
            . "\"servicio_hora_destino\":\"".$hora."\","
            . "\"servicio_estado\":\"".$estado."\","
            . "\"servicio_destino\":\"".$destino."\"}";
        if (($i+1) != count($servicios))
        {
            echo ",";
        }
}
echo "]";



