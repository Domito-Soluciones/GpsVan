<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';

header('Content-Type: application/json; charset=utf-8');
$usuario = filter_input(INPUT_POST, 'user');
$servicioDao = new ServicioDao();
$servicio = $servicioDao->getServicioAsignado($usuario);
    $servicioId = $servicio->getId();
    $servicioPartida = $servicio->getPartida();
    $servicioDestino = $servicio->getDestino();
    $servicioCliente = $servicio->getCliente();
    $usuarioId = $servicio->getUsuario_id();
    $usuarioNom = $servicio->getUsuario_nombre();
    $usuarioDir = $servicio->getUsuario_direccion();
    $usuarioCel = $servicio->getUsuario_celular();
    $servicioTransportista = $servicio->getTransportista();
    $servicioMovil = $servicio->getMovil();
    $servicioTipo = $servicio->getTipo();
    $servicioTarifa = $servicio->getTarifa();
    $servicioAgente = $servicio->getAgente();
    $servicioFecha = $servicio->getFecha();
    
    echo "{\"servicio_id\":\"".$servicioId."\","
        . "\"servicio_partida\":\"".$servicioPartida."\","
        . "\"servicio_destino\":\"".$servicioDestino."\","
        . "\"servicio_cliente\":\"".$servicioCliente."\","
        . "\"servicio_pasajero\":\"".$usuarioNom."\","
        . "\"servicio_pasajero_direccion\":\"".$usuarioDir."\","
        . "\"servicio_pasajero_celular\":\"".$usuarioCel."\","
        . "\"servicio_transportista\":\"".$servicioTransportista."\","
        . "\"servicio_movil\":\"".$servicioMovil."\","
        . "\"servicio_tipo\":\"".$servicioTipo."\","
        . "\"servicio_tarifa\":\"".$servicioTarifa."\","
        . "\"servicio_agente\":\"".$servicioAgente."\","
        . "\"servicio_fecha\":\"".$servicioFecha."\""
        . "}";

