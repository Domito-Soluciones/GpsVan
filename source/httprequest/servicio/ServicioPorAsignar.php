<?php
include '../../util/validarPeticion.php';

include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';


header('Content-Type: application/json; charset=utf-8');
$servicioDao = new ServicioDao();
$servicio = $servicioDao->getServicioPorAsignar();
    $servicioPartida = $servicio->getPartida();
    $servicioDestino = $servicio->getDestino();
    $servicioCliente = $servicio->getCliente();
    $usuarioNom = $servicio->getUsuario_nombre();
    $servicioTransportista = $servicio->getTransportista();
    $servicioMovil = $servicio->getMovil();
    
    echo "{\"servicio_id\":\"".$servicioPartida."\","
        . "\"servicio_destino\":\"".$servicioDestino."\","
        . "\"servicio_cliente\":\"".$servicioCliente."\","
        . "\"servicio_pasajero\":\"".$usuarioNom."\""
        . "}";

