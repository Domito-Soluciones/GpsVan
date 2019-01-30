<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';

header('Content-Type: application/json');
$partida = urlencode(filter_input(INPUT_POST, 'partida'));
$destinoInt1 = urlencode(filter_input(INPUT_POST, 'destInt1'));
$destinoInt2 = urlencode(filter_input(INPUT_POST, 'destInt2'));
$destinoInt3 = urlencode(filter_input(INPUT_POST, 'destInt3'));
$destinoFinal = urlencode(filter_input(INPUT_POST, 'destFinal'));
$cliente = filter_input(INPUT_POST, 'cliente');
$usuario = filter_input(INPUT_POST, 'usuario');
$transportista = filter_input(INPUT_POST, 'transportista');    
$movil = filter_input(INPUT_POST, 'movil');    
$tipo = filter_input(INPUT_POST, 'tipo');    
$tarifa = filter_input(INPUT_POST, 'tarifa');    
$agente = 0;
if(filter_input(INPUT_POST, 'app') == '')
{
    $agente = $_SESSION['agente'];
}
$servicio = new Servicio();
$servicio->setPartida(urldecode($partida));
$servicio->setDestinoInt1(urldecode($destinoInt1));
$servicio->setDestinoInt2(urldecode($destinoInt2));
$servicio->setDestinoInt3(urldecode($destinoInt3));
$servicio->setDestinoFinal(urldecode($destinoFinal));
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
