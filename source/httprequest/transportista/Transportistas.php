<?php
include '../../util/validarPeticion.php';

include '../../query/TransportistaDao.php';

header('Content-Type: application/json');
$transportista = $_REQUEST['transportista'];
$transportistaDao = new TransportistaDao();
$transportistas = $transportistaDao->getTransportistas($transportista);
echo "[";
for ($i = 0 ; $i < count($transportistas); $i++)
{
    $transportistaId = $transportistas[$i]->getId();
    $transportistaNombre = $transportistas[$i]->getNombre();
    echo "{\"transportista_id\":\"".$transportistaId."\","
        . "\"transportista_nombre\":\"".$transportistaNombre."\""
        . "}";
    if (($i+1) != count($transportistas))
    {
        echo ",";
    }
}
echo "]";

