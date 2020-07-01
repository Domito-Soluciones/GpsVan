<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$cliente = filter_input(INPUT_POST, 'cliente');
$pasajeroDao = new PasajeroDao();
$pasajeros = $pasajeroDao->getPasajeros($busqueda,$cliente);
echo "[";
for ($i = 0 ; $i < count($pasajeros); $i++)
{
    $cId = $pasajeros[$i]->getId();
    $nombre = trim($pasajeros[$i]->getNombre());
    $papellido = trim($pasajeros[$i]->getPapellido());
    $mapellido = trim($pasajeros[$i]->getMapellido());
    $rut = trim($pasajeros[$i]->getRut());
    $nick = trim($pasajeros[$i]->getNick());
    $telefono = trim($pasajeros[$i]->getTelefono());
    $celular = trim($pasajeros[$i]->getCelular());
    $direccion = trim($pasajeros[$i]->getDireccion());
    $punto = trim($pasajeros[$i]->getPunto());
    $mail = trim($pasajeros[$i]->getMail());
    $cargo = trim($pasajeros[$i]->getCargo());
    $nivel = trim($pasajeros[$i]->getNivel());
    $centroCosto = trim($pasajeros[$i]->getCentroCosto());
    $empresa = trim($pasajeros[$i]->getEmpresa());
    $empresaNombre = trim($pasajeros[$i]->getEmpresaNombre());
    $ruta = trim($pasajeros[$i]->getRuta());
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
        . "\"pasajero_empresa_nombre\":\"".$empresaNombre."\","
        . "\"pasajero_ruta\":\"".$ruta."\""
        . "}";
    if (($i+1) != count($pasajeros))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETPASAJEROS", 0);