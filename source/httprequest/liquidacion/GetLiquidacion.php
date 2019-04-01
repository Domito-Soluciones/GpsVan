<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/LiquidacionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$conductor = filter_input(INPUT_POST, 'conductor');
$mes = filter_input(INPUT_POST, 'mes') + 1;
$anio = filter_input(INPUT_POST, 'anio');
$liquidacionDao = new LiquidacionDao();
$servicios = $liquidacionDao->getServiciosConvenio($conductor, $mes, $anio);
$descuentos = $liquidacionDao->getDescuentosConductor($conductor);
$porcentajes = $liquidacionDao->getPorcentajes();
echo "{\"produccion\":[";
for ($i = 0 ; $i < count($servicios); $i++)
{
    $servicio = explode("%", $servicios[$i]);
    echo "{\"empresa_nombre\":\"".$servicio[0]."\",\"empresa_valor\":\"".$servicio[1]."\"}";
    if (($i+1) != count($servicios))
    {
        echo ",";
    }
}

echo "],\"descuentos\":{";
echo "\"movil_seg_ob_valor\":\"".$descuentos[0]."\",";
echo "\"movil_seg_rcdm_valor\":\"".$descuentos[1]."\",";
echo "\"movil_seg_as_valor\":\"".$descuentos[2]."\",";
echo "\"movil_seg_rcexceso_valor\":\"".$descuentos[3]."\",";
echo "\"movil_gps\":\"".$descuentos[4]."\",";
echo "\"movil_celular\":\"".$descuentos[5]."\",";
echo "\"movil_app\":\"".$descuentos[6]."\"},";
echo "\"porcentajes\":{"
        . "\"porcentaje_uf\":\"".$porcentajes[0]."\","
        . "\"porcentaje_afp\":\"".$porcentajes[1]."\","
        . "\"porcentaje_isapre\":\"".$porcentajes[2]."\","
        . "\"porcentaje_mutual\":\"".$porcentajes[3]."\"}}";
Log::write_log("GETLIQUIDACION", 0);