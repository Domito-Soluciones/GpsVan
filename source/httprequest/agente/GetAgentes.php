<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/AgenteDao.php';

header('Content-Type: application/json');
$busqueda = $_REQUEST['busqueda'];
$agenteDao = new AgenteDao();
$agentes = $agenteDao->getAgentes($busqueda);
echo "[";
for ($i = 0 ; $i < count($agentes); $i++)
{
    $cId = $agentes[$i]->getId();
    $nombre = $agentes[$i]->getNombre();
    $papellido = $agentes[$i]->getApellidoPat();
    $mapellido = $agentes[$i]->getApellidoMat();
    $rut = $agentes[$i]->getRut();
    $nick = $agentes[$i]->getNick();
    $telefono = $agentes[$i]->getTelefono();
    $celular = $agentes[$i]->getCelular();
    $direccion = $agentes[$i]->getDireccion();
    $mail = $agentes[$i]->getMail();
    $cargo = $agentes[$i]->getCargo();
    $perfil = $agentes[$i]->getPerfil();
    echo "{\"agente_id\":\"".$cId."\","
        . "\"agente_nombre\":\"".$nombre."\","
        . "\"agente_papellido\":\"".$papellido."\","
        . "\"agente_mapellido\":\"".$mapellido."\","
        . "\"agente_rut\":\"".$rut."\","
        . "\"agente_nick\":\"".$nick."\","
        . "\"agente_telefono\":\"".$telefono."\","
        . "\"agente_celular\":\"".$celular."\","
        . "\"agente_direccion\":\"".$direccion."\","
        . "\"agente_mail\":\"".$mail."\","
        . "\"agente_cargo\":\"".$cargo."\","
        . "\"agente_perfil\":\"".$perfil."\""
        . "}";
    if (($i+1) != count($agentes))
    {
        echo ",";
    }
}
echo "]";