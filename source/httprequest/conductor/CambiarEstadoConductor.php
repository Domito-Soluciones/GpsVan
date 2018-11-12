<?php
include '../../util/validarPeticion.php';

include_once '../../query/MovilDao.php';

$conductor = $_REQUEST['usuario'];
$estado = $_REQUEST['estado'];
$movilDao = new MovilDao();
$movilDao->cambiarEstadoConductor($estado, $conductor);

