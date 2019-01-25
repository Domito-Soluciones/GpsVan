<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Movil.php';
//include './LogQuery.php';

class MovilDao {
    
    public function agregarMovil($movil)
    {
        $id = 0;
        $patente = $movil->getPatente();
        $nombre = $movil->getNombre();
        $marca = $movil->getMarca();
        $modelo = $movil->getModelo();
        $anio = $movil->getAnio();
        $color = $movil->getColor();
        $cantidad = $movil->getCantidad();
        $clase = $movil->getClase();
        $venPerCir = $movil->getVenPerCir();
        $venRevTec = $movil->getVenRevTec();
        $venExt = $movil->getVenExt();
        $kilo = $movil->getKilometraje();
        $motor = $movil->getMotor();
        $chasis = $movil->getChasis();    
        $segOb = $movil->getSegOb();
        $venSegOb = $movil->getVenSegOb();
        $polizaSegOb = $movil->getPolizaSegOb();
        $segRcDm = $movil->getSegRcDm();
        $venSegRcDm = $movil->getVenSegRcDm();
        $polizaSegRcDm = $movil->getPolizaSegRcDm();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_movil (movil_patente,movil_nombre,movil_marca,movil_modelo,movil_anio,movil_color,movil_cantidad,movil_clase,"
                    . "movil_per_circ,movil_venc_rev_tecnica,movil_venc_ext,movil_kilometraje,movil_motor,movil_chasis,"
                    . "movil_seguro_obligatorio,movil_venc_seguro_obligatorio,movil_pol_seguro_obligatorio,movil_seguro_rcdm,movil_venc_seguro_rcdm,movil_pol_seguro_rcdm,"
                    . "movil_transportista,movil_estado,movil_lat,movil_lon,movil_last_lat,movil_last_lon,movil_ultima_asignacion,movil_servicio)"
                    . " VALUES ('$patente','$nombre','$marca','$modelo',$anio,'$color',$cantidad,'$clase',"
                    . "'$venPerCir','$venRevTec','$venExt',$kilo,$motor,$chasis,"
                    . "'$segOb','$venSegOb','$polizaSegOb','$segRcDm','$venSegRcDm','$polizaSegRcDm',"
                    . "0,0,0,0,0,0,CURRENT_TIMESTAMP,0)";
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    public function modificarMovil($movil)
    {
        $id = 0;
        $patente = $movil->getPatente();
        $nombre = $movil->getNombre();
        $marca = $movil->getMarca();
        $modelo = $movil->getModelo();
        $anio = $movil->getAnio();
        $color = $movil->getColor();
        $cantidad = $movil->getCantidad();
        $clase = $movil->getClase();
        $venPerCir = $movil->getVenPerCir();
        $venRevTec = $movil->getVenRevTec();
        $venExt = $movil->getVenExt();
        $kilo = $movil->getKilometraje();
        $motor = $movil->getMotor();
        $chasis = $movil->getChasis();    
        $segOb = $movil->getSegOb();
        $venSegOb = $movil->getVenSegOb();
        $polizaSegOb = $movil->getPolizaSegOb();
        $segRcDm = $movil->getSegRcDm();
        $venSegRcDm = $movil->getVenSegRcDm();
        $polizaSegRcDm = $movil->getPolizaSegRcDm();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_marca = '$marca',movil_nombre = '$nombre',movil_modelo = '$modelo',"
                    . "movil_anio = $anio,movil_color = '$color',movil_cantidad = $cantidad,movil_clase = '$clase',"
                    . "movil_per_circ = '$venPerCir',movil_venc_rev_tecnica = '$venRevTec', movil_venc_ext = '$venExt',"
                    . "movil_kilometraje = $kilo, movil_motor = $motor, movil_chasis = $chasis,"
                    . "movil_seguro_obligatorio = '$segOb',movil_venc_seguro_obligatorio = '$venSegOb',movil_pol_seguro_obligatorio = '$polizaSegOb',"
                    . "movil_seguro_rcdm = '$segRcDm', movil_venc_seguro_rcdm = '$venSegRcDm', movil_pol_seguro_rcdm = '$polizaSegRcDm' WHERE movil_patente = '$patente'";           
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    public function getMoviles($busqueda)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_movil WHERE "
                    . "movil_patente LIKE '%".$busqueda."%' OR "
                    . "movil_marca LIKE '%".$busqueda."%' OR "
                    . "movil_modelo LIKE '%".$busqueda."%' OR "
                    . "movil_nombre LIKE '%$busqueda%' OR "
                    . "movil_anio LIKE '%$busqueda%' "
                    . " LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $movil = new Movil();
                $movil->setId($row["movil_id"]);
                $movil->setNombre($row["movil_nombre"]);
                $movil->setPatente($row["movil_patente"]);
                $movil->setMarca($row["movil_marca"]);
                $movil->setModelo($row["movil_modelo"]);
                $movil->setNombre($row["movil_nombre"]);
                $movil->setAnio($row["movil_anio"]);
                $movil->setColor($row["movil_color"]);
                $movil->setCantidad($row["movil_cantidad"]);
                $movil->setClase($row["movil_clase"]);
                $movil->setVenPerCir($row["movil_per_circ"]);
                $movil->setVenRevTec($row["movil_venc_rev_tecnica"]);
                $movil->setVenExt($row["movil_venc_ext"]);
                $movil->setKilometraje($row["movil_kilometraje"]);
                $movil->setMotor($row["movil_motor"]);
                $movil->setChasis($row["movil_chasis"]);
                $movil->setSegOb($row["movil_seguro_obligatorio"]);
                $movil->setVenSegOb($row["movil_venc_seguro_obligatorio"]);                
                $movil->setPolizaSegOb($row["movil_pol_seguro_obligatorio"]);   
                $movil->setSegRcDm($row["movil_seguro_rcdm"]);
                $movil->setVenSegRcDm($row["movil_venc_seguro_rcdm"]);                
                $movil->setPolizaSegRcDm($row["movil_pol_seguro_rcdm"]);                   
                $movil->setTransportista($row["movil_transportista"]);
                $movil->setEstado($row['movil_estado']);
                $movil->setLat($row['movil_lat']);
                $movil->setLon($row['movil_lon']);
                $movil->setServicio($row['movil_servicio']);
                array_push($array, $movil);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getMovil($busqueda)
    {
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_movil WHERE movil_patente = '".$busqueda."' OR movil_servicio = ".$busqueda;
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $movil = new Movil();
                $movil->setId($row["movil_id"]);
                $movil->setNombre($row["movil_nombre"]);
                $movil->setPatente($row["movil_patente"]);
                $movil->setMarca($row["movil_marca"]);
                $movil->setModelo($row["movil_modelo"]);
                $movil->setNombre($row["movil_nombre"]);
                $movil->setAnio($row["movil_anio"]);
                $movil->setColor($row["movil_color"]);
                $movil->setCantidad($row["movil_cantidad"]);
                $movil->setClase($row["movil_clase"]);
                $movil->setVenPerCir($row["movil_per_circ"]);
                $movil->setVenRevTec($row["movil_venc_rev_tecnica"]);
                $movil->setVenExt($row["movil_venc_ext"]);
                $movil->setKilometraje($row["movil_kilometraje"]);
                $movil->setMotor($row["movil_motor"]);
                $movil->setChasis($row["movil_chasis"]);
                $movil->setSegOb($row["movil_seguro_obligatorio"]);
                $movil->setVenSegOb($row["movil_venc_seguro_obligatorio"]);                
                $movil->setPolizaSegOb($row["movil_pol_seguro_obligatorio"]);   
                $movil->setSegRcDm($row["movil_seguro_rcdm"]);
                $movil->setVenSegRcDm($row["movil_venc_seguro_rcdm"]);                
                $movil->setPolizaSegRcDm($row["movil_pol_seguro_rcdm"]);                   
                $movil->setTransportista($row["movil_transportista"]);
                $movil->setEstado($row['movil_estado']);
                $movil->setLat($row['movil_lat']);
                $movil->setLon($row['movil_lon']);
                $movil->setServicio($row['movil_servicio']);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $movil;
    }
    
    public function modificarUbicacion($conductor, $lat, $lon)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_lat = $lat, movil_lon = $lon WHERE movil_conductor = '$conductor'"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
    
    function eliminarMovil($patente)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "DELETE FROM tbl_movil WHERE movil_patente = '$patente'"; 
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }           
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $id;
    }
 
    public function asociarConductores($movil,$conductores)
    {
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_conductor SET conductor_movil = '$movil' WHERE conductor_id IN ($conductores)";
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
    public function desAsociarConductores($movil)
    {
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_conductor SET conductor_movil = '0' WHERE conductor_movil = '$movil'";
            $conn->conectar();
            if (mysqli_query($conn->conn,$query)) {
                $id = mysqli_insert_id($conn->conn);
            } else {
                echo mysqli_error($conn->conn);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
}
