<?php
include '../query/ClienteDao.php';

header('Content-Type: application/json');
$cliente = $_REQUEST['cliente'];
$clienteDao = new ClienteDao();
$clientes = $clienteDao->getClientes($cliente);
echo "[";
for ($i = 0 ; $i < count($clientes); $i++)
{
    $clienteId = $clientes[$i]->getId();
    $clienteNombre = $clientes[$i]->getNombre();
    echo "{\"cliente_id\":\"".$clienteId."\","
        . "\"cliente_nombre\":\"".$clienteNombre."\""
        . "}";
    if (($i+1) != count($clientes))
    {
        echo ",";
    }
}
echo "]";

