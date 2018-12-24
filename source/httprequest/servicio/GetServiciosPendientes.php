<?php
include '../../util/validarPeticion.php';

include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';


header('Content-Type: application/json; charset=utf-8');
$servicioDao = new ServicioDao();
$servicio = $servicioDao->getServicioPorAsignar();
    $servicioId = $servicio->getId();
    $servicioPartida = utf8_encode(urldecode($servicio->getPartida()));
    $servicioDestino = utf8_encode(urldecode($servicio->getDestino()));
    $servicioCliente = $servicio->getCliente();
    $usuarioNom = $servicio->getUsuario_nombre();
    $servicioTransportista = $servicio->getTransportista();
    $servicioMovil = $servicio->getMovil();
    
    echo "{\"servicio_id\":\"".$servicioId."\","
        . "\"servicio_partida\":\"".$servicioPartida."\","
        . "\"servicio_partidaId\":\"".$servicioPartida."\","
        . "\"servicio_destino\":\"".$servicioDestino."\","
        . "\"servicio_destinoId\":\"".$servicioDestino."\","
        . "\"servicio_cliente\":\"".$servicioCliente."\","
        . "\"servicio_pasajero\":\"".$usuarioNom."\""
        . "}";

