<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../util/Mail.php';
include '../../query/AgenteDao.php';
include '../../log/Log.php';

date_default_timezone_set('Etc/UTC');

$mail = filter_input(INPUT_POST, 'mail');
$asunto = "Envio de datos de acceso";
$mensaje = "Estimado, se adjuntan sus credenciales de acceso:<br><br> ";
$mails = array($mail);
$agenteDao = new AgenteDao();
$agente = $agenteDao->getAgenteAcceso($mail);
$mensaje = $mensaje." <b>usuario:</b> ".$agente->getNick().", <b>password:</b> "
        .$agente->getClave()."<br><br>Saludos.";
echo Mail::enviarCorreo($mails, $asunto, $mensaje);
Log::write_log("SENDMAILAddAGENTE: ".$mail, 0);