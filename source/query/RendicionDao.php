<?php
include '../../conexion/Conexion.php';
include '../../dominio/Rendicion.php';

class RendicionDao {
    
    public function agregarRendicion($rendicion)
    {
        $id = 0;
        $conductor = $rendicion->getConductor();
        $dato = $rendicion->getDato();
        $valor = $rendicion->getValor();
        $fecha = $rendicion->getFecha();
        $tipo = $rendicion->getTipo();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_rendicion (rendicion_conductor,rendicion_dato,rendicion_valor,rendicion_fecha,rendicion_tipo)"
                    . " VALUES ('$conductor','$dato','$valor','$fecha','$tipo')"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn)))) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
    public function modificarRendicion($rendicion)
    {
        $id = 0;
        $idR = $rendicion->getId();
        $dato = $rendicion->getDato();
        $valor = $rendicion->getValor();
        $tipo = $rendicion->getTipo();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_rendicion SET rendicion_dato = '$dato',rendicion_valor = '$valor',rendicion_tipo = '$tipo' WHERE rendicion_id = $idR"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn)))) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
    
    function getRendiciones($conductor)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_rendicion ORDER BY rendicion_id DESC LIMIT 20";
            if($conductor != '')
            {
                $query = "SELECT * FROM tbl_rendicion WHERE rendicion_conductor = ".$conductor." ORDER BY rendicion_id DESC LIMIT 20";   
            }
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $rendicion = new Rendicion();
                $rendicion->setId($row["rendicion_id"]);
                $rendicion->setConductor($row["rendicion_conductor"]);
                $rendicion->setDato($row["rendicion_dato"]);
                $rendicion->setValor($row["rendicion_valor"]);
                $rendicion->setFecha($row["rendicion_fecha"]);
                $rendicion->setTipo($row["rendicion_tipo"]);
                array_push($array, $rendicion);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    function eliminarRendicion($idRendicion)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_rendicion WHERE rendicion_id = '$idRendicion'"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn)))) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
}
