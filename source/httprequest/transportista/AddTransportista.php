<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TransportistaDao.php';

header('Content-Type: application/json');
$razon = filter_input(INPUT_POST, 'razon');
$rut = filter_input(INPUT_POST, 'rut');
$nombre = filter_input(INPUT_POST, 'nombre');
$direccion = filter_input(INPUT_POST, 'direccion');
$telefono = filter_input(INPUT_POST, 'telefono');
$nombreContacto = filter_input(INPUT_POST, 'nombre_contacto');
$mail = filter_input(INPUT_POST, 'mail');
$mail2 = filter_input(INPUT_POST, 'mail2');
$conductores = filter_input(INPUT_POST, 'conductores');
$moviles = filter_input(INPUT_POST, 'moviles');
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
$transportistaId = $transportistaDao->agregarTransportista($transportista);
if($transportistaId > 0)
{
    if($conductores !== '')
    {
        $transportistaDao->asociarConductores($transportistaId,$conductores);
    }
    if($moviles !== '')
    {
        $transportistaDao->asociarMoviles($transportistaId,$moviles);
    }
}
echo "{\"transportista_id\":\"".$transportistaId."\"}";