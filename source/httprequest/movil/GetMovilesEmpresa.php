<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$movilDao = new MovilDao();
$moviles = $movilDao->getMovilesEmpresa($busqueda);
echo "[";
for ($i = 0 ; $i < count($moviles); $i++)
{
    $movilId = trim($moviles[$i]->getId());
    $movilNombre = trim($moviles[$i]->getNombre());
    $movilPatente = trim($moviles[$i]->getPatente());
    $movilTransportista = trim($moviles[$i]->getTransportista());
    $movilEstado = trim($moviles[$i]->getEstado());
    $movilLat = trim($moviles[$i]->getLat());
    $movilLon = trim($moviles[$i]->getLon());
    $movilServicio = trim($moviles[$i]->getServicio());
    $movilConductor = trim($moviles[$i]->getConductor());
    $movilConductorNick = trim($moviles[$i]->getConductorNick());
    $movilConductorNombre = trim($moviles[$i]->getConductorNombre());
    $movilClienteNombre = trim($moviles[$i]->getNombreEmpresa());
    $movilClienteColor = trim($moviles[$i]->getColorEmpresa());
    echo "{\"movil_id\":\"".$movilId."\","
        . "\"movil_nombre\":\"".$movilNombre."\","
        . "\"movil_patente\":\"".$movilPatente."\","
        . "\"movil_estado\":\"".$movilEstado."\","
        . "\"movil_lat\":\"".$movilLat."\","
        . "\"movil_lon\":\"".$movilLon."\","
        . "\"movil_servicio\":\"".$movilServicio."\","
        . "\"movil_conductor\":\"".$movilConductor."\","
        . "\"movil_conductor_nombre\":\"".$movilConductorNombre."\","
        . "\"movil_conductor_nick\":\"".$movilConductorNick."\","
        . "\"movil_cliente_nombre\":\"".$movilClienteNombre."\","
        . "\"movil_cliente_color\":\"".$movilClienteColor."\""
        . "}";
    if (($i+1) != count($moviles))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETMOVILES", 0);