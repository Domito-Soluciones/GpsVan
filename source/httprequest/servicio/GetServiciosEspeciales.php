<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json; charset=utf-8');
$conductor = filter_input(INPUT_POST, 'conductor');
$idAnt = "";
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getServicioEspeciales($conductor);
echo "[";
$j = 0;
for ($i = 0 ; $i < count($servicios); $i++)
{
    $pasajeros = "";
    $servicio = $servicios[$i];
    $id = $servicio->getId();
    $partida = $servicio->getPartida();
    $destino = $servicio->getDestino();
    $pasajero = $servicio->getPasajero();
    $celular= $servicio->getCelular();
    $timestamp = strtotime($servicio->getFecha());
    $fecha = date('d-m-Y',$timestamp);
    $hora = $servicio->getHora();
    $movil = $servicio->getMovil();
    $estado = $servicio->getEstado();
    $conductor = $servicio->getConductor();
    $tarifa = $servicio->getTarifa();
    $observacion = $servicio->getObservaciones();
        echo "{\"servicio_id\":\"".$id."\","
            . "\"servicio_partida\":\"".$partida."\","
            . "\"servicio_destino\":\"".$destino."\","
            . "\"servicio_pasajero\":\"".$pasajero."\","
            . "\"servicio_celular\":\"".$celular."\","
            . "\"servicio_fecha\":\"".$fecha."\","
            . "\"servicio_hora\":\"".$hora."\","
            . "\"servicio_estado\":\"".$estado."\","
            . "\"servicio_movil\":\"".$movil."\","
            . "\"servicio_conductor\":\"".$conductor."\","
            . "\"servicio_tarifa\":\"".$tarifa."\","
            . "\"servicio_observacion\":\"".$observacion."\"}";
        
        if (($i+1) != count($servicios))
        {
            echo ",";
        }
}
echo "]";
Log::write_log("GETSERVICIOSESPECIALES", 0);

