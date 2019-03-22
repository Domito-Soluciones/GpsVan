<?php


class LiquidacionDao {
     
    public function getServiciosConvenio($conductor,$desde,$hasta)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT SUM(servicio_tarifa1),servicio_cliente FROM tbl_servicio WHERE servicio_conductor = '$conductor' AND servicio_fecha BETWEEN '$desde 00:00:00' AND '$hasta 23:59:59' AND servicio_estado = 5 GROUP BY servicio_cliente";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["servicio_cliente"]."%".$row["servicio_tarifa1"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
}
