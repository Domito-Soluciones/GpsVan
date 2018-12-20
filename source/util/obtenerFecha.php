<?php

$hoy = getdate();
$dia = $hoy['mday'];
$mes = $hoy['mon'];
$anio = $hoy['year'];
$hora = $hoy['hours'];
$min = $hoy['minutes'];
if($dia < 10)
{
    $dia = "0".$dia;
}
if($mes < 10)
{
    $mes = "0".$mes;
}
if($hora < 10)
{
    $hora = "0".$hora;
}
if($min < 10)
{
    $min = "0".$min;
}
echo $dia . "/" . $mes . "/" . $anio . " " . $hora . ":" . $min;
