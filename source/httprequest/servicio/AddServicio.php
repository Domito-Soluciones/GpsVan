<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';

header('Content-Type: application/json');
$partida = urlencode($_REQUEST['partida']);
$destino = urlencode($_REQUEST['destino']);
$cliente = $_REQUEST['cliente'];
$usuario = $_REQUEST['usuario'];
$transportista = '';
if(isset($_REQUEST['transportista']))
{
    $transportista = $_REQUEST['transportista'];    
}
$movil = '';
if(isset($_REQUEST['movil']))
{
    $movil = $_REQUEST['movil'];    
}
$tipo = '';
if(isset($_REQUEST['tipo']))
{
    $tipo = $_REQUEST['tipo'];    
}
$tarifa = 0;
if(isset($_REQUEST['tarifa']))
{
    $tarifa = $_REQUEST['tarifa'];    
}
$agente = 0;
if(isset($_SESSION['agente']))
{
    $agente = $_SESSION['agente'];
}
$servicio = new Servicio();
$servicio->setPartida(urldecode($partida));
$servicio->setDestino(urldecode($destino));
$servicio->setCliente($cliente);
$servicio->setUsuario_nombre($usuario);
$servicio->setTransportista($transportista);
$servicio->setMovil($movil);
$servicio->setTipo($tipo);
$servicio->setTarifa($tarifa);
$servicio->setAgente($agente);
$servicioDao = new ServicioDao();
$idServicio = $servicioDao->addServicio($servicio);
echo "{\"servicio_id\":\"".$idServicio."\"}";
