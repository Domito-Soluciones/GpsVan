<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/RendicionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$dato = filter_input(INPUT_POST, 'dato');
$valor = filter_input(INPUT_POST, 'valor');
$tipo = filter_input(INPUT_POST, 'tipo');
$rendicion = new Rendicion();
$rendicion->setId($id);
$rendicion->setDato($dato);
$rendicion->setValor($valor);
$rendicion->setTipo($tipo);
$rendicionDao = new RendicionDao();
$rendicionId = $rendicionDao->modificarRendicion($rendicion);
echo "{\"rendicion_id\":\"".$rendicionId."\"}";
Log::write_log("ADDRENDICION", 0);
