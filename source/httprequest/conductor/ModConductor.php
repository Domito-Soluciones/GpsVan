<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';

$nombre = $_REQUEST['nombre'];
$papellido = $_REQUEST['papellido'];
$mapellido = $_REQUEST['mapellido'];
$rut = $_REQUEST['rut'];
$nick = $_REQUEST['nick'];
$password = '';
if(isset($_REQUEST['password']))
{
    $password = $_REQUEST['password'];
}
$telefono = $_REQUEST['telefono'];
$celular = $_REQUEST['celular'];
$direccion = $_REQUEST['direccion'];
$mail = $_REQUEST['mail'];
$tipoLicencia = $_REQUEST['tipoLicencia'];
$nacimiento = date("Y/m/d", strtotime($_REQUEST['nacimiento']));
$renta = $_REQUEST['renta'];
$contrato = $_REQUEST['contrato'];
$afp = $_REQUEST['afp'];
$isapre = $_REQUEST['isapre'];
$mutual = $_REQUEST['mutual'];
$seguroInicio = date("Y/m/d", strtotime($_REQUEST['seguroInicio']));
$seguroRenovacion = date("Y/m/d", strtotime($_REQUEST['seguroRenovacion']));
$descuento = $_REQUEST['descuento'];
$anticipo = $_REQUEST['anticipo'];
$imagen = $_REQUEST['imagen'];
$archivoContrato = $_REQUEST['archivoContrato'];
$conductor = new Conductor();
$conductor->setNombre($nombre);
$conductor->setPapellido($papellido);
$conductor->setMapellido($mapellido);
$conductor->setRut($rut);
$conductor->setNick($nick);
$conductor->setPassword($password);
$conductor->setTelefono($telefono);
$conductor->setCelular($celular);
$conductor->setDireccion($direccion);
$conductor->setMail($mail);
$conductor->setTipoLicencia($tipoLicencia);
$conductor->setNacimiento($nacimiento);
$conductor->setRenta($renta);
$conductor->setContrato($contrato);
$conductor->setAfp($afp);
$conductor->setIsapre($isapre);
$conductor->setMutual($mutual);
$conductor->setSeguroInicio($seguroInicio);
$conductor->setSeguroRenovacion($seguroRenovacion);
$conductor->setDescuento($descuento);
$conductor->setAnticipo($anticipo);
$conductor->setImagenAdjunta($imagen);
$conductor->setContratoAdjunto($archivoContrato);
$conductorDao = new ConductorDao();
$conductorDao->modificarConductor($conductor);
