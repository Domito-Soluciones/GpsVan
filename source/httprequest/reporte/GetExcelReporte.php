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
    $servicios = $reporteDao->getServicios($empresa,$conductor,$desde,$hdesde,$hasta,$hhasta);
    $serviciosFinalizados = 0;
    $serviciosEnRuta = 0;
    $serviciosPorRealizar = 0;
    $serviciosPorAsignar = 0;
    for($i = 0 ; $i < count($servicios); $i++)
    {
        $aux = explode("%",$servicios[$i]);
        if($aux[0] == '1')
        {
            $serviciosPorAsignar = $aux[1];
        }
        else if($aux[0] == '3')
        {
            $serviciosPorRealizar = $aux[1];
        }
        else if($aux[0] == '4')
        {
            $serviciosEnRuta = $aux[1];
        }
        else if($aux[0] == '5')
        {
            $serviciosFinalizados = $aux[1];
        }
    }
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
       <table>
            <tr>
                <td colspan="2">
                    Reporte Servicos
                </td>
            </tr>
            <tr>
                <td>
                    Servicio Pendiente Asignación
                </td>
                <td>
                    <?php echo $serviciosPorAsignar?>
                </td>
            </tr>
            <tr>
                <td>
                    Servicio Aceptado
                </td>
                <td>
                    <?php echo $serviciosPorRealizar?>
                </td>
            </tr>
            <tr>
                <td>
                    Servicio en Ruta
                </td>
                <td>
                    <?php echo $serviciosEnRuta?>
                </td>
            </tr>
            <tr>
                <td>
                    Servicio Finalizado
                </td>
                <td>
                    <?php echo $serviciosFinalizados?>
                </td>
            </tr>
        </table>
    </body>
</html>
<?php
Log::write_log("GETREPORTEEXCEL", 0);
