<?php
include '../../util/validarPeticion.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json; charset=utf-8');
$id = filter_input(INPUT_POST, 'id');
$servicioDao = new ServicioDao();
$coordenadas = $servicioDao->getServiciosDetalle($id);
$estado = $coordenadas->getEstado();
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
                . "\"lng\":".$lon[$i].","  
            . "\"estado\":".$estado."}";   
    }
    
}
$respuesta .= "]";

echo $respuesta;
Log::write_log("GETDETALLESERVICIO", 0);
