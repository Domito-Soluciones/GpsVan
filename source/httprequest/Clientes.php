<?php
include '../query/ClienteDao.php';

header('Content-Type: application/json');
if(isset($_REQUEST['cliente']))
{
    $cliente = $_REQUEST['cliente'];
}
else
{
    $cliente = '';
}
$clienteDao = new ClienteDao();
$clientes = $clienteDao->getClientes($cliente);
echo "[";
for ($i = 0 ; $i < count($clientes); $i++)
{
    $clienteId = $clientes[$i]->getId();
    $clienteRazon = $clientes[$i]->getRazon();
    $clienteRut = $clientes[$i]->getRut();
    echo "{\"cliente_id\":\"".$clienteId."\","
        . "\"cliente_razon\":\"".$clienteRazon."\","
        . "\"cliente_rut\":\"".$clienteRut."\""
        . "}";
    if (($i+1) != count($clientes))
    {
        echo ",";
    }
}
echo "]";

