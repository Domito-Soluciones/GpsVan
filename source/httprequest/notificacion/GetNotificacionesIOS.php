<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/NotificacionDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$notificacionDao = new NotificacionDao();
$notificaciones = $notificacionDao->getNotificacionesIOS();
echo "[";
for ($i = 0 ; $i < count($notificaciones); $i++)
{
    $notificacionId = $notificaciones[$i]->getId();
    $notificacionTexto = $notificaciones[$i]->getTexto();
    $notificacionTipo = $notificaciones[$i]->getTipo();
    $notificacionFecha = $notificaciones[$i]->getFecha();
    $notificacionKey = $notificaciones[$i]->getLlave();
    $notificacionDevID = $notificaciones[$i]->getDeviceID();
    echo "{\"notificacion_id\":\"".$notificacionId."\","
        . "\"notificacion_texto\":\"".$notificacionTexto."\","
        . "\"notificacion_tipo\":\"".$notificacionTipo."\","
        . "\"notificacion_fecha\":\"".$notificacionFecha."\","
        . "\"notificacion_llave\":\"".$notificacionKey."\","
        . "\"notificacion_device_id\":\"".$notificacionDevID."\""
        . "}";
    if (($i+1) != count($notificaciones))
    {
        echo ",";
    }
}
echo "]";
//Log::write_log("GETNOTIFICACIONES", 0);