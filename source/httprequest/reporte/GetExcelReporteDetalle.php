<!DOCTYPE html>
<?php

    include '../../query/ReporteDao.php';
    include '../../log/Log.php';
    
    header("Content-type: application/vnd.ms-excel");
    header("Content-Disposition: attachment; filename=reporte.xls");
    $empresa = filter_input(INPUT_GET, 'empresa');
    $conductor = filter_input(INPUT_GET, 'conductor');
    $desde = '';
    if(filter_input(INPUT_GET, 'desde') != '')
    {
        $desde = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_GET, 'desde'))->format('Y/m/d');
    }
    else
    {
        $desde = filter_input(INPUT_GET, 'desde');
    }
    $hdesde = filter_input(INPUT_GET, 'hdesde');
    $hasta = '23:59:59';
    if(filter_input(INPUT_GET, 'hasta') != '')
    {
        $hasta = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_GET, 'hasta'))->format('Y/m/d');
    }
    else
    {
        $hasta = filter_input(INPUT_GET, 'hasta');
    }
    $hhasta = filter_input(INPUT_GET, 'hhasta');
    $reporteDao = new ReporteDao();
    $servicios = $reporteDao->getServiciosDetalle($empresa,$conductor,$desde,$hdesde,$hasta,$hhasta);
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style>
            table{
                border-collapse: collapse;
            }
            td{
                 border:solid 1px black;
            }
            table tr:nth-child(2n){
                background-color: #dfe8e8;
            }
        </style>
    </head>
    <body>
       <table>
            <tr>
                <td>ID</td>
                <td>Cliente</td>
                <td>Ruta</td>
                <td>Tipo Ruta</td>
                <td>Fecha</td>
                <td>Hora</td>
                <td>Movil</td>
                <td>Conductor</td>
                <td>Tarifa 1</td>
                <td>Tarifa 2</td>
                <td>Estado</td>
                <td>Observación adicional</td>
            </tr>
            <?php
            for ($i = 0 ; $i < count($servicios); $i++)
            {
                $servicioId = $servicios[$i]->getId();
                $servicioCliente = $servicios[$i]->getCliente();
                $servicioRuta = $servicios[$i]->getRuta();
                $servicioTipoRuta = $servicios[$i]->getTruta();
                $servicioFecha = $servicios[$i]->getFecha();
                $servicioHora = $servicios[$i]->getHora();
                $servicioMovil = $servicios[$i]->getMovil();
                $servicioConductor = $servicios[$i]->getConductor();
                $servicioTarifa1 = $servicios[$i]->getTarifa1();
                $servicioTarifa2 = $servicios[$i]->getTarifa2();
                $servicioEstado = $servicios[$i]->getEstado();
                $servicioObAd = $servicios[$i]->getObservacionesAdicionales();
                echo "<tr>"
                . "<td>".$servicioId."</td>"
                . "<td>".$servicioCliente."</td>"
                . "<td>".$servicioRuta."</td>"
                . "<td>".$servicioTipoRuta."</td>"
                . "<td>".$servicioFecha."</td>"
                . "<td>".$servicioHora."</td>"
                . "<td>".$servicioMovil."</td>"
                . "<td>".$servicioConductor."</td>"
                . "<td>".$servicioTarifa1."</td>"
                . "<td>".$servicioTarifa2."</td>"
                . "<td>".$servicioEstado."</td>"
                . "<td>".$servicioObAd."</td>"
                . "</tr>";
            }
            ?>
        </table>
    </body>
</html>
<?php
Log::write_log("GETREPORTEEXCEL", 0);
