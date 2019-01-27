<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Conductor.php';
include '../../dominio/Movil.php';
//include 'LogQuery.php';

class ConductorDao {
    
    public function agregarConductor($conductor)
    {
        $id = 0;
        $rut = $conductor->getRut();
        $nombre = $conductor->getNombre();
        $papellido = $conductor->getPapellido();
        $mapellido = $conductor->getMapellido();
        $telefono = $conductor->getTelefono();
        $celular = $conductor->getCelular();
        $direccion = $conductor->getDireccion();
        $mail = $conductor->getMail();
        $nick = $conductor->getNick();
        $password = $conductor->getPassword();
        $tipoLicencia = $conductor->getTipoLicencia();
        $nacimiento = $conductor->getNacimiento();
        $renta = $conductor->getRenta();
        $contrato = $conductor->getContrato();
        $afp =$conductor->getAfp();
        $isapre = $conductor->getIsapre();
        $mutual = $conductor->getMutual();
        $seguroInicio = $conductor->getSeguroInicio();
        $seguroRenovacion = $conductor->getSeguroRenovacion();
        $descuento = $conductor->getDescuento();
        $anticipo = $conductor->getAnticipo();
        $imagen = $conductor->getImagenAdjunta();
        $archivoContrato = $conductor->getContratoAdjunto();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_conductor (conductor_nombre,conductor_papellido,"
                    . "conductor_mapellido,conductor_rut,conductor_nick,conductor_clave,conductor_telefono,"
                    . "conductor_celular,conductor_direccion,conductor_mail,conductor_tipo_licencia,"
                    . "conductor_nacimiento,conductor_renta,conductor_tipo_contrato, conductor_prevision ,conductor_isapre,conductor_mutual,"
                    . "conductor_seguro_inicio,conductor_seguro_renovacion,conductor_descuento,conductor_anticipo,conductor_imagen,conductor_contrato,conductor_transportista) VALUES "
                    . "('$nombre','$papellido','$mapellido','$rut','$nick','$password','$telefono','$celular','$direccion','$mail','$tipoLicencia',"
                    . "'$nacimiento',$renta,'$contrato','$afp','$isapre','$mutual','$seguroInicio','$seguroRenovacion','$descuento','$anticipo','$imagen','$archivoContrato',0)"; 
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
    
    public function modificarConductor($conductor)
    {
        $id = 0;
        $nombre = $conductor->getNombre();
        $papellido = $conductor->getPapellido();
        $mapellido = $conductor->getMapellido();
        $rut = $conductor->getRut();
        $nick = $conductor->getNick();
        $password = $conductor->getPassword();
        $telefono = $conductor->getTelefono();
        $celular = $conductor->getCelular();
        $direccion = $conductor->getDireccion();
        $mail = $conductor->getMail();
        $tipoLicencia = $conductor->getTipoLicencia();
        $nacimiento = $conductor->getNacimiento();
        $renta = $conductor->getRenta();
        $contrato = $conductor->getContrato();
        $afp =$conductor->getAfp();
        $isapre = $conductor->getIsapre();
        $mutual = $conductor->getMutual();
        $seguroInicio = $conductor->getSeguroInicio();
        $seguroRenovacion = $conductor->getSeguroRenovacion();
        $descuento = $conductor->getDescuento();
        $anticipo = $conductor->getAnticipo();
        $imagen = $conductor->getImagenAdjunta();
        $archivoContrato = $conductor->getContratoAdjunto();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_conductor SET conductor_nombre = '$nombre',"
                    . "conductor_papellido = '$papellido', conductor_mapellido = '$mapellido',"
                    . "conductor_telefono = '$telefono',conductor_celular = '$celular',"
                    . "conductor_direccion = '$direccion',conductor_mail = '$mail',"
                    . "conductor_nick = '$nick',";
                    if($conductor->getPassword() != '')
                    {
                    $query .= "conductor_clave = '$password',";
                    }
                    $query .= "conductor_tipo_licencia = '$tipoLicencia',conductor_nacimiento = '$nacimiento',"
                    . "conductor_renta = '$renta',conductor_tipo_contrato = '$contrato',"
                    . "conductor_prevision = '$afp',conductor_isapre = '$isapre',conductor_mutual = '$mutual',"
                    . "conductor_seguro_inicio = '$seguroInicio',conductor_seguro_renovacion = '$seguroRenovacion',"
                    . "conductor_descuento = '$descuento',conductor_anticipo = '$anticipo',conductor_imagen = '$imagen',"
                    . "conductor_contrato = '$archivoContrato' WHERE conductor_rut = '$rut'";           
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
    
    function getConductores($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_conductor WHERE "
                    . "conductor_rut LIKE '%".$busqueda."%' OR "
                    . "conductor_nombre LIKE '%".$busqueda."%' OR "
                    . "conductor_papellido LIKE '%".$busqueda."%' OR "
                    . "conductor_mapellido LIKE '%".$busqueda."%' OR "
                    . "conductor_mail LIKE '%".$busqueda."%'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $conductor = new Conductor();
                $conductor->setId($row["conductor_id"]);
                $conductor->setNombre($row["conductor_nombre"]);
                $conductor->setPapellido($row["conductor_papellido"]);
                $conductor->setMapellido($row["conductor_mapellido"]);
                $conductor->setRut($row["conductor_rut"]);
                $conductor->setNick($row["conductor_nick"]);
                $conductor->setTelefono($row["conductor_telefono"]);
                $conductor->setCelular($row["conductor_celular"]);
                $conductor->setDireccion($row["conductor_direccion"]);
                $conductor->setMail($row["conductor_mail"]);
                $conductor->setTipoLicencia($row["conductor_tipo_licencia"]);
                $conductor->setNacimiento($row["conductor_nacimiento"]);
                $conductor->setRenta($row["conductor_renta"]);
                $conductor->setContrato($row["conductor_tipo_contrato"]);
                $conductor->setAfp($row["conductor_prevision"]);
                $conductor->setIsapre($row["conductor_isapre"]);
                $conductor->setMutual($row["conductor_mutual"]);
                $conductor->setSeguroInicio($row["conductor_seguro_inicio"]);
                $conductor->setSeguroRenovacion($row["conductor_seguro_renovacion"]);
                $conductor->setDescuento($row["conductor_descuento"]);
                $conductor->setAnticipo($row["conductor_anticipo"]);
                $conductor->setImagenAdjunta($row["conductor_imagen"]);
                $conductor->setContratoAdjunto($row["conductor_contrato"]);
                $conductor->setTransportista($row["conductor_transportista"]);
                $conductor->setMovil($row["conductor_movil"]);
                array_push($array, $conductor);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getConductor($nombre,$clave)
    {
        $conn = new Conexion();
        $id = 0;
        try {
            $query = "SELECT * FROM tbl_conductor WHERE conductor_nick = '$nombre' and conductor_clave = '$clave'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $id = $row["conductor_id"];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    public function getDatosConductor($nick)
    {
        $conn = new Conexion();
        $array = array();
        $nombre = "";
        $viajes = "";
        $estado = "";
        try {
            $hoy = getdate();
            $fecha = $hoy['year'] . "-" . $hoy['mon'] . "-" . $hoy['mday']. " 00:00:00";
            $query = "SELECT conductor_nombre,conductor_papellido,conductor_estado,(SELECT count(*) FROM tbl_servicio WHERE servicio_fecha > '$fecha' AND servicio_movil = (SELECT movil_nombre FROM tbl_movil WHERE movil_id = conductor_movil)) AS conductor_viajes FROM tbl_conductor WHERE conductor_nick = '$nick'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $nombre = $row["conductor_nombre"].' '.$row["conductor_papellido"];
                $viajes = $row["conductor_viajes"];
                $estado = $row["conductor_estado"];
            }
            array_push($array, $nombre);
            array_push($array, $estado);
            array_push($array, $viajes);
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    function getConductoresConectados()
    {
        $conn = new Conexion();
        $array = array();
        try {
            $query = "SELECT count(*) as total,conductor_estado FROM tbl_conductor group by conductor_estado"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $array[$row["conductor_estado"]] = $row["total"];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    function eliminarConductor($rut)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_conductor WHERE conductor_rut = '$rut'"; 
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
    
    public function getMovilesConductor()
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_movil WHERE movil_transportista = 0";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
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
    
        public function getMoviles()
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_movil";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
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
    
    public function cambiarEstadoConductor($estado,$conductor)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_conductor SET conductor_estado = '$estado' WHERE conductor_nick = '$conductor'"; 
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
