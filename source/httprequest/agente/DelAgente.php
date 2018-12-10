<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/AgenteDao.php';

$rut = $_REQUEST['rut'];
$agenteDao = new AgenteDao();
$agenteDao->eliminarAgente($rut);
