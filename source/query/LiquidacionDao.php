<?php

include '../../conexion/Conexion.php';
include '../../dominio/Servicio.php';
include '../../dominio/Conductor.php';
include '../../dominio/LiquidacionDetalle.php';

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
            Log::write_error_log($exc->getTraceAsString());
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
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    public function getConductores()
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT conductor_id,conductor_rut,conductor_nombre,conductor_papellido FROM tbl_conductor";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $conductor = new Conductor();
                $conductor->setId($row["conductor_id"]);
                $conductor->setRut($row["conductor_rut"]);
                $conductor->setNombre($row["conductor_nombre"]." ".$row["conductor_papellido"]);
                array_push($array,$conductor);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    public function getRendiciones($conductor,$mes,$anio)
    {
        $array = array();
        $conn = new Conexion();
        try {
            if(strlen($mes) == 1)
            {
                $mes = "0".$mes;
            }
            $query = "SELECT * FROM tbl_rendicion WHERE rendicion_conductor = $conductor AND rendicion_fecha = '$mes-$anio'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array,$row["rendicion_dato"] ."%".$row["rendicion_valor"]."%".$row["rendicion_tipo"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
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
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array,$row["configuracion_valor"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    public function getServicios($id,$empresa,$conductor,$estado,$movil,$desde,$hdesde,$hasta,$hhasta)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaId = '';
            $buscaEmpresa = '';
            $buscaConductor = '';
            $buscaMovil = '';
            $buscaEstado = '';
            $buscaFecha = '';
            if($id != '')
            {
                $buscaId = " AND servicio_id LIKE '%$id%' ";
            }
            if($empresa != '')
            {
                $buscaEmpresa = " AND servicio_cliente LIKE '%$empresa%' ";
            }
            if($conductor != '')
            {
                $buscaConductor = " AND servicio_conductor = '$conductor' ";
            }
            if($movil != '')
            {
                $buscaMovil = " AND servicio_movil LIKE '%$movil%' ";
            }
            if($estado != '')
            {
                $buscaEstado = " AND servicio_estado = $estado ";
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
            $query = "SELECT * FROM tbl_servicio WHERE servicio_estado NOT IN (0,6) "
                    .$buscaFecha." ".$buscaId." ".$buscaEmpresa." ".$buscaConductor." ".$buscaMovil." ".$buscaEstado
                    . " ORDER BY servicio_id DESC LIMIT 15";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();
                $servicio->setId($row["servicio_id"]);          
                $servicio->setCliente($row["servicio_cliente"]);
                $servicio->setRuta($row["servicio_ruta"]);
                $date = new DateTime($row["servicio_fecha"]);
                $servicio->setFecha(date_format($date, 'd/m/Y'));
                $servicio->setHora($row["servicio_hora"]);
                $servicio->setMovil($row["servicio_movil"]);
                $servicio->setConductor($row["servicio_conductor"]);
                $servicio->setTarifa1($row["servicio_tarifa1"]);
                $servicio->setTarifa2($row["servicio_tarifa2"]);
                $servicio->setEstado($row["servicio_estado"]);
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    public function getProduccion($id,$empresa,$conductor,$estado,$movil,$desde,$hdesde,$hasta,$hhasta)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $buscaId = '';
            $buscaEmpresa = '';
            $buscaConductor = '';
            $buscaMovil = '';
            $buscaEstado = '';
            $buscaFecha = '';
            if($id != '')
            {
                $buscaId = " AND servicio_id LIKE '%$id%' ";
            }
            if($empresa != '')
            {
                $buscaEmpresa = " AND servicio_cliente LIKE '%$empresa%' ";
            }
            if($conductor != '')
            {
                $buscaConductor = " AND servicio_conductor = '$conductor' ";
            }
            if($movil != '')
            {
                $buscaMovil = " AND servicio_movil LIKE '%$movil%' ";
            }
            if($estado != '')
            {
                $buscaEstado = " AND servicio_estado = $estado ";
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
            $query = "SELECT * FROM tbl_servicio WHERE servicio_estado = 5 "
                    .$buscaFecha." ".$buscaId." ".$buscaEmpresa." ".$buscaConductor." ".$buscaMovil." ".$buscaEstado
                    . " ORDER BY servicio_id DESC";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $servicio = new Servicio();
                $servicio->setId($row["servicio_id"]);          
                $date = new DateTime($row["servicio_fecha"]);
                $servicio->setFecha(date_format($date, 'd/m/Y'));
                $servicio->setHora($row["servicio_hora"]);
                $servicio->setTarifa1($row["servicio_tarifa1"]);
                array_push($array, $servicio);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    public function insertarDetalleLiquidacion($item,$valor,$tipo,$conductor,$mes,$anio){
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_liquidacion_detalle (liquidaciondetalle_item,"
                    . "liquidaciondetalle_valor,liquidaciondetalle_tipo,liquidaciondetalle_conductor,"
                    . "liquidaciondetalle_mes,liquidaciondetalle_anio)"
                    . " VALUES ('$item','$valor','$tipo','$conductor','$mes','$anio')"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn))) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
    
    public function insertarLiquidacion($liquidacion){
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_liquidacion (liquidacion_mes, liquidacion_anio,"
                    . " liquidacion_id_conductor, liquidacion_rut_conductor, liquidacion_nombre_conductor,"
                    . " liquidacion_produccion_bruta, liquidacion_participacion,"
                    . " liquidacion_produccion_liquida, liquidacion_total_descuentos,"
                    . " liquidacion_total_rendiciones, liquidacion_liquido_pagar"
                    . ") VALUES ('".$liquidacion->getMes()."'"
                    . ",'".$liquidacion->getAnio()."','".$liquidacion->getIdConductor()."'"
                    . ",'".$liquidacion->getRutConductor()."','".$liquidacion->getNombreConductor()."'"
                    . ",'".$liquidacion->getProduccionBruta()."','".$liquidacion->getParticipacion()."'"
                    . ",'".$liquidacion->getProduccionLiquida()."','".$liquidacion->getTotalDescuentos()."'"
                    . ",'".$liquidacion->getTotalRendiciones()."','".$liquidacion->getLiquidoPagar()."')"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn))) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $id;
    }
    
    public function getLiquidacion($conductor,$mes,$anio)
    {
        $liquidacion = new Liquidacion();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_liquidacion WHERE liquidacion_id_conductor = '$conductor' AND liquidacion_mes = '$mes' AND liquidacion_anio = '$anio'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $liquidacion->setMes($mes);
                $liquidacion->setAnio($anio);
                $liquidacion->setIdConductor($conductor);
//                $liquidacion->setRutConductor($conductor->getRut());
//                $liquidacion->setNombreConductor($conductor->getNombre());
                $liquidacion->setProduccionBruta($row["liquidacion_produccion_bruta"]);
                $liquidacion->setParticipacion($row["liquidacion_participacion"]);
                $liquidacion->setProduccionLiquida($row["liquidacion_produccion_liquida"]);
                $liquidacion->setTotalDescuentos($row["liquidacion_total_descuentos"]);
                $liquidacion->setTotalRendiciones($row["liquidacion_total_rendiciones"]);
                $liquidacion->setLiquidoPagar($row["liquidacion_liquido_pagar"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $liquidacion;
    }
    
    public function getLiquidacionDetalle($conductor,$mes,$anio,$tipo)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_liquidacion_detalle WHERE liquidaciondetalle_conductor = '$conductor' AND liquidaciondetalle_mes = '$mes' AND liquidaciondetalle_anio = '$anio' AND liquidaciondetalle_tipo = $tipo";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                $liquidacionDetalle = new LiquidacionDetalle();
                $liquidacionDetalle->setItem($row["liquidaciondetalle_item"]);
                $liquidacionDetalle->setValor($row["liquidaciondetalle_valor"]);
                $liquidacionDetalle->setTipo($row["liquidaciondetalle_tipo"]);
                array_push($array, $liquidacionDetalle);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
}
