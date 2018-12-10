<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TarifaDao.php';

$nombre = $_REQUEST['nombre'];
$tarifaDao = new TarifaDao();
$tarifaDao->eliminarTarifa($nombre);
