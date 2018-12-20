<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/AgenteDao.php';

header('Content-Type: application/json');
$agenteId = $_REQUEST['id'];
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
$agente->setId($agenteId);
$agente->setRut($rut);
$agente->setNombre($nombre);
$agente->setApellidoPat($papellido);
$agente->setApellidoMat($mapellido);
$agente->setTelefono($telefono);
$agente->setCelular($celular);
$agente->setDireccion($direccion);
$agente->setMail($mail);
$agente->setNick($nick);
$agente->setClave($password);
$agente->setCargo($cargo);
$agente->setPerfil($nivel);
$agenteDao = new AgenteDao();
$agenteDao->modificarAgente($agente);
echo "{\"agente_id\":\"".$agente->getId()."\"}";

