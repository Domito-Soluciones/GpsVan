<!DOCTYPE html>
<?php

    include '../../query/LiquidacionDao.php';
    include '../../log/Log.php';
    
    header("Content-type: application/vnd.ms-excel");
    header("Content-Disposition: attachment; filename=reporteLiquidacion.xls");
    $meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    $conductor = filter_input(INPUT_GET, 'conductor');
    $mes = filter_input(INPUT_GET, 'mes') ;
    $anio = filter_input(INPUT_GET, 'anio');
    $rut = filter_input(INPUT_GET, 'rut');
    $nombre = filter_input(INPUT_GET, 'nombre');
    $liquidacionDao = new LiquidacionDao();
    $servicios = $liquidacionDao->getServiciosConvenio($conductor, $mes+1, $anio);
    $descuentos = $liquidacionDao->getDescuentosConductor($conductor);
    $rendiciones = $liquidacionDao->getRendiciones($conductor,$mes+1,$anio);
    $porcentajes = $liquidacionDao->getPorcentajes();
    $totalDesc = 0;
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
                    Periodo: <?php echo $meses[$mes]." ".$anio?>
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
                            $totalBruto = 0;
                            for($i = 0 ; $i < count($servicios);$i++)
                            {
                                $servicio = explode("%", $servicios[$i]);
                                $totalBruto += $servicio[1];
                                echo "<tr><td>".$servicio[0]."</td><td>$  ".$servicio[1]."</td></tr>";
                            }
                            if($totalBruto == 0)
                            {
                                echo "<tr><td></td></tr>";
                            }
                            $totalLiquido = round($totalBruto * 0.8);
                        ?>
                    </table>
                </td> 
                <td colspan="2">
                    <table>
                        <?php
                            if(count($servicios) > 0)
                            {
                                $afp = $totalBruto * (trim($porcentajes[1]) / 100);
                                $isapre = $totalBruto * (trim($porcentajes[2]) / 100);
                                $mutual = $totalBruto * (trim($porcentajes[3]) / 100);
                                $prevision = round($afp) + round($isapre) + round($mutual);
                                echo "<tr><td>Pagos Previsionales</td><td>$  ".$prevision."</td></tr>";
                                echo "<tr><td>Seguro Obligatorio</td><td>$  ".$descuentos[0]."</td></tr>";
                                echo "<tr><td>Seguro RC+DM</td><td>$  ".$descuentos[1]."</td></tr>";
                                echo "<tr><td>Seguro Asientos</td><td>$  ".$descuentos[2]."</td></tr>";
                                echo "<tr><td>Seguro RC Exceso</td><td>$  ".$descuentos[3]."</td></tr>";
                                echo "<tr><td>GPS</td><td>$  ".$descuentos[4]."</td></tr>";
                                echo "<tr><td>Celular</td><td>$  ".$descuentos[5]."</td></tr>";
                                echo "<tr><td>APP</td><td>$  ".$descuentos[6]."</td></tr>";
                                for($j = 0; $j < count($rendiciones); $j++)
                                {
                                    $data = explode("%", $rendiciones[$j]);
                                    if($data[2] == '1')
                                    {
                                        $totalDesc += $data[1];
                                        echo "<tr><td>".$data[0]."</td><td>$ ".$data[1]."</td></tr>";
                                    }
                                }
                                $totalDesc += $prevision + $descuentos[0] + $descuentos[1] + $descuentos[2] + $descuentos[3] + 
                                        $descuentos[4] + $descuentos[5] + $descuentos[6];
                            }
                        ?>
                    </table>
                </td>
                <td colspan="2">
                    <table>
                        <?php
                            $totalRendicion = 0;
                            for($j = 0; $j < count($rendiciones); $j++)
                            {
                                $data = explode("%", $rendiciones[$j]);
                                if($data[2] == '0')
                                {
                                    $totalRendicion += $data[1];
                                    echo "<tr><td>".$data[0]."</td><td>$ ".$data[1]."</td></tr>";
                                }
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
                   $ <?php echo $totalBruto?>
                </td>
                <td colspan="2">
                    Total descuentos 
                </td> 
                <td>
                   $ <?php echo $totalDesc ?>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    % Participaci&oacute;n 
                </td> 
                <td>
                    80%
                </td> 
                <td colspan="2">
                    Total rendiciones 
                </td> 
                <td>
                   $ <?php echo $totalRendicion ?>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    Producci&oacute;n liquida
                </td> 
                <td>
                   $ <?php echo $totalLiquido;?>
                </td> 
                <td colspan="2">
                    Liquido a pagar
                </td> 
                <td>
                   $ <?php echo $totalLiquido - $totalDesc + $totalRendicion;?>
                </td> 
            </tr>
        </table>
    </body>
</html>
<?php
Log::write_log("GETLIQUIDACIONEXCEL", 0);
