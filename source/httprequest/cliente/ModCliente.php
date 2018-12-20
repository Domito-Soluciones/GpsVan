<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';

header('Content-Type: application/json');
$id = $_REQUEST['id'];
$razon = $_REQUEST['razon'];
$tipo = $_REQUEST['tipo'];
$rut = $_REQUEST['rut'];
$direccion = $_REQUEST['direccion'];
$nombre = $_REQUEST['nombre'];
$telefono = $_REQUEST['telefono'];
$mail = $_REQUEST['mail'];
$mail2 = $_REQUEST['mail2'];
$centro = $_REQUEST['centros'];
$cliente = new Cliente();
$cliente->setId($id);
$cliente->setRazon($razon);
$cliente->setTipo($tipo); 
$cliente->setRut($rut);
$cliente->setDireccion($direccion);
$cliente->setNombreContacto($nombre);
$cliente->setFonoContacto($telefono);
$cliente->setMailContacto($mail);
$cliente->setMailFacturacion($mail2);
$cliente->setCentroCosto($centro);
$clienteDao = new ClienteDao();
$clienteDao->modificarCliente($cliente);
$pasajeros = $_REQUEST['pasajeros'];
$delPasajero = $_REQUEST['delPasajero'];
if($cliente->getId() > 0)
{
    if($pasajeros !== '')
    {
        $clienteDao->asociarPasajeros($cliente->getId(),$pasajeros);
    }
    if($delPasajero != '')
    {
        $clienteDao->asociarConductores(0,$delConductor);
    }
}
echo "{\"cliente_id\":\"".$cliente->getId()."\"}";
