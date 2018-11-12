<?php
include '../../util/validarPeticion.php';

    session_start();
    $res = 0;
    if(isset($_POST['app']))
    {
        $res  = 1;
    }
    if(isset($_SESSION['agente']))
    {
        if($res == 0)
        {
            $res = 1;
        }
    }
    if($res == 0)
    {
        print('return'); 
        exit();
    }

    include '../../query/ServicioDao.php';
    include '../../dominio/Servicio.php';
    $partida = "";
    if(isset($_REQUEST['partida']))
    {
        $partida = urlencode($_REQUEST['partida']);
    }
    $partida_id = "";
    if(isset($_REQUEST['partidaId']))
    {
        $partida_id = $_REQUEST['partidaId'];
    }
    $destino = "";
    if(isset($_REQUEST['destino']))
    {
        $destino = urlencode($_REQUEST['destino']);
    }
    $destino_id = "";
    if(isset($_REQUEST['destinoId']))
    {
        $destino_id = $_REQUEST['destinoId'];
    }
    $cliente = "";
    if(isset($_REQUEST['cliente']))
    {
        $cliente = $_REQUEST['cliente'];
    }
    $usuario = "";
    if(isset($_REQUEST['usuario']))
    {
        $usuario = $_REQUEST['usuario'];
    }
    $transportista = "";
    if(isset($_REQUEST['transportista']))
    {
        $transportista = $_REQUEST['transportista'];
    }
    $movil = "";
    if(isset($_REQUEST['movil']))
    {
        $movil = $_REQUEST['movil'];
    }
    $tipo = "";
    if(isset($_REQUEST['tipo']))
    {
        $tipo = $_REQUEST['tipo'];
    }
    $tarifa = 0;
    if(isset($_REQUEST['tarifa']))
    {
        $tarifa = $_REQUEST['tarifa'];
    }
    $agente = 0;
    if(isset($_REQUEST['agente']))
    {
        $agente = $_REQUEST['agente'];
    }

    $servicio = new Servicio();
    $servicio->setPartida($partida);
    $servicio->setPartidaId($partida_id); 
    $servicio->setDestino($destino);
    $servicio->setDestinoId($destino_id);
    $servicio->setCliente($cliente);
    $servicio->setUsuario_nombre($usuario);
    $servicio->setTransportista($transportista);
    $servicio->setMovil($movil);
    $servicio->setTipo($tipo);
    $servicio->setTarifa($tarifa);
    $servicio->setAgente($agente);
    $servicioDao = new ServicioDao();
    $idServicio = $servicioDao->addServicio($servicio);
    if($idServicio > 0)
    {
        $servicioDao->actualizarMovil($servicio->getMovil());
    }
    print $idServicio;
