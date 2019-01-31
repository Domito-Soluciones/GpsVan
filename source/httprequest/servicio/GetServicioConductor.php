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
    $servicioDestInt1 = $servicio->getDestinoInt1();
    $servicioDestInt2 = $servicio->getDestinoInt2();
    $servicioDestInt3 = $servicio->getDestinoInt3();
    $servicioDestFinal = $servicio->getDestinoFinal();
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
    if($servicioId != "")
    {
        echo "{\"servicio_id\":\"".$servicioId."\","
            . "\"servicio_partida\":\"".$servicioPartida."\","
            . "\"servicio_destino_int1\":\"".$servicioDestInt1."\","
            . "\"servicio_destino_int2\":\"".$servicioDestInt2."\","
            . "\"servicio_destino_int3\":\"".$servicioDestInt3."\","
            . "\"servicio_destino_final\":\"".$servicioDestFinal."\","
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
    }
    else
    {
        echo "{}";
    }