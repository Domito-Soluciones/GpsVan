<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ClienteDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$cliente = filter_input(INPUT_POST, 'cliente');
$clienteDao = new ClienteDao();
$centrosCosto = $clienteDao->getCentrosCosto($cliente);
echo "[";
for ($i = 0 ; $i < count($centrosCosto); $i++)
{
    $cc = $centrosCosto[$i];
    $id = $cc->getId();
    $nombre = $cc->getNombre();
    echo "{\"cc_id\":\"".$id."\",\"cc_nombre\":\"".$nombre."\",\"cc_empresa\":\"".trim($cliente)."\"}";
    if (($i+1) != count($centrosCosto))
    {
        echo ",";
    }

}
echo "]";
Log::write_log("GETCENTROCOSTO", 0);