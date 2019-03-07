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
$conductor = filter_input(INPUT_POST, 'conductor');
$gps = filter_input(INPUT_POST, 'gps');
$celular = filter_input(INPUT_POST, 'celular');
$app = filter_input(INPUT_POST, 'app');
$venPerCir = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'venpercir'))->format('Y/m/d');
$venRevTec = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'venrevtec'))->format('Y/m/d');
$venExt = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'venext'))->format('Y/m/d');
$kilo = filter_input(INPUT_POST, 'kilo');
$motor = filter_input(INPUT_POST, 'motor');
$chasis = filter_input(INPUT_POST, 'chasis');
$segOb = filter_input(INPUT_POST, 'segob');
$venSegOb = '';
if(filter_input(INPUT_POST, 'vensegob') != '')
{
    $venSegOb = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'vensegob'))->format('Y/m/d');
}
$polizaSegOb = filter_input(INPUT_POST, 'polizasegob');
$valorSegOb = filter_input(INPUT_POST, 'valorsegob');
$segRcDm = filter_input(INPUT_POST, 'segrcdm');
$venSegRcDm = '';
if(filter_input(INPUT_POST, 'vensegrcdm') != '')
{
    $venSegRcDm = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'vensegrcdm'))->format('Y/m/d');
}
$polizaSegRcDm = filter_input(INPUT_POST, 'polizasegrcdm');
$valorSegRcDm = filter_input(INPUT_POST, 'valorsegrcdm');
$segAs = filter_input(INPUT_POST, 'segas');
$venSegAs = '';
if(filter_input(INPUT_POST, 'vensegas') != '')
{
    $venSegAs = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'vensegas'))->format('Y/m/d');
}
$polizaSegAs = filter_input(INPUT_POST, 'polizasegas');
$valorSegAs = filter_input(INPUT_POST, 'valorsegas');
$segRcExtenso = filter_input(INPUT_POST, 'segrcextenso');
$venSegRcExtenso = '';
if(filter_input(INPUT_POST, 'vensegrcextenso') != '')
{
    $venSegRcExtenso = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'vensegrcextenso'))->format('Y/m/d');
}
$polizaSegRcExtenso = filter_input(INPUT_POST, 'polizasegrcextenso');
$valorSegRcExtenso = filter_input(INPUT_POST, 'valorsegrcextenso');
$adjuntoPerCir = filter_input(INPUT_POST, 'adjuntoPerCir');
$adjuntoRevTec = filter_input(INPUT_POST, 'adjuntoRevTec');
$adjuntoNMotor = filter_input(INPUT_POST, 'adjuntoNMotor');
$adjuntoSeremi = filter_input(INPUT_POST, 'adjuntoSeremi');
$adjuntoSegOb = filter_input(INPUT_POST, 'adjuntoSegOb');
$adjuntoSegRcDm = filter_input(INPUT_POST, 'adjuntoSegRcDm');
$adjuntoSegAs = filter_input(INPUT_POST, 'adjuntoSegAs');
$adjuntoSegExtenso = filter_input(INPUT_POST, 'adjuntoSegExtenso');

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
$movil->setConductor($conductor);
$movil->setGps($gps);
$movil->setCelular($celular);
$movil->setApp($app);
$movil->setVenPerCir($venPerCir);
$movil->setVenRevTec($venRevTec);
$movil->setVenExt($venExt);
$movil->setKilometraje($kilo);
$movil->setMotor($motor);
$movil->setChasis($chasis);
$movil->setSegOb($segOb);
$movil->setVenSegOb($venSegOb);
$movil->setPolizaSegOb($polizaSegOb);
$movil->setValorSegOb($valorSegOb);
$movil->setSegRcDm($segRcDm);
$movil->setVenSegRcDm($venSegRcDm);
$movil->setPolizaSegRcDm($polizaSegRcDm);
$movil->setValorSegRcDm($valorSegRcDm);
$movil->setSegAs($segAs);
$movil->setVenSegAs($venSegAs);
$movil->setPolizaSegAs($polizaSegAs);
$movil->setValorSegAs($valorSegAs);
$movil->setAdjuntoPerCir($adjuntoPerCir);
$movil->setAdjuntoRevTec($adjuntoRevTec);
$movil->setAdjuntoNMotor($adjuntoNMotor);
$movil->setAdjuntoSeremi($adjuntoSeremi);
$movil->setAdjuntoSegOb($adjuntoSegOb);
$movil->setAdjuntoSegRcDm($adjuntoSegRcDm);
$movil->setAdjuntoSegAsiento($adjuntoSegAs);
$movil->setAdjuntoSegExtenso($adjuntoSegExtenso);
$movilDao = new MovilDao();
$movilDao->modificarMovil($movil);
echo "{\"movil_id\":\"".$movil->getId()."\"}";

