<?php
include '../../util/validarPeticion.php';
include '../../query/LiquidacionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json; charset=utf-8');
$id = filter_input(INPUT_POST, 'id');
$empresa = filter_input(INPUT_POST, 'empresa');
$conductor = filter_input(INPUT_POST, 'conductor');
$estado = filter_input(INPUT_POST, 'estado');
$movil = filter_input(INPUT_POST, 'movil');
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
$liquidacionDao = new LiquidacionDao();
$produccion = $liquidacionDao->getProduccion($id,$empresa,$conductor,$estado,$movil,$desde,$hdesde,$hasta,$hhasta);
echo "[";
for ($i = 0 ; $i < count($produccion); $i++)
{
    $servicioId = $produccion[$i]->getId();
    $servicioFecha = $produccion[$i]->getFecha();
    $servicioHora = $produccion[$i]->getHora();
    $servicioTarifa1 = $produccion[$i]->getTarifa1();
    echo "{\"servicio_id\":\"".$servicioId."\","
        . "\"servicio_fecha\":\"".$servicioFecha."\","
        . "\"servicio_hora\":\"".$servicioHora."\","
        . "\"servicio_tarifa1\":\"".$servicioTarifa1."\""
        . "}";
    if (($i+1) != count($produccion))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETPRODUCCION", 0);