<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';
include '../../dominio//Tarifa.php';
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
$tarifas = json_decode(filter_input(INPUT_POST, 'tarifas'),true);
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
$clienteIdTarifa = $clienteId;
if($clienteId > 0)
{
    $nombres = explode(",", filter_input(INPUT_POST, 'centros'));
    if(count($nombres) > 0)
    {
        $clienteId = $clienteDao->agregarCentroCosto($nombres,$clienteId);
    }
    foreach ($tarifas as $key => $value) {
            $tarifa = new Tarifa();
            $tarifa->setDescripcion($value['tarifa_descripcion']);
            $tarifa->setNumero($value['tarifa_numero']);
            $tarifa->setHora($value['tarifa_hora']);
            $tarifa->setNombre($value['tarifa_nombre']);
            $tarifa->setOrigen($value['tarifa_origen']);
            $tarifa->setDestino($value['tarifa_destino']);
            $tarifa->setValor1($value['tarifa_valor1']);
            $tarifa->setValor2($value['tarifa_valor2']);
            $tarifa->setCliente($clienteIdTarifa);
            $tarifa->setTipo($value['tarifa_tipo']);
            $tarifa->setHorario($value['tarifa_horario']);
            $clienteDao->agregarTarifa($tarifa);
        }
}
echo "{\"cliente_id\":\"".$clienteIdTarifa."\"}";
Log::write_log("ADDCLIENTE: " .$cliente->toString(), 0);