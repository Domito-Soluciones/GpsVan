<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/RendicionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$rendicionDao = new RendicionDao();
$rendiciones = $rendicionDao->getRendiciones($busqueda);
echo "[";
for ($i = 0 ; $i < count($rendiciones); $i++)
{
    $id = $rendiciones[$i]->getId();
    $conductor = $rendiciones[$i]->getConductor();
    $dato = $rendiciones[$i]->getDato();
    $valor = $rendiciones[$i]->getValor();
    $fecha = $rendiciones[$i]->getFecha();
    $tipo = $rendiciones[$i]->getTipo();
    echo "{\"rendicion_id\":\"".$id."\","
        . "\"rendicion_conductor\":\"".$conductor."\","
        . "\"rendicion_dato\":\"".$dato."\","
        . "\"rendicion_valor\":\"".$valor."\","
        . "\"rendicion_fecha\":\"".$fecha."\","
        . "\"rendicion_tipo\":\"".$tipo."\""
        . "}";
    if (($i+1) != count($rendiciones))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETRENDICIONES", 0);