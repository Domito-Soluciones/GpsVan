<?php
include '../../util/validarPeticion.php';

include '../../conexion/Conexion.php';
include '../../dominio/Movil.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MovilDao
 *
 * @author Jose
 */
class MovilDao {
    
    public function agregarMovil($movil)
    {
        $id = 0;
        $patente = $movil->getPatente();
        $nombre = $movil->getNombre();
        $marca = $movil->getMarca();
        $modelo = $movil->getModelo();
        $anio = $movil->getAnio();
        $venRevTec = $movil->getVenRevTec();
        $segOb = $movil->getSegOb();
        $venSegOb = $movil->getVenSegOb();
        $segAd = $movil->getSegAd();
        $kilo = $movil->getKilometraje();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_movil (movil_patente,movil_nombre,movil_marca,movil_modelo,"
                    . "movil_anio,movil_venc_rev_tecnica,movil_seguro_obligatorio,movil_venc_seguro_obligatorio,movil_seguro_adicional,movil_kilometraje,"
                    . "movil_transportista,movil_estado,movil_lat,movil_lon,movil_last_lat,movil_last_lon,movil_conductor,movil_ultima_asignacion,movil_servicio)"
                    . " VALUES ('$patente','$nombre','$marca','$modelo',"
                    . "$anio,'$venRevTec','$segOb','$venSegOb','$segAd',$kilo,"
                    . "0,0,'','','','',0,CURRENT_TIMESTAMP,0)"; 
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
        $marca = $movil->getMarca();
        $nombre = $movil->getNombre();
        $modelo = $movil->getModelo();
        $anio = $movil->getAnio();
        $venRevTec = $movil->getVenRevTec();
        $segOb = $movil->getSegOb();
        $venSegOb = $movil->getVenSegOb();
        $segAd = $movil->getSegAd();
        $kilo = $movil->getKilometraje();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_marca = '$marca',"
                    . "movil_nombre = '$nombre',movil_modelo = '$modelo',"
                    . "movil_anio = $anio,movil_venc_rev_tecnica = '$venRevTec',"
                    . "movil_seguro_obligatorio = '$segOb',movil_venc_seguro_obligatorio = '$venSegOb',movil_seguro_adicional = '$segAd'"
                    . ",movil_kilometraje = $kilo WHERE movil_patente = '$patente'";           
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
                    . "movil_anio LIKE '%$busqueda%' LIMIT 20";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $moviles = new Movil();
                $moviles->setId($row["movil_id"]);
                $moviles->setNombre($row["movil_nombre"]);
                $moviles->setPatente($row["movil_patente"]);
                $moviles->setMarca($row["movil_marca"]);
                $moviles->setModelo($row["movil_modelo"]);
                $moviles->setNombre($row["movil_nombre"]);
                $moviles->setAnio($row["movil_anio"]);
                $moviles->setVenRevTec($row["movil_venc_rev_tecnica"]);
                $moviles->setSegOb($row["movil_seguro_obligatorio"]);
                $moviles->setVenSegOb($row["movil_venc_seguro_obligatorio"]);                
                $moviles->setSegAd($row["movil_seguro_adicional"]);
                $moviles->setKilometraje($row["movil_kilometraje"]);
                $moviles->setTransportista($row["movil_transportista"]);
                $moviles->setEstado($row['movil_estado']);
                $moviles->setLat($row['movil_lat']);
                $moviles->setLon($row['movil_lon']);
                $moviles->setServicio($row['movil_servicio']);
                
                array_push($array, $moviles);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
        
    public function cambiarEstadoConductor($estado,$conductor)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_estado = $estado WHERE movil_conductor = '$conductor'"; 
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
    
}
