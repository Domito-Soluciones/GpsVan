<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$razon = filter_input(INPUT_POST, 'razon');
$tipo = filter_input(INPUT_POST, 'tipo');
$rut = filter_input(INPUT_POST, 'rut');
$direccion = filter_input(INPUT_POST, 'direccion');
$nombre = filter_input(INPUT_POST, 'nombre');
$telefono = filter_input(INPUT_POST, 'telefono');
$mail = filter_input(INPUT_POST, 'mail');
$mail2 = filter_input(INPUT_POST, 'mail2');
$pasajeros = filter_input(INPUT_POST, 'pasajeros');
$delPasajero = filter_input(INPUT_POST, 'delPasajero');
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
$clienteDao = new ClienteDao();
$clienteDao->modificarCliente($cliente);
if($cliente->getId() > 0)
{
    if($pasajeros !== '')
    {
        $clienteDao->asociarPasajeros($cliente->getId(),$pasajeros);
    }
    if($delPasajero != '')
    {
        $clienteDao->asociarPasajeros(0,$delPasajero);
    }
    $nombres = explode(",", filter_input(INPUT_POST, 'centros'));
    if(count($nombres) > 0)
    {
        $clienteDao->eliminarCentroCosto($cliente->getId());
        $clienteId = $clienteDao->agregarCentroCosto($nombres,$cliente->getId());
    }
}
echo "{\"cliente_id\":\"".$cliente->getId()."\"}";
