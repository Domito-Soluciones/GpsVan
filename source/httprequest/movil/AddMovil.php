<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

$patente = $_REQUEST['patente'];
$marca = $_REQUEST['marca'];
$modelo = $_REQUEST['modelo'];
$movil = new Movil();
$movil->setPatente($patente);
$movil->setMarca($marca);
$movil->setModelo($modelo);
$movilDao = new MovilDao();
$movilDao->agregarMovil($movil);

