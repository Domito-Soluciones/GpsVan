<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$cliente = filter_input(INPUT_POST, 'cliente');
$clienteDao = new ClienteDao();
$cc = $clienteDao->getCentrosCosto($cliente);
echo "[";
for ($i = 0 ; $i < count($cc); $i++)
{
    $ccNombre = $cc[$i];
    echo "{\"cc_nombre\":\"".trim($ccNombre)."\",\"cc_empresa\":\"".trim($cliente)."\"}";
    if (($i+1) != count($cc))
    {
        echo ",";
    }

}
echo "]";
Log::write_log("GETCENTROCOSTO", 0);