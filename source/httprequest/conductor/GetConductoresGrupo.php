<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';

header('Content-Type: application/json');
$grupo = filter_input(INPUT_POST, 'grupo');
$conductorDao = new ConductorDao();
$conductores = $conductorDao->getConductoresGrupo($grupo);
echo "[";
for ($i = 0 ; $i < count($conductores); $i++)
{
    $cId = $conductores[$i]->getId();
    $nombre = $conductores[$i]->getNombre();
    $papellido = $conductores[$i]->getPapellido();
    $mapellido = $conductores[$i]->getMapellido();
    $tipo = $conductores[$i]->getTipo();
    $rut = $conductores[$i]->getRut();
    $nick = $conductores[$i]->getNick();
    $telefono = $conductores[$i]->getTelefono();
    $celular = $conductores[$i]->getCelular();
    $direccion = $conductores[$i]->getDireccion();
    $mail = $conductores[$i]->getMail();
    $tipoLicencia = $conductores[$i]->getTipoLicencia();
    $vencLicencia = date("d/m/Y", strtotime($conductores[$i]->getVencLicencia()));
    $nacimiento = date("d/m/Y", strtotime($conductores[$i]->getNacimiento()));
    $renta = $conductores[$i]->getRenta();
    $tipoContrato = $conductores[$i]->getContrato();
    $afp = $conductores[$i]->getAfp();
    $isapre = $conductores[$i]->getIsapre();
    $isapreAd = $conductores[$i]->getIsapreAd();
    $mutual = $conductores[$i]->getMutual();
    $seguroInicio = date("d/m/Y", strtotime($conductores[$i]->getSeguroInicio()));
    $descuento = $conductores[$i]->getDescuento();
    $imagen = $conductores[$i]->getImagenAdjunta();
    $contrato = $conductores[$i]->getContratoAdjunto();
    $transportista = $conductores[$i]->getTransportista();
    $grupo = $conductores[$i]->getGrupo();
    $movil = $conductores[$i]->getMovil();
    echo "{\"conductor_id\":\"".$cId."\","
        . "\"conductor_nombre\":\"".$nombre."\","
        . "\"conductor_papellido\":\"".$papellido."\","
        . "\"conductor_mapellido\":\"".$mapellido."\","
        . "\"conductor_tipo\":\"".$tipo."\","
        . "\"conductor_rut\":\"".$rut."\","
        . "\"conductor_nick\":\"".$nick."\","
        . "\"conductor_telefono\":\"".$telefono."\","
        . "\"conductor_celular\":\"".$celular."\","
        . "\"conductor_direccion\":\"".$direccion."\","
        . "\"conductor_mail\":\"".$mail."\","
        . "\"conductor_tipoLicencia\":\"".$tipoLicencia."\","
        . "\"conductor_vencLicencia\":\"".$vencLicencia."\","
        . "\"conductor_nacimiento\":\"".$nacimiento."\","
        . "\"conductor_renta\":\"".$renta."\","
        . "\"conductor_tipo_contrato\":\"".$tipoContrato."\","
        . "\"conductor_afp\":\"".$afp."\","
        . "\"conductor_isapre\":\"".$isapre."\","
        . "\"conductor_isapre_ad\":\"".$isapreAd."\","
        . "\"conductor_mutual\":\"".$mutual."\","
        . "\"conductor_seguro_inicio\":\"".$seguroInicio."\","
        . "\"conductor_descuento\":\"".$descuento."\","
        . "\"conductor_imagen\":\"".$imagen."\","
        . "\"conductor_contrato\":\"".$contrato."\","
        . "\"conductor_transportista\":\"".$transportista."\","
        . "\"conductor_movil\":\"".$movil."\","
        . "\"conductor_grupo\":\"".$grupo."\""
        . "}";
    if (($i+1) != count($conductores))
    {
        echo ",";
    }
}
echo "]";