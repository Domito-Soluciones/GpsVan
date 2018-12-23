<?php
include '../../util/validarPeticion.php';

include '../../conexion/Conexion.php';
include '../../dominio/ServicioDetalle.php';
class ServicioDao {
    public function addServicio($servicio)
    {
        $id = 0;
        $partida = $servicio->getPartida();
        $destino = $servicio->getDestino();
        $cliente = $servicio->getCliente();
        $usuario = $servicio->getUsuario_nombre();
        $transportista = $servicio->getTransportista();
        $movil = $servicio->getMovil();
        $tipo = $servicio->getTipo();
        $tarifa = $servicio->getTarifa();
        $agente = $servicio->getAgente();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_servicio (servicio_partida,servicio_partida_id,servicio_destino,servicio_destino_id,"
                    . "servicio_cliente,servicio_usuario,servicio_transportista,"
                    . "servicio_movil,servicio_tipo,servicio_tarifa,servicio_agente,servicio_fecha) VALUES ('$partida','','$destino','','$cliente','$usuario','$transportista','$movil','$tipo',$tarifa,$agente,NOW())"; 
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
    
    public function addServicioDetalle($lat,$lon,$idServicio)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_servicio_detalle "
                    . "(servicio_detalle_servicio,servicio_detalle_lat,servicio_detalle_lon)"
                    . " VALUES ($idServicio,'$lat','$lon')"; 
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
    
    public function modServicio($idServicio,$servicio)
    {
        $id = 0;
        $cliente = $servicio->getCliente();
        $usuario = $servicio->getUsuario_nombre();
        $transportista = $servicio->getTransportista();
        $movil = $servicio->getMovil();
        $tipo = $servicio->getTipo();
        $tarifa = $servicio->getTarifa();
        $agente = $servicio->getAgente();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_servicio SET servicio_cliente = '$cliente',"
                    . "servicio_usuario = '$usuario',servicio_transportista = '$transportista',"
                    . "servicio_movil = '$movil',servicio_tipo = '$tipo',"
                    . "servicio_tarifa = $tarifa,servicio_agente = $agente WHERE servicio_id = $idServicio"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = $idServicio;
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    public function getIdServicios($id)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT servicio_id FROM tbl_servicio WHERE servicio_id like '".$id."%'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();
                $servicio->setId($row["servicio_id"]);          
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getServicios($busqueda,$desde,$hasta)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_servicio WHERE "
                    . "servicio_id LIKE '%$busqueda%' OR "
                    . "servicio_partida LIKE '%$busqueda%' OR "
                    . "servicio_destino LIKE '%$busqueda%' OR "
                    . "servicio_cliente LIKE '%$busqueda%' OR "
                    . "servicio_usuario LIKE '%$busqueda%' OR "
                    . "servicio_transportista LIKE '%$busqueda%' OR "
                    . "servicio_movil LIKE '%$busqueda%' AND servicio_fecha BETWEEN '".$desde."' AND '".$hasta
                    ."' ORDER BY servicio_fecha DESC LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();
                $servicio->setId($row["servicio_id"]);          
                $servicio->setPartida($row["servicio_partida"]);
                $servicio->setDestino($row["servicio_destino"]);
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setUsuario_nombre($row["servicio_usuario"]);
                $servicio->setTransportista($row["servicio_transportista"]);
                $servicio->setMovil($row["servicio_movil"]);
                $servicio->setTipo($row["servicio_tipo"]);
                $servicio->setTarifa($row["servicio_tarifa"]);
                $servicio->setAgente($row["servicio_agente"]);
                $date = new DateTime($row["servicio_fecha"]);
                $servicio->setFecha(date_format($date, 'd-m-Y H:i:s'));
                array_push($array, $servicio);
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
            $query = "SELECT * FROM tbl_servicio JOIN tbl_usuario ON servicio_usuario = usuario_nombre WHERE servicio_estado = 0 AND servicio_movil = (select movil_nombre from tbl_movil where movil_conductor = '".$usuario."')";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $servicio->setId($row["servicio_id"]);          
                $servicio->setPartida($row["servicio_partida"]);
                $servicio->setDestino($row["servicio_destino"]);
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setUsuario_id($row["usuario_id"]);
                $servicio->setUsuario_nombre($row["usuario_nombre"]);
                $servicio->setUsuario_direccion($row["usuario_direccion"]);
                $servicio->setUsuario_celular($row["usuario_celular"]);
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
        $conn = new Conexion();
        try {
            $servicio = new Servicio();            
            $query = "SELECT * FROM tbl_servicio WHERE servicio_movil = '' AND servicio_estado NOT IN (2,3) ORDER BY servicio_fecha LIMIT 1";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $servicio->setId($row["servicio_id"]);
                $servicio->setPartida($row["servicio_partida"]);
                $servicio->setPartidaId($row["servicio_partida_id"]);
                $servicio->setDestino($row["servicio_destino"]);
                $servicio->setDestinoId($row["servicio_destino_id"]);
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setUsuario_nombre($row["servicio_usuario"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $servicio;
    }
    
    public function desAsignarServicio($id)
    {
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_servicio SET servicio_movil = '' WHERE servicio_id = $id"; 
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
    public function asignarServicio($id,$movil)
    {
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_servicio SET servicio_movil = '$movil' WHERE servicio_id = $id"; 
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
            $query = "SELECT movil_nombre FROM tbl_movil ORDER BY movil_ultima_asignacion DESC LIMIT 1"; 
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
        
    public function actualizarMovil($idMovil)
    {
         $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_ultima_asignacion = NOW() WHERE movil_nombre = '$idMovil' OR movil_conductor = '$idMovil'"; 
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
    
    public function realizarServicio($idServicio)
    {
         $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_servicio SET servicio_estado = 1 WHERE servicio_id = $idServicio"; 
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
            $query = "UPDATE tbl_servicio SET servicio_estado = 3 WHERE servicio_id = $idServicio"; 
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
}
