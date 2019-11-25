<?php
include '../../util/validarPeticion.php';
include '../../query/ReporteDao.php';
include '../../log/Log.php';

header('Content-Type: application/json; charset=utf-8');
$empresa = filter_input(INPUT_POST, 'empresa');
$conductor = filter_input(INPUT_POST, 'conductor');
$desde = '';
if(filter_input(INPUT_POST, 'desde') != '')
{
    $desde = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'desde'))->format('Y/m/d');
}
else
{
    $desde = filter_input(INPUT_POST, 'desde');
}
$hdesde = filter_input(INPUT_POST, 'hdesde');
$hasta = '23:59:59';
if(filter_input(INPUT_POST, 'hasta') != '')
{
    $hasta = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'hasta'))->format('Y/m/d');
}
else
{
    $hasta = filter_input(INPUT_POST, 'hasta');
}
$hhasta = filter_input(INPUT_POST, 'hhasta');
$reporteDao = new ReporteDao();
$servicios = $reporteDao->getServicios($empresa,$conductor,$desde,$hdesde,$hasta,$hhasta);
$serviciosFinalizados = 0;
$serviciosEnRuta = 0;
$serviciosPorRealizar = 0;
$serviciosPorAsignar = 0;
$serviciosCancelados = 0;
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
    else if($aux[0] == '6')
    {
        $serviciosCancelados = $aux[1];
    }
}
echo "{"
    . "\"servicio_finalizado\":\"".$serviciosFinalizados."\","        
    . "\"servicio_ruta\":\"".$serviciosEnRuta."\","        
    . "\"servicio_realizar\":\"".$serviciosPorRealizar."\","
    . "\"servicio_asignar\":\"".$serviciosPorAsignar."\","
    . "\"servicio_cancelado\":\"".$serviciosCancelados."\"";
   echo "}";
Log::write_log("GETREPORTES", 0);