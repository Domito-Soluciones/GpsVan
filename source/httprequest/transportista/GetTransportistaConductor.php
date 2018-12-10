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
    $cId = $conductores[$i]->getId();
    $nombre = $conductores[$i]->getNombre();
    $papellido = $conductores[$i]->getPapellido();
    $mapellido = $conductores[$i]->getMapellido();
    $rut = $conductores[$i]->getRut();
    $movil = $conductores[$i]->getMovil();
    echo "{"
        . "\"conductor_id\":\"".$cId."\","
        . "\"conductor_nombre\":\"".$nombre."\","
        . "\"conductor_papellido\":\"".$papellido."\","
        . "\"conductor_mapellido\":\"".$mapellido."\","
        . "\"conductor_rut\":\"".$rut."\","
        . "\"conductor_movil\":\"".$movil."\""
        . "}";
    if (($i+1) != count($transportistas))
    {
        echo ",";
    }
}
echo "]";