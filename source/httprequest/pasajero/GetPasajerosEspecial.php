<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$idServicio = filter_input(INPUT_POST, 'id');
$pasajeroDao = new PasajeroDao();
$pasajeros = $pasajeroDao->getPasajerosEspecial($idServicio);
echo "[";
for ($i = 0 ; $i < count($pasajeros); $i++)
{
    $cId = $pasajeros[$i]->getId();
    $nombre = $pasajeros[$i]->getNombre();
    $celular = $pasajeros[$i]->getCelular();
    $punto = $pasajeros[$i]->getPunto();
    echo "{\"pasajero_id\":\"".$cId."\","
        . "\"pasajero_nombre\":\"".$nombre."\","
        . "\"pasajero_celular\":\"".$celular."\","
        . "\"pasajero_punto_encuentro\":\"".$punto."\""
        . "}";
    if (($i+1) != count($pasajeros))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETPASAJEROESPECIAL", 0);