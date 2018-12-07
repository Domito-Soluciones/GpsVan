<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TransportistaDao.php';

header('Content-Type: application/json');
$transportista = $_REQUEST['id'];
$transportistaDao = new TransportistaDao();
$conductores = $transportistaDao->getTransportistaConductor($transportista);
echo "[";
for ($i = 0 ; $i < count($conductores); $i++)
{
    $idConductor = $conductores[$i];
    echo "{\"conductor_id\":\"".$idConductor."\""
        . "}";
    if (($i+1) != count($transportistas))
    {
        echo ",";
    }
}
echo "]";