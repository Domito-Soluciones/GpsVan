<?php
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';

header('Content-Type: application/json; charset=utf-8');
$idServicio = filter_input(INPUT_POST, 'id');
$servicioDao = new ServicioDao();
$servicio = $servicioDao->getServicio($idServicio);
$servicioId = $servicios[$i]->getId();
$servicioPartida = $servicios[$i]->getPartida();
$servicioDestino = $servicios[$i]->getDestino();
$servicioCliente = $servicios[$i]->getCliente();
$servicioUsuario = $servicios[$i]->getUsuario_nombre();
$servicioTransportista = $servicios[$i]->getTransportista();
$servicioMovil = $servicioDao->obtenerMovilServicio($servicios[$i]->getMovil());
$servicioTipo = $servicios[$i]->getTipo();
$servicioTarifa = $servicios[$i]->getTarifa();
$servicioAgente = $servicios[$i]->getAgente();
$servicioFecha = $servicios[$i]->getFecha();
$servicioEstado = $servicios[$i]->getEstado();
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