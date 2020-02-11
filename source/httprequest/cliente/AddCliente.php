<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$razon = filter_input(INPUT_POST, 'razon');
$tipo = filter_input(INPUT_POST, 'tipo');
$rut = filter_input(INPUT_POST, 'rut');
$direccion = filter_input(INPUT_POST, 'direccion');
$grupo = filter_input(INPUT_POST, 'grupo');
$color = filter_input(INPUT_POST, 'color');
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
$cliente->setGrupo($grupo);
$cliente->setColor($color);
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
    if(count($nombres) > 0)
    {
        $clienteId = $clienteDao->agregarCentroCosto($nombres,$clienteId);
    }
}
echo "{\"cliente_id\":\"".$clienteId."\"}";
Log::write_log("ADDCLIENTE: " .$cliente->toString(), 0);