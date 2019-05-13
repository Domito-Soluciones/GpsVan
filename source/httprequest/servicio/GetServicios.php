<?php
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json; charset=utf-8');
$id = filter_input(INPUT_POST, 'id');
$empresa = filter_input(INPUT_POST, 'empresa');
$conductor = filter_input(INPUT_POST, 'conductor');
$estado = filter_input(INPUT_POST, 'estado');
$movil = filter_input(INPUT_POST, 'movil');
$truta = filter_input(INPUT_POST, 'truta');
$desde = '';
if(filter_input(INPUT_POST, 'desde') != '')
{
    $desde = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'desde'))->format('Y/m/d');
}
else
{
    $desde = filter_input(INPUT_POST, 'desde');
}
$hdesde = filter_input(INPUT_POST, 'hdesde');
$hasta = '23:59:59';
if(filter_input(INPUT_POST, 'hasta') != '')
{
    $hasta = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'hasta'))->format('Y/m/d');
}
else
{
    $hasta = filter_input(INPUT_POST, 'hasta');
}
$hhasta = filter_input(INPUT_POST, 'hhasta');
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getServicios($id,$empresa,$conductor,$estado,$movil,$truta,$desde,$hdesde,$hasta,$hhasta);
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicioId = $servicios[$i]->getId();
    $servicioCliente = $servicios[$i]->getCliente();
    $servicioRuta = $servicios[$i]->getRuta();
    $servicioTipoRuta = $servicios[$i]->getTruta();
    $servicioFecha = $servicios[$i]->getFecha();
    $servicioHora = $servicios[$i]->getHora();
    $servicioMovil = $servicios[$i]->getMovil();
    $servicioConductor = $servicios[$i]->getConductor();
    $servicioTarifa1 = $servicios[$i]->getTarifa1();
    $servicioTarifa2 = $servicios[$i]->getTarifa2();
    $servicioAgente = $servicios[$i]->getAgente();
    $servicioEstado = $servicios[$i]->getEstado();
    $servicioObAd = $servicios[$i]->getObservacionesAdicionales();
    echo "{\"servicio_id\":\"".$servicioId."\","
        . "\"servicio_cliente\":\"".$servicioCliente."\","
        . "\"servicio_ruta\":\"".$servicioRuta."\","
        . "\"servicio_truta\":\"".$servicioTipoRuta."\","
        . "\"servicio_fecha\":\"".$servicioFecha."\","
        . "\"servicio_hora\":\"".$servicioHora."\","
        . "\"servicio_movil\":\"".$servicioMovil."\","
        . "\"servicio_conductor\":\"".$servicioConductor."\","
        . "\"servicio_tarifa1\":\"".$servicioTarifa1."\","
        . "\"servicio_tarifa2\":\"".$servicioTarifa2."\","
        . "\"servicio_agente\":\"".$servicioAgente."\","
        . "\"servicio_estado\":\"".$servicioEstado."\","
        . "\"servicio_observacion_adicional\":\"".trim($servicioObAd)."\""
        . "}";
    if (($i+1) != count($servicios))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETSERVICIOS", 0);