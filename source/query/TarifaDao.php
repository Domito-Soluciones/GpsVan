<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Tarifa.php';
include './LogQuery.php';

class TarifaDao {
    
    public function getTarifas($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_tarifa WHERE "
                    . "tarifa_nombre LIKE '%".$busqueda."%' OR "
                    . "tarifa_origen LIKE '%".$busqueda."%' OR "
                    . "tarifa_destino LIKE '%".$busqueda."%' OR "
                    . "tarifa_valor1 LIKE '%".$busqueda."%' OR "
                    . "tarifa_valor2 LIKE '%".$busqueda."%' OR "
                    . "tarifa_cliente LIKE '%".$busqueda."%' OR "
                    . "tarifa_ruta LIKE '%".$busqueda."%' LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $tarifa = new Tarifa();
                $tarifa->setId($row["tarifa_id"]);
                $tarifa->setNombre($row["tarifa_nombre"]);
                $tarifa->setOrigen($row["tarifa_origen"]);
                $tarifa->setDestino($row["tarifa_destino"]);
                $tarifa->setValor1($row["tarifa_valor1"]);
                $tarifa->setValor2($row["tarifa_valor2"]);
                $tarifa->setCliente($row["tarifa_cliente"]);
                $tarifa->setRuta($row["tarifa_ruta"]);
                array_push($array, $tarifa);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    function eliminarTarifa($nombre)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_tarifa WHERE tarifa_nombre = '$nombre'"; 
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
    
    public function agregarTarifa($tarifa)
    {
        $id = 0;
        $nombre = $tarifa->getNombre();
        $origen = $tarifa->getOrigen();
        $destino = $tarifa->getDestino();
        $valor1 = $tarifa->getValor1();
        $valor2 = $tarifa->getValor2();
        $cliente = $tarifa->getCliente();
        $ruta = $tarifa->getRuta();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_tarifa (tarifa_nombre,tarifa_origen,"
                    . "tarifa_destino,tarifa_valor1,tarifa_valor2,tarifa_cliente,tarifa_ruta) VALUES "
                    . "('$nombre','$origen','$destino','$valor1','$valor2','$cliente','$ruta')"; 
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
    
    public function modificarTarifa($tarifa)
    {
        $id = 0;
        $nombre = $tarifa->getNombre();
        $origen = $tarifa->getOrigen();
        $destino = $tarifa->getDestino();
        $valor1 = $tarifa->getValor1();
        $valor2 = $tarifa->getValor2();
        $cliente = $tarifa->getCliente();
        $ruta = $tarifa->getRuta();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_tarifa SET tarifa_origen = '$origen',"
                    . " tarifa_destino = '$destino',tarifa_valor1 = $valor1,tarifa_valor2 = $valor2,"
                    . " tarifa_cliente = '$cliente',tarifa_ruta = '$ruta'"
                    . " WHERE tarifa_nombre = '$nombre'";       
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
