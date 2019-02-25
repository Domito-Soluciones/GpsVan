<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'id');
$pasajeroDao = new PasajeroDao();
$pasajero = $pasajeroDao->getPasajero($busqueda);
$cId = $pasajero->getId();
$nombre = $pasajero->getNombre();
$papellido = $pasajero->getPapellido();
$mapellido = $pasajero->getMapellido();
$rut = $pasajero->getRut();
$nick = $pasajero->getNick();
$telefono = $pasajero->getTelefono();
$celular = $pasajero->getCelular();
$direccion = $pasajero->getDireccion();
$punto = $pasajero->getPunto();
$mail = $pasajero->getMail();
$cargo = $pasajero->getCargo();
$nivel = $pasajero->getNivel();
$centroCosto = $pasajero->getCentroCosto();
$empresa = $pasajero->getEmpresa();
$ruta = $pasajero->getRuta();
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