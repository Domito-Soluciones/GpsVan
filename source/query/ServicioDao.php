<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Servicio.php';
include '../../dominio/ServicioEspecial.php';
include '../../dominio/ServicioDetalle.php';
include '../../dominio/ServicioPasajero.php';
include '../../dominio/Movil.php';
include '../../dominio/Pasajero.php';

class ServicioDao {
    
    public function addServicio($servicio)
    {
        $id = 0;
        $cliente = $servicio->getCliente();
        $ruta = $servicio->getRuta();
        $truta = $servicio->getTruta();
        $fecha = $servicio->getFecha();
        $hora = $servicio->getHora();
        $movil = $servicio->getMovil();
        $conductor = $servicio->getConductor();
        $tarifa1 = $servicio->getTarifa1();
        $tarifa2 = $servicio->getTarifa2();
        $observaciones = $servicio->getObservaciones();
        $agente = $servicio->getAgente();
        $estado = $servicio->getEstado();
        $tipo = $servicio->getTipo();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_servicio (servicio_cliente,servicio_ruta,servicio_truta,servicio_fecha,"
                    . "servicio_hora,servicio_movil,servicio_conductor,servicio_tarifa1,servicio_tarifa2,servicio_observacion,servicio_agente,servicio_estado,servicio_tipo)"
                    . " VALUES ('$cliente','$ruta','$truta','$fecha','$hora','$movil','$conductor','$tarifa1','$tarifa2','$observaciones',$agente,$estado,$tipo)";
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    public function addServicioEspecial($servicio)
    {
        $id = 0;
        $partida = $servicio->getPartida();
        $destino = $servicio->getDestino();
        $pasajero = $servicio->getPasajero();
        $celular = $servicio->getCelular();
        $fecha = $servicio->getFecha();
        $hora = $servicio->getHora();
        $movil = $servicio->getMovil();
        $conductor = $servicio->getConductor();
        $tarifa = $servicio->getTarifa();
        $observaciones = $servicio->getObservaciones();
        $agente = $servicio->getAgente();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_servicio_especial(servicio_especial_partida, servicio_especial_destino, "
                    . "servicio_especial_pasajero, servicio_especial_celular, servicio_especial_fecha, servicio_especial_hora, servicio_especial_movil,"
                    . " servicio_especial_conductor, servicio_especial_tarifa, servicio_especial_observacion, servicio_especial_agente, "
                    . "servicio_especial_estado)"
                    . " VALUES ('$partida','$destino','$pasajero',$celular,'$fecha','$hora','$movil','$conductor','$tarifa','$observaciones',$agente,1)";
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    public function addServicioDetalle($lat,$lon,$pasajeros,$destinos,$idServicio)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "";
            if($lat != "" && $lon != "")
            {
                $query = "INSERT INTO tbl_servicio_detalle "
                        . "(servicio_detalle_servicio,servicio_detalle_lat,servicio_detalle_lon)"
                        . " VALUES ($idServicio,'$lat','$lon');";
            }
            for($i = 0 ; $i < count($pasajeros) ; $i++)
            {
                if($pasajeros[$i] != "undefined")
                {
                    $query .= "INSERT INTO tbl_servicio_pasajero (servicio_pasajero_id_servicio,servicio_pasajero_id_pasajero,servicio_pasajero_destino) VALUES ($idServicio,$pasajeros[$i],'$destinos[$i]');"; 
                }
            }
            $conn->conectar();
            if (mysqli_multi_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    public function addServicioDetalleReal($lat,$lon,$idServicio)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_servicio_detalle_real "
                    . "(servicio_detalle_real_servicio,servicio_detalle_real_lat,servicio_detalle_real_lon)"
                    . " VALUES ($idServicio,'$lat','$lon');";
            $conn->conectar();
            if (mysqli_multi_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    public function modificarServicio($servicio)
    {
        $id = $servicio->getId();
        $cliente = $servicio->getCliente();
        $ruta = $servicio->getRuta();
        $truta = $servicio->getTRuta();
        $fecha = $servicio->getFecha();
        $hora = $servicio->getHora();
        $estado = $servicio->getEstado();
        $movil = $servicio->getMovil();
        $tarifa1 = $servicio->getTarifa1();
        $tarifa2 = $servicio->getTarifa2();
        $observacion = $servicio->getObservaciones();
        $conductor = $servicio->getConductor();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_servicio SET servicio_cliente = '$cliente',servicio_ruta = '$ruta',servicio_truta = '$truta', servicio_fecha = '$fecha',"
                    . "servicio_hora = '$hora',servicio_movil = '$movil',servicio_estado = '$estado',"
                    . "servicio_conductor = '$conductor',servicio_observacion = '$observacion', servicio_tarifa1 = '$tarifa1', servicio_tarifa2 = '$tarifa2' WHERE servicio_id = ".$id; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
   
    public function getServicios($id,$empresa,$conductor,$estado,$movil,$desde,$hdesde,$hasta,$hhasta)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaId = '';
            $buscaEmpresa = '';
            $buscaConductor = '';
            $buscaMovil = '';
            $buscaEstado = '';
            $buscaFecha = '';
            if($id != '')
            {
                $buscaId = " AND servicio_id LIKE '%$id%' ";
            }
            if($empresa != '')
            {
                $buscaEmpresa = " AND servicio_cliente LIKE '%$empresa%' ";
            }
            if($conductor != '')
            {
                $buscaConductor = " AND servicio_conductor = '$conductor' ";
            }
            if($movil != '')
            {
                $buscaMovil = " AND servicio_movil LIKE '%$movil%' ";
            }
            if($estado != '')
            {
                $buscaEstado = " AND servicio_estado = $estado ";
            }
            if($desde != '' && $hasta == '')
            {
                $buscaFecha = "AND servicio_fecha > '".$desde." ".$hdesde."' ";
            }
            if($hasta != '' && $desde == '')
            {
                $buscaFecha = "AND servicio_fecha < '".$hasta." ".$hhasta."' ";
            }
            if($desde != '' && $hasta != '')
            {
                $buscaFecha = "AND servicio_fecha BETWEEN '".$desde." ".$hdesde."' AND '".$hasta." ".$hhasta."'";
            }
            $query = "SELECT * FROM tbl_servicio WHERE servicio_estado NOT IN (0,6) "
                    .$buscaFecha." ".$buscaId." ".$buscaEmpresa." ".$buscaConductor." ".$buscaMovil." ".$buscaEstado
                    . " ORDER BY servicio_id DESC LIMIT 15";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();
                $servicio->setId($row["servicio_id"]);          
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setRuta($row["servicio_ruta"]);
                $date = new DateTime($row["servicio_fecha"]);
                $servicio->setFecha(date_format($date, 'd/m/Y'));
                $servicio->setHora($row["servicio_hora"]);
                $servicio->setMovil($row["servicio_movil"]);
                $servicio->setConductor($row["servicio_conductor"]);
                $servicio->setTarifa1($row["servicio_tarifa1"]);
                $servicio->setTarifa2($row["servicio_tarifa2"]);
                $servicio->setEstado($row["servicio_estado"]);
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getServicio($id)
    {
        $conn = new Conexion();
        $servicio = new Servicio();
        try {
            $query = "SELECT * FROM tbl_servicio WHERE "
                    . "servicio_id = $id";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $servicio->setId($row["servicio_id"]);          
                $servicio->setPartida($row["servicio_partida"]);
                $servicio->setDestinoInt1($row["servicio_destino_intermedio_uno "]);
                $servicio->setDestinoInt2($row["servicio_destino_intermedio_dos"]);
                $servicio->setDestinoInt3($row["servicio_destino_intermedio_tres"]);
                $servicio->setDestinoFinal($row["servicio_destino_final"]);
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setUsuario_nombre($row["servicio_usuario"]);
                $servicio->setTransportista($row["servicio_transportista"]);
                $servicio->setMovil($row["servicio_movil"]);
                $servicio->setTipo($row["servicio_tipo"]);
                $servicio->setTarifa($row["servicio_tarifa"]);
                $servicio->setAgente($row["servicio_agente"]);
                $date = new DateTime($row["servicio_fecha"]);
                $servicio->setFecha(date_format($date, 'd-m-Y H:i:s'));
                $servicio->setEstado($row["servicio_estado"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $servicio;
    }
    
    public function getPasajerosServicios($id)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_servicio_pasajero JOIN tbl_pasajero ON servicio_pasajero_id_pasajero = pasajero_id WHERE "
                    . "servicio_pasajero_id_servicio = '$id'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $servicioPasajero = new ServicioPasajero();
                $servicioPasajero->setId($row["servicio_pasajero_id_servicio"]);          
                $servicioPasajero->setPasajero($row["pasajero_nombre"]." ".$row["pasajero_papellido"]);
                $servicioPasajero->setEstado($row["servicio_pasajero_estado"]);
                $servicioPasajero->setHora($row["servicio_pasajero_hora_destino"]);
                $servicioPasajero->setDestino($row["servicio_pasajero_destino"]);
                array_push($array, $servicioPasajero);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    public function getServiciosDetalle($id)
    {
        $servicioDetalle = new ServicioDetalle();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_servicio_detalle WHERE "
                    . "servicio_detalle_servicio = '$id'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $servicioDetalle->setId($row["servicio_detalle_id"]);          
                $servicioDetalle->setLat($row["servicio_detalle_lat"]);
                $servicioDetalle->setLon($row["servicio_detalle_lon"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $servicioDetalle;
    }
    
    public function getCountServicios($desde,$hasta)
    {
        $array = array();
        $conn = new Conexion();
        try {
            
            $query = "SELECT lower(servicio_tipo) as tipo,count(*) as total FROM tbl_servicio where servicio_fecha >= '$desde 00:00:00.0' and servicio_fecha <= '$hasta 23:59:59.999' group by servicio_tipo";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $array[$row["tipo"]] = $row['total'];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getCountServiciosConductor($desde,$hasta)
    {
        $array = array();
        $conn = new Conexion();
        try {
            
            $query = "SELECT servicio_movil,count(*) as total FROM tbl_servicio WHERE servicio_fecha >= '$desde 00:00:00.0' and servicio_fecha <= '$hasta 23:59:59.999' group by servicio_movil";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $array[$row["servicio_movil"]] = $row['total'];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getServicioAsignado($usuario)
    {
        $conn = new Conexion();
        try {
            $servicio = new Servicio();            
            $query = "SELECT * FROM tbl_servicio JOIN tbl_pasajero ON servicio_usuario = CONCAT(pasajero_nombre,' ',pasajero_papellido) "
                    . "WHERE servicio_estado = 2 AND servicio_movil = (SELECT (SELECT movil_nombre FROM tbl_movil WHERE movil_id = conductor_movil) as conductor_movil FROM tbl_conductor WHERE conductor_nick = '$usuario')";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $servicio->setId($row["servicio_id"]);          
                $servicio->setPartida($row["servicio_partida"]);
                $servicio->setDestinoInt1($row["servicio_destino_intermedio_uno "]);
                $servicio->setDestinoInt2($row["servicio_destino_intermedio_dos"]);
                $servicio->setDestinoInt3($row["servicio_destino_intermedio_tres"]);
                $servicio->setDestinoFinal($row["servicio_destino_final"]);
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setUsuario_id($row["pasajero_id"]);
                $servicio->setUsuario_nombre($row["pasajero_nombre"]);
                $servicio->setUsuario_direccion($row["pasajero_direccion"]);
                $servicio->setUsuario_celular($row["pasajero_celular"]);
                $servicio->setTransportista($row["servicio_transportista"]);
                $servicio->setMovil($row["servicio_movil"]);
                $servicio->setTipo($row["servicio_tipo"]);
                $servicio->setTarifa($row["servicio_tarifa"]);
                $servicio->setAgente($row["servicio_agente"]);
                $servicio->setFecha($row["servicio_fecha"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $servicio;
    }
    public function getServicioPorAsignar()
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_servicio WHERE servicio_estado = 0 AND servicio_tipo = 1 ORDER BY servicio_id";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();            
                $servicio->setId($row["servicio_id"]);
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setRuta($row["servicio_ruta"]);
                $date = new DateTime($row["servicio_fecha"]);
                $servicio->setFecha(date_format($date, 'd/m/Y'));
                $servicio->setHora($row["servicio_hora"]);
                $servicio->setObservaciones($row["servicio_observacion"]);
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getServicioProgramados($conductor)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT servicio_id,servicio_cliente,servicio_ruta,servicio_truta,servicio_fecha,"
                    . "servicio_hora,servicio_conductor,servicio_estado,servicio_tarifa1,"
                    . "servicio_observacion,servicio_conductor,movil_nombre,"
                    . "servicio_pasajero_estado,servicio_pasajero_destino,pasajero_id,pasajero_nombre,pasajero_papellido,pasajero_celular,cliente_direccion "
                    . " FROM tbl_servicio JOIN tbl_servicio_pasajero ON"
                    . " servicio_id = servicio_pasajero_id_servicio JOIN tbl_servicio_detalle"
                    . " ON servicio_id = servicio_detalle_servicio "
                    . "JOIN tbl_movil ON servicio_movil = movil_nombre "
                    . "JOIN tbl_pasajero ON servicio_pasajero_id_pasajero = pasajero_id "
                    . "JOIN tbl_cliente ON servicio_cliente = cliente_razon_social "
                    . "WHERE servicio_conductor = '$conductor' AND servicio_estado NOT IN (5,6) "
                    . "ORDER BY servicio_id desc LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();            
                $servicio->setId($row["servicio_id"]);
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setClienteDireccion($row["cliente_direccion"]);
                $servicio->setRuta($row["servicio_ruta"]);
                $servicio->setTruta($row["servicio_truta"]);
                $servicio->setFecha($row["servicio_fecha"]);
                $servicio->setHora($row["servicio_hora"]);
                $servicio->setMovil($row["movil_nombre"]);
                $servicio->setEstado($row["servicio_estado"]);
                $servicio->setConductor($row["servicio_conductor"]);
                $servicio->setTarifa1($row["servicio_tarifa1"]); 
                $servicio->setObservaciones($row["servicio_observacion"]);
                $pasajero = new Pasajero();
                $pasajero->setId($row["pasajero_id"]);
                $pasajero->setNombre($row["pasajero_nombre"] . " " . $row["pasajero_papellido"]);
                $pasajero->setCelular($row["pasajero_celular"]);
                $pasajero->setEstado($row["servicio_pasajero_estado"]);
                $servicio->setPasajero($pasajero);
                $servicio->setDestino($row["servicio_pasajero_destino"]);
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getServicioEspeciales($conductor)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_servicio_especial WHERE servicio_especial_conductor = '$conductor' AND servicio_especial_estado NOT IN (4,5,6) ORDER BY servicio_especial_id desc LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new ServicioEspecial();            
                $servicio->setId($row["servicio_especial_id"]);
                $servicio->setPartida($row["servicio_especial_partida"]);
                $servicio->setDestino($row["servicio_especial_destino"]);
                $servicio->setPasajero($row["servicio_especial_pasajero"]);
                $servicio->setCelular($row["servicio_especial_celular"]);
                $servicio->setFecha($row["servicio_especial_fecha"]);
                $servicio->setHora($row["servicio_especial_hora"]);
                $servicio->setMovil($row["servicio_especial_movil"]);
                $servicio->setConductor($row["servicio_especial_conductor"]);
                $servicio->setEstado($row["servicio_especial_estado"]);
                $servicio->setTarifa($row["servicio_especial_tarifa"]); 
                $servicio->setObservaciones($row["servicio_especial_observacion"]);
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getServicioProgramado($idServicio,$idConductor)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT servicio_id,servicio_cliente,servicio_ruta,servicio_truta,servicio_fecha,"
                    . "servicio_hora,servicio_conductor,servicio_estado,servicio_tarifa1,"
                    . "servicio_observacion,servicio_conductor,movil_nombre,"
                    . "servicio_pasajero_estado,servicio_pasajero_destino,pasajero_id,pasajero_nombre,pasajero_papellido,pasajero_celular,cliente_direccion "
                    . " FROM tbl_servicio JOIN tbl_servicio_pasajero ON"
                    . " servicio_id = servicio_pasajero_id_servicio JOIN tbl_servicio_detalle"
                    . " ON servicio_id = servicio_detalle_servicio "
                    . "JOIN tbl_movil ON servicio_movil = movil_nombre "
                    . "JOIN tbl_pasajero ON servicio_pasajero_id_pasajero = pasajero_id "
                    . "JOIN tbl_cliente ON servicio_cliente = cliente_razon_social "
                    . "WHERE servicio_id = $idServicio AND servicio_conductor = '$idConductor' AND servicio_estado IN (3,4) ORDER BY servicio_pasajero_id";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();            
                $servicio->setId($row["servicio_id"]);
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setClienteDireccion($row["cliente_direccion"]);
                $servicio->setRuta($row["servicio_ruta"]);
                $servicio->setTruta($row["servicio_truta"]);
                $servicio->setFecha($row["servicio_fecha"]);
                $servicio->setHora($row["servicio_hora"]);
                $servicio->setMovil($row["movil_nombre"]);
                $servicio->setEstado($row["servicio_estado"]);
                $servicio->setConductor($row["servicio_conductor"]);
                $servicio->setTarifa1($row["servicio_tarifa1"]); 
                $servicio->setObservaciones($row["servicio_observacion"]);
                $pasajero = new Pasajero();
                $pasajero->setId($row["pasajero_id"]);
                $pasajero->setNombre($row["pasajero_nombre"] . " " . $row["pasajero_papellido"]);
                $pasajero->setCelular($row["pasajero_celular"]);
                $pasajero->setEstado($row["servicio_pasajero_estado"]);
                $servicio->setPasajero($pasajero);
                $servicio->setDestino($row["servicio_pasajero_destino"]);
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getServicioHistorico($idServicio)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT servicio_id,servicio_cliente,servicio_ruta,servicio_truta,servicio_fecha,"
                    . "servicio_hora,servicio_conductor,servicio_estado,servicio_tarifa1,"
                    . "servicio_observacion,servicio_conductor,movil_nombre,"
                    . "servicio_pasajero_estado,servicio_pasajero_destino,pasajero_id,pasajero_nombre,pasajero_papellido,pasajero_celular,cliente_direccion "
                    . " FROM tbl_servicio JOIN tbl_servicio_pasajero ON"
                    . " servicio_id = servicio_pasajero_id_servicio JOIN tbl_servicio_detalle"
                    . " ON servicio_id = servicio_detalle_servicio "
                    . "JOIN tbl_movil ON servicio_movil = movil_nombre "
                    . "JOIN tbl_pasajero ON servicio_pasajero_id_pasajero = pasajero_id "
                    . "JOIN tbl_cliente ON servicio_cliente = cliente_razon_social "
                    . "WHERE servicio_id = $idServicio AND servicio_estado = 5 ORDER BY servicio_pasajero_id";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();            
                $servicio->setId($row["servicio_id"]);
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setClienteDireccion($row["cliente_direccion"]);
                $servicio->setRuta($row["servicio_ruta"]);
                $servicio->setTruta($row["servicio_truta"]);
                $servicio->setFecha($row["servicio_fecha"]);
                $servicio->setHora($row["servicio_hora"]);
                $servicio->setMovil($row["movil_nombre"]);
                $servicio->setEstado($row["servicio_estado"]);
                $servicio->setConductor($row["servicio_conductor"]);
                $servicio->setTarifa1($row["servicio_tarifa1"]); 
                $servicio->setObservaciones($row["servicio_observacion"]);
                $pasajero = new Pasajero();
                $pasajero->setId($row["pasajero_id"]);
                $pasajero->setNombre($row["pasajero_nombre"] . " " . $row["pasajero_papellido"]);
                $pasajero->setCelular($row["pasajero_celular"]);
                $pasajero->setEstado($row["servicio_pasajero_estado"]);
                $servicio->setPasajero($pasajero);
                $servicio->setDestino($row["servicio_pasajero_destino"]);
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getServicioReal($idServicio)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_servicio_detalle_real WHERE servicio_detalle_real_servicio = $idServicio";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $servicioDetalle = new ServicioDetalle();
                $servicioDetalle->setId($row["servicio_detalle_real_servicio"]);
                $servicioDetalle->setLat($row["servicio_detalle_real_lat"]);
                $servicioDetalle->setLon($row["servicio_detalle_real_lon"]);
                array_push($array, $servicioDetalle);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }

    
    public function desAsignarServicio($id,$estado)
    {
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_servicio SET servicio_movil = '',servicio_estado = $estado WHERE servicio_id = $id"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                return $id;
            } else {
                echo mysqli_error($conn->conn);
                return 0;
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    public function cambiarEstadoServicio($id,$estado)
    {
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_servicio SET servicio_estado = '$estado' WHERE servicio_id = $id"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                return $id;
            } else {
                echo mysqli_error($conn->conn);
                return 0;
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
    public function cambiarEstadoServicioEspecial($id,$estado)
    {
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_servicio_especial SET servicio_especial_estado = '$estado' WHERE servicio_especial_id = $id"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                return $id;
            } else {
                echo mysqli_error($conn->conn);
                return 0;
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    public function obtenerMovilDisponible()
    {
        $movil = "";
        $conn = new Conexion();
        try {          
            $query = "SELECT movil_nombre FROM tbl_movil WHERE movil_estado = 1 ORDER BY movil_ultima_asignacion DESC LIMIT 1"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $movil = $row["movil_nombre"];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $movil;
    }
    
    public function obtenerMovilServicio($nombre)
    {
               $movil = new Movil();
        $conn = new Conexion();
        try {           
            $query = "SELECT movil_nombre, movil_lat, movil_lon FROM tbl_movil WHERE movil_nombre = '$nombre'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $movil->setNombre($row["movil_nombre"]);
                $movil->setLat($row["movil_lat"]);
                $movil->setLon($row["movil_lon"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $movil;
    }
        
    public function actualizarMovil($idConductor)
    {
         $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_ultima_asignacion = NOW() WHERE movil_nombre = (SELECT conductor_movil FROM tbl_conductor WHERE conductor_nick = '$idConductor')"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    public function cancelarServicio($idServicio)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_servicio SET servicio_estado = 6 WHERE servicio_id = '$idServicio'"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $idServicio;
    }
    
    public function modificarEstadoServicioPasajero($idServicio,$idPasajero,$estado)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_servicio_pasajero SET servicio_pasajero_estado = $estado,servicio_pasajero_hora_destino = CURRENT_TIME() WHERE servicio_pasajero_id_servicio = $idServicio AND servicio_pasajero_id_pasajero  = $idPasajero";
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $idServicio;
    }
    
    public function modificarEstadoServicioPasajeros($idServicio,$estado)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_servicio_pasajero SET servicio_pasajero_estado = $estado,servicio_pasajero_hora_destino = CURRENT_TIME() WHERE servicio_pasajero_id_servicio = $idServicio AND servicio_pasajero_estado  != 2";
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $idServicio;
    }
}
