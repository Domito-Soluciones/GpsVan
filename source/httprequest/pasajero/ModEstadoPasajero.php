<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/PasajeroDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$usuario = filter_input(INPUT_POST, 'usuario');
$estado = filter_input(INPUT_POST, 'estado');
$pasajeroDao = new PasajeroDao();
$pasajeroDao->cambiarEstadoPasajero($estado, $usuario);
echo "{\"pasajero_nick\":".$usuario.","
    . "\"pasajero_estado\":".$estado."}";
Log::write_log("MODESTADOPASAJERO: ".$usuario." ".$estado, 0);

