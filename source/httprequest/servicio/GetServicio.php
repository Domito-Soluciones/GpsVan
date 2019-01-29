<?php
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';

header('Content-Type: application/json; charset=utf-8');
$idServicio = filter_input(INPUT_POST, 'id');
$servicioDao = new ServicioDao();
$servicio = $servicioDao->getServicio($idServicio);
$servicioId = $servicio->getId();
$servicioPartida = $servicio->getPartida();
$servicioDestino = $servicio->getDestino();
$servicioCliente = $servicio->getCliente();
$servicioUsuario = $servicio->getUsuario_nombre();
$servicioTransportista = $servicio->getTransportista();
$servicioMovil = $servicioDao->obtenerMovilServicio($servicio->getMovil());
$servicioTipo = $servicio->getTipo();
$servicioTarifa = $servicio->getTarifa();
$servicioAgente = $servicio->getAgente();
$servicioFecha = $servicio->getFecha();
$servicioEstado = $servicio->getEstado();
echo "{\"servicio_id\":\"".$servicioId."\","
    . "\"servicio_partida\":\"".$servicioPartida."\","
    . "\"servicio_destino\":\"".$servicioDestino."\","
    . "\"servicio_cliente\":\"".$servicioCliente."\","
    . "\"servicio_pasajero\":\"".$servicioUsuario."\","
    . "\"servicio_transportista\":\"".$servicioTransportista."\","
    . "\"servicio_movil\":\"".$servicioMovil->getNombre()."\","
    . "\"servicio_movil_lat\":\"".$servicioMovil->getLat()."\","
    . "\"servicio_movil_lon\":\"".$servicioMovil->getLon()."\","
    . "\"servicio_tipo\":\"".$servicioTipo."\","
    . "\"servicio_tarifa\":\"".$servicioTarifa."\","
    . "\"servicio_agente\":\"".$servicioAgente."\","
    . "\"servicio_fecha\":\"".$servicioFecha."\","
    . "\"servicio_estado\":\"".$servicioEstado."\""
    . "}";