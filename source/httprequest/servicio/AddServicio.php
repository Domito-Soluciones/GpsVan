<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$cliente = filter_input(INPUT_POST, 'cliente');
$ruta = filter_input(INPUT_POST, 'ruta');
$truta = filter_input(INPUT_POST, 'truta');
$fecha = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'fecha'))->format('Y/m/d');
$hora = filter_input(INPUT_POST, 'hora');
$movil = filter_input(INPUT_POST, 'movil');    
$conductor = filter_input(INPUT_POST, 'conductor');    
$tarifa1 = filter_input(INPUT_POST, 'tarifa1');    
$tarifa2 = filter_input(INPUT_POST, 'tarifa2');   
$observaciones = filter_input(INPUT_POST, 'observaciones');   
$estado = filter_input(INPUT_POST, 'estado'); 
$tipo = filter_input(INPUT_POST, 'tipo'); 
$cc = filter_input(INPUT_POST, 'cc'); 
$agente = 0;
if(filter_input(INPUT_POST, 'app') == '')
{
    session_start();
    if(isset($_SESSION['agente']))
    {
        $agente = $_SESSION['agente'];
    }
    else
    {
        echo "{\"resp\":\"return\"}";
        exit();
    }
}
$servicio = new Servicio();
$servicio->setCliente($cliente);
$servicio->setRuta($ruta);
$servicio->setTruta($truta);
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
$servicio->setCC($cc);
$servicioDao = new ServicioDao();
$idServicio = $servicioDao->addServicio($servicio);
echo "{\"servicio_id\":\"".$idServicio."\"}";
Log::write_log("ADDSERVICIO: ".$servicio->toString(), 0);