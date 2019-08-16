<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ServicioDao.php';
include '../../log/Log.php';

header('Content-Type: application/json');
$id = filter_input(INPUT_POST, 'id');
$cliente = filter_input(INPUT_POST, 'cliente');
$ruta = filter_input(INPUT_POST, 'ruta');
$truta = filter_input(INPUT_POST, 'truta');
$fecha = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'fecha'))->format('Y/m/d');
$hora = filter_input(INPUT_POST, 'hora');
$estado = filter_input(INPUT_POST, 'estado');
$movil = filter_input(INPUT_POST, 'movil');
$conductor = filter_input(INPUT_POST, 'conductor');
$tarifa1 = filter_input(INPUT_POST, 'tarifa1');
$tarifa2 = filter_input(INPUT_POST, 'tarifa2');
$observaciones = filter_input(INPUT_POST, 'observacion');
$servicioDao = new ServicioDao();
$servicio = new Servicio();
$servicio->setId($id);
$servicio->setCliente($cliente);
$servicio->setRuta($ruta);
$servicio->setTruta($truta);
$servicio->setFecha($fecha);
$servicio->setHora($hora);
$servicio->setEstado($estado);
$servicio->setMovil($movil);
$servicio->setConductor($conductor);
$servicio->setTarifa1($tarifa1);
$servicio->setTarifa2($tarifa2);
$servicio->setObservaciones($observaciones);
$idServicio = $servicioDao->modificarServicio($servicio);
echo "{\"servicio_id\":\"".$idServicio."\"}";
Log::write_log("MODSERVICIO: ".$servicio->toString(), 0);
