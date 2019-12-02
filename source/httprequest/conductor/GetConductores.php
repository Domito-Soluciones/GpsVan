<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$busqueda = filter_input(INPUT_POST, 'busqueda');
$conductorDao = new ConductorDao();
$conductores = $conductorDao->getConductores($busqueda);
echo "[";
for ($i = 0 ; $i < count($conductores); $i++)
{
    $cId = trim($conductores[$i]->getId());
    $nombre = trim($conductores[$i]->getNombre());
    $papellido = trim($conductores[$i]->getPapellido());
    $mapellido = trim($conductores[$i]->getMapellido());
    $tipo = trim($conductores[$i]->getTipo());
    $rut = trim($conductores[$i]->getRut());
    $nick = trim($conductores[$i]->getNick());
    $telefono = trim($conductores[$i]->getTelefono());
    $celular = trim($conductores[$i]->getCelular());
    $direccion = trim($conductores[$i]->getDireccion());
    $mail = trim($conductores[$i]->getMail());
    $tipoLicencia = trim($conductores[$i]->getTipoLicencia());
    $vencLicencia = trim(date("d/m/Y", strtotime($conductores[$i]->getVencLicencia())));
    $banco = trim($conductores[$i]->getBanco());
    $ncuenta = trim($conductores[$i]->getNumeroCuenta());
    $tcuenta = trim($conductores[$i]->getTipoCuenta());
    $nacimiento = trim(date("d/m/Y", strtotime($conductores[$i]->getNacimiento())));
    $renta = trim($conductores[$i]->getRenta());
    $tipoContrato = trim($conductores[$i]->getContrato());
    $afp = trim($conductores[$i]->getAfp());
    $isapre = trim($conductores[$i]->getIsapre());
    $isapreAd = trim($conductores[$i]->getIsapreAd());
    $mutual = trim($conductores[$i]->getMutual());
    $seguroInicio = trim(date("d/m/Y", strtotime($conductores[$i]->getSeguroInicio())));
    $descuento = trim($conductores[$i]->getDescuento());
    $imagen = trim($conductores[$i]->getImagenAdjunta());
    $contrato = trim($conductores[$i]->getContratoAdjunto());
    $transportista = trim($conductores[$i]->getTransportista());
    $movil = trim($conductores[$i]->getMovil());
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
        . "\"conductor_banco\":\"".$banco."\","
        . "\"conductor_ncuenta\":\"".$ncuenta."\","
        . "\"conductor_tcuenta\":\"".$tcuenta."\","
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
        . "\"conductor_movil\":\"".$movil."\""
        . "}";
    if (($i+1) != count($conductores))
    {
        echo ",";
    }
}
echo "]";
Log::write_log("GETCONDUCTORES", 0);