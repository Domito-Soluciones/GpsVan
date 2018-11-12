<?php
include '../../util/validarPeticion.php';

include '../../conexion/Conexion.php';
include '../../dominio/Usuario.php';
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
    
        public function cambiarEstadoUsuario($estado,$usuario)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_usuario SET usuario_estado = $estado WHERE usuario_nick = '$usuario'"; 
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
    
    public function getUsuario($nombre,$clave)
    {
        $conn = new Conexion();
        $id = 0;
        try {
            $query = "SELECT * FROM tbl_usuario WHERE usuario_nick = '$nombre' and usuario_password = '$clave'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $id = $row["usuario_id"];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    public function getUsuarioNombre($usuario)
    {
        $conn = new Conexion();
        $nombre = "";
        try {
            $query = "SELECT usuario_nombre FROM tbl_usuario WHERE usuario_nick = '$usuario'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $nombre = $row["usuario_nombre"];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $nombre;
    }
}
