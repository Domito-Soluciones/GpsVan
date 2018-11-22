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
$hoy = getdate();
$desde = $_REQUEST['desde'];

if($desde == '')
{
    if(($id != '' || $cliente != '' || $usuario != '' || $transportista != '' 
        || $movil != ''))
    {
        $desde = '2000-01-01 00:00:00';
    }
    else            
    {
    $desde = $hoy['year'] . "-" . $hoy['mon'] . "-" . $hoy['mday']. ' 00:00:00';
    }
}
$hasta = $_REQUEST['hasta'];
if($hasta == '')
{
    if(($id != '' || $cliente != '' || $usuario != '' || $transportista != '' 
        || $movil != ''))
    {
        $hasta = '2100-01-01 00:00:00';
    }
    else            
    {
        $hasta = $hoy['year'] . "-" . $hoy['mon'] . "-" . $hoy['mday']. ' 23:59:59';    
    }
}
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
