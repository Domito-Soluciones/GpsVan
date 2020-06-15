<?php
require_once "../../util/SimpleXLSX.php";

include '../../log/Log.php';
include '../../query/ClienteDao.php';
include '../../query/TarifaDao.php';
include '../../query/ConductorDao.php';
include '../../query/MovilDao.php';
include '../../query/PasajeroDao.php';
include '../../query/ServicioDao.php';
include '../../query/NotificacionDao.php';

header('Content-Type: application/json');

$archivo = $_REQUEST['archivo'];
$clienteDao = new ClienteDao();
$tarifaDao = new TarifaDao();
$conductorDao = new ConductorDao();
$movilDao = new MovilDao();
$pasajeroDao = new PasajeroDao();
$servicioDao = new ServicioDao();

$arrayServicios = array();
$arrayServicioDetalle = array();
$arrayNotificaciones = array();
$arrayNotificaciones2 = array();
$j = 0;

if ($xlsx = SimpleXLSX::parse("../../util/excel/$archivo")) {
    $insertarServicio = false;
    $correcto  = 1;
    $clienteAnterior = "";
    $rutaAnterior = "";
    $tipoRutaAnterior = "";
    $fechaAnterior= "";
    $horaAnterior = "";
    $conductorAnterior = "";
    
    $idServicio = "";

    for($i = 0 ; $i < count($xlsx->rows()) ; $i++){
        if($i == 0){
            continue;
        }
        $cliente = "";
        $ruta = "";
        $tipoRuta = "";
        $fecha = "";
        $hora = "";
        $conductor = "";
        $movil = "";
        $nombrePasajero = "";
        $direccionPasajero = "";
        $telefonoPasajero = "";

        if($xlsx->rows()[$i][0] == ""){
            $cliente = $clienteAnterior;
        }
        else{
            $cliente = $clienteDao->getCliente($xlsx->rows()[$i][0]);
            $clienteAnterior = $cliente;
        }
        if($cliente == "-"){
            echo "{\"error\":\"Cliente ".$xlsx->rows()[$i][0]." no encontrado\"}";
            $correcto = 0;
            return;
        }

        if($xlsx->rows()[$i][1] == ""){
            $ruta = $rutaAnterior;
            $insertarServicio = false;
        }
        else {
            $ruta = $tarifaDao->getTarifa($xlsx->rows()[$i][1],$cliente);
            if($rutaAnterior != $xlsx->rows()[$i][1]){
                $rutaAnterior = $ruta;
                $insertarServicio = true;
                $j++;
            }
        }
        if($ruta == "-"){
            echo "{\"error\":\"Ruta ".$xlsx->rows()[$i][1]." no encontrado\"}";
            $correcto = 0;
            return;
        }

        if($xlsx->rows()[$i][2] == ""){
            $tipoRuta = $tipoRutaAnterior;
        }
        else{
            $tipoRuta = $xlsx->rows()[$i][2];
            $tipoRutaAnterior = $tipoRuta;
            if(strtoupper(trim($tipoRuta)) != "RECOGIDA" && strtoupper(trim($tipoRuta)) != "ZARPE"){
                echo "{\"error\":\"Tipo ruta ".$tipoRuta." no valido\"}";
                $correcto = 0;
                return;
            }            
        }
        if($xlsx->rows()[$i][3] == ""){
            $fecha = $fechaAnterior;
        }
        else {
            $fecha = $xlsx->rows()[$i][3];  
            $fechaAnterior = $fecha;
        }
        $fechaValida = explode('-', explode(' ', $fecha)[0]);
        if(count($fechaValida) != 3 && !checkdate($valores[1], $valores[0], $valores[2])){
            echo "{\"error\":\"Fecha ".$fecha." no valida\"}";
            $correcto = 0;
            return;
        }
        if($xlsx->rows()[$i][4] == ""){
            $hora = $horaAnterior;
        }
        else{
            $hora = $xlsx->rows()[$i][4];
            $horaAnterior = $hora;
        }
        $horaValida = explode(':', $hora);
        if(count($horaValida) != 2 && count($horaValida) != 3){
            echo "{\"error\":\"Fecha no valida\"}";
            $correcto = 0;
            return;
        }
        if($xlsx->rows()[$i][5] == ""){
            $datoConductor = explode(" ", $conductorAnterior);
            $conductor = $conductorDao->getConductorID($datoConductor[0],$datoConductor[1]);
        }
        else{
            $conductorAnterior = $xlsx->rows()[$i][5];
            $datoConductor = explode(" ", $xlsx->rows()[$i][5]);
            $conductor = $conductorDao->getConductorID($datoConductor[0],$datoConductor[1]);
        }
        if($conductor == "-"){
            echo "{\"error\":\"Conductor ".$xlsx->rows()[$i][5]." no encontrado\"}";
            $correcto = 0;
            return;
        }
        if($conductor != ""){
            $movil = $movilDao->getConductorMovil($conductor);
        }
        if($movil == "-"){
            echo "{\"error\":\"Conductor ".$xlsx->rows()[$i][5]." sin movil asociado\"}";
            $correcto = 0;
            return;
        }

        $tarifas = explode('%', $tarifaDao->getPrecioTarifa($ruta,$cliente));
        $tarifa1 = $tarifas[0];
        if(!is_numeric($tarifa1)){
            echo "{\"error\":\"Tarifa 1 no es numérico\"}";
            $correcto = 0;
            return;
        }
        $tarifa2 = $tarifas[1];
        if(!is_numeric($tarifa2)){
            echo "{\"error\":\"Tarifa 2 no es numérico\"}";
            $correcto = 0;
            return;
        }

        if($xlsx->rows()[$i][6] == ""){
            echo "{\"error\":\"Columna pasajero no puede ser vacia\"}";
            $correcto = 0;
            return;
        }
        else{
            $datos = explode(" ", $xlsx->rows()[$i][6]);
            $pasajero = $pasajeroDao->getPasajeroNombre($datos[0],$datos[1], $cliente);
            if($pasajero->getRut() == ""){
                echo "{\"error\":\"Pasajero $datos[0] $datos[1] no encontrado\"}";
                $correcto = 0;
                return;
            }
            else{
                $nombrePasajero = $pasajero->getNombre()." ".$pasajero->getPapellido();
                $direccionPasajero = $pasajero->getPunto();
                $telefonoPasajero = $pasajero->getCelular();
            }
        }

            $servicio = new Servicio();
            $servicio->setId($j);
            $servicio->setCliente($cliente);
            $servicio->setRuta($ruta);
            $servicio->setTruta(strtoupper(trim($tipoRuta)));
            $servicio->setFecha($fecha);
            $servicio->setHora($hora);
            $servicio->setMovil($movil);
            $servicio->setConductor($conductor);
            $servicio->setTarifa1($tarifa1);
            $servicio->setTarifa2($tarifa2);
            $servicio->setAgente(0);
            $servicio->setEstado(1);
            $servicio->setObservaciones("");
            $servicio->setTipo(0);
            $servicio->setCC("");
            $servicio->setAnterior("");
            array_push($arrayServicios, $servicio);

            $notificacion = new Notificacion();
            $notificacion->setId($j);
            $notificacion->setTexto("Nuevo servicio asignado con id: ");
            $notificacion->setTipo("0");
            $notificacion->setLlave($conductor);
            $notificacion->setFecha($fecha." ".$hora);
            $notificacion->setIdServicio($idServicio);
            array_push($arrayNotificaciones, $notificacion);

            $notificacion1 = new Notificacion();
            $notificacion1->setId($j);
            $notificacion1->setTexto("Se aproxima el siguiente servicio: ");
            $notificacion1->setTipo("1");
            $notificacion1->setLlave($conductor);
            $notificacion1->setFecha($fecha." ".$hora);
            $notificacion1->setIdServicio($idServicio);
            array_push($arrayNotificaciones2, $notificacion1);

            $servicioPasajero = new ServicioPasajero();
            $servicioPasajero->setId($j);
            $servicioPasajero->setPasajero($nombrePasajero);
            $servicioPasajero->setDestino($direccionPasajero);
            array_push($arrayServicioDetalle, $servicioPasajero);
    }


} else {
        echo SimpleXLSX::parseError();
}

if($correcto){
    $servicioDao->addServicioExcel($arrayServicios,$arrayServicioDetalle,$arrayNotificaciones,$arrayNotificaciones2);
    echo "{\"estado\":\"Archivo cargado exitosamente\"}";
}
