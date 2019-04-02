<?php
include '../../conexion/Conexion.php';

class ReporteDao {
    public function getServicios($empresa,$conductor,$desde,$hdesde,$hasta,$hhasta)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaEmpresa = '';
            $buscaConductor = '';
            $buscaFecha = '';
            if($empresa != '')
            {
                $buscaEmpresa = " AND servicio_cliente LIKE '%$empresa%' ";
            }
            if($conductor != '')
            {
                $buscaConductor = " AND servicio_conductor = '$conductor' ";
            }
            if($desde != '' && $hasta == '')
            {
                $buscaFecha = "AND servicio_fecha > '".$desde." ".$hdesde."' ";
            }
            if($hasta != '' && $desde == '')
            {
                $buscaFecha = "AND servicio_fecha < '".$hasta." ".$hhasta."' ";
            }
            if($desde != '' && $hasta != '')
            {
                $buscaFecha = "AND servicio_fecha BETWEEN '".$desde." ".$hdesde."' AND '".$hasta." ".$hhasta."'";
            }
            $query = "SELECT servicio_estado,count(*) as servicio_cantidad FROM tbl_servicio WHERE servicio_estado NOT IN (0,6) "
                    .$buscaFecha." ".$buscaEmpresa." ".$buscaConductor. " GROUP BY servicio_estado";
            echo $query;
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
