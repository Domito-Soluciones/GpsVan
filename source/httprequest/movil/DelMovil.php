<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

$patente = $_REQUEST['patente'];
$id = $_REQUEST['id'];
$movilDao = new MovilDao();
$movilDao->eliminarMovil($patente);
$movilDao->desAsociarConductores($id);
