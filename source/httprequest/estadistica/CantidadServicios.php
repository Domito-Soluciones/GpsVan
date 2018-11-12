<?php
include '../../util/validarPeticion.php';

include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';


header('Content-Type: application/json; charset=utf-8');
$hoy = getdate();
$desde = "";
$hasta = "";
if($_REQUEST['fecha'] == 'dia')
{
    $desde = $hoy['year'] . "-" . $hoy['mon'] . "-" . $hoy['mday'];
    $hasta = $hoy['year'] . "-" . $hoy['mon'] . "-" . $hoy['mday'];
}
else if($_REQUEST['fecha'] == 'mes')
{
    $desde = $hoy['year'] . "-" . $hoy['mon'] . "-01";
    $hasta = $hoy['year'] . "-" . $hoy['mon'] . "-30";
}
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getCountServicios($desde,$hasta);
$recogida = 0;
if(isset($servicios['recogida']))
{
    $recogida = $servicios['recogida'];
}
$especial = 0;
if(isset($servicios['servicio especial']))
{
    $especial = $servicios['servicio especial'];
}
$reparto = 0;
if(isset($servicios['reparto']))
{
    $reparto = $servicios['reparto'];
}
echo "{\"servicio_recogida\":\"".$recogida."\","
    . "\"servicio_especial\":\"".$especial."\","
    . "\"servicio_reparto\":\"".$reparto."\","
    . "\"servicio_total\":\"".($reparto+$recogida+$especial)."\""
    . "}";
