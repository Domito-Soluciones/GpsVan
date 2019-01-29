<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$data = filter_input(INPUT_POST, 'movil');
$movilDao = new MovilDao();
$movil = $movilDao->getMovilConductor($data);
$movilId = $movil->getId();
$movilPatente = $movil->getPatente();
$movilNombre = $movil->getNombre();
$movilMarca = $movil->getMarca();
$movilModelo = $movil->getModelo();
$movilAnio = $movil->getAnio();
$movilColor = $movil->getColor();
$movilCantidad = $movil->getCantidad();
$movilTransportista = $movil->getTransportista();
$movilEstado = $movil->getEstado();
$movilLat = $movil->getLat();
$movilLon = $movil->getLon();
$movilConductor = $movil->getConductor();
$movilServicio = $movil->getServicio();
echo "{\"movil_id\":\"".$movilId."\","
    . "\"movil_nombre\":\"".$movilNombre."\","
    . "\"movil_patente\":\"".$movilPatente."\","
    . "\"movil_marca\":\"".$movilMarca."\","
    . "\"movil_modelo\":\"".$movilModelo."\","
    . "\"movil_anio\":\"".$movilAnio."\","
    . "\"movil_color\":\"".$movilColor."\","
    . "\"movil_cantidad\":\"".$movilCantidad."\","
    . "\"movil_estado\":\"".$movilEstado."\","
    . "\"movil_lat\":\"".$movilLat."\","
    . "\"movil_lon\":\"".$movilLon."\","
    . "\"movil_servicio\":\"".$movilServicio."\","
    . "\"movil_conductor\":{"
        . "\"conductor_id\":\"".$movilConductor->getId()."\","
        . "\"conductor_nombre\":\"".$movilConductor->getNombre()."\","
        . "\"conductor_papellido\":\"".$movilConductor->getPapellido()."\","
        . "\"conductor_mapellido\":\"".$movilConductor->getMapellido()."\","
        . "\"conductor_rut\":\"".$movilConductor->getRut()."\","
        . "\"conductor_nick\":\"".$movilConductor->getNick()."\","
        . "\"conductor_telefono\":\"".$movilConductor->getTelefono()."\","
        . "\"conductor_celular\":\"".$movilConductor->getCelular()."\","
        . "\"conductor_direccion\":\"".$movilConductor->getDireccion()."\","
        . "\"conductor_mail\":\"".$movilConductor->getMail()."\""
        . "}";
    echo "}";