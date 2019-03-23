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
}
