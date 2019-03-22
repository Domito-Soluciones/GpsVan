<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TarifaDao.php';

header('Content-Type: application/json');
$empresa = filter_input(INPUT_POST, 'empresa');
$tarifaDao = new TarifaDao();
$tarifas = $tarifaDao->getTarifasEmpresa($empresa);
echo "[";
for ($i = 0 ; $i < count($tarifas); $i++)
{
    $cId = $tarifas[$i]->getId();
    $descripcion = $tarifas[$i]->getDescripcion();
    $nombre = $tarifas[$i]->getNombre();
    $origen = $tarifas[$i]->getOrigen();
    $destino = $tarifas[$i]->getDestino();
    $valor1 = $tarifas[$i]->getValor1();
    $valor2 = $tarifas[$i]->getValor2();
    $cliente = $tarifas[$i]->getCliente();
    $tipo = $tarifas[$i]->getTipo();
    $horario = $tarifas[$i]->getHorario();
    echo "{\"tarifa_id\":\"".$cId."\","
        . "\"tarifa_descripcion\":\"".$descripcion."\","
        . "\"tarifa_nombre\":\"".$nombre."\","
        . "\"tarifa_origen\":\"".$origen."\","
        . "\"tarifa_destino\":\"".$destino."\","
        . "\"tarifa_valor1\":\"".$valor1."\","
        . "\"tarifa_valor2\":\"".$valor2."\","
        . "\"tarifa_cliente\":\"".$cliente."\","
        . "\"tarifa_tipo\":\"".$tipo."\","
        . "\"tarifa_horario\":\"".$horario."\""
        . "}";
    if (($i+1) != count($tarifas))
    {
        echo ",";
    }
}
echo "]";