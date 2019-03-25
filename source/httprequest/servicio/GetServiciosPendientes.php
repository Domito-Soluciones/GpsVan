<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json; charset=utf-8');
$servicioDao = new ServicioDao();
$servicios = $servicioDao->getServicioPorAsignar();
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicio = $servicios[$i];
    $servicioId = $servicio->getId();
    $servicioCliente = $servicio->getCliente();
    $servicioRuta = $servicio->getRuta();
    $servicioFecha = $servicio->getFecha();
    $servicioHora = $servicio->getHora();
    $servicioOb = $servicio->getObservaciones();
    echo "{\"servicio_id\":\"".$servicioId."\","
        . "\"servicio_cliente\":\"".$servicioCliente."\","
        . "\"servicio_ruta\":\"".$servicioRuta."\","
        . "\"servicio_fecha\":\"".$servicioFecha."\","
        . "\"servicio_hora\":\"".$servicioHora."\","
        . "\"servicio_observacion\":\"".$servicioOb."\""
        . "}";
if (($i+1) != count($servicios))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETSERVICIOSPENDIENTES", 0);