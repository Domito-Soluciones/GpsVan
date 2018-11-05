<?php
include '../../conexion/Conexion.php';
include '../../dominio/Transportista.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TransportistaDao
 *
 * @author Jose
 */
class TransportistaDao {
    public function getTransportistas($transportista)
    {
        $array = array();
        $conn = new Conexion();
        try {
            if($transportista != '')
            {
                $query = "SELECT * FROM tbl_transportista WHERE transportista_nombre like '$transportista%'  LIMIT 20"; 
            }
            $query = "SELECT * FROM tbl_transportista LIMIT 20"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $transportista = new Transportista();
                $transportista->setId($row["transportista_id"]);
                $transportista->setNombre($row["transportista_nombre"]);
                array_push($array, $transportista);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
}
