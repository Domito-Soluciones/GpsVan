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
    $servicioDestFinal = utf8_encode(urldecode($servicio->getDestinoFinal()));
    $servicioDestInt1 = utf8_encode(urldecode($servicio->getDestinoInt1()));
    $servicioDestInt2 = utf8_encode(urldecode($servicio->getDestinoInt2()));
    $servicioDestInt3 = utf8_encode(urldecode($servicio->getDestinoInt3()));
    $servicioCliente = $servicio->getCliente();
    $usuarioNom = $servicio->getUsuario_nombre();
    $servicioTransportista = $servicio->getTransportista();
    $servicioMovil = $servicio->getMovil();
    echo "{\"servicio_id\":\"".$servicioId."\","
        . "\"servicio_partida\":\"".$servicioPartida."\","
        . "\"servicio_destino_int1\":\"".$servicioDestInt1."\","
        . "\"servicio_destino_int2\":\"".$servicioDestInt2."\","
        . "\"servicio_destino_int3\":\"".$servicioDestInt3."\","
        . "\"servicio_destino_final\":\"".$servicioDestFinal."\","
        . "\"servicio_cliente\":\"".$servicioCliente."\","
        . "\"servicio_pasajero\":\"".$usuarioNom."\""
        . "}";
if (($i+1) != count($servicios))
    {
        echo ",";
    }
}
echo "]";


