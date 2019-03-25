<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConfiguracionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$configuracionDao = new ConfiguracionDao();
$configuraciones = $configuracionDao->getConfiguracion();
echo "[";
for ($i = 0 ; $i < count($configuraciones); $i++)
{
    $id = $configuraciones[$i]->getId();
    $dato = $configuraciones[$i]->getDato();
    $valor = $configuraciones[$i]->getValor();
    echo "{\"configuracion_id\":\"".$id."\","
        . "\"configuracion_dato\":\"".$dato."\","
        . "\"configuracion_valor\":\"".$valor."\""
        . "}";
    if (($i+1) != count($configuraciones))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETCONFIGURACION", 0);