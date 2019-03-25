<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$partida = filter_input(INPUT_POST, 'partida');
$destino = filter_input(INPUT_POST, 'destino');
$pasajero = filter_input(INPUT_POST, 'pasajero');
$celular = filter_input(INPUT_POST, 'celular');
$fecha = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'fecha'))->format('Y/m/d');
$hora = filter_input(INPUT_POST, 'hora');
$movil = filter_input(INPUT_POST, 'movil');    
$conductor = filter_input(INPUT_POST, 'conductor');    
$tarifa = filter_input(INPUT_POST, 'tarifa');    
$observaciones = filter_input(INPUT_POST, 'observaciones');   
$agente = 0;
if(filter_input(INPUT_POST, 'app') == '')
{
    session_start();
    $agente = $_SESSION['agente'];
}
$servicio = new ServicioEspecial();
$servicio->setPartida($partida);
$servicio->setDestino($destino);
$servicio->setPasajero($pasajero);
$servicio->setCelular($celular);
$servicio->setFecha($fecha);
$servicio->setHora($hora);
$servicio->setMovil($movil);
$servicio->setConductor($conductor);
$servicio->setTarifa($tarifa);
$servicio->setAgente($agente);
$servicio->setObservaciones($observaciones);
$servicioDao = new ServicioDao();
$idServicio = $servicioDao->addServicioEspecial($servicio);
echo "{\"servicio_id\":\"".$idServicio."\"}";
Log::write_log("ADDSERVICIOESPECIAL", 0);