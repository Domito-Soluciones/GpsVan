<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';

header('Content-Type: application/json');
$razon = $_REQUEST['razon'];
$tipo = $_REQUEST['tipo'];
$rut = $_REQUEST['rut'];
$direccion = $_REQUEST['direccion'];
$nombre = $_REQUEST['nombre'];
$telefono = $_REQUEST['telefono'];
$mail = $_REQUEST['mail'];
$mail2 = $_REQUEST['mail2'];
$centro = $_REQUEST['centros'];
$pasajeros = $_REQUEST['pasajeros'];
$cliente = new Cliente();
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
$clienteId = $clienteDao->agregarCliente($cliente);
if($clienteId > 0)
{
    if($pasajeros !== '')
    {
        $clienteDao->asociarPasajeros($clienteId,$pasajeros);
    }
}
echo "{\"cliente_id\":\"".$clienteId."\"}";
