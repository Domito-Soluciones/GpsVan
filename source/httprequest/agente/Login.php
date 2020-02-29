<?php
include '../../util/validarPeticion.php';
include '../../query/AgenteDao.php';
include '../../cripto/Cripto.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$respuesta = '0';
$nombre = filter_input(INPUT_POST, 'usuario');
$password = base64_encode(Cripto::encriptar(filter_input(INPUT_POST, 'password')));
$agenteDao = new AgenteDao();
$agente = $agenteDao->getAgente($nombre, $password);
if ($agente->getId() > 0)
{
    session_start();
    $_SESSION['agente']=$agente->getId();
    $_SESSION['nick']=$agente->getNick();
    $_SESSION['tipo']=$agente->getPerfil();
    $_SESSION['empresa']=$agente->getEmpresa();
    $_SESSION['empresa_nombre']=$agente->getEmpresaNombre();
    $respuesta = $_SESSION['agente'];
    echo "{\"agente_id\":".$respuesta.",\"agente_tipo\":".$agente->getPerfil().",\"agente_empresa\":\"".$agente->getEmpresa()."\",\"agente_empresa_nombre\":\"".$agente->getEmpresaNombre()."\"}";
}
else
{
    echo "{\"agente_id\":".$respuesta."}";
}
Log::write_log("LOGIN: " .$agente->toString(), 0);