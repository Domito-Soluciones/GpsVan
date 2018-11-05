<?php
include_once '../../query/MovilDao.php';

$conductor = $_REQUEST['usuario'];
$movilDao = new MovilDao();
$movilDao->cambiarEstadoConductor(1, $conductor);

