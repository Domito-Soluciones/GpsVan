<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$cliente = filter_input(INPUT_POST, 'cliente');
$ruta = filter_input(INPUT_POST, 'ruta');
$fecha = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'fecha'))->format('Y/m/d');
$hora = filter_input(INPUT_POST, 'hora');
$movil = filter_input(INPUT_POST, 'movil');    
$conductor = filter_input(INPUT_POST, 'conductor');    
$tarifa1 = filter_input(INPUT_POST, 'tarifa1');    
$tarifa2 = filter_input(INPUT_POST, 'tarifa2');   
$observaciones = filter_input(INPUT_POST, 'observaciones');   
$estado = filter_input(INPUT_POST, 'estado'); 
$tipo = filter_input(INPUT_POST, 'tipo'); 
$agente = 0;
if(filter_input(INPUT_POST, 'app') == '')
{
    session_start();
    $agente = $_SESSION['agente'];
}
$servicio = new Servicio();
$servicio->setCliente($cliente);
$servicio->setRuta($ruta);
$servicio->setFecha($fecha);
$servicio->setHora($hora);
$servicio->setMovil($movil);
$servicio->setConductor($conductor);
$servicio->setTarifa1($tarifa1);
$servicio->setTarifa2($tarifa2);
$servicio->setAgente($agente);
$servicio->setEstado($estado);
$servicio->setObservaciones($observaciones);
$servicio->setTipo($tipo);
$servicioDao = new ServicioDao();
$idServicio = $servicioDao->addServicio($servicio);
echo "{\"servicio_id\":\"".$idServicio."\"}";
Log::write_log("ADDSERVICIO", 0);