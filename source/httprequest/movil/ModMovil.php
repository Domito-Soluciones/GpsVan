<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$movilId = $_REQUEST['id'];
$patente = $_REQUEST['patente'];
$marca = $_REQUEST['marca'];
$nombre = $_REQUEST['nombre'];
$modelo = $_REQUEST['modelo'];
$anio = $_REQUEST['anio'];
$venRevTec = date("Y/m/d", strtotime($_REQUEST['venrevtec']));
$segOb = $_REQUEST['segob'];
$venSegOb = date("Y/m/d", strtotime($_REQUEST['vensegob']));
$segAd = $_REQUEST['segad'];
$kilo = $_REQUEST['kilo'];
$movil = new Movil();
$movil->setId($movilId);
$movil->setPatente($patente);
$movil->setMarca($marca);
$movil->setNombre($nombre);
$movil->setModelo($modelo);
$movil->setAnio($anio);
$movil->setVenRevTec($venRevTec);
$movil->setSegOb($segOb);
$movil->setVenSegOb($venSegOb);
$movil->setSegAd($segAd);
$movil->setKilometraje($kilo);
$movilDao = new MovilDao();
$movilDao->modificarMovil($movil);
echo "{\"movil_id\":\"".$movil->getId()."\"}";

