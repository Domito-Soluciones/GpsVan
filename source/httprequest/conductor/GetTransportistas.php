<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$conductorDao = new ConductorDao();
$conductores = $conductorDao->getTransportistas();
echo "[";
for ($i = 0 ; $i < count($conductores); $i++)
{
    $cId = $conductores[$i]->getId();
    $nombre = $conductores[$i]->getNombre();
    $papellido = $conductores[$i]->getPapellido();
    $mapellido = $conductores[$i]->getMapellido();
    $contrato = $conductores[$i]->getContrato();
    echo "{\"conductor_id\":\"".$cId."\","
        . "\"conductor_nombre\":\"".$nombre."\","
        . "\"conductor_papellido\":\"".$papellido."\","
        . "\"conductor_mapellido\":\"".$mapellido."\","
        . "\"conductor_contrato\":\"".$contrato."\""
        . "}";
    if (($i+1) != count($conductores))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETTRANSPORTISTAS", 0);
