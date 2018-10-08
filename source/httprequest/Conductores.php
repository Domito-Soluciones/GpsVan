<?php
include '../query/ConductorDao.php';

header('Content-Type: application/json');
$conductorDao = new ConductorDao();
$conductores = $conductorDao->getConductores();
echo "[";
for ($i = 0 ; $i < count($conductores); $i++)
{
    $nombre = $conductores[$i]->getNombre();
    $papellido = $conductores[$i]->getPapellido();
    $mapellido = $conductores[$i]->getMapellido();
    $rut = $conductores[$i]->getRut();
    $telefono = $conductores[$i]->getTelefono();
    $celular = $conductores[$i]->getCelular();
    $direccion = $conductores[$i]->getDireccion();
    $mail = $conductores[$i]->getMail();
    $tipoLicencia = $conductores[$i]->getTipoLicencia();
    $nacimiento = $conductores[$i]->getNacimiento();
    $renta = $conductores[$i]->getRenta();
    $contrato = $conductores[$i]->getContrato();
    $afp = $conductores[$i]->getAfp();
    $isapre = $conductores[$i]->getIsapre();
    $mutual = $conductores[$i]->getMutual();
    $seguroInicio = $conductores[$i]->getSeguroInicio();
    $seguroRenovacion = $conductores[$i]->getSeguroRenovacion();
    $descuento = $conductores[$i]->getDescuento();
    $anticipo = $conductores[$i]->getAnticipo();
    echo "{\"conductor_nombre\":\"".$nombre."\","
        . "\"conductor_papellido\":\"".$papellido."\","
        . "\"conductor_mapellido\":\"".$mapellido."\","
        . "\"conductor_rut\":\"".$rut."\","
        . "\"conductor_telefono\":\"".$telefono."\","
        . "\"conductor_celular\":\"".$celular."\","
        . "\"conductor_direccion\":\"".$direccion."\","
        . "\"conductor_mail\":\"".$mail."\","
        . "\"conductor_tipoLicencia\":\"".$tipoLicencia."\","
        . "\"conductor_nacimiento\":\"".$nacimiento."\","
        . "\"conductor_renta\":\"".$renta."\","
        . "\"conductor_contrato\":\"".$contrato."\","
        . "\"conductor_afp\":\"".$afp."\","
        . "\"conductor_isapre\":\"".$isapre."\","
        . "\"conductor_mutual\":\"".$mutual."\","
        . "\"conductor_seguro_inicio\":\"".$seguroInicio."\","
        . "\"conductor_seguro_renovacion\":\"".$seguroRenovacion."\","
        . "\"conductor_descuento\":\"".$descuento."\","
        . "\"conductor_anticipo\":\"".$anticipo."\""
        . "}";
    if (($i+1) != count($conductores))
    {
        echo ",";
    }
}
echo "]";
