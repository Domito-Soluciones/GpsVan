<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

$patente = $_REQUEST['patente'];
$movilDao = new MovilDao();
$movilDao->eliminarMovil($patente);
