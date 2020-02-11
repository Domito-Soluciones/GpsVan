<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
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
$cliente = new Cliente();
$cliente->setId($id);
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
$clienteDao->modificarCliente($cliente);
if($cliente->getId() > 0)
{
    $nombres = explode(",", filter_input(INPUT_POST, 'centros'));
    if(count($nombres) > 0)
    {
        $clienteDao->eliminarCentroCosto($cliente->getId());
        $clienteId = $clienteDao->agregarCentroCosto($nombres,$cliente->getId());
    }
}
echo "{\"cliente_id\":\"".$cliente->getId()."\"}";
Log::write_log("MODCLIENTE: " .$cliente->toString(), 0);