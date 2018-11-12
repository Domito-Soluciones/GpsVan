<?php
include '../../util/validarPeticion.php';

include '../../conexion/Conexion.php';
include '../../dominio/Cliente.php';

class ClienteDao {
    public function getClientes($razon,$tipo,$rut)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $where = "";
            if($razon !== '')
            {
                $where .= " AND cliente_razon_social like '%$razon%' ";
            }
            if($tipo !== '')
            {
                $where .= " AND cliente_tipo like '%$tipo%' ";
            }
            if($rut !== '')
            {
                $where .= " AND cliente_rut like '%$rut%' ";
            }
            $query = "SELECT * FROM tbl_cliente WHERE 1=1 ".$where." LIMIT 20"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $cliente = new Cliente();
                $cliente->setId($row["cliente_id"]);
                $cliente->setRazon($row["cliente_razon_social"]);
                $cliente->setTipo($row["cliente_tipo"]);
                $cliente->setRut($row["cliente_rut"]);
                $cliente->setDireccion($row["cliente_direccion"]);
                $cliente->setNombreContacto($row["cliente_nombre_contacto"]);
                $cliente->setFonoContacto($row["cliente_fono_contacto"]);
                $cliente->setMailContacto($row["cliente_mail_contacto"]);
                $cliente->setMailFacturacion($row["cliente_mail_facturacion"]);
                $cliente->setCentroCosto($row["cliente_centro_costo"]);
                array_push($array, $cliente);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function addCliente($cliente)
    {
        $razon = $cliente->getRazon();
        $tipo = $cliente->getTipo();
        $rut = $cliente->getRut();
        $direccion = $cliente->getDireccion();
        $nombre = $cliente->getNombreContacto();
        $telefono = $cliente->getFonoContacto();
        $mail = $cliente->getMailContacto();
        $mail2 = $cliente->getMailFacturacion();
        $centro = $cliente->getCentroCosto();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_cliente (cliente_razon_social,cliente_tipo,cliente_rut,"
                    . "cliente_direccion,cliente_nombre_contacto,cliente_fono_contacto,"
                    . "cliente_mail_contacto,cliente_mail_facturacion,cliente_centro_costo"
                    . ") VALUES ('$razon','$tipo','$rut','$direccion','$nombre','$telefono','$mail','$mail2','$centro')"; 
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
