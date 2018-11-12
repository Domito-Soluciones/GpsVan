<?php
include '../../util/validarPeticion.php';

include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';


header('Content-Type: application/json; charset=utf-8');
$id = $_REQUEST['id'];
$cliente = $_REQUEST['cliente'];
$usuario = $_REQUEST['usuario'];
$transportista = $_REQUEST['transportista'];
$movil = $_REQUEST['movil'];
$desde = $_REQUEST['desde'];
$hasta = $_REQUEST['hasta'];
$limit = $_REQUEST['limit'];
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getServicios($id,$cliente,$usuario,$transportista,$movil,$desde,$hasta,$limit);
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicioId = $servicios[$i]->getId();
    $servicioPartida = utf8_encode(urldecode($servicios[$i]->getPartida()));
    $servicioDestino = utf8_encode(urldecode($servicios[$i]->getDestino()));
    $servicioCliente = $servicios[$i]->getCliente();
    $servicioUsuario = $servicios[$i]->getUsuario_nombre();
    $servicioTransportista = $servicios[$i]->getTransportista();
    $servicioMovil = $servicios[$i]->getMovil();
    $servicioTipo = $servicios[$i]->getTipo();
    $servicioTarifa = $servicios[$i]->getTarifa();
    $servicioAgente = $servicios[$i]->getAgente();
    $servicioFecha = $servicios[$i]->getFecha();
    
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
        . "\"servicio_fecha\":\"".$servicioFecha."\""
        . "}";
    if (($i+1) != count($servicios))
    {
        echo ",";
    }
}
echo "]";
