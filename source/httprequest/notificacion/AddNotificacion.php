<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/NotificacionDao.php';

header('Content-Type: application/json');
$texto = filter_input(INPUT_POST, 'texto');
$tipo = filter_input(INPUT_POST, 'tipo');
$llave = filter_input(INPUT_POST, 'llave');
$fecha = filter_input(INPUT_POST, 'fecha');
$hora = filter_input(INPUT_POST, 'hora');
if($fecha != '')
{
    $fecha = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'fecha'))->format('Y/m/d');
}
$notificacion = new Notificacion();
$notificacion->setTexto($texto);
$notificacion->setTipo($tipo);
$notificacion->setLlave($llave);
$notificacion->setFecha($fecha." ".$hora);
$notificacionDao = new NotificacionDao();
$notificacionId = $notificacionDao->agregarNotificacion($notificacion);
echo "{\"notificacion_id\":\"".$notificacionId."\"}";
