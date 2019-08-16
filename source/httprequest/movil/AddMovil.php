<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/MovilDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
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
$tipo = filter_input(INPUT_POST, 'tipo');
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
else
{
    $venSegOb = '2000-01-01';
}
$polizaSegOb = filter_input(INPUT_POST, 'polizasegob') != '' ? filter_input(INPUT_POST, 'polizasegob') : '0';
$valorSegOb = filter_input(INPUT_POST, 'valorsegob') != '' ? filter_input(INPUT_POST, 'valorsegob') : '0';
$segRcDm = filter_input(INPUT_POST, 'segrcdm');
$venSegRcDm = '';
if(filter_input(INPUT_POST, 'vensegrcdm') != '')
{
    $venSegRcDm = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'vensegrcdm'))->format('Y/m/d');
}
else
{
    $venSegRcDm = '2000-01-01';
}
$polizaSegRcDm = filter_input(INPUT_POST, 'polizasegrcdm') != '' ? filter_input(INPUT_POST, 'polizasegrcdm') : '0';
$valorSegRcDm = filter_input(INPUT_POST, 'valorsegrcdm') != '' ? filter_input(INPUT_POST, 'valorsegrcdm') : '0';
$segAs = filter_input(INPUT_POST, 'segas');
$venSegAs = '';
if(filter_input(INPUT_POST, 'vensegas') != '')
{
    $venSegAs = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'vensegas'))->format('Y/m/d');
}
else
{
    $venSegAs = '2000-01-01';
}
$polizaSegAs = filter_input(INPUT_POST, 'polizasegas') != '' ? filter_input(INPUT_POST, 'polizasegas') : '0';
$valorSegAs = filter_input(INPUT_POST, 'valorsegas') != '' ? filter_input(INPUT_POST, 'valorsegas') : '0';
$segRcExceso = filter_input(INPUT_POST, 'segrcexceso');
$venSegRcExceso = '';
if(filter_input(INPUT_POST, 'vensegrcexceso') != '')
{
    $venSegRcExceso = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'vensegrcexceso'))->format('Y/m/d');
}
else
{
    $venSegRcExceso = '2000-01-01';
}
$polizaSegRcExceso = filter_input(INPUT_POST, 'polizasegrcexceso') != '' ? filter_input(INPUT_POST, 'polizasegrcexceso') : '0';
$valorSegRcExceso = filter_input(INPUT_POST, 'valorsegrcexceso') != '' ? filter_input(INPUT_POST, 'valorsegrcexceso') : '0';
$adjuntoPerCir = filter_input(INPUT_POST, 'adjuntoPerCir');
$adjuntoRevTec = filter_input(INPUT_POST, 'adjuntoRevTec');
$adjuntoNMotor = filter_input(INPUT_POST, 'adjuntoNMotor');
$adjuntoSeremi = filter_input(INPUT_POST, 'adjuntoSeremi');
$adjuntoSegOb = filter_input(INPUT_POST, 'adjuntoSegOb');
$adjuntoSegRcDm = filter_input(INPUT_POST, 'adjuntoSegRcDm');
$adjuntoSegAs = filter_input(INPUT_POST, 'adjuntoSegAs');
$adjuntoSegExceso = filter_input(INPUT_POST, 'adjuntoSegExceso');

$movil = new Movil();
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
$movil->setTipo($tipo);
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
$movil->setSegRcExceso($segRcExceso);
$movil->setVenSegRcExceso($venSegRcExceso);
$movil->setPolizaSegRcExceso($polizaSegRcExceso);
$movil->setValorSegRcExceso($valorSegRcExceso);
$movil->setAdjuntoPerCir($adjuntoPerCir);
$movil->setAdjuntoRevTec($adjuntoRevTec);
$movil->setAdjuntoNMotor($adjuntoNMotor);
$movil->setAdjuntoSeremi($adjuntoSeremi);
$movil->setAdjuntoSegOb($adjuntoSegOb);
$movil->setAdjuntoSegRcDm($adjuntoSegRcDm);
$movil->setAdjuntoSegAsiento($adjuntoSegAs);
$movil->setAdjuntoSegRcExceso($adjuntoSegExceso);
$movilDao = new MovilDao();
$movilId = $movilDao->agregarMovil($movil);
echo "{\"movil_id\":\"".$movilId."\"}";
Log::write_log("ADDMOVIL: ".$movil->toString(), 0);