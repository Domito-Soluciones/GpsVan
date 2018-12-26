<?php
include '../../util/validarPeticion.php';

include '../../query/ServicioDao.php';
include '../../dominio/Servicio.php';


header('Content-Type: application/json; charset=utf-8');
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getServicioPorAsignar();
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicio = $servicios[$i];
    $servicioId = $servicio->getId();
    $servicioPartida = utf8_encode(urldecode($servicio->getPartida()));
    $servicioDestino = utf8_encode(urldecode($servicio->getDestino()));
    $servicioCliente = $servicio->getCliente();
    $usuarioNom = $servicio->getUsuario_nombre();
    $servicioTransportista = $servicio->getTransportista();
    $servicioMovil = $servicio->getMovil();
    echo "{\"servicio_id\":\"".$servicioId."\","
        . "\"servicio_partida\":\"".$servicioPartida."\","
        . "\"servicio_destino\":\"".$servicioDestino."\","
        . "\"servicio_cliente\":\"".$servicioCliente."\","
        . "\"servicio_pasajero\":\"".$usuarioNom."\""
        . "}";
if (($i+1) != count($servicios))
    {
        echo ",";
    }
}
echo "]";


