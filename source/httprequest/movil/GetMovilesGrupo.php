<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$grupo = filter_input(INPUT_POST, 'grupo');
$movilDao = new MovilDao();
$moviles = $movilDao->getMovilesGrupo($grupo);
echo "[";
for ($i = 0 ; $i < count($moviles); $i++)
{
    $movilId = $moviles[$i]->getId();
    $movilNombre = $moviles[$i]->getNombre();
    $movilPatente = $moviles[$i]->getPatente();
    $movilMarca = $moviles[$i]->getMarca();
    $movilModelo = $moviles[$i]->getModelo();
    $movilAnio = $moviles[$i]->getAnio();
    $movilColor = $moviles[$i]->getColor();
    $movilCantidad = $moviles[$i]->getCantidad();
    $movilClase = $moviles[$i]->getClase();
    $movilGps = $moviles[$i]->getGps();
    $movilCelular = $moviles[$i]->getCelular();
    $movilApp = $moviles[$i]->getApp();
    $movilTipo = $moviles[$i]->getTipo();
    $movilVenPerCir = date("d/m/Y", strtotime($moviles[$i]->getVenPerCir()));
    $movilVenRevTec = date("d/m/Y", strtotime($moviles[$i]->getVenRevTec()));
    $movilVenExt = date("d/m/Y", strtotime($moviles[$i]->getVenExt()));
    $movilKilo = $moviles[$i]->getKilometraje();
    $movilMotor = $moviles[$i]->getMotor();
    $movilChasis = $moviles[$i]->getChasis();    
    $movilSegOb = $moviles[$i]->getSegOb();
    $movilVenSegOb = date("d/m/Y", strtotime($moviles[$i]->getVenSegOb()));
    $movilPolizaSegOb = $moviles[$i]->getPolizaSegOb();
    $movilValorSegOb = $moviles[$i]->getValorSegOb();
    $movilSegRcDm = $moviles[$i]->getSegRcDm();
    $movilVenSegRcDm = date("d/m/Y", strtotime($moviles[$i]->getVenSegRcDm()));
    $movilPolizaSegRcDm = $moviles[$i]->getPolizaSegRcDm();
    $movilValorSegRcDm = $moviles[$i]->getValorSegRcDm();
    $movilSegAs = $moviles[$i]->getSegAs();
    $movilVenSegAs = date("d/m/Y", strtotime($moviles[$i]->getVenSegAs()));
    $movilPolizaSegAs = $moviles[$i]->getPolizaSegAs();
    $movilValorSegAs = $moviles[$i]->getValorSegAs();
    $movilSegRcExceso = $moviles[$i]->getSegRcExceso();
    $movilVenSegRcExceso = date("d/m/Y", strtotime($moviles[$i]->getVenSegRcExceso()));
    $movilPolizaSegRcExceso = $moviles[$i]->getPolizaSegRcExceso();
    $movilValorSegRcExceso = $moviles[$i]->getValorSegRcExceso();
    $movilTransportista = $moviles[$i]->getTransportista();
    $movilEstado = $moviles[$i]->getEstado();
    $movilLat = $moviles[$i]->getLat();
    $movilLon = $moviles[$i]->getLon();
    $movilServicio = $moviles[$i]->getServicio();
    $movilConductor= $moviles[$i]->getConductor();
    $movilConductorNick= $moviles[$i]->getConductorNick();
    $movilConductorNombre= $moviles[$i]->getConductorNombre();
    $adjuntoPerCir = $moviles[$i]->getAdjuntoPerCir();
    $adjuntoRevTec = $moviles[$i]->getAdjuntoRevTec();
    $adjuntoNMotor = $moviles[$i]->getAdjuntoNMotor();
    $adjuntoSeremi = $moviles[$i]->getAdjuntoSeremi();
    $adjuntoSegOb = $moviles[$i]->getAdjuntoSegOb();
    $adjuntoSegRcDm = $moviles[$i]->getAdjuntoSegRcDm();
    $adjuntoSegAs = $moviles[$i]->getAdjuntoSegAsiento();
    $adjuntoSegExceso = $moviles[$i]->getAdjuntoSegRcExceso();
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
