<?php

include '../../conexion/Conexion.php';

class DashBoardDao {
    
    public function getMovilesActivos()
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT COUNT(*) AS movil_cantidad,movil_estado FROM tbl_movil group by movil_estado ORDER BY movil_estado;";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["movil_cantidad"]);                    
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getServicios()
    {
        $array = array();
        $conn = new Conexion();
        $date = getdate();
        $dia = $date['mday'] < 10 ? "0".$date['mday'] : $date['mday'];
        $mes = $date['mon'] < 10 ? "0".$date['mon'] : $date['mon'];
        $anio = $date['year'];
        $fecha = $anio."-".$mes."-".$dia;
        try {
            $query = "SELECT COUNT(*) AS servicio_cantidad,servicio_estado FROM tbl_servicio WHERE DATE_FORMAT(servicio_fecha, '%Y-%m-%d') = '$fecha' GROUP BY servicio_estado";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["servicio_estado"]."%".$row["servicio_cantidad"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
}
