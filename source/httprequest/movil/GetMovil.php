<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$busqueda = $_REQUEST['busqueda'];
$movilDao = new MovilDao();
$movil = $movilDao->getMovil($busqueda);
$movilId = $movil->getId();
$movilNombre = $movil->getNombre();
$movilPatente = $movil->getPatente();
$movilMarca = $movil->getMarca();
$movilModelo = $movil->getModelo();
$movilAnio = $movil->getAnio();
$movilCantidad = $movil->getCantidad();
$movilClase = $movil->getClase();
$movilVenRevTec = date("d/m/Y", strtotime($movil->getVenRevTec()));
$movilSegOb = $movil->getSegOb();
$movilVenSegOb = date("d/m/Y", strtotime($movil->getVenSegOb()));
$movilSegAd = $movil->getSegAd();
$movilKilo = $movil->getKilometraje();
$movilTransportista = $movil->getTransportista();
$movilEstado = $movil->getEstado();
$movilLat = $movil->getLat();
$movilLon = $movil->getLon();
$movilServicio = $movil->getServicio();
echo "{\"movil_id\":\"".$movilId."\","
    . "\"movil_nombre\":\"".$movilNombre."\","
    . "\"movil_patente\":\"".$movilPatente."\","
    . "\"movil_marca\":\"".$movilMarca."\","
    . "\"movil_modelo\":\"".$movilModelo."\","
    . "\"movil_anio\":\"".$movilAnio."\","
    . "\"movil_cantidad\":\"".$movilCantidad."\","
    . "\"movil_clase\":\"".$movilClase."\","
    . "\"movil_ven_rev_tec\":\"".$movilVenRevTec."\","
    . "\"movil_seg_ob\":\"".$movilSegOb."\","
    . "\"movil_ven_seg_ob\":\"".$movilVenSegOb."\","
    . "\"movil_seg_ad\":\"".$movilSegAd."\","
    . "\"movil_kilo\":\"".$movilKilo."\","
    . "\"movil_transportista\":\"".$movilTransportista."\","
    . "\"movil_estado\":\"".$movilEstado."\","
    . "\"movil_lat\":\"".$movilLat."\","
    . "\"movil_lon\":\"".$movilLon."\","
    . "\"movil_servicio\":\"".$movilServicio."\""
    . "}";