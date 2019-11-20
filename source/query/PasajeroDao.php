<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Pasajero.php';

class PasajeroDao {

    public function getUsuario($nombre,$clave)
    {
        $conn = new Conexion();
        $id = 0;
        try {
            $query = "SELECT * FROM tbl_pasajero WHERE pasajero_nick = '$nombre' AND pasajero_password = '$clave'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $id = $row["pasajero_id"];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
    
    public function agregarPasajero($pasajero)
    {
        $id = 0;
        $rut = $pasajero->getRut();
        $nombre = $pasajero->getNombre();
        $papellido = $pasajero->getPapellido();
        $mapellido = $pasajero->getMapellido();
        $telefono = $pasajero->getTelefono();
        $celular = $pasajero->getCelular();
        $direccion = $pasajero->getDireccion();
        $punto = $pasajero->getPunto();
        $mail = $pasajero->getMail();
        $nick = $pasajero->getNick();
        $password = $pasajero->getPassword();
        $cargo = $pasajero->getCargo();
        $centro = $pasajero->getCentroCosto();
        $empresa = $pasajero->getEmpresa();
        $ruta = $pasajero->getRuta();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_pasajero (pasajero_nombre,pasajero_papellido,"
                    . "pasajero_mapellido,pasajero_rut,pasajero_nick,pasajero_password,pasajero_telefono,"
                    . "pasajero_celular,pasajero_direccion,pasajero_punto_encuentro,pasajero_mail,pasajero_cargo,pasajero_nivel,pasajero_centro_costo,pasajero_empresa,pasajero_ruta) VALUES "
                    . "('$nombre','$papellido','$mapellido','$rut','$nick','$password','$telefono','$celular','$direccion','$punto','$mail','$cargo','0','$centro','$empresa','$ruta')"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
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
    
    public function modificarPasajero($pasajero)
    {
        $id = 0;
        $nombre = $pasajero->getNombre();
        $papellido = $pasajero->getPapellido();
        $mapellido = $pasajero->getMapellido();
        $rut = $pasajero->getRut();
        $nick = $pasajero->getNick();
        $password = $pasajero->getPassword();
        $telefono = $pasajero->getTelefono();
        $celular = $pasajero->getCelular();
        $direccion = $pasajero->getDireccion();
        $punto = $pasajero->getPunto();
        $mail = $pasajero->getMail();
        $cargo = $pasajero->getCargo();
        $centro = $pasajero->getCentroCosto();
        $empresa = $pasajero->getEmpresa();
        $ruta = $pasajero->getRuta();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_pasajero SET pasajero_nombre = '$nombre',"
                    . "pasajero_papellido = '$papellido', pasajero_mapellido = '$mapellido',"
                    . "pasajero_telefono = '$telefono',pasajero_celular = '$celular',"
                    . "pasajero_direccion = '$direccion',pasajero_punto_encuentro = '$punto',pasajero_mail = '$mail',"
                    . "pasajero_nick = '$nick',";
                    if($pasajero->getPassword() != '')
                    {
                    $query .= "pasajero_password = '$password',";
                    }
                    $query .= "pasajero_cargo = '$cargo',pasajero_nivel = '0',pasajero_centro_costo = '$centro',"
                            . "pasajero_empresa = '$empresa', pasajero_ruta = '$ruta' WHERE pasajero_rut = '$rut'";   
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
    
    function getPasajeros($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_pasajero WHERE "
                    . "pasajero_rut LIKE '%".$busqueda."%' OR "
                    . "pasajero_nombre LIKE '%".$busqueda."%' OR "
                    . "pasajero_papellido LIKE '%".$busqueda."%' OR "
                    . "pasajero_mapellido LIKE '%".$busqueda."%' OR "
                    . "pasajero_mail LIKE '%".$busqueda."%' OR "
                    . "pasajero_empresa = (SELECT cliente_id FROM tbl_cliente WHERE cliente_razon_social = '".$busqueda."') "
                    . " LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $pasajero = new Pasajero();
                $pasajero->setId($row["pasajero_id"]);
                $pasajero->setNombre($row["pasajero_nombre"]);
                $pasajero->setPapellido($row["pasajero_papellido"]);
                $pasajero->setMapellido($row["pasajero_mapellido"]);
                $pasajero->setRut($row["pasajero_rut"]);
                $pasajero->setNick($row["pasajero_nick"]);
                $pasajero->setTelefono($row["pasajero_telefono"]);
                $pasajero->setCelular($row["pasajero_celular"]);
                $pasajero->setDireccion($row["pasajero_direccion"]);
                $pasajero->setPunto($row["pasajero_punto_encuentro"]);
                $pasajero->setMail($row["pasajero_mail"]);
                $pasajero->setCargo($row["pasajero_cargo"]);
                $pasajero->setNivel($row["pasajero_nivel"]);
                $pasajero->setEmpresa($row["pasajero_empresa"]);
                $pasajero->setCentroCosto($row["pasajero_centro_costo"]);
                $pasajero->setRuta($row["pasajero_ruta"]);
                array_push($array, $pasajero);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    function getPasajerosCliente($cliente)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_pasajero WHERE pasajero_empresa = '$cliente'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $pasajero = new Pasajero();
                $pasajero->setId($row["pasajero_id"]);
                $pasajero->setNombre($row["pasajero_nombre"]);
                $pasajero->setPapellido($row["pasajero_papellido"]);
                $pasajero->setMapellido($row["pasajero_mapellido"]);
                $pasajero->setRut($row["pasajero_rut"]);
                $pasajero->setNick($row["pasajero_nick"]);
                $pasajero->setTelefono($row["pasajero_telefono"]);
                $pasajero->setCelular($row["pasajero_celular"]);
                $pasajero->setDireccion($row["pasajero_direccion"]);
                $pasajero->setPunto($row["pasajero_punto_encuentro"]);
                $pasajero->setMail($row["pasajero_mail"]);
                $pasajero->setCargo($row["pasajero_cargo"]);
                $pasajero->setNivel($row["pasajero_nivel"]);
                $pasajero->setEmpresa($row["pasajero_empresa"]);
                $pasajero->setCentroCosto($row["pasajero_centro_costo"]);
                $pasajero->setRuta($row["pasajero_ruta"]);
                array_push($array, $pasajero);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    function getPasajerosRuta($cliente,$ruta,$pas,$pasajeros)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaRuta = '';
            if($ruta != '')
            {
                $buscaRuta = " AND pasajero_ruta != '$ruta' AND pasajero_id NOT IN (".$pasajeros.") ";
            }
            $qryPass = "";
            if($pas != ""){
                $qryPass = " AND (pasajero_nombre LIKE '%".$pas."%' OR pasajero_papellido LIKE '%".$pas."%' OR pasajero_mapellido LIKE '%".$pas."%')";
            }
            $query = "SELECT * FROM tbl_cliente LEFT JOIN tbl_pasajero ON cliente_razon_social = pasajero_empresa WHERE cliente_razon_social = '".$cliente."' ".$buscaRuta." ".$qryPass." ORDER BY pasajero_ruta_orden";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $pasajero = new Pasajero();
                $pasajero->setId($row["pasajero_id"]);
                $pasajero->setNombre($row["pasajero_nombre"]);
                $pasajero->setPapellido($row["pasajero_papellido"]);
                $pasajero->setMapellido($row["pasajero_mapellido"]);
                $pasajero->setRut($row["pasajero_rut"]);
                $pasajero->setNick($row["pasajero_nick"]);
                $pasajero->setTelefono($row["pasajero_telefono"]);
                $pasajero->setCelular($row["pasajero_celular"]);
                $pasajero->setDireccion($row["pasajero_direccion"]);
                $pasajero->setPunto($row["pasajero_punto_encuentro"]);
                $pasajero->setMail($row["pasajero_mail"]);
                $pasajero->setCargo($row["pasajero_cargo"]);
                $pasajero->setNivel($row["pasajero_nivel"]);
                $pasajero->setEmpresa($row["cliente_razon_social"]);
                $pasajero->setEmpresaDireccion($row["cliente_direccion"]);
                $pasajero->setCentroCosto($row["pasajero_centro_costo"]);
                $pasajero->setRuta($row["pasajero_ruta"]);
                array_push($array, $pasajero);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    function getPasajerosEspecial($idServicio)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_servicio_pasajero WHERE servicio_pasajero_id_servicio = $idServicio";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $pasajero = new Pasajero();
                $id = $row["servicio_pasajero_id_pasajero"];
                $datos = explode("-", $id);
                $pasajero->setId($id);
                $pasajero->setNombre($datos[0]);
                $pasajero->setCelular($datos[1]);
                $pasajero->setPunto($row["servicio_pasajero_destino"]);
                array_push($array, $pasajero);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    function getPasajero($nick)
    {
        $pasajero = new Pasajero();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_pasajero WHERE pasajero_nick = '$nick'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $pasajero->setId($row["pasajero_id"]);
                $pasajero->setNombre($row["pasajero_nombre"]);
                $pasajero->setPapellido($row["pasajero_papellido"]);
                $pasajero->setMapellido($row["pasajero_mapellido"]);
                $pasajero->setRut($row["pasajero_rut"]);
                $pasajero->setNick($row["pasajero_nick"]);
                $pasajero->setTelefono($row["pasajero_telefono"]);
                $pasajero->setCelular($row["pasajero_celular"]);
                $pasajero->setDireccion($row["pasajero_direccion"]);
                $pasajero->setPunto($row["pasajero_punto_encuentro"]);
                $pasajero->setMail($row["pasajero_mail"]);
                $pasajero->setCargo($row["pasajero_cargo"]);
                $pasajero->setNivel($row["pasajero_nivel"]);
                $pasajero->setEmpresa($row["pasajero_empresa"]);
                $pasajero->setCentroCosto($row["pasajero_centro_costo"]);
                $pasajero->setRuta($row["pasajero_ruta"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $pasajero;
    }
    
    function eliminarPasajero($rut)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_pasajero WHERE pasajero_rut = '$rut'"; 
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
    
    public function cambiarEstadoPasajero($estado,$pasajero)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_pasajero SET pasajero_estado = $estado WHERE pasajero_nick = '$pasajero'"; 
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
