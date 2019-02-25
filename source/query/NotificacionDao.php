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
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_notificacion (notificacion_texto,notificacion_tipo,"
                    . "notificacion_estado,notificacion_llave,notificacion_fecha)"
                    . " VALUES ('$texto','$tipo',0,'$llave','$fecha')"; 
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
    public function modificarEstadoNotificacion($idNotificacion)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_notificacion SET notificacion_estado = 1 WHERE notificacion_id = $idNotificacion"; 
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
    
    public function getNotificaciones($llave)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_notificacion WHERE"
                    . " notificacion_estado = 0 AND "
                    . "notificacion_llave = '$llave' LIMIT 10";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
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
        }
        return $array;
    }
    
}
