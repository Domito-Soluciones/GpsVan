<?php
    session_start();
    if(!isset($_SESSION['agente']))
    {   
        print('return');
    }
    else
    {
        include '../../query/ConductorDao.php';

        $nombre = $_REQUEST['nombre'];
        $papellido = $_REQUEST['papellido'];
        $mapellido = $_REQUEST['mapellido'];
        $rut = $_REQUEST['rut'];
        $telefono = $_REQUEST['telefono'];
        $celular = $_REQUEST['celular'];
        $direccion = $_REQUEST['direccion'];
        $mail = $_REQUEST['mail'];
        $tipoLicencia = $_REQUEST['tipoLicencia'];
        $nacimiento = $_REQUEST['nacimiento'];
        $renta = $_REQUEST['renta'];
        $contrato = $_REQUEST['contrato'];
        $afp = $_REQUEST['afp'];
        $isapre = $_REQUEST['isapre'];
        $mutual = $_REQUEST['mutual'];
        $seguroInicio = $_REQUEST['seguroInicio'];
        $seguroRenovacion = $_REQUEST['seguroRenovacion'];
        $descuento = $_REQUEST['descuento'];
        $anticipo = $_REQUEST['anticipo'];
        $conductor = new Conductor();
        $conductor->setNombre($nombre);
        $conductor->setPapellido($papellido);
        $conductor->setMapellido($mapellido);
        $conductor->setRut($rut);
        $conductor->setTelefono($telefono);
        $conductor->setCelular($celular);
        $conductor->setDireccion($direccion);
        $conductor->setMail($mail);
        $conductor->setTipoLicencia($tipoLicencia);
        $conductor->setNacimiento($nacimiento);
        $conductor->setRenta($renta);
        $conductor->setContrato($contrato);
        $conductor->setAfp($afp);
        $conductor->setIsapre($isapre);
        $conductor->setMutual($mutual);
        $conductor->setSeguroInicio($seguroInicio);
        $conductor->setSeguroRenovacion($seguroRenovacion);
        $conductor->setDescuento($descuento);
        $conductor->setAnticipo($anticipo);

        $conductorDao = new ConductorDao();
        $conductorDao->agregarConductor($conductor);
    }
