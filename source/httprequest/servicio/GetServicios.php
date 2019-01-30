<?php
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';

header('Content-Type: application/json; charset=utf-8');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$desde = filter_input(INPUT_POST, 'desde');
$hasta = filter_input(INPUT_POST, 'hasta');
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getServicios($busqueda,$desde,$hasta);
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicioId = $servicios[$i]->getId();
    $servicioPartida = $servicios[$i]->getPartida();
    $servicioDestInt1 = $servicios[$i]->getDestinoInt1();
    $servicioDestInt2 = $servicios[$i]->getDestinoInt2();
    $servicioDestInt3 = $servicios[$i]->getDestinoInt3();
    $servicioDestFinal = $servicios[$i]->getDestinoFinal();
    $servicioCliente = $servicios[$i]->getCliente();
    $servicioUsuario = $servicios[$i]->getUsuario_nombre();
    $servicioTransportista = $servicios[$i]->getTransportista();
    $servicioMovil = $servicioDao->obtenerMovilServicio($servicios[$i]->getMovil());
    $servicioTipo = $servicios[$i]->getTipo();
    $servicioTarifa = $servicios[$i]->getTarifa();
    $servicioAgente = $servicios[$i]->getAgente();
    $servicioFecha = $servicios[$i]->getFecha();
    $servicioEstado = $servicios[$i]->getEstado();
    echo "{\"servicio_id\":\"".$servicioId."\","
        . "\"servicio_partida\":\"".$servicioPartida."\","
        . "\"servicio_destino_int1\":\"".$servicioDestInt1."\","
        . "\"servicio_destino_int2\":\"".$servicioDestInt2."\","
        . "\"servicio_destino_int3\":\"".$servicioDestInt3."\","
        . "\"servicio_destino_final\":\"".$servicioDestFinal."\","
        . "\"servicio_cliente\":\"".$servicioCliente."\","
        . "\"servicio_pasajero\":\"".$servicioUsuario."\","
        . "\"servicio_transportista\":\"".$servicioTransportista."\","
        . "\"servicio_movil\":\"".$servicioMovil->getNombre()."\","
        . "\"servicio_movil_lat\":\"".$servicioMovil->getLat()."\","
        . "\"servicio_movil_lon\":\"".$servicioMovil->getLon()."\","
        . "\"servicio_tipo\":\"".$servicioTipo."\","
        . "\"servicio_tarifa\":\"".$servicioTarifa."\","
        . "\"servicio_agente\":\"".$servicioAgente."\","
        . "\"servicio_fecha\":\"".$servicioFecha."\","
        . "\"servicio_estado\":\"".$servicioEstado."\""
        . "}";
    if (($i+1) != count($servicios))
    {
        echo ",";
    }
}
echo "]";
