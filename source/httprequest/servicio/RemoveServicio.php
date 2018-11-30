<?php
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';

    $idServicio = $_REQUEST['id'];
    $servicioDao = new ServicioDao();
    $servicioDao->cancelarServicio($idServicio);
    print $idServicio;
