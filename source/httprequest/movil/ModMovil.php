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
$color = $_REQUEST['color'];
$cantidad = $_REQUEST['cantidad'];
$clase = $_REQUEST['clase'];
$venPerCir = date("Y/m/d", strtotime($_REQUEST['venpercir']));
$venRevTec = date("Y/m/d", strtotime($_REQUEST['venrevtec']));
$venExt = date("Y/m/d", strtotime($_REQUEST['venext']));
$kilo = $_REQUEST['kilo'];
$motor = $_REQUEST['motor'];
$chasis = $_REQUEST['chasis'];
$segOb = $_REQUEST['segob'];
$venSegOb = date("Y/m/d", strtotime($_REQUEST['vensegob']));
$polizaSegOb = $_REQUEST['polizasegob'];
$segRcDm = $_REQUEST['segrcdm'];
$venSegRcDm = date("Y/m/d", strtotime($_REQUEST['vensegrcdm']));
$polizaSegRcDm = $_REQUEST['polizasegrcdm'];
$conductores = $_REQUEST['conductores'];
$delConductor = $_REQUEST['delConductor'];
$movil = new Movil();
$movil->setId($movilId);
$movil->setPatente($patente);
$movil->setNombre($nombre);
$movil->setMarca($marca);
$movil->setModelo($modelo);
$movil->setAnio($anio);
$movil->setColor($color);
$movil->setCantidad($cantidad);
$movil->setClase($clase);
$movil->setVenPerCir($venPerCir);
$movil->setVenRevTec($venRevTec);
$movil->setVenExt($venExt);
$movil->setKilometraje($kilo);
$movil->setMotor($motor);
$movil->setChasis($chasis);
$movil->setSegOb($segOb);
$movil->setVenSegOb($venSegOb);
$movil->setPolizaSegOb($polizaSegOb);
$movil->setSegRcDm($segRcDm);
$movil->setVenSegRcDm($venSegRcDm);
$movil->setPolizaSegRcDm($polizaSegRcDm);
$movilDao = new MovilDao();
$movilDao->modificarMovil($movil);
if($movil->getId() > 0)
{
    if($conductores !== '')
    {
        $movilDao->asociarConductores($movil->getId(),$conductores);
    }
    if($delConductor != '')
    {
        $movilDao->asociarConductores(0,$delConductor);
    }
}
echo "{\"movil_id\":\"".$movil->getId()."\"}";

