<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/TransportistaDao.php';

header('Content-Type: application/json');
$transportista = $_REQUEST['id'];
$transportistaDao = new TransportistaDao();
$moviles = $transportistaDao->getTransportistaMovil($transportista);
echo "[";
for ($i = 0 ; $i < count($moviles); $i++)
{
    $movilId = $moviles[$i]->getId();
    $movilNombre = $moviles[$i]->getNombre();
    $movilPatente = $moviles[$i]->getPatente();
    $movilMarca = $moviles[$i]->getMarca();
    $movilModelo = $moviles[$i]->getModelo();
    echo "{\"movil_id\":\"".$movilId."\","
        . "\"movil_nombre\":\"".$movilNombre."\","
        . "\"movil_patente\":\"".$movilPatente."\","
        . "\"movil_marca\":\"".$movilMarca."\","
        . "\"movil_modelo\":\"".$movilModelo."\""
        . "}";
    if (($i+1) != count($moviles))
    {
        echo ",";
    }
}
echo "]";