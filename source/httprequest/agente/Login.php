<?php
include '../../util/validarPeticion.php';
include '../../query/AgenteDao.php';

$respuesta = '0';
$nombre = $_REQUEST['usuario'];
$password = $_REQUEST['password'];
$agenteDao = new AgenteDao();
$agente = $agenteDao->getAgente($nombre, $password);
if ($agente->getId() > 0)
{
    session_start();
    $_SESSION['agente']=$agente->getId();
    $respuesta = $_SESSION['agente'];
}

echo $respuesta;