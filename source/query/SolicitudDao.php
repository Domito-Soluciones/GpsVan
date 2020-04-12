<?php

class SolicitudDao {
    public function agregarSolicitud($tipo,$solicitante)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_solicitud (solicitud_tipo,solicitud_solicitante) VALUES ('$tipo','$solicitante')"; 
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
