<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Cliente.php';

class ClienteDao {
    public function getClientes($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_cliente WHERE"
                    . " cliente_rut LIKE '%".$busqueda."%' OR "
                    . "cliente_razon_social LIKE '%".$busqueda."%' OR "
                    . "cliente_tipo LIKE '%".$busqueda."%' OR "
                    . "cliente_nombre_contacto LIKE '%".$busqueda."%' OR "
                    . "cliente_mail_contacto LIKE '%".$busqueda."%'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $cliente = new Cliente();
                $cliente->setId($row["cliente_id"]);
                $cliente->setRazon($row["cliente_razon_social"]);
                $cliente->setTipo($row["cliente_tipo"]);
                $cliente->setRut($row["cliente_rut"]);
                $cliente->setDireccion($row["cliente_direccion"]);
                $cliente->setGrupo($row["cliente_grupo"]);
                $cliente->setColor($row["cliente_color"]);
                $cliente->setNombreContacto($row["cliente_nombre_contacto"]);
                $cliente->setFonoContacto($row["cliente_fono_contacto"]);
                $cliente->setMailContacto($row["cliente_mail_contacto"]);
                $cliente->setMailFacturacion($row["cliente_mail_facturacion"]);
                $cliente->setContrato($row["cliente_contrato"]);
                array_push($array, $cliente);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    public function getClientesGrupo($grupo)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_cliente WHERE cliente_grupo = '".$grupo."'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $cliente = new Cliente();
                $cliente->setId($row["cliente_id"]);
                $cliente->setRazon($row["cliente_razon_social"]);
                $cliente->setTipo($row["cliente_tipo"]);
                $cliente->setRut($row["cliente_rut"]);
                $cliente->setDireccion($row["cliente_direccion"]);
                $cliente->setGrupo($row["cliente_grupo"]);
                $cliente->setColor($row["cliente_color"]);
                $cliente->setNombreContacto($row["cliente_nombre_contacto"]);
                $cliente->setFonoContacto($row["cliente_fono_contacto"]);
                $cliente->setMailContacto($row["cliente_mail_contacto"]);
                $cliente->setMailFacturacion($row["cliente_mail_facturacion"]);
                $cliente->setContrato($row["cliente_contrato"]);
                $cliente->setGrupo($row["cliente_grupo"]);
                array_push($array, $cliente);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    public function getCentrosCosto($cliente)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT centro_costo_nombre,centro_costo_nombre FROM tbl_centro_costo WHERE"
                    . " centro_costo_cliente = '$cliente'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["centro_costo_nombre"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    public function agregarCliente($cliente)
    {
        $id = 0;
        $razon = $cliente->getRazon();
        $tipo = $cliente->getTipo();
        $rut = $cliente->getRut();
        $direccion = $cliente->getDireccion();
        $grupo = $cliente->getGrupo();
        $color = $cliente->getColor();
        $nombre = $cliente->getNombreContacto();
        $telefono = $cliente->getFonoContacto();
        $mail = $cliente->getMailContacto();
        $mail2 = $cliente->getMailFacturacion();
        $contrato = $cliente->getContrato();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_cliente (cliente_razon_social,cliente_tipo,cliente_rut,"
                    . "cliente_direccion,cliente_nombre_contacto,cliente_fono_contacto,"
                    . "cliente_mail_contacto,cliente_mail_facturacion,cliente_contrato,cliente_grupo,cliente_color"
                    . ") VALUES ('$razon','$tipo','$rut','$direccion','$nombre','$telefono','$mail','$mail2','$contrato','$grupo','$color')"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn))) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
    
    public function modificarCliente($cliente)
    {
        $id = 0;
        $razon = $cliente->getRazon();
        $tipo = $cliente->getTipo();
        $rut = $cliente->getRut();
        $direccion = $cliente->getDireccion();
        $grupo = $cliente->getGrupo();
        $color = $cliente->getColor();
        $nombre = $cliente->getNombreContacto();
        $telefono = $cliente->getFonoContacto();
        $mail = $cliente->getMailContacto();
        $mail2 = $cliente->getMailFacturacion();
        $contrato = $cliente->getContrato();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_cliente SET cliente_razon_social = '$razon',"
                    . "cliente_tipo = '$tipo',"
                    . "cliente_direccion = '$direccion',cliente_grupo = '$grupo',cliente_color = '$color', cliente_nombre_contacto = '$nombre',"
                    . "cliente_fono_contacto = '$telefono',cliente_mail_contacto = '$mail',"
                    . "cliente_mail_facturacion = '$mail2', cliente_contrato = '$contrato'"
                    ." WHERE cliente_rut = '$rut'";
            $conn->conectar();
            if (mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn)))) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
        
    function eliminarCliente($rut)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_cliente WHERE cliente_rut = '$rut'"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn)))) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
    
    function eliminarCentroCosto($idCliente)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_centro_costo WHERE centro_costo_cliente = '$idCliente'"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn)))) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
    
    public function agregarCentroCosto($nombres,$cliente)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "";
            for($i = 0 ; $i < count($nombres) ; $i++)
            {
                $query .= "INSERT INTO tbl_centro_costo (centro_costo_nombre,centro_costo_cliente) VALUES ('$nombres[$i]','$cliente');"; 
            }
            $conn->conectar();
            if (mysqli_multi_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn)))) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
    
     public function agregarTarifa($tarifa)
    {
        $id = 0;
        $descripcion = $tarifa->getDescripcion();
        $numero = $tarifa->getNumero();
        $hora = $tarifa->getHora();
        $nombre = $tarifa->getNombre();
        $origen = $tarifa->getOrigen();
        $destino = $tarifa->getDestino();
        $valor1 = $tarifa->getValor1();
        $valor2 = $tarifa->getValor2();
        $cliente = $tarifa->getCliente();
        $tipo = $tarifa->getTipo();
        $horario = $tarifa->getHorario();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_tarifa (tarifa_descripcion,tarifa_numero,tarifa_hora,tarifa_nombre,tarifa_origen,"
                    . "tarifa_destino,tarifa_valor1,tarifa_valor2,tarifa_cliente,tarifa_tipo,tarifa_horario) VALUES "
                    . "('$descripcion','$numero','$hora','$nombre','$origen','$destino','$valor1','$valor2','$cliente','$tipo','$horario')";
            $conn->conectar();
            if (mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn)))) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
   
}
