<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Agente.php';

class AgenteDao {
    
    public function getAgente($nombre,$clave)
    {
        $conn = new Conexion();
        try {
            $agente = new Agente();
            $query = "SELECT * FROM tbl_agente LEFT JOIN tbl_cliente ON agente_empresa = cliente_id WHERE agente_nick = '$nombre' and agente_clave = '$clave'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $agente->setId($row["agente_id"]);
                $agente->setNombre($row["agente_nombre"]);
                $agente->setApellidoPat($row["agente_papellido"]);
                $agente->setApellidoMat($row["agente_mapellido"]);
                $agente->setRut($row["agente_rut"]);
                $agente->setNick($row["agente_nick"]);
                $agente->setClave($row["agente_clave"]);
                $agente->setTelefono($row["agente_telefono"]);
                $agente->setCelular($row["agente_celular"]);
                $agente->setDireccion($row["agente_direccion"]);
                $agente->setMail($row["agente_mail"]);
                $agente->setPerfil($row["agente_perfil"]);
                $agente->setEmpresa($row["agente_empresa"]);
                $agente->setEmpresaNombre($row["cliente_razon_social"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $agente;
    }
    
    public function getAgentes($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_agente WHERE "
                    . "agente_rut LIKE '%".$busqueda."%' OR "
                    . "agente_nombre LIKE '%".$busqueda."%' OR "
                    . "agente_papellido LIKE '%".$busqueda."%' OR "
                    . "agente_mapellido LIKE '%".$busqueda."%' OR "
                    . "agente_mail LIKE '%".$busqueda."%' LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); ; 
            while($row = mysqli_fetch_array($result)) {
                $agente = new Agente();
                $agente->setId($row["agente_id"]);
                $agente->setNombre($row["agente_nombre"]);
                $agente->setApellidoPat($row["agente_papellido"]);
                $agente->setApellidoMat($row["agente_mapellido"]);
                $agente->setRut($row["agente_rut"]);
                $agente->setNick($row["agente_nick"]);
                $agente->setTelefono($row["agente_telefono"]);
                $agente->setCelular($row["agente_celular"]);
                $agente->setDireccion($row["agente_direccion"]);
                $agente->setMail($row["agente_mail"]);
                $agente->setPerfil($row["agente_perfil"]);
                $agente->setEmpresa($row["agente_empresa"]);
                array_push($array, $agente);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    function eliminarAgente($rut)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_agente WHERE agente_rut = '$rut'"; 
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
    
    public function agregarAgente($agente)
    {
        $id = 0;
        $rut = $agente->getRut();
        $nombre = $agente->getNombre();
        $papellido = $agente->getApellidoPat();
        $mapellido = $agente->getApellidoMat();
        $telefono = $agente->getTelefono();
        $celular = $agente->getCelular();
        $direccion = $agente->getDireccion();
        $mail = $agente->getMail();
        $nick = $agente->getNick();
        $password = $agente->getClave();
        $perfil = $agente->getPerfil();
        $empresa = $agente->getEmpresa();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_agente (agente_nombre,agente_papellido,"
                    . "agente_mapellido,agente_rut,agente_nick,agente_clave,agente_telefono,"
                    . "agente_celular,agente_direccion,agente_mail,agente_perfil,agente_empresa) VALUES "
                    . "('$nombre','$papellido','$mapellido','$rut','$nick','$password','$telefono','$celular','$direccion','$mail','$perfil','$empresa')"; 
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
    
    public function modificarAgente($agente)
    {
        $id = 0;
        $nombre = $agente->getNombre();
        $papellido = $agente->getApellidoPat();
        $mapellido = $agente->getApellidoMat();
        $rut = $agente->getRut();
        $nick = $agente->getNick();
        $password = $agente->getClave();
        $telefono = $agente->getTelefono();
        $celular = $agente->getCelular();
        $direccion = $agente->getDireccion();
        $mail = $agente->getMail();
        $perfil = $agente->getPerfil();
        $empresa = $agente->getEmpresa();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_agente SET agente_nombre = '$nombre',"
                    . "agente_papellido = '$papellido', agente_mapellido = '$mapellido',"
                    . "agente_telefono = '$telefono',agente_celular = '$celular',"
                    . "agente_direccion = '$direccion',agente_mail = '$mail',"
                    . "agente_nick = '$nick',";
                    if($agente->getClave() != '')
                    {
                    $query .= "agente_clave = '$password',";
                    }
                    $query .= "agente_perfil = '$perfil',agente_empresa = '$empresa' WHERE agente_rut = '$rut'";           
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
