<?php

include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/AgenteDao.php';
include '../../dominio/Solicitud.php';
include '../../query/SolicitudDao.php';
include '../../cripto/Cripto.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$rut = filter_input(INPUT_POST, 'rut');
$agenteDao = new AgenteDao();
$mail = $agenteDao->isAgenteExiste($rut);
$idSolicitud = 0;
if($mail != ''){
    $solicitudDao = new SolicitudDao();
    $idSolicitud = $solicitudDao->agregarSolicitud(Solicitud::$CLAVE_ADMINISTRADOR,$rut);
    $agenteDao->setIdSolicitud($rut,$idSolicitud);
}
echo "{\"agente_rut\":\"".base64_encode(Cripto::encriptar($rut))."\","
    . "\"agente_mail\":\"".base64_encode(Cripto::encriptar($mail))."\","
    . "\"agente_idsol\":\"".$idSolicitud."\"}";
