<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Configuracion.php';

class ConfiguracionDao {
    
    public function getConfiguracion()
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_configuracion";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die; 
            while($row = mysqli_fetch_array($result)) {
                $configuracion = new Configuracion();
                $configuracion->setId($row["configuracion_id"]);
                $configuracion->setDato($row["configuracion_nombre"]);
                $configuracion->setValor($row["configuracion_valor"]);
                array_push($array, $configuracion);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function modificarConfiguracion($uf,$afp,$isapre,$mutual)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_configuracion SET configuracion_valor = '$uf' WHERE configuracion_nombre = 'valor_uf';".
                    "UPDATE tbl_configuracion SET configuracion_valor = '$afp' WHERE configuracion_nombre = 'porcentaje_afp';".
                    "UPDATE tbl_configuracion SET configuracion_valor = '$isapre' WHERE configuracion_nombre = 'porcentaje_isapre';".
                    "UPDATE tbl_configuracion SET configuracion_valor = '$mutual' WHERE configuracion_nombre = 'porcentaje_mutual';";
            $conn->conectar();
            if (mysqli_multi_query($conn->conn,$query)) {
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
