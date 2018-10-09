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
   
}
