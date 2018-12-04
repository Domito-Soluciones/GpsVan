<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TransportistaDao.php';

$rut = $_REQUEST['rut'];
$transportistaDao = new TransportistaDao();
$transportistaDao->eliminarTransportista($rut);
