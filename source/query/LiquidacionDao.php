<?php

include '../../conexion/Conexion.php';

class LiquidacionDao {
     
    public function getServiciosConvenio($conductor,$mes,$anio)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $mesDesde = $mes < 10 ? "0".$mes : $mes;
            $mesHasta = "";
            $anioHasta = $anio;
            if($mes == "12")
            {
                $mesHasta = "01";
                $anioHasta = $anio + 1;
            }
            else
            {
                $mesHasta = ($mes+1) < 10 ? "0".($mes+1) : ($mes+1);
            }
            $desde = $anio."-".$mesDesde."-01 00:00:00";
            $hasta = $anioHasta."-".$mesHasta."-01 00:00:00";
            $query = "SELECT SUM(servicio_tarifa1) as servicio_total,servicio_cliente FROM tbl_servicio WHERE servicio_conductor = '$conductor' AND servicio_fecha >= '$desde' AND servicio_fecha < '$hasta' AND servicio_estado = 5 GROUP BY servicio_cliente";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["servicio_cliente"]."%".$row["servicio_total"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getDescuentosConductor($conductor)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT movil_seg_ob_valor,movil_seg_rcdm_valor,movil_seg_as_valor, movil_seg_rcexceso_valor, movil_gps, movil_celular, movil_app FROM tbl_movil WHERE movil_conductor = $conductor";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array,$row["movil_seg_ob_valor"]);
                array_push($array,$row["movil_seg_rcdm_valor"]);
                array_push($array,$row["movil_seg_as_valor"]);
                array_push($array,$row["movil_seg_rcexceso_valor"]);
                array_push($array,$row["movil_gps"]);
                array_push($array,$row["movil_celular"]);
                array_push($array,$row["movil_app"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getPorcentajes()
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT configuracion_valor FROM tbl_configuracion ORDER BY configuracion_id";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array,$row["configuracion_valor"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
}
