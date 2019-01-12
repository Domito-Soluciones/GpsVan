<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TarifaDao.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$tarifaDao = new TarifaDao();
$tarifas = $tarifaDao->getTarifas($busqueda);
echo "[";
for ($i = 0 ; $i < count($tarifas); $i++)
{
    $cId = $tarifas[$i]->getId();
    $nombre = $tarifas[$i]->getNombre();
    $origen = $tarifas[$i]->getOrigen();
    $destino = $tarifas[$i]->getDestino();
    $valor1 = $tarifas[$i]->getValor1();
    $valor2 = $tarifas[$i]->getValor2();
    $cliente = $tarifas[$i]->getCliente();
    $ruta = $tarifas[$i]->getRuta();
    echo "{\"tarifa_id\":\"".$cId."\","
        . "\"tarifa_nombre\":\"".$nombre."\","
        . "\"tarifa_origen\":\"".$origen."\","
        . "\"tarifa_destino\":\"".$destino."\","
        . "\"tarifa_valor1\":\"".$valor1."\","
        . "\"tarifa_valor2\":\"".$valor2."\","
        . "\"tarifa_cliente\":\"".$cliente."\","
        . "\"tarifa_ruta\":\"".$ruta."\""
        . "}";
    if (($i+1) != count($tarifas))
    {
        echo ",";
    }
}
echo "]";