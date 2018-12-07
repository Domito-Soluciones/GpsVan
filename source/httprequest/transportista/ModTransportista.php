<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TransportistaDao.php';

$razon = $_REQUEST['razon'];
$rut = $_REQUEST['rut'];
$nombre = $_REQUEST['nombre'];
$direccion = $_REQUEST['direccion'];
$nombreContacto = $_REQUEST['nombre_contacto'];
$telefono = $_REQUEST['telefono'];
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
$id = $transportistaDao->modificarTransportista($transportista);
$conductores = explode(",", $_REQUEST['conductores']);
for($i = 0 ; $i < count($conductores) ; $i++)
{
    if($conductores[$i] != '')
    {
        $transportistaDao->addTransportistaConductor($id,$conductores[$i]);
    }
}