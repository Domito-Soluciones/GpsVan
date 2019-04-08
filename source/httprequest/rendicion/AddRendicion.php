<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/RendicionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$conductor = filter_input(INPUT_POST, 'conductor');
$dato = filter_input(INPUT_POST, 'dato');
$valor = filter_input(INPUT_POST, 'valor');
$fecha = filter_input(INPUT_POST, 'fecha');
$tipo = filter_input(INPUT_POST, 'tipo');
$rendicion = new Rendicion();
$rendicion->setConductor($conductor);
$rendicion->setDato($dato);
$rendicion->setValor($valor);
$rendicion->setFecha($fecha);
$rendicion->setTipo($tipo);
$rendicionDao = new RendicionDao();
$rendicionId = $rendicionDao->agregarRendicion($rendicion);
echo "{\"rendicion_id\":\"".$rendicionId."\"}";
Log::write_log("ADDRENDICION", 0);
