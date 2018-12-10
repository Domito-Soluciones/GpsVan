<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/AgenteDao.php';

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
$nivel = $_REQUEST['nivel'];
$agente = new Agente();
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
$agenteDao->agregarAgente($agente);

