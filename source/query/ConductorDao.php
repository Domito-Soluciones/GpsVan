<?php

class ConductorDao {
    
    public function agregarConductor($conductor)
    {
        $id = 0;
        $conductor = new Conductor();
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
                    . "conductor_nacimiento,conductor_renta,conductor_contrato,conductor_afp,conductor_isapre,conductor_mutual"
                    . "conductor_seguro_inicio,conductor_seguro_renovacion,conductor_descuento,conductor_anticipo) VALUES "
                    . "('$nombre','$papellido',$mapellido,$rut,$telefono,$celular,'$direccion',$mail,$tipoLicencia,"
                    . "$nacimiento,$renta,$contrato,$afp,$isapre,$mutual,$seguroInicio,$seguroRenovacion,$descuento,$anticipo)"; 
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
    
    function getConductores()
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT servicio_id FROM tbl_servicio WHERE servicio_id like '".$id."%'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();
                $servicio->setId($row["servicio_id"]);          
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
}
