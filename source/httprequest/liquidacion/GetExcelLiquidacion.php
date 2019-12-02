<!DOCTYPE html>
<?php

    include '../../query/LiquidacionDao.php';
    include '../../dominio/Liquidacion.php';
    include '../../log/Log.php';
    
    header("Content-type: application/vnd.ms-excel");
    header("Content-Disposition: attachment; filename=reporteLiquidacion.xls");
    $meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    $conductor = filter_input(INPUT_GET, 'conductor');
    $mes = filter_input(INPUT_GET, 'mes') + 1;
    echo $mes;
    $anio = filter_input(INPUT_GET, 'anio');
    $rut = filter_input(INPUT_GET, 'rut');
    $nombre = filter_input(INPUT_GET, 'nombre');
    $liquidacionDao = new LiquidacionDao();
    $liquidacion = $liquidacionDao->getLiquidacion($conductor,$mes,$anio);
    $liquidacionProduccion = $liquidacionDao->getLiquidacionDetalle($conductor,$mes,$anio,0);
    $liquidacionDescuentos = $liquidacionDao->getLiquidacionDetalle($conductor,$mes,$anio,1);
    $liquidacionRendiciones = $liquidacionDao->getLiquidacionDetalle($conductor,$mes,$anio,2);
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
       <table>
            <tr>
                <td colspan="4">
                    Liquidaci&oacute;n Transportistas
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    Periodo: <?php echo $meses[$mes-1]." ".$anio?>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    Nombre: <?php echo $nombre?>
                </td>
                <td colspan="2"></td>
            </tr>
            <tr>
                <td colspan="2">
                    Rut: <?php echo $rut?>
                </td>
                <td colspan="2"></td>
            </tr>
            <tr>
                <td colspan="2">
                    Producci&oacute;n mensual
                </td> 
                <td colspan="2">
                    Descuentos
                </td> 
                <td colspan="2">
                    Rendiciones
                </td> 
            </tr>
            <tr>
                <td colspan="2">
                    <table>
                        <?php
                            for($j = 0; $j < count($liquidacionProduccion) ; $j++)
                            {
                                $detalle = $liquidacionProduccion[$j];
                                echo "<tr><td>".$detalle->getItem()."</td>";
                                echo "<td>".$detalle->getValor()."</td></td>";
                            }
                        ?>
                    </table>
                </td> 
                <td colspan="2">
                    <table>
                        <?php
                            for($j = 0; $j < count($liquidacionDescuentos) ; $j++)
                            {
                                $detalle = $liquidacionDescuentos[$j];
                                 echo "<tr><td>".$detalle->getItem()."</td>";       
                                echo "<td>".$detalle->getValor()."</td></td>";
                            }
                        ?>
                    </table>
                </td>
                <td colspan="2">
                    <table>
                        <?php
                            for($j = 0; $j < count($liquidacionRendiciones) ; $j++)
                            {
                                $detalle = $liquidacionRendiciones[$j];
                                echo "<tr><td>".$detalle->getItem()."</td>";       
                                echo "<td>".$detalle->getValor()."</td></td>";
                            }
                        ?>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    Producci&oacute;n bruta
                </td> 
                <td>
                   $ <?php echo $liquidacion->getProduccionBruta()?>
                </td>
                <td colspan="2">
                    Total descuentos 
                </td> 
                <td>
                   $ <?php echo $liquidacion->getTotalDescuentos() ?>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    % Participaci&oacute;n 
                </td> 
                <td>
                    <?php echo $liquidacion->getParticipacion() ?> %
                </td> 
                <td colspan="2">
                    Total rendiciones 
                </td> 
                <td>
                   $ <?php echo $liquidacion->getTotalRendiciones() ?>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    Producci&oacute;n liquida
                </td> 
                <td>
                   $ <?php echo $liquidacion->getProduccionLiquida();?>
                </td> 
                <td colspan="2">
                    Liquido a pagar
                </td> 
                <td>
                   $ <?php echo $liquidacion->getLiquidoPagar()?>
                </td> 
            </tr>
        </table>
    </body>
</html>
<?php
Log::write_log("GETLIQUIDACIONEXCEL", 0);
