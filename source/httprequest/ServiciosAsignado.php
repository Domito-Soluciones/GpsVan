<?php

include '../query/ServicioDao.php';
include '../dominio/Servicio.php';


header('Content-Type: application/json; charset=utf-8');
$usuario = $_REQUEST['user'];
$servicioDao = new ServicioDao();
$servicio = $servicioDao->getServicioAsignado($usuario);
    $servicioId = $servicio->getId();
    $servicioPartida = urldecode($servicio->getPartida());
    $servicioDestino = urldecode($servicio->getDestino());
    $servicioCliente = $servicio->getCliente();
    $servicioUsuario = $servicio->getUsuario();
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
        . "\"servicio_pasajero\":\"".$servicioUsuario."\","
        . "\"servicio_transportista\":\"".$servicioTransportista."\","
        . "\"servicio_movil\":\"".$servicioMovil."\","
        . "\"servicio_tipo\":\"".$servicioTipo."\","
        . "\"servicio_tarifa\":\"".$servicioTarifa."\","
        . "\"servicio_agente\":\"".$servicioAgente."\","
        . "\"servicio_fecha\":\"".$servicioFecha."\""
        . "}";

