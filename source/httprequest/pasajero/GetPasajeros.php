<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$pasajeroDao = new PasajeroDao();
$pasajeros = $pasajeroDao->getPasajeros($busqueda);
echo "[";
for ($i = 0 ; $i < count($pasajeros); $i++)
{
    $cId = $pasajeros[$i]->getId();
    $nombre = $pasajeros[$i]->getNombre();
    $papellido = $pasajeros[$i]->getPapellido();
    $mapellido = $pasajeros[$i]->getMapellido();
    $rut = $pasajeros[$i]->getRut();
    $nick = $pasajeros[$i]->getNick();
    $telefono = $pasajeros[$i]->getTelefono();
    $celular = $pasajeros[$i]->getCelular();
    $direccion = $pasajeros[$i]->getDireccion();
    $punto = $pasajeros[$i]->getPunto();
    $mail = $pasajeros[$i]->getMail();
    $cargo = $pasajeros[$i]->getCargo();
    $nivel = $pasajeros[$i]->getNivel();
    $centroCosto = $pasajeros[$i]->getCentroCosto();
    $empresa = $pasajeros[$i]->getEmpresa();
    $ruta = $pasajeros[$i]->getRuta();
    echo "{\"pasajero_id\":\"".$cId."\","
        . "\"pasajero_nombre\":\"".$nombre."\","
        . "\"pasajero_papellido\":\"".$papellido."\","
        . "\"pasajero_mapellido\":\"".$mapellido."\","
        . "\"pasajero_rut\":\"".$rut."\","
        . "\"pasajero_nick\":\"".$nick."\","
        . "\"pasajero_telefono\":\"".$telefono."\","
        . "\"pasajero_celular\":\"".$celular."\","
        . "\"pasajero_direccion\":\"".$direccion."\","
        . "\"pasajero_punto_encuentro\":\"".$punto."\","
        . "\"pasajero_mail\":\"".$mail."\","
        . "\"pasajero_cargo\":\"".$cargo."\","
        . "\"pasajero_nivel\":\"".$nivel."\","
        . "\"pasajero_centro_costo\":\"".$centroCosto."\","
        . "\"pasajero_empresa\":\"".$empresa."\","
        . "\"pasajero_ruta\":\"".$ruta."\""
        . "}";
    if (($i+1) != count($pasajeros))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETPASAJEROS", 0);