<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/AgenteDao.php';
include '../../cripto/Cripto.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$rut = filter_input(INPUT_POST, 'rut');
$idSol = filter_input(INPUT_POST, 'idSol');  
$password = base64_encode(Cripto::encriptar(filter_input(INPUT_POST, 'password')));
$agenteDao = new AgenteDao();
$solicitud = $agenteDao->getAgenteSolicitud($rut);
if($solicitud == $idSol){
    $agenteDao->modificarAgenteClave($rut,$password);
    echo "{\"agente_modificado\":\"si\"}";
}
else{
    echo "{\"agente_modificado\":\"exp\"}";
}
Log::write_log("MODAGENTECLAVE", 0);
