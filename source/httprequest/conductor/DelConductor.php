<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';

$rut = $_REQUEST['rut'];
$conductorDao = new ConductorDao();
$conductorDao->eliminarConductor($rut);
