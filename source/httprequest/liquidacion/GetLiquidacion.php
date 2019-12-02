<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/LiquidacionDao.php';
include '../../dominio//Liquidacion.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$conductor = filter_input(INPUT_POST, 'conductor');
$mes = filter_input(INPUT_POST, 'mes') + 1;
$anio = filter_input(INPUT_POST, 'anio');
$liquidacionDao = new LiquidacionDao();
$liquidacion = $liquidacionDao->getLiquidacion($conductor,$mes,$anio);
$liquidacionProduccion = $liquidacionDao->getLiquidacionDetalle($conductor,$mes,$anio,0);
$liquidacionDescuentos = $liquidacionDao->getLiquidacionDetalle($conductor,$mes,$anio,1);
$liquidacionRendiciones = $liquidacionDao->getLiquidacionDetalle($conductor,$mes,$anio,2);

echo "[";

    echo "{\"liquidacion_mes\":\"".$liquidacion->getMes()."\","
        . "\"liquidacion_anio\":\"".$liquidacion->getAnio()."\","
        . "\"liquidacion_id_conductor\":\"".$liquidacion->getIdConductor()."\","
        . "\"liquidacion_rut_conductor\":\"".$liquidacion->getRutConductor()."\","
        . "\"liquidacion_nombre_conductor\":\"".$liquidacion->getNombreConductor()."\","
        . "\"liquidacion_produccion_bruta\":\"".$liquidacion->getProduccionBruta()."\","
        . "\"liquidacion_participacion\":\"".$liquidacion->getParticipacion()."\","
        . "\"liquidacion_produccion_liquida\":\"".$liquidacion->getProduccionLiquida()."\","
        . "\"liquidacion_total_descuentos\":\"".$liquidacion->getTotalDescuentos()."\","
        . "\"liquidacion_total_rendicion\":\"".$liquidacion->getTotalRendiciones()."\","
        . "\"liquidacion_liquido_pagar\":\"".$liquidacion->getLiquidoPagar()."\","
        . "\"liquidacion_produccion\": [";
            for($j = 0; $j < count($liquidacionProduccion) ; $j++)
            {
                $detalle = $liquidacionProduccion[$j];
                echo "{\"detalle_item\":\"".$detalle->getItem()."\",";
                echo "\"detalle_valor\":\"".$detalle->getValor()."\",";
                echo "\"detalle_tipo\":\"".$detalle->getTipo()."\"}";
                if (($j+1) != count($liquidacionProduccion))
                {
                    echo ",";
                }
            }
            echo "],";
            echo "\"liquidacion_descuento\": [";
            for($j = 0; $j < count($liquidacionDescuentos) ; $j++)
            {
                $detalle = $liquidacionDescuentos[$j];
                echo "{\"detalle_item\":\"".$detalle->getItem()."\",";
                echo "\"detalle_valor\":\"".$detalle->getValor()."\",";
                echo "\"detalle_tipo\":\"".$detalle->getTipo()."\"}";
                if (($j+1) != count($liquidacionDescuentos))
                {
                    echo ",";
                }
            }
            echo "],";
            echo "\"liquidacion_rendicion\": [";
            for($j = 0; $j < count($liquidacionRendiciones) ; $j++)
            {
                $detalle = $liquidacionRendiciones[$j];
                echo "{\"detalle_item\":\"".$detalle->getItem()."\",";
                echo "\"detalle_valor\":\"".$detalle->getValor()."\",";
                echo "\"detalle_tipo\":\"".$detalle->getTipo()."\"}";
                if (($j+1) != count($liquidacionRendiciones))
                {
                    echo ",";
                }
            }
            echo "]";
        echo "}";
echo "]";
Log::write_log("GETLIQUIDACION", 0);