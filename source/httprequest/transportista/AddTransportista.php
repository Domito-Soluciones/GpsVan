<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TransportistaDao.php';

$razon = $_REQUEST['razon'];
$rut = $_REQUEST['rut'];
$nombre = $_REQUEST['nombre'];
$direccion = $_REQUEST['direccion'];
$telefono = $_REQUEST['telefono'];
$nombreContacto = $_REQUEST['nombre_contacto'];
$mail = $_REQUEST['mail'];
$mail2 = $_REQUEST['mail2'];
$transportista = new Transportista();
$transportista->setRazon($razon);
$transportista->setRut($rut);
$transportista->setNombre($nombre);
$transportista->setDireccion($direccion);
$transportista->setNombreContacto($nombreContacto);
$transportista->setFonoContacto($telefono);
$transportista->setMailContacto($mail);
$transportista->setMailFacturacion($mail2);
$transportistaDao = new TransportistaDao();
$transportistaDao->agregarTransportista($transportista);