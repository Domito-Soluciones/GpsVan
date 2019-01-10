<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TarifaDao.php';

header('Content-Type: application/json');
$nombre = $_REQUEST['nombre'];
$origen = $_REQUEST['origen'];
$destino = $_REQUEST['destino'];
$valor1 = $_REQUEST['valor1'];
$valor2 = $_REQUEST['valor2'];
$cliente = $_REQUEST['cliente'];
$ruta = $_REQUEST['ruta'];
$tarifa = new Tarifa();
$tarifa->setNombre($nombre);
$tarifa->setOrigen($origen);
$tarifa->setDestino($destino);
$tarifa->setValor1($valor1);
$tarifa->setValor2($valor2);
$tarifa->setCliente($cliente);
$tarifa->setRuta($ruta);
$tarifaDao = new TarifaDao();
$tarifaId = $tarifaDao->agregarTarifa($tarifa);
echo "{\"tarifa_id\":\"".$tarifaId."\"}";

