<?php
include '../../conexion/Conexion.php';
include '../../dominio/Movil.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MovilDao
 *
 * @author Jose
 */
class MovilDao {
    public function getMoviles($id)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $where = "";
            if($id !== "")
            {
                $where = "WHERE movil_transportista = (SELECT transportista_id FROM tbl_transportista WHERE transportista_nombre = '".$id."')";
            }
            //SELECT * FROM tbl_movil LIMIT 20
            $query = "SELECT *,(SELECT servicio_id FROM tbl_servicio WHERE servicio_movil = movil_nombre AND servicio_estado != 2 ORDER BY servicio_fecha LIMIT 1) AS servicio_id FROM tbl_movil ".$where." LIMIT 20"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $moviles = new Movil();
                $moviles->setId($row["movil_id"]);
                $moviles->setNombre($row["movil_nombre"]);
                $moviles->setTransportista($row["movil_transportista"]);
                $moviles->setEstado($row['movil_estado']);
                $moviles->setLat($row['movil_lat']);
                $moviles->setLon($row['movil_lon']);
                $moviles->setServicio($row['servicio_id']);
                array_push($array, $moviles);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
        
    public function cambiarEstadoConductor($estado,$conductor)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_estado = $estado WHERE movil_conductor = '$conductor'"; 
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
