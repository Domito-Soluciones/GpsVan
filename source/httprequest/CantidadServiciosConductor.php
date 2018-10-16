<?php

include '../query/ServicioDao.php';
include '../dominio/Servicio.php';


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
$servicios = $servicioDao->getCountServiciosConductor($desde,$hasta);
$i = 0;
echo "{";
foreach ($servicios as $llave => $valor) {
    echo "\"$llave\":\"".$valor."\"";
    if (($i+1) != count($servicios))
    {
        echo ",";
    }
    $i++;
}
echo "}";
