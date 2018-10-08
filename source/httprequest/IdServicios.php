<?php

include '../query/ServicioDao.php';

header('Content-Type: application/json');
$id = $_REQUEST['id'];
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getIdServicios($id);
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicioId = $servicios[$i]->getId();
    echo "{\"servicio_id\":\"".$servicioId."\""
        . "}";
    if (($i+1) != count($servicios))
    {
        echo ",";
    }
}
echo "]";
