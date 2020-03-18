<?php
include '../../conexion/Conexion.php';
include '../../dominio/Servicio.php';

class ReporteDao {
    public function getServicios($empresa,$cc,$conductor,$desde,$hdesde,$hasta,$hhasta)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaEmpresa = '';
            $buscaCC = '';
            $buscaConductor = '';
            $buscaFecha = '';
            $buscaGroup = 'GROUP BY servicio_id';
            if($empresa != '')
            {
                $buscaEmpresa = " AND servicio_cliente = '$empresa' ";
            }
            if($cc != '')
            {
                if($cc == -1){
                    $buscaGroup = 'GROUP BY servicio_id,pasajero_centro_costo';                    
                }
                else{
                    $buscaCC = " AND pasajero_centro_costo = '$cc' ";
                }
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
            $query = "SELECT servicio_estado,count(*) as servicio_cantidad FROM tbl_servicio LEFT JOIN tbl_servicio_pasajero ON servicio_id = servicio_pasajero_id_servicio LEFT JOIN tbl_pasajero ON servicio_pasajero_id_pasajero = pasajero_id WHERE servicio_estado != 0 "
                    .$buscaFecha." ".$buscaEmpresa." ".$buscaCC." ".$buscaConductor. "  ".$buscaGroup;
            echo $query;
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["servicio_estado"]."%".$row["servicio_cantidad"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    public function getServiciosDetalle($empresa,$cc,$conductor,$desde,$hdesde,$hasta,$hhasta)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaEmpresa = '';
            $buscaCC = '';
            $buscaConductor = '';
            $buscaFecha = '';
            $buscaGroup = 'GROUP BY servicio_id';
            if($empresa != '')
            {
                $buscaEmpresa = " AND servicio_cliente = '$empresa' ";
            }
            if($cc != '')
            {
                if($cc == -1){
                    $buscaGroup = 'GROUP BY servicio_id,pasajero_centro_costo';                    
                }
                else{
                    $buscaCC = " AND pasajero_centro_costo = '$cc' ";
                }
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
            $query = "SELECT *,(SELECT COUNT(*) FROM tbl_servicio_pasajero WHERE servicio_pasajero_id_servicio = s.servicio_id) AS pasajero_total,COUNT(*) AS pasajero_total_cc FROM tbl_servicio s LEFT JOIN tbl_servicio_pasajero ON servicio_id = servicio_pasajero_id_servicio LEFT JOIN tbl_pasajero ON servicio_pasajero_id_pasajero = pasajero_id LEFT JOIN tbl_conductor ON servicio_conductor = conductor_id WHERE servicio_estado != 0 "
                    .$buscaFecha." ".$buscaEmpresa." ".$buscaCC." ".$buscaConductor." ".$buscaGroup."  ORDER BY servicio_fecha DESC,servicio_hora DESC";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();
                $servicio->setId($row["servicio_id"]);          
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setRuta($row["servicio_ruta"]);
                $servicio->setTruta($row["servicio_truta"]);
                $date = new DateTime($row["servicio_fecha"]);
                $servicio->setFecha(date_format($date, 'd/m/Y'));
                $servicio->setHora($row["servicio_hora"]);
                $servicio->setMovil($row["servicio_movil"]);
                $servicio->setConductor($row["conductor_nombre"]." ".$row["conductor_papellido"]);
                $servicio->setTarifa1($row["servicio_tarifa1"]);
                $servicio->setTarifa2($row["servicio_tarifa2"]);
                $servicio->setEstado($row["servicio_estado"]);
                $servicio->setObservacionesAdicionales($row["servicio_observacion_adicional"]);
                $servicio->setCantidadPasajeros($row["pasajero_total"]);
                $servicio->setCantidadPasajerosCC($row["pasajero_total_cc"]);
                $servicio->setPasajeroCentroCosto($row["pasajero_centro_costo"]);
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
}
