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
            $query = "SELECT conductor_rut FROM tbl_conductor WHERE "
                    . "conductor_transportista = ".$idTransportista;
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $conductor = new Conductor();
                $conductor->setId($row["conductor_id"]);
                $conductor->setNombre($row["conductor_nombre"]);
                $conductor->setPapellido($row["conductor_papellido"]);
                $conductor->setMapellido($row["conductor_mapellido"]);
                $conductor->setRut($row["conductor_rut"]);
                $conductor->setMovil($row["conductor_movil"]);
                array_push($array, $conductor);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    function getTransportistaMovil($idTransportista)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT movil_patente FROM tbl_movil WHERE "
                    . "movil_transportista = ".$idTransportista;
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $moviles = new Movil();
                $moviles->setId($row["movil_id"]);
                $moviles->setNombre($row["movil_nombre"]);
                $moviles->setPatente($row["movil_patente"]);
                $moviles->setMarca($row["movil_marca"]);
                $moviles->setModelo($row["movil_modelo"]);
                array_push($array, $moviles);
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
    
    public function asociarConductores($transportista,$conductores)
    {
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_conductor SET conductor_transportista = '$transportista' WHERE conductor_id IN ($conductores)";
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
    public function asociarMoviles($transportista,$moviles)
    {
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_transportista = '$transportista' WHERE movil_id IN ($moviles)";
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
}
