<?php
include '../conexion/Conexion.php';
include '../dominio/Conductor.php';

class ConductorDao {
    
    public function agregarConductor($conductor)
    {
        $id = 0;
        $nombre = $conductor->getNombre();
        $papellido = $conductor->getPapellido();
        $mapellido = $conductor->getMapellido();
        $rut = $conductor->getRut();
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
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_conductor (conductor_nombre,conductor_papellido,"
                    . "conductor_mapellido,conductor_rut,conductor_telefono,"
                    . "conductor_celular,conductor_direccion,conductor_mail,conductor_tipo_licencia,"
                    . "conductor_nacimiento,conductor_renta,conductor_tipo_contrato, conductor_prevision ,conductor_isapre,conductor_mutual,"
                    . "conductor_seguro_inicio,conductor_seguro_renovacion,conductor_descuento,conductor_anticipo) VALUES "
                    . "('$nombre','$papellido','$mapellido','$rut','$telefono','$celular','$direccion','$mail','$tipoLicencia',"
                    . "'$nacimiento',$renta,'$contrato','$afp','$isapre','$mutual','$seguroInicio','$seguroRenovacion',$descuento,$anticipo)"; 
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
    
    function getConductores($rut,$nombre,$papellido,$mapellido,$mail)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $where = "";
            if($rut != ""){
                $where .= " AND conductor_rut like '%".$rut."%'";
            }
            if($nombre != ""){
                $where .= " AND conductor_nombre like '%".$nombre."%'";
            }
            if($papellido != ""){
                $where .= " AND conductor_papellido like '%".$papellido."%'";
            }
            if($mapellido != ""){
                $where .= " AND conductor_mapellido like '%".$mapellido."%'";
            }
            if($mail != ""){
                $where .= " AND conductor_mail like '%".$mail."%'";
            }
            $query = "SELECT * FROM tbl_conductor WHERE 1=1 ".$where." LIMIT 20"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $conductor = new Conductor();
                $conductor->setId($row["conductor_id"]);
                $conductor->setNombre($row["conductor_nombre"]);
                $conductor->setPapellido($row["conductor_papellido"]);
                $conductor->setMapellido($row["conductor_mapellido"]);
                $conductor->setRut($row["conductor_rut"]);
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
            $query = "SELECT * FROM tbl_conductor WHERE conductor_rut = '$nombre' and conductor_clave = '$clave'"; 
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
    
    
}
