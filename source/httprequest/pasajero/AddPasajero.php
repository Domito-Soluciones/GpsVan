<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';

header('Content-Type: application/json');
$rut = $_REQUEST['rut'];
$nombre = $_REQUEST['nombre'];
$papellido = $_REQUEST['papellido'];
$mapellido = $_REQUEST['mapellido'];
$telefono = $_REQUEST['telefono'];
$celular = $_REQUEST['celular'];
$direccion = $_REQUEST['direccion'];
$nick = $_REQUEST['nick'];
$password = $_REQUEST['password'];
$mail = $_REQUEST['mail'];
$cargo = $_REQUEST['cargo'];
//$nivel = $_REQUEST['nivel'];
$pasajero = new Pasajero();
$pasajero->setRut($rut);
$pasajero->setNombre($nombre);
$pasajero->setPapellido($papellido);
$pasajero->setMapellido($mapellido);
$pasajero->setTelefono($telefono);
$pasajero->setCelular($celular);
$pasajero->setDireccion($direccion);
$pasajero->setMail($mail);
$pasajero->setNick($nick);
$pasajero->setPassword($password);
$pasajero->setCargo($cargo);
//$pasajero->setNivel($nivel);
$pasajeroDao = new PasajeroDao();
$pasajeroId = $pasajeroDao->agregarPasajero($pasajero);
echo "{\"pasajero_id\":\"".$pasajeroId."\"}";

