<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$movilDao = new MovilDao();
$movil = $movilDao->getMovil($busqueda);
$movilId = trim($movil->getId());
$movilPatente = trim($movil->getPatente());
$movilNombre = trim($movil->getNombre());
$movilMarca = trim($movil->getMarca());
$movilModelo = trim($movil->getModelo());
$movilAnio = trim($movil->getAnio());
$movilColor = trim($movil->getColor());
$movilCantidad = trim($movil->getCantidad());
$movilClase = trim($movil->getClase());
$movilVenPerCir = trim(date("d/m/Y", strtotime($movil->getVenPerCir())));
$movilVenRevTec = trim(date("d/m/Y", strtotime($movil->getVenRevTec())));
$movilVenExt = trim(date("d/m/Y", strtotime($movil->getVenExt())));
$movilKilo = trim($movil->getKilometraje());
$movilMotor = trim($movil->getMotor());
$movilChasis = trim($movil->getChasis());    
$movilSegOb = trim($movil->getSegOb());
$movilVenSegOb = trim(date("d/m/Y", strtotime($movil->getVenSegOb())));
$movilPolizaSegOb = trim($movil->getPolizaSegOb());
$movilSegRcDm = trim($movil->getSegRcDm());
$movilVenSegRcDm = trim(date("d/m/Y", strtotime($movil->getVenSegRcDm())));
$movilPolizaSegRcDm = trim($movil->setPolizaSegRcDm());
$movilSegRcExceso = trim($moviles[$i]->getSegRcExceso());
$movilVenSegRcExceso = trim(date("d/m/Y", strtotime($moviles[$i]->getVenSegRcExceso())));
$movilPolizaSegRcExceso = trim($moviles[$i]->getPolizaSegRcExceso());
$movilValorSegRcExceso = trim($moviles[$i]->getValorSegRcExceso());
$movilTransportista = trim($movil->getTransportista());
$movilEstado = trim($movil->getEstado());
$movilLat = trim($movil->getLat());
$movilLon = trim($movil->getLon());
$movilServicio = trim($movil->getServicio());
echo "{\"movil_id\":\"".$movilId."\","
    . "\"movil_nombre\":\"".$movilNombre."\","
    . "\"movil_patente\":\"".$movilPatente."\","
    . "\"movil_marca\":\"".$movilMarca."\","
    . "\"movil_modelo\":\"".$movilModelo."\","
    . "\"movil_anio\":\"".$movilAnio."\","
    . "\"movil_color\":\"".$movilColor."\","
    . "\"movil_cantidad\":\"".$movilCantidad."\","
    . "\"movil_clase\":\"".$movilClase."\","
    . "\"movil_ven_per_cir\":\"".$movilVenPerCir."\","
    . "\"movil_ven_rev_tec\":\"".$movilVenRevTec."\","
    . "\"movil_ven_ext\":\"".$movilVenExt."\","
    . "\"movil_kilo\":\"".$movilKilo."\","
    . "\"movil_motor\":\"".$movilMotor."\","
    . "\"movil_chasis\":\"".$movilChasis."\","
    . "\"movil_seg_ob\":\"".$movilSegOb."\","
    . "\"movil_ven_seg_ob\":\"".$movilVenSegOb."\","
    . "\"movil_pol_seg_ob\":\"".$movilPolizaSegOb."\","
    . "\"movil_seg_rcdm\":\"".$movilSegRcDm."\","
    . "\"movil_ven_seg_rcdm\":\"".$movilVenSegRcDm."\","
    . "\"movil_pol_seg_rcdm\":\"".$movilPolizaSegRcDm."\","
    . "\"movil_seg_rcexceso\":\"".$movilSegRcExceso."\","
    . "\"movil_ven_seg_rcexceso\":\"".$movilVenSegRcExceso."\","
    . "\"movil_pol_seg_rcexceso\":\"".$movilPolizaSegRcExceso."\","
    . "\"movil_seg_rcexceso_valor\":\"".$movilValorSegRcExceso."\","
    . "\"movil_transportista\":\"".$movilTransportista."\","
    . "\"movil_estado\":\"".$movilEstado."\","
    . "\"movil_lat\":\"".$movilLat."\","
    . "\"movil_lon\":\"".$movilLon."\","
    . "\"movil_servicio\":\"".$movilServicio."\""
    . "}";
Log::write_log("GETMOVIL", 0);