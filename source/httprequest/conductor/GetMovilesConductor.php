<?php
include '../../util/validarPeticion.php';
include '../../query/ConductorDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$conductorDao = new ConductorDao();
$moviles = $conductorDao->getMovilesConductor();
echo "[";
for ($i = 0 ; $i < count($moviles); $i++)
{
    $movilId = trim($moviles[$i]->getId());
    $movilPatente = trim($moviles[$i]->getPatente());
    $movilNombre = trim($moviles[$i]->getNombre());
    $movilMarca = trim($moviles[$i]->getMarca());
    $movilModelo = trim($moviles[$i]->getModelo());
    $movilTransportista = trim($moviles[$i]->getTransportista());
    $movilEstado = trim($moviles[$i]->getEstado());
    $movilLat = trim($moviles[$i]->getLat());
    $movilLon = trim($moviles[$i]->getLon());
    $movilServicio = trim($moviles[$i]->getServicio());
    echo "{\"movil_id\":\"".$movilId."\","
        . "\"movil_patente\":\"".$movilPatente."\","
        . "\"movil_nombre\":\"".$movilNombre."\","
        . "\"movil_marca\":\"".$movilMarca."\","
        . "\"movil_modelo\":\"".$movilModelo."\","
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
Log::write_log("GETMOVILESCONDUCTOR", 0);