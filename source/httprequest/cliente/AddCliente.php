<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';

header('Content-Type: application/json');
$razon = filter_input(INPUT_POST, 'razon');
$tipo = filter_input(INPUT_POST, 'tipo');
$rut = filter_input(INPUT_POST, 'rut');
$direccion = filter_input(INPUT_POST, 'direccion');
$nombre = filter_input(INPUT_POST, 'nombre');
$telefono = filter_input(INPUT_POST, 'telefono');
$mail = filter_input(INPUT_POST, 'mail');
$mail2 = filter_input(INPUT_POST, 'mail2');
$contrato = filter_input(INPUT_POST, 'contrato');
$centro = filter_input(INPUT_POST, 'centros');
$cliente = new Cliente();
$cliente->setRazon($razon);
$cliente->setTipo($tipo); 
$cliente->setRut($rut);
$cliente->setDireccion($direccion);
$cliente->setNombreContacto($nombre);
$cliente->setFonoContacto($telefono);
$cliente->setMailContacto($mail);
$cliente->setMailFacturacion($mail2);
$cliente->setContrato($contrato);
$clienteDao = new ClienteDao();
$clienteId = $clienteDao->agregarCliente($cliente);
if($clienteId > 0)
{
    $nombres = explode(",", filter_input(INPUT_POST, 'centros'));
    $cliente = filter_input(INPUT_POST, 'cliente');
    if(count($nombres) > 0)
    {
        $clienteId = $clienteDao->agregarCentroCosto($nombres,$razon);
    }
}
echo "{\"cliente_id\":\"".$clienteId."\"}";
