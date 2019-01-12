<?php
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';

header('Content-Type: application/json; charset=utf-8');
$id = filter_input(INPUT_POST, 'id');
$servicioDao = new ServicioDao();
$coordenadas = $servicioDao->getServiciosDetalle($id);
$lat = explode(",", $coordenadas->getLat());
$lon = explode(",", $coordenadas->getLon());
$respuesta = "[";
$cantidad = count($lat);
for($i = 0 ; $i < count($lat) ; $i++)
{
    if($lat[$i] != '')
    {
       if($i > 0)
       {
           $respuesta .= ",";
       }
        $respuesta .= "{\"lat\":".$lat[$i].","
            . "\"lng\":".$lon[$i]."}";   
    }
    
}
$respuesta .= "]";

echo $respuesta;
