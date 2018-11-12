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
            $query = "SELECT * FROM tbl_agente WHERE agente_rut = '$nombre' and agente_clave = '$clave'"; 
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query); 
            while($row = mysqli_fetch_array($result)) {
                $agente->setId($row["agente_id"]);
                $agente->setNombre($row["agente_nombre"]);
                $agente->setApellidoPat($row["agente_papellido"]);
                $agente->setApellidoMat($row["agente_mapellido"]);
                $agente->setRut($row["agente_rut"]);
                $agente->setClave($row["agente_clave"]);
                $agente->setTelefono($row["agente_telefono"]);
                $agente->setCelular($row["agente_celular"]);
                $agente->setDireccion($row["agente_direccion"]);
                $agente->setEmail($row["agente_email"]);
                $agente->setCargo($row["agente_cargo"]);
                $agente->setPerfil($row["agente_perfil"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $agente;
    }
}
