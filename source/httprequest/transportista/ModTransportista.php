<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TransportistaDao.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$razon = filter_input(INPUT_POST, 'razon');
$rut = filter_input(INPUT_POST, 'rut');
$nombre = filter_input(INPUT_POST, 'nombre');
$direccion = filter_input(INPUT_POST, 'direccion');
$nombreContacto = filter_input(INPUT_POST, 'nombre_contacto');
$telefono = filter_input(INPUT_POST, 'telefono');
$mail = filter_input(INPUT_POST, 'mail');
$mail2 = filter_input(INPUT_POST, 'mail2');
$conductores = filter_input(INPUT_POST, 'conductores');
$moviles = filter_input(INPUT_POST, 'moviles');
$delConductor = filter_input(INPUT_POST, 'delConductor');
$delMovil = filter_input(INPUT_POST, 'delMovil');
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
if($id > 0)
{
    if($conductores != '')
    {
        $transportistaDao->asociarConductores($id,$conductores);
    }
    if($moviles != '')
    {
        $transportistaDao->asociarMoviles($id,$moviles);
    }
    if($delConductor != '')
    {
        $transportistaDao->asociarConductores(0,$delConductor);
    }
    if($delMovil != '')
    {
        $transportistaDao->asociarMoviles(0,$delMovil);
    }
}
echo "{\"transportista_id\":\"".$transportista->getId()."\"}";