<?php
include '../../util/validarPeticion.php';

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
    
    public function agregarMovil($movil)
    {
        $id = 0;
        $patente = $movil->getPatente();
        $marca = $movil->getMarca();
        $modelo = $movil->getModelo();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_movil (movil_patente,movil_marca,movil_modelo,"
                    . "movil_transportista,movil_estado,movil_lat,movil_lon,movil_last_lat,movil_last_lon,movil_conductor,movil_ultima_asignacion)"
                    . " VALUES ('$patente','$marca','$modelo','0',0,'','','','',0,CURRENT_TIMESTAMP)"; 
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
    
    public function modificarMovil($movil)
    {
        $id = 0;
        $patente = $movil->getPatente();
        $marca = $movil->getMarca();
        $modelo = $movil->getModelo();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_marca = '$marca',"
                    . "movil_modelo = '$modelo' WHERE movil_patente = '$patente'";           
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
    
    public function getMoviles($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_movil WHERE "
                    . "movil_patente LIKE '%".$busqueda."%' OR "
                    . "movil_marca LIKE '%".$busqueda."%' OR "
                    . "movil_modelo LIKE '%".$busqueda."%'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $moviles = new Movil();
                $moviles->setId($row["movil_id"]);
                $moviles->setPatente($row["movil_patente"]);
                $moviles->setMarca($row["movil_marca"]);
                $moviles->setModelo($row["movil_modelo"]);
//                $moviles->setNombre($row["movil_nombre"]);
//                $moviles->setTransportista($row["movil_transportista"]);
//                $moviles->setEstado($row['movil_estado']);
//                $moviles->setLat($row['movil_lat']);
//                $moviles->setLon($row['movil_lon']);
//                $moviles->setServicio($row['servicio_id']);
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
    
    public function modificarUbicacion($conductor, $lat, $lon)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_lat = $lat, movil_lon = $lon WHERE movil_conductor = '$conductor'"; 
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
    
    function eliminarMovil($patente)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_movil WHERE movil_patente = '$patente'"; 
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
