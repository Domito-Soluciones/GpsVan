<?php

include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';
$lat = $_REQUEST['lat'];
$lon = $_REQUEST['lon'];
$id = $_REQUEST['id'];
$servicioDao = new ServicioDao();
$servicioDao->addServicioDetalle($lat, $lon, $id);
