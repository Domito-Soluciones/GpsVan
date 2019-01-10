<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$patente = $_REQUEST['patente'];
$marca = $_REQUEST['marca'];
$nombre = $_REQUEST['nombre'];
$modelo = $_REQUEST['modelo'];
$anio = $_REQUEST['anio'];
$color = $_REQUEST['color'];
$cantidad = $_REQUEST['cantidad'];
$clase = $_REQUEST['clase'];
$venPerCir = DateTime::createFromFormat('d/m/Y', $_REQUEST['venpercir'])->format('Y/m/d');
$venRevTec = DateTime::createFromFormat('d/m/Y', $_REQUEST['venrevtec'])->format('Y/m/d');
$venExt = DateTime::createFromFormat('d/m/Y', $_REQUEST['venext'])->format('Y/m/d');
$kilo = $_REQUEST['kilo'];
$motor = $_REQUEST['motor'];
$chasis = $_REQUEST['chasis'];
$segOb = $_REQUEST['segob'];
$venSegOb = DateTime::createFromFormat('d/m/Y', $_REQUEST['vensegob'])->format('Y/m/d');
$polizaSegOb = $_REQUEST['polizasegob'];
$segRcDm = $_REQUEST['segrcdm'];
$venSegRcDm = DateTime::createFromFormat('d/m/Y', $_REQUEST['vensegrcdm'])->format('Y/m/d');
$polizaSegRcDm = $_REQUEST['polizasegrcdm'];
$conductores = $_REQUEST['conductores'];
$movil = new Movil();
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
$movilId = $movilDao->agregarMovil($movil);
if($movilId > 0)
{
    if($conductores !== '')
    {
        $movilDao->asociarConductores($movilId,$conductores);
    }
}
echo "{\"movil_id\":\"".$movilId."\"}";
