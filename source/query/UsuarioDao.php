<?php
include '../conexion/Conexion.php';
include '../dominio/Usuario.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UsuarioDao
 *
 * @author Jose
 */
class UsuarioDao {
    public function getUsuarios($id)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $where = "";
            if($id != "")
            {
                $where = " WHERE usuario_cliente = (SELECT cliente_id FROM tbl_cliente WHERE cliente_razon_social = '".$id."')";
            }
            $query = "SELECT * FROM tbl_usuario ".$where." LIMIT 20"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $usuario = new Usuario();
                $usuario->setId($row["usuario_id"]);
                $usuario->setNombre($row["usuario_nombre"]);
                array_push($array, $usuario);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
}
