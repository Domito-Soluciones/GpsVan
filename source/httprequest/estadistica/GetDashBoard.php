<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/DashBoardDao.php';

header('Content-Type: application/json');
$dashboardDao = new DashBoardDao();
$servicios = $dashboardDao->getServiciosDiarios();
$vehiculos = $dashboardDao->getMovilesActivos();
$activos = 0;
$inactivos = 0;
$serviciosDiarios = 0;
if(isset($vehiculos[0]))
{
   $activos = $vehiculos[0];
}
if(isset($vehiculos[1]))
{
   $inactivos = $vehiculos[1];
}
if(isset($servicios[0]))
{
   $serviciosDiarios = $vehiculos[0];
}
echo "{\"movil_activo\":\"".$activos."\","
    . "\"movil_inactivo\":\"".$inactivos."\","
    . "\"servicio_diario\":\"".$serviciosDiarios."\""        
    . "}";