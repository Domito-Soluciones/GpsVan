<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/AgenteDao.php';

header('Content-Type: application/json');
$agenteId = filter_input(INPUT_POST, 'id');
$nombre = filter_input(INPUT_POST, 'nombre');
$papellido = filter_input(INPUT_POST, 'papellido');
$mapellido = filter_input(INPUT_POST, 'mapellido');
$rut = filter_input(INPUT_POST, 'rut');
$nick = filter_input(INPUT_POST, 'nick');
$password = filter_input(INPUT_POST, 'password');
$telefono = filter_input(INPUT_POST, 'telefono');
$celular = filter_input(INPUT_POST, 'celular');
$direccion = filter_input(INPUT_POST, 'direccion');
$mail = filter_input(INPUT_POST, 'mail');
$cargo = filter_input(INPUT_POST, 'cargo');
$nivel = filter_input(INPUT_POST, 'nivel');
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

