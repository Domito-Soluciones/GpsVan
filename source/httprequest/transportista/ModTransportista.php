<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TransportistaDao.php';

$razon = $_REQUEST['razon'];
$rut = $_REQUEST['rut'];
$direccion = $_REQUEST['direccion'];
$nombre = $_REQUEST['nombre'];
$telefono = $_REQUEST['telefono'];
$mail = $_REQUEST['mail'];
$mail2 = $_REQUEST['mail2'];
$transportista = new Transportista();
$transportista->setRazon($razon);
$transportista->setRut($rut);
$transportista->setDireccion($direccion);
$transportista->setNombreContacto($nombre);
$transportista->setFonoContacto($telefono);
$transportista->setMailContacto($mail);
$transportista->setMailFacturacion($mail2);
$transportistaDao = new TransportistaDao();
$transportistaDao->modificarTransportista($transportista);