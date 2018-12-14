<?php
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';

header('Content-Type: application/json; charset=utf-8');
$busqueda = $_REQUEST['busqueda'];
$desde = '2000/01/01';
$hasta = '2100/01/01';
if(isset($_REQUEST['desde']))
{
    $desde = $_REQUEST['desde'];
}
if(isset($_REQUEST['hasta']))
{
    $desde = $_REQUEST['hasta'];
}
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getServicios($busqueda,$desde,$hasta);
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicioId = $servicios[$i]->getId();
    $servicioPartida = urldecode($servicios[$i]->getPartida());
    $servicioDestino = urldecode($servicios[$i]->getDestino());
    $servicioCliente = $servicios[$i]->getCliente();
    $servicioUsuario = $servicios[$i]->getUsuario_nombre();
    $servicioTransportista = $servicios[$i]->getTransportista();
    $servicioMovil = $servicios[$i]->getMovil();
    $servicioTipo = $servicios[$i]->getTipo();
    $servicioTarifa = $servicios[$i]->getTarifa();
    $servicioAgente = $servicios[$i]->getAgente();
    $servicioFecha = $servicios[$i]->getFecha();
    //if($servicio->getEstado() == 0)
    $servicioEstado = $servicios[$i]->getEstado();
    echo "{\"servicio_id\":\"".$servicioId."\","
        . "\"servicio_partida\":\"".$servicioPartida."\","
        . "\"servicio_destino\":\"".$servicioDestino."\","
        . "\"servicio_cliente\":\"".$servicioCliente."\","
        . "\"servicio_pasajero\":\"".$servicioUsuario."\","
        . "\"servicio_transportista\":\"".$servicioTransportista."\","
        . "\"servicio_movil\":\"".$servicioMovil."\","
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
