<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TransportistaDao.php';

$id = $_REQUEST['id'];
$razon = $_REQUEST['razon'];
$rut = $_REQUEST['rut'];
$nombre = $_REQUEST['nombre'];
$direccion = $_REQUEST['direccion'];
$nombreContacto = $_REQUEST['nombre_contacto'];
$telefono = $_REQUEST['telefono'];
$mail = $_REQUEST['mail'];
$mail2 = $_REQUEST['mail2'];
$transportista = new Transportista();
$transportista->setId($id);
$transportista->setRazon($razon);
$transportista->setRut($rut); 
$transportista->setNombre($nombre);
$transportista->setDireccion($direccion);
$transportista->setNombreContacto($nombreContacto);
$transportista->setFonoContacto($telefono);
$transportista->setMailContacto($mail);
$transportista->setMailFacturacion($mail2);
$transportistaDao = new TransportistaDao();
$transportistaDao->modificarTransportista($transportista);
$conductores = $_REQUEST['conductores'];
$moviles = $_REQUEST['moviles'];
if($id > 0)
{
    if($conductores !== '')
    {
        $transportistaDao->asociarConductores($id,$conductores);
    }
    if($moviles !== '')
    {
        $transportistaDao->asociarMoviles($id,$moviles);
    }
}