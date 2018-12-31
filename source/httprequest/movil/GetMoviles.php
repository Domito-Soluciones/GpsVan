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
    $movilVenRevTec = date("d/m/Y", strtotime($moviles[$i]->getVenRevTec()));
    $movilSegOb = $moviles[$i]->getSegOb();
    $movilVenSegOb = date("d/m/Y", strtotime($moviles[$i]->getVenSegOb()));
    $movilSegAd = $moviles[$i]->getSegAd();
    $movilKilo = $moviles[$i]->getKilometraje();
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
    if (($i+1) != count($moviles))
    {
        echo ",";
    }
}
echo "]";
