<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/AgenteDao.php';

$nombre = $_REQUEST['nombre'];
$papellido = $_REQUEST['papellido'];
$mapellido = $_REQUEST['mapellido'];
$rut = $_REQUEST['rut'];
$nick = $_REQUEST['nick'];
$password = '';
if(isset($_REQUEST['password']))
{
    $password = $_REQUEST['password'];
}
$telefono = $_REQUEST['telefono'];
$celular = $_REQUEST['celular'];
$direccion = $_REQUEST['direccion'];
$mail = $_REQUEST['mail'];
$cargo = $_REQUEST['cargo'];
$nivel = $_REQUEST['nivel'];
$agente = new Agente();
$agente->setRut($rut);
$agente->setNombre($nombre);
$agente->setPapellido($papellido);
$agente->setMapellido($mapellido);
$agente->setTelefono($telefono);
$agente->setCelular($celular);
$agente->setDireccion($direccion);
$agente->setMail($mail);
$agente->setNick($nick);
$agente->setPassword($password);
$agente->setCargo($cargo);
$agente->setNivel($nivel);
$agenteDao = new AgenteDao();
$agenteDao->modificarAgente($agente);
