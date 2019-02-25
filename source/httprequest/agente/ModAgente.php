<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/AgenteDao.php';
include '../../cripto/Cripto.php';

header('Content-Type: application/json');
$cripto = new Cripto();
$agenteId = filter_input(INPUT_POST, 'id');
$nombre = filter_input(INPUT_POST, 'nombre');
$papellido = filter_input(INPUT_POST, 'papellido');
$mapellido = filter_input(INPUT_POST, 'mapellido');
$rut = filter_input(INPUT_POST, 'rut');
$nick = filter_input(INPUT_POST, 'nick');
$password = $cripto->encriptar(filter_input(INPUT_POST, 'password'));
$telefono = filter_input(INPUT_POST, 'telefono');
$celular = filter_input(INPUT_POST, 'celular');
$direccion = filter_input(INPUT_POST, 'direccion');
$mail = filter_input(INPUT_POST, 'mail');
$perfil = filter_input(INPUT_POST, 'perfil');
$empresa = filter_input(INPUT_POST, 'empresa');
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
$agente->setPerfil($perfil);
$agente->setEmpresa($empresa);
$agenteDao = new AgenteDao();
$agenteDao->modificarAgente($agente);
echo "{\"agente_id\":\"".$agente->getId()."\"}";

