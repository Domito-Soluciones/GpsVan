<?php
include '../conexion/Conexion.php';

class ServicioDao {
    public function addServicio($servicio)
    {
        $id = 0;
        $partida = $servicio->getPartida();
        $partidaId = $servicio->getPartidaId();
        $destino = $servicio->getDestino();
        $destinoId = $servicio->getDestinoId();
        $cliente = $servicio->getCliente();
        $usuario = $servicio->getUsuario();
        $transportista = $servicio->getTransportista();
        $movil = $servicio->getMovil();
        $tipo = $servicio->getTipo();
        $tarifa = $servicio->getTarifa();
        $agente = $servicio->getAgente();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_servicio (servicio_partida,servicio_partida_id,servicio_destino,servicio_destino_id,"
                    . "servicio_cliente,servicio_usuario,servicio_transportista,"
                    . "servicio_movil,servicio_tipo,servicio_tarifa,servicio_agente,servicio_fecha) VALUES ('$partida','$partidaId','$destino','$destinoId',$cliente,$usuario,$transportista,$movil,'$tipo',$tarifa,$agente,NOW())"; 
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
    
    public function getServicios($id,$cliente,$usuario,$transportista,$movil,$desde,$hasta)
    {
        $array = array();
        $conn = new Conexion();
        try {
            
            $query = "SELECT * FROM tbl_servicio WHERE 1=1 ";
            if($id != '')
            {
                $query .= " AND servicio_id = '".$id."'";
            }
            if($cliente != '')
            {
                $query .= " AND servicio_cliente like '".$cliente."%' ";
            }
            if($usuario != '')
            {
                $query .= " AND servicio_usuario like '".$usuario."%' ";
            }
            if($transportista != '')
            {
                $query .= " AND servicio_transportista like '".$transportista."%' ";
            }
            if($movil != '')
            {
                $query .= " AND servicio_movil like '".$movil."%' " ;
            }
            if($desde != '')
            {
                $query .= " AND servicio_fecha >= '".$desde."%' ";
            }
            if($hasta != '')
            {
                $query .= " AND servicio_fecha <= '".$hasta."%' ";
            }
            $query .= " ORDER BY servicio_fecha DESC LIMIT 1"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();
                $servicio->setId($row["servicio_id"]);          
                $servicio->setPartida($row["servicio_partida"]);
                $servicio->setDestino($row["servicio_destino"]);
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setUsuario($row["servicio_usuario"]);
                $servicio->setTransportista($row["servicio_transportista"]);
                $servicio->setMovil($row["servicio_movil"]);
                $servicio->setTipo($row["servicio_tipo"]);
                $servicio->setTarifa($row["servicio_tarifa"]);
                $servicio->setAgente($row["servicio_agente"]);
                $servicio->setFecha($row["servicio_fecha"]);
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
}
