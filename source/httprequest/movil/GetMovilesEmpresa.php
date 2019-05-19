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
    $movilId = $moviles[$i]->getId();
    $movilNombre = $moviles[$i]->getNombre();
    $movilPatente = $moviles[$i]->getPatente();
    $movilTransportista = $moviles[$i]->getTransportista();
    $movilEstado = $moviles[$i]->getEstado();
    $movilLat = $moviles[$i]->getLat();
    $movilLon = $moviles[$i]->getLon();
    $movilServicio = $moviles[$i]->getServicio();
    $movilConductor= $moviles[$i]->getConductor();
    $movilConductorNick= $moviles[$i]->getConductorNick();
    $movilConductorNombre = $moviles[$i]->getConductorNombre();
    $movilClienteColor = $moviles[$i]->getColorEmpresa();
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
        . "\"movil_cliente_color\":\"".$movilClienteColor."\""
        . "}";
    if (($i+1) != count($moviles))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETMOVILES", 0);