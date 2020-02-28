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
    $servicioTRuta = $servicio->getTruta();
    $servicioFecha = $servicio->getFecha();
    $servicioHora = $servicio->getHora();
    $servicioTipo = $servicio->getTipo();
    $servicioOb = $servicio->getObservaciones();
    echo "{\"servicio_id\":\"".$servicioId."\","
        . "\"servicio_cliente\":\"".$servicioCliente."\","
        . "\"servicio_ruta\":\"".$servicioRuta."\","
        . "\"servicio_truta\":\"".$servicioTRuta."\","
        . "\"servicio_fecha\":\"".$servicioFecha."\","
        . "\"servicio_hora\":\"".$servicioHora."\","
        . "\"servicio_tipo\":\"".$servicioTipo."\","
        . "\"servicio_observacion\":\"".trim($servicioOb)."\""
        . "}";
if (($i+1) != count($servicios))
    {
        echo ",";
    }
}
echo "]";
//Log::write_log("GETSERVICIOSPENDIENTES", 0);