<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';

header('Content-Type: application/json; charset=utf-8');
$idServicio = filter_input(INPUT_POST, 'id');
$conductor = filter_input(INPUT_POST, 'conductor');
$idAnt = "";
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getServicioProgramado($idServicio,$conductor);
echo "[";
$j = 0;
for ($i = 0 ; $i < count($servicios); $i++)
{
    $pasajeros = "";
    $servicio = $servicios[$i];
    $id = $servicio->getId();
    $cliente = $servicio->getCliente();
    $clienteDireccion = $servicio->getClienteDireccion();
    $ruta = $servicio->getRuta();
    $timestamp = strtotime($servicio->getFecha());
    $fecha = date('d-m-Y',$timestamp);
    $hora = $servicio->getHora();
    $movil = $servicio->getMovil();
    $estado = $servicio->getEstado();
    $conductor = $servicio->getConductor();
    $tarifa = $servicio->getTarifa1();
    $observacion = $servicio->getObservaciones();
    $pasajeroId = $servicio->getPasajero()->getId();
    $pasajeroNombre = $servicio->getPasajero()->getNombre();
    $pasajeroCelular = $servicio->getPasajero()->getCelular();
    $destino = $servicio->getDestino();
        echo "{\"servicio_id\":\"".$id."\","
            . "\"servicio_cliente\":\"".$cliente."\","
            . "\"servicio_cliente_direccion\":\"".$clienteDireccion."\","
            . "\"servicio_ruta\":\"".$ruta."\","
            . "\"servicio_fecha\":\"".$fecha."\","
            . "\"servicio_hora\":\"".$hora."\","
            . "\"servicio_estado\":\"".$estado."\","
            . "\"servicio_movil\":\"".$movil."\","
            . "\"servicio_conductor\":\"".$conductor."\","
            . "\"servicio_tarifa\":\"".$tarifa."\","
            . "\"servicio_observacion\":\"".$observacion."\","
            . "\"servicio_pasajero_id\":\"".$pasajeroId."\","
            . "\"servicio_pasajero_nombre\":\"".$pasajeroNombre."\","
            . "\"servicio_pasajero_celular\":\"".$pasajeroCelular."\","
            . "\"servicio_destino\":\"".$destino."\"}";
        
        if (($i+1) != count($servicios))
        {
            echo ",";
        }
}
echo "]";

