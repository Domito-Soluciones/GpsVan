<?php
include '../conexion/Conexion.php';
include '../dominio/Cliente.php';

class ClienteDao {
    public function getClientes($cliente)
    {
        $array = array();
        $conn = new Conexion();
        try {
            if($cliente !== '')
            {
                $query = "SELECT * FROM tbl_cliente WHERE cliente_razon_social ilike '$cliente%' LIMIT 20"; 
            }
            $query = "SELECT * FROM tbl_cliente LIMIT 20"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $cliente = new Cliente();
                $cliente->setId($row["cliente_id"]);
                $cliente->setRazon($row["cliente_razon_social"]);
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
