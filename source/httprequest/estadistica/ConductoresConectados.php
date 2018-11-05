<?php
include '../../query/ConductorDao.php';

header('Content-Type: application/json');
$conductorDao = new ConductorDao();
$conductores = $conductorDao->getConductoresConectados();
$desconectado = 0;
if(isset($conductores['0']))
{
    $desconectado = $conductores['0'];
}
$conectado = 0;
if(isset($conductores['1']))
{
    $conectado = $conductores['1'];
}
$ocupado = 0;
if(isset($conductores['2']))
{
    $ocupado = $conductores['2'];
}
echo "{\"conductor_desconectado\":\"".$desconectado."\","
    . "\"conductor_conectado\":\"".$conectado."\","
    . "\"conductor_ocupado\":\"".$ocupado."\","
    . "\"conductor_total\":\"".($ocupado+$desconectado+$conectado)."\""
    . "}";

