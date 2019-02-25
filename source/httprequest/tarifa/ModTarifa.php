<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TarifaDao.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$nombre = filter_input(INPUT_POST, 'nombre');
$origen = filter_input(INPUT_POST, 'origen');
$destino = filter_input(INPUT_POST, 'destino');
$valor1 = filter_input(INPUT_POST, 'valor1');
$valor2 = filter_input(INPUT_POST, 'valor2');
$cliente = filter_input(INPUT_POST, 'cliente');
$tipo = filter_input(INPUT_POST, 'tipo');
$horario = filter_input(INPUT_POST, 'horario');
$tarifa = new Tarifa();
$tarifa->setId($id);
$tarifa->setNombre($nombre);
$tarifa->setOrigen($origen);
$tarifa->setDestino($destino);
$tarifa->setValor1($valor1);
$tarifa->setValor2($valor2);
$tarifa->setCliente($cliente);
$tarifa->setTipo($tipo);
$tarifa->setHorario($horario);
$tarifaDao = new TarifaDao();
$tarifaDao->modificarTarifa($tarifa);
echo "{\"tarifa_id\":\"".$tarifa->getId()."\"}";
