<?php
include '../../util/validarPeticion.php';
include '../../query/AgenteDao.php';

$respuesta = '0';
$nombre = filter_input(INPUT_POST, 'usuario');
$password = filter_input(INPUT_POST, 'password');
$agenteDao = new AgenteDao();
$agente = $agenteDao->getAgente($nombre, $password);
if ($agente->getId() > 0)
{
    session_start();
    $_SESSION['agente']=$agente->getId();
    $_SESSION['nick']=$agente->getNick();
    $respuesta = $_SESSION['agente'];
}

echo $respuesta;