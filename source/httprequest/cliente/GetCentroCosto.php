<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';

header('Content-Type: application/json');
$cliente = filter_input(INPUT_POST, 'cliente');
$clienteDao = new ClienteDao();
$cc = $clienteDao->getCentrosCosto($cliente);
echo "[";
for ($i = 0 ; $i < count($cc); $i++)
{
    $ccNombre = $cc[$i];
    echo "{\"cc_nombre\":\"".$ccNombre."\"}";
    if (($i+1) != count($cc))
    {
        echo ",";
    }

}
echo "]";