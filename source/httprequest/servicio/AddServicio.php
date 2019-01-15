<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';

header('Content-Type: application/json');
$partida = urlencode(filter_input(INPUT_POST, 'partida'));
$destino = urlencode(filter_input(INPUT_POST, 'destino'));
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
