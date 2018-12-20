<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';

header('Content-Type: application/json');
$busqueda = $_REQUEST['busqueda'];
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
    $mail = $pasajeros[$i]->getMail();
    $cargo = $pasajeros[$i]->getCargo();
    $nivel = $pasajeros[$i]->getNivel();
    $cliente = $pasajeros[$i]->getCliente();
    echo "{\"pasajero_id\":\"".$cId."\","
        . "\"pasajero_nombre\":\"".$nombre."\","
        . "\"pasajero_papellido\":\"".$papellido."\","
        . "\"pasajero_mapellido\":\"".$mapellido."\","
        . "\"pasajero_rut\":\"".$rut."\","
        . "\"pasajero_nick\":\"".$nick."\","
        . "\"pasajero_telefono\":\"".$telefono."\","
        . "\"pasajero_celular\":\"".$celular."\","
        . "\"pasajero_direccion\":\"".$direccion."\","
        . "\"pasajero_mail\":\"".$mail."\","
        . "\"pasajero_cargo\":\"".$cargo."\","
        . "\"pasajero_nivel\":\"".$nivel."\","
        . "\"pasajero_cliente\":\"".$cliente."\""
        . "}";
    if (($i+1) != count($pasajeros))
    {
        echo ",";
    }
}
echo "]";