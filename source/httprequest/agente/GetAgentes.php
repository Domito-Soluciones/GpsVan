<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/AgenteDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$agenteDao = new AgenteDao();
$agentes = $agenteDao->getAgentes($busqueda);
echo "[";
for ($i = 0 ; $i < count($agentes); $i++)
{
    $cId = trim($agentes[$i]->getId());
    $nombre = trim($agentes[$i]->getNombre());
    $papellido = trim($agentes[$i]->getApellidoPat());
    $mapellido = trim($agentes[$i]->getApellidoMat());
    $rut = trim($agentes[$i]->getRut());
    $nick = trim($agentes[$i]->getNick());
    $telefono = trim($agentes[$i]->getTelefono());
    $celular = trim($agentes[$i]->getCelular());
    $direccion = trim($agentes[$i]->getDireccion());
    $mail = trim($agentes[$i]->getMail());
    $perfil = trim($agentes[$i]->getPerfil());
    $empresa = trim($agentes[$i]->getEmpresa());
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
        . "\"agente_perfil\":\"".$perfil."\","
        . "\"agente_empresa\":\"".$empresa."\""
        . "}";
    if (($i+1) != count($agentes))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETAGENTES", 0);