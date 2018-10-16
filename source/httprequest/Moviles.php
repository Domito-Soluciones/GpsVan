<?php
include '../query/MovilDao.php';

header('Content-Type: application/json');
$id = $_REQUEST['id'];
$movilDao = new MovilDao();
$moviles = $movilDao->getMoviles($id);
echo "[";
for ($i = 0 ; $i < count($moviles); $i++)
{
    $movilId = $moviles[$i]->getId();
    $movilNombre = $moviles[$i]->getNombre();
    $movilTransportista = $moviles[$i]->getTransportista();
    $movilEstado = $moviles[$i]->getEstado();
    $movilLat = $moviles[$i]->getLat();
    $movilLon = $moviles[$i]->getLon();
    $movilServicio = $moviles[$i]->getServicio();
    echo "{\"movil_id\":\"".$movilId."\","
        . "\"movil_nombre\":\"".$movilNombre."\","
        . "\"movil_transportista\":\"".$movilTransportista."\","
        . "\"movil_estado\":\"".$movilEstado."\","
        . "\"movil_lat\":\"".$movilLat."\","
        . "\"movil_lon\":\"".$movilLon."\","
        . "\"movil_servicio\":\"".$movilServicio."\""
        . "}";
    if (($i+1) != count($moviles))
    {
        echo ",";
    }
}
echo "]";
