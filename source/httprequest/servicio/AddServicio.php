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
$transportista = $_REQUEST['transportista'];
$movil = $_REQUEST['movil'];
$tipo = $_REQUEST['tipo'];
$tarifa = $_REQUEST['tarifa'];
$agente = $_SESSION['agente'];
$servicio = new Servicio();
$servicio->setPartida($partida);
$servicio->setDestino($destino);
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
