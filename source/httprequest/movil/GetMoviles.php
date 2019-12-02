<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$movilDao = new MovilDao();
$moviles = $movilDao->getMoviles($busqueda);
echo "[";
for ($i = 0 ; $i < count($moviles); $i++)
{
    $movilId = trim($moviles[$i]->getId());
    $movilNombre = trim($moviles[$i]->getNombre());
    $movilPatente = trim($moviles[$i]->getPatente());
    $movilMarca = trim($moviles[$i]->getMarca());
    $movilModelo = trim($moviles[$i]->getModelo());
    $movilAnio = trim($moviles[$i]->getAnio());
    $movilColor = trim($moviles[$i]->getColor());
    $movilCantidad = trim($moviles[$i]->getCantidad());
    $movilClase = trim($moviles[$i]->getClase());
    $movilGps = trim($moviles[$i]->getGps());
    $movilCelular = trim($moviles[$i]->getCelular());
    $movilApp = trim($moviles[$i]->getApp());
    $movilTipo = trim($moviles[$i]->getTipo());
    $movilVenPerCir = trim(date("d/m/Y", strtotime($moviles[$i]->getVenPerCir())));
    $movilVenRevTec = trim(date("d/m/Y", strtotime($moviles[$i]->getVenRevTec())));
    $movilVenExt = trim(date("d/m/Y", strtotime($moviles[$i]->getVenExt())));
    $movilKilo = trim($moviles[$i]->getKilometraje());
    $movilMotor = trim($moviles[$i]->getMotor());
    $movilChasis = trim($moviles[$i]->getChasis());    
    $movilSegOb = trim($moviles[$i]->getSegOb());
    $movilVenSegOb = trim(date("d/m/Y", strtotime($moviles[$i]->getVenSegOb())));
    $movilPolizaSegOb = trim($moviles[$i]->getPolizaSegOb());
    $movilValorSegOb = trim($moviles[$i]->getValorSegOb());
    $movilSegRcDm = trim($moviles[$i]->getSegRcDm());
    $movilVenSegRcDm = trim(date("d/m/Y", strtotime($moviles[$i]->getVenSegRcDm())));
    $movilPolizaSegRcDm = trim($moviles[$i]->getPolizaSegRcDm());
    $movilValorSegRcDm = trim($moviles[$i]->getValorSegRcDm());
    $movilSegAs = trim($moviles[$i]->getSegAs());
    $movilVenSegAs = trim(date("d/m/Y", strtotime($moviles[$i]->getVenSegAs())));
    $movilPolizaSegAs = trim($moviles[$i]->getPolizaSegAs());
    $movilValorSegAs = trim($moviles[$i]->getValorSegAs());
    $movilSegRcExceso = trim($moviles[$i]->getSegRcExceso());
    $movilVenSegRcExceso = trim(date("d/m/Y", strtotime($moviles[$i]->getVenSegRcExceso())));
    $movilPolizaSegRcExceso = trim($moviles[$i]->getPolizaSegRcExceso());
    $movilValorSegRcExceso = trim($moviles[$i]->getValorSegRcExceso());
    $movilTransportista = trim($moviles[$i]->getTransportista());
    $movilEstado = trim($moviles[$i]->getEstado());
    $movilLat = trim($moviles[$i]->getLat());
    $movilLon = trim($moviles[$i]->getLon());
    $movilServicio = trim($moviles[$i]->getServicio());
    $movilConductor = trim($moviles[$i]->getConductor());
    $movilConductorNick = trim($moviles[$i]->getConductorNick());
    $movilConductorNombre = trim($moviles[$i]->getConductorNombre());
    $adjuntoPerCir = trim($moviles[$i]->getAdjuntoPerCir());
    $adjuntoRevTec = trim($moviles[$i]->getAdjuntoRevTec());
    $adjuntoNMotor = trim($moviles[$i]->getAdjuntoNMotor());
    $adjuntoSeremi = trim($moviles[$i]->getAdjuntoSeremi());
    $adjuntoSegOb = trim($moviles[$i]->getAdjuntoSegOb());
    $adjuntoSegRcDm = trim($moviles[$i]->getAdjuntoSegRcDm());
    $adjuntoSegAs = trim($moviles[$i]->getAdjuntoSegAsiento());
    $adjuntoSegExceso = trim($moviles[$i]->getAdjuntoSegRcExceso());
    echo "{\"movil_id\":\"".$movilId."\","
        . "\"movil_nombre\":\"".$movilNombre."\","
        . "\"movil_patente\":\"".$movilPatente."\","
        . "\"movil_marca\":\"".$movilMarca."\","
        . "\"movil_modelo\":\"".$movilModelo."\","
        . "\"movil_anio\":\"".$movilAnio."\","
        . "\"movil_color\":\"".$movilColor."\","
        . "\"movil_cantidad\":\"".$movilCantidad."\","
        . "\"movil_clase\":\"".$movilClase."\","
        . "\"movil_gps\":\"".$movilGps."\","
        . "\"movil_celular\":\"".$movilCelular."\","
        . "\"movil_app\":\"".$movilApp."\","
        . "\"movil_tipo\":\"".$movilTipo."\","
        . "\"movil_ven_per_cir\":\"".$movilVenPerCir."\","
        . "\"movil_ven_rev_tec\":\"".$movilVenRevTec."\","
        . "\"movil_ven_ext\":\"".$movilVenExt."\","
        . "\"movil_kilo\":\"".$movilKilo."\","
        . "\"movil_motor\":\"".$movilMotor."\","
        . "\"movil_chasis\":\"".$movilChasis."\","
        . "\"movil_seg_ob\":\"".$movilSegOb."\","
        . "\"movil_ven_seg_ob\":\"".$movilVenSegOb."\","
        . "\"movil_pol_seg_ob\":\"".$movilPolizaSegOb."\","
        . "\"movil_seg_ob_valor\":\"".$movilValorSegOb."\","
        . "\"movil_seg_rcdm\":\"".$movilSegRcDm."\","
        . "\"movil_ven_seg_rcdm\":\"".$movilVenSegRcDm."\","
        . "\"movil_pol_seg_rcdm\":\"".$movilPolizaSegRcDm."\","
        . "\"movil_seg_rcdm_valor\":\"".$movilValorSegRcDm."\","
        . "\"movil_seg_rcexceso\":\"".$movilSegRcExceso."\","
        . "\"movil_ven_seg_rcexceso\":\"".$movilVenSegRcExceso."\","
        . "\"movil_pol_seg_rcexceso\":\"".$movilPolizaSegRcExceso."\","
        . "\"movil_seg_rcexceso_valor\":\"".$movilValorSegRcExceso."\","
        . "\"movil_seg_as\":\"".$movilSegAs."\","
        . "\"movil_ven_seg_as\":\"".$movilVenSegAs."\","
        . "\"movil_pol_seg_as\":\"".$movilPolizaSegAs."\","
        . "\"movil_seg_as_valor\":\"".$movilValorSegAs."\","
        . "\"movil_adj_per_cir\":\"".$adjuntoPerCir."\","
        . "\"movil_adj_rev_tec\":\"".$adjuntoRevTec."\","
        . "\"movil_adj_n_motor\":\"".$adjuntoNMotor."\","
        . "\"movil_adj_seremi\":\"".$adjuntoSeremi."\","
        . "\"movil_adj_seg_ob\":\"".$adjuntoSegOb."\","
        . "\"movil_adj_seg_rcdm\":\"".$adjuntoSegRcDm."\","
        . "\"movil_adj_seg_as\":\"".$adjuntoSegAs."\","
        . "\"movil_adj_seg_exceso\":\"".$adjuntoSegExceso."\","
        . "\"movil_transportista\":\"".$movilTransportista."\","
        . "\"movil_estado\":\"".$movilEstado."\","
        . "\"movil_lat\":\"".$movilLat."\","
        . "\"movil_lon\":\"".$movilLon."\","
        . "\"movil_servicio\":\"".$movilServicio."\","
        . "\"movil_conductor\":\"".$movilConductor."\","
        . "\"movil_conductor_nombre\":\"".$movilConductorNombre."\","
        . "\"movil_conductor_nick\":\"".$movilConductorNick."\""
        . "}";
    if (($i+1) != count($moviles))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETMOVILES", 0);