<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$busqueda = $_REQUEST['busqueda'];
$movilDao = new MovilDao();
$moviles = $movilDao->getMoviles($busqueda);
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
    $movilVenPerCir = date("d/m/Y", strtotime($moviles[$i]->getVenPerCir()));
    $movilVenRevTec = date("d/m/Y", strtotime($moviles[$i]->getVenRevTec()));
    $movilVenExt = date("d/m/Y", strtotime($moviles[$i]->getVenExt()));
    $movilKilo = $moviles[$i]->getKilometraje();
    $movilMotor = $moviles[$i]->getMotor();
    $movilChasis = $moviles[$i]->getChasis();    
    $movilSegOb = $moviles[$i]->getSegOb();
    $movilVenSegOb = date("d/m/Y", strtotime($moviles[$i]->getVenSegOb()));
    $movilPolizaSegOb = $moviles[$i]->getPolizaSegOb();
    $movilSegRcDm = $moviles[$i]->getSegRcDm();
    $movilVenSegRcDm = date("d/m/Y", strtotime($moviles[$i]->getVenSegRcDm()));
    $movilPolizaSegRcDm = $moviles[$i]->getPolizaSegRcDm();
    $movilTransportista = $moviles[$i]->getTransportista();
    $movilEstado = $moviles[$i]->getEstado();
    $movilLat = $moviles[$i]->getLat();
    $movilLon = $moviles[$i]->getLon();
    $movilServicio = $moviles[$i]->getServicio();
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
        . "\"movil_transportista\":\"".$movilTransportista."\","
        . "\"movil_estado\":\"".$movilEstado."\","
        . "\"movil_lat\":\"".$movilLat."\","
        . "\"movil_lon\":\"".$movilLon."\","
        . "\"movil_servicio\":\"".$movilServicio."\""
        . "}";
    if (($i+1) != count($moviles))
    {
        echo ",";
    }
}
echo "]";
