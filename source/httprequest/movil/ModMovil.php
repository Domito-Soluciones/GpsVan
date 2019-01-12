<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';

header('Content-Type: application/json');
$movilId = filter_input(INPUT_POST, 'id');
$patente = filter_input(INPUT_POST, 'patente');
$marca = filter_input(INPUT_POST, 'marca');
$nombre = filter_input(INPUT_POST, 'nombre');
$modelo = filter_input(INPUT_POST, 'modelo');
$anio = filter_input(INPUT_POST, 'anio');
$color = filter_input(INPUT_POST, 'color');
$cantidad = filter_input(INPUT_POST, 'cantidad');
$clase = filter_input(INPUT_POST, 'clase');
$venPerCir = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'venpercir'))->format('Y/m/d');
$venRevTec = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'venrevtec'))->format('Y/m/d');
$venExt = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'venext'))->format('Y/m/d');
$kilo = filter_input(INPUT_POST, 'kilo');
$motor = filter_input(INPUT_POST, 'motor');
$chasis = filter_input(INPUT_POST, 'chasis');
$segOb = filter_input(INPUT_POST, 'segob');
$venSegOb = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'vensegob'))->format('Y/m/d');
$polizaSegOb = filter_input(INPUT_POST, 'polizasegob');
$segRcDm = filter_input(INPUT_POST, 'segrcdm');
$venSegRcDm = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'vensegrcdm'))->format('Y/m/d');
$polizaSegRcDm = filter_input(INPUT_POST, 'polizasegrcdm');
$conductores = filter_input(INPUT_POST, 'conductores');
$delConductor = filter_input(INPUT_POST, 'delConductor');
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

