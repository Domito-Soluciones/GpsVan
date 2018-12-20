<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';

header('Content-Type: application/json');
$id = $_REQUEST['id'];
$nombre = $_REQUEST['nombre'];
$papellido = $_REQUEST['papellido'];
$mapellido = $_REQUEST['mapellido'];
$rut = $_REQUEST['rut'];
$nick = $_REQUEST['nick'];
$password = '';
if(isset($_REQUEST['password']))
{;
$pasajero->setId($id);
    $password = $_REQUEST['password'];
}
$telefono = $_REQUEST['telefono'];
$celular = $_REQUEST['celular'];
$direccion = $_REQUEST['direccion'];
$mail = $_REQUEST['mail'];
$cargo = $_REQUEST['cargo'];
//$nivel = $_REQUEST['nivel'];
$pasajero = new Pasajero();
$pasajero->setId($id);
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
$pasajeroDao->modificarPasajero($pasajero);
echo "{\"pasajero_id\":\"".$pasajero->getId()."\"}";

