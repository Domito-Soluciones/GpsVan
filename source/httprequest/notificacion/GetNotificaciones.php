<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/NotificacionDao.php';

header('Content-Type: application/json');
$llave = filter_input(INPUT_POST, 'llave');
$notificacionDao = new NotificacionDao();
$notificaciones = $notificacionDao->getNotificaciones($llave);
echo "[";
for ($i = 0 ; $i < count($notificaciones); $i++)
{
    $notificacionId = $notificaciones[$i]->getId();
    $notificacionTexto = $notificaciones[$i]->getTexto();
    $notificacionTipo = $notificaciones[$i]->getTipo();
    $notificacionFecha = $notificaciones[$i]->getFecha();
    echo "{\"notificacion_id\":\"".$notificacionId."\","
        . "\"notificacion_texto\":\"".$notificacionTexto."\","
        . "\"notificacion_tipo\":\"".$notificacionTipo."\","
        . "\"notificacion_fecha\":\"".$notificacionFecha."\""
        . "}";
    if (($i+1) != count($notificaciones))
    {
        echo ",";
    }
}
echo "]";
