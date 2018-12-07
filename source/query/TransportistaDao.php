<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Transportista.php';

class TransportistaDao {
    public function getTransportistas($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_transportista WHERE transportista_nombre LIKE '%".$busqueda."%' OR "
                    . "transportista_rut LIKE '%".$busqueda."%' OR "
                    . "transportista_razon_social LIKE '%".$busqueda."%' OR "
                    . "transportista_nombre_contacto LIKE '%".$busqueda."%' OR "
                    . "transportista_mail_contacto LIKE '%".$busqueda."%'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $transportista = new Transportista();
                $transportista->setId($row["transportista_id"]);
                $transportista->setNombre($row["transportista_nombre"]);
                $transportista->setRazon($row["transportista_razon_social"]);
                $transportista->setRut($row["transportista_rut"]);
                $transportista->setDireccion($row["transportista_direccion"]);
                $transportista->setNombreContacto($row["transportista_nombre_contacto"]);
                $transportista->setFonoContacto($row["transportista_fono_contacto"]);
                $transportista->setMailContacto($row["transportista_mail_contacto"]);
                $transportista->setMailFacturacion($row["transportista_mail_facturacion"]);
                array_push($array, $transportista);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function agregarTransportista($transportista)
    {
        $id = 0;
        $razon = $transportista->getRazon();
        $rut = $transportista->getRut();
        $nombre = $transportista->getNombre();
        $direccion = $transportista->getDireccion();
        $nombreContacto = $transportista->getNombreContacto();
        $telefono = $transportista->getFonoContacto();
        $mail = $transportista->getMailContacto();
        $mail2 = $transportista->getMailFacturacion();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_transportista (transportista_razon_social,transportista_rut,"
                    . "transportista_nombre,transportista_direccion,transportista_nombre_contacto,"
                    . "transportista_fono_contacto,transportista_mail_contacto,transportista_mail_facturacion"
                    . ") VALUES ('$razon','$rut','$nombre','$direccion','$nombreContacto','$telefono','$mail','$mail2')"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
    public function modificarTransportista($transportista)
    {
        $id = 0;
        $razon = $transportista->getRazon();
        $rut = $transportista->getRut();
        $nombre = $transportista->getNombre();
        $direccion = $transportista->getDireccion();
        $nombreContacto = $transportista->getNombreContacto();
        $telefono = $transportista->getFonoContacto();
        $mail = $transportista->getMailContacto();
        $mail2 = $transportista->getMailFacturacion();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_transportista SET transportista_razon_social = '$razon',transportista_nombre = '$nombre',"
                    . "transportista_direccion = '$direccion', transportista_nombre_contacto = '$nombreContacto',"
                    . "transportista_fono_contacto = '$telefono',transportista_mail_contacto = '$mail',"
                    . "transportista_mail_facturacion = '$mail2' WHERE transportista_rut = '$rut'";
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $rut;
    }
    
    function eliminarTransportista($rut)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_transportista WHERE transportista_rut = '$rut'"; 
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
    
    function getTransportistaConductor($idTransportista)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT transportista_conductor_id_conductor FROM tbl_transportista_conductor WHERE "
                    . "transportista_conductor_id_transportista = ".$idTransportista;
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array,$row['transportista_conductor_id_conductor']);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    function addTransportistaConductor($idTransportista,$idConductor)
    {
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_transportista_conductor "
                    . "(transportista_conductor_id_transportista,transportista_conductor_id_conductor) "
                    ." VALUES ('".$idTransportista."','".$idConductor."');";
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
