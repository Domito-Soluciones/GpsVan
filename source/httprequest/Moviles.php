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
    echo "{\"movil_id\":\"".$movilId."\","
        . "\"movil_nombre\":\"".$movilNombre."\""
        . "}";
    if (($i+1) != count($moviles))
    {
        echo ",";
    }
}
echo "]";
