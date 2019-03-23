<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/LiquidacionDao.php';

header('Content-Type: application/json');
$conductor = filter_input(INPUT_POST, 'conductor');
$mes = filter_input(INPUT_POST, 'mes') + 1;
$anio = filter_input(INPUT_POST, 'anio');
$liquidacionDao = new LiquidacionDao();
$servicios = $liquidacionDao->getServiciosConvenio($conductor, $mes, $anio);
echo "[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicio = explode("%", $servicios[$i]);
    echo "{\"empresa_nombre\":\"".$servicio[0]."\",\"empresa_valor\":\"".$servicio[1]."\"}";
    if (($i+1) != count($servicio))
    {
        echo ",";
    }

}
echo "]";