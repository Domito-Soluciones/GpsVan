<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Notificacion.php';

class NotificacionDao {

    public function agregarNotificacion($notificacion)
    {
        $id = 0;
        $texto = $notificacion->getTexto();
        $tipo = $notificacion->getTipo();
        $llave = $notificacion->getLlave();
        $fecha = $notificacion->getFecha();
        $servicio = $notificacion->getIdServicio();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_notificacion (notificacion_texto,notificacion_tipo,"
                    . "notificacion_estado,notificacion_servicio,notificacion_llave,notificacion_fecha)"
                    . " VALUES ('$texto','$tipo',0,'$servicio','$llave','$fecha')"; 
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
    public function modificarEstadoNotificacion($idNotificacion,$idServicio)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_notificacion SET notificacion_estado = 1 WHERE notificacion_id = $idNotificacion OR notificacion_servicio = '$idServicio'"; 
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
    
    public function resetNotificacion($idServicio,$estado)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_notificacion SET notificacion_estado = $estado WHERE notificacion_servicio = '$idServicio'"; 
            echo $query;
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
    
    public function getNotificaciones($llave)
    {
        $array = array();
        $conn = new Conexion();
        try { 
            $query = "SELECT * FROM tbl_notificacion JOIN tbl_servicio"
                    . " ON notificacion_servicio = servicio_id WHERE notificacion_estado = 0"
                    . " AND notificacion_llave = '$llave' ";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $notificacion = new Notificacion();
                $notificacion->setId($row["notificacion_id"]);
                $notificacion->setTexto($row["notificacion_texto"]);
                $notificacion->setTipo($row["notificacion_tipo"]);
                $notificacion->setFecha($row["notificacion_fecha"]);
                array_push($array, $notificacion);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
}
