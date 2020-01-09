<?php

include '../../conexion/Conexion.php';

class DashBoardDao {
    
    public function getMovilesActivos()
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT COUNT(*) AS movil_cantidad,movil_estado FROM tbl_movil group by movil_estado ORDER BY movil_estado DESC;";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["movil_cantidad"]);                    
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
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
            $query = "SELECT COUNT(*) AS servicio_cantidad,servicio_estado FROM tbl_servicio WHERE DATE_FORMAT(servicio_fecha, '%Y-%m-%d 00:00:00') >= '$fecha 00:00:00' GROUP BY servicio_estado";
            
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
    
    public function getServiciosCliente($cliente)
    {
        $array = array();
        $conn = new Conexion();
        $date = getdate();
        $dia = $date['mday'] < 10 ? "0".$date['mday'] : $date['mday'];
        $mes = $date['mon'] < 10 ? "0".$date['mon'] : $date['mon'];
        $anio = $date['year'];
        $fecha = $anio."-".$mes."-".$dia;
        try {
            $query = "SELECT COUNT(*) AS servicio_cantidad,servicio_estado FROM tbl_servicio WHERE DATE_FORMAT(servicio_fecha, '%Y-%m-%d') = '$fecha' AND servicio_cliente = '$cliente' GROUP BY servicio_estado";
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
    
    public function getServiciosConvenio()
    {
        $array = array();
        $conn = new Conexion();
        $date = getdate();
        $dia = $date['mday'] < 10 ? "0".$date['mday'] : $date['mday'];
        $mes = $date['mon'] < 10 ? "0".$date['mon'] : $date['mon'];
        $anio = $date['year'];
        $fecha = $anio."-".$mes."-".$dia;
        try {
            $query = "SELECT COUNT(*) AS servicio_cantidad,servicio_cliente FROM tbl_servicio WHERE DATE_FORMAT(servicio_fecha, '%Y-%m-%d') = '$fecha' AND servicio_estado = 5 GROUP BY servicio_cliente ORDER BY servicio_cantidad DESC";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["servicio_cliente"]."%".$row["servicio_cantidad"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    public function getServiciosCentroCosto()
    {
        $array = array();
        $conn = new Conexion();
        $date = getdate();
        $dia = $date['mday'] < 10 ? "0".$date['mday'] : $date['mday'];
        $mes = $date['mon'] < 10 ? "0".$date['mon'] : $date['mon'];
        $anio = $date['year'];
        $fecha = $anio."-".$mes."-".$dia;
        try {
            $query = "SELECT count(*) as servicio_cantidad,pasajero_centro_costo FROM tbl_servicio JOIN tbl_servicio_pasajero ON servicio_id = servicio_pasajero_id_servicio JOIN tbl_pasajero ON servicio_pasajero_id_pasajero = pasajero_id JOIN tbl_centro_costo ON pasajero_centro_costo = centro_costo_nombre WHERE DATE_FORMAT(servicio_fecha, '%Y-%m-%d') = '$fecha' AND servicio_estado = 5 GROUP BY servicio_cliente ORDER BY servicio_cantidad DESC";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["pasajero_centro_costo"]."%".$row["servicio_cantidad"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    public function getGastoCentroCosto()
    {
        $array = array();
        $conn = new Conexion();
        $date = getdate();
        $dia = $date['mday'] < 10 ? "0".$date['mday'] : $date['mday'];
        $mes = $date['mon'] < 10 ? "0".$date['mon'] : $date['mon'];
        $anio = $date['year'];
        $fecha = $anio."-".$mes."-".$dia;
        try {
            $query = "SELECT sum(servicio_tarifa2) as servicio_cantidad,pasajero_centro_costo FROM tbl_servicio JOIN tbl_servicio_pasajero ON servicio_id = servicio_pasajero_id_servicio JOIN tbl_pasajero ON servicio_pasajero_id_pasajero = pasajero_id JOIN tbl_centro_costo ON pasajero_centro_costo = centro_costo_nombre WHERE DATE_FORMAT(servicio_fecha, '%Y-%m-%d') = '$fecha' AND servicio_estado = 5 GROUP BY servicio_cliente ORDER BY servicio_cantidad DESC";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                array_push($array, $row["pasajero_centro_costo"]."%".$row["servicio_cantidad"]);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $array;
    }
    
    public function getProduccionDiaria()
    {
        $respuesta = 0;
        $conn = new Conexion();
        $date = getdate();
        $dia = $date['mday'] < 10 ? "0".$date['mday'] : $date['mday'];
        $mes = $date['mon'] < 10 ? "0".$date['mon'] : $date['mon'];
        $anio = $date['year'];
        $fecha = $anio."-".$mes."-".$dia;
        try {
            $query = "SELECT SUM(servicio_tarifa2) AS produccion_diaria FROM tbl_servicio WHERE DATE_FORMAT(servicio_fecha, '%Y-%m-%d 00:00:00') >= '$fecha 00:00:00' AND servicio_estado = 5";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                return $row["produccion_diaria"];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $respuesta;
    }
    
        public function getProduccionMInternos()
    {
        $respuesta = 0;
        $conn = new Conexion();
        $date = getdate();
        $dia = $date['mday'] < 10 ? "0".$date['mday'] : $date['mday'];
        $mes = $date['mon'] < 10 ? "0".$date['mon'] : $date['mon'];
        $anio = $date['year'];
        $fecha = $anio."-".$mes."-".$dia;
        try {
            $query = "SELECT SUM(servicio_tarifa2) AS produccion_diaria FROM tbl_servicio JOIN tbl_movil ON servicio_movil = movil_nombre WHERE DATE_FORMAT(servicio_fecha, '%Y-%m-%d') = '$fecha' AND servicio_estado = 5 AND movil_tipo = 0";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                return $row["produccion_diaria"];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $respuesta;
    }
    
    public function getProduccionMensual()
    {
        $respuesta = 0;
        $conn = new Conexion();
        $date = getdate();
        $mesDesde = $date['mon'] < 10 ? "0".$date['mon'] : $date['mon'];
        $mesHasta = "";
        $anioHasta = $date['year'];
        if($date['mon'] == "12")
        {
            $mesHasta = "01";
            $anioHasta = $date['year'] + 1;
        }
        else
        {
            $mesHasta = ($date['mon']+1) < 10 ? "0".($date['mon']+1) : ($date['mon']+1);
        }
        $desde = $date['year']."-".$mesDesde."-01 00:00:00";
        $hasta = $anioHasta."-".$mesHasta."-01 00:00:00";
        try {
            $query = "SELECT SUM(servicio_tarifa2) AS produccion_diaria FROM tbl_servicio WHERE servicio_fecha >= '$desde' AND servicio_fecha < '$hasta' AND servicio_estado = 5";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (Log::write_error_log(mysqli_error($conn->conn))); 
            while($row = mysqli_fetch_array($result)) {
                return $row["produccion_diaria"];
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
            Log::write_error_log($exc->getTraceAsString());
        }
        return $respuesta;
    }
    

    
}
