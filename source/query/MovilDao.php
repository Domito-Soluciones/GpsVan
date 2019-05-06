<?php
include '../../util/validarPeticion.php';
include '../../conexion/Conexion.php';
include '../../dominio/Movil.php';
include '../../dominio/Conductor.php';

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
        $conductor = $movil->getConductor();
        $gps = $movil->getGps();
        $celular = $movil->getCelular();
        $app = $movil->getApp();
        $tipo = $movil->getTipo();
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
        $valorSegOb = $movil->getValorSegOb();
        $segRcDm = $movil->getSegRcDm();
        $venSegRcDm = $movil->getVenSegRcDm();
        $polizaSegRcDm = $movil->getPolizaSegRcDm();
        $valorSegRcDm = $movil->getValorSegRcDm();
        $segAs = $movil->getSegAs();
        $venSegAs = $movil->getVenSegAs();
        $polizaSegAs = $movil->getPolizaSegAs();
        $valorSegAs = $movil->getValorSegAs();
        $segRcExceso = $movil->getSegRcExceso();
        $venSegRcExceso = $movil->getVenSegRcExceso();
        $polizaSegRcExceso = $movil->getPolizaSegRcExceso();
        $valorSegRcExceso = $movil->getValorSegRcExceso();
        $adjuntoPerCir = $movil->getAdjuntoPerCir();
        $adjuntoRevTec = $movil->getAdjuntoRevTec();
        $adjuntoNMotor = $movil->getAdjuntoNMotor();
        $adjuntoSeremi = $movil->getAdjuntoSeremi();
        $adjuntoSegOb = $movil->getAdjuntoSegOb();
        $adjuntoSegRcDm = $movil->getAdjuntoSegRcDm();
        $adjuntoSegAs = $movil->getAdjuntoSegAsiento();
        $adjuntoSegExceso = $movil->getAdjuntoSegRcExceso();
        $conn = new Conexion();
        try {
            $query = "INSERT INTO tbl_movil (movil_patente,movil_nombre,movil_marca,movil_modelo,movil_anio,movil_color,movil_cantidad,movil_clase,movil_conductor,movil_gps,movil_celular,movil_app,"
                    . "movil_per_circ,movil_venc_rev_tecnica,movil_venc_ext,movil_kilometraje,movil_motor,movil_chasis,"
                    . "movil_seg_ob,movil_venc_seg_ob,movil_pol_seg_ob,movil_seg_ob_valor,movil_seg_rcdm,movil_venc_seg_rcdm,movil_pol_seg_rcdm,movil_seg_rcdm_valor,movil_seg_as,movil_venc_seg_as,movil_pol_seg_as,movil_seg_as_valor,movil_seg_rcexceso,movil_venc_seg_rcexceso,movil_pol_seg_rcexceso,movil_seg_rcexceso_valor,"
                    . "movil_per_cir_adjunto,movil_rev_tec_adjunto,movil_motor_adjunto,movil_seremi_adjunto,movil_seg_ob_adjunto,movil_seg_rc_dm_adjunto,movil_seg_as_adjunto,movil_seg_exceso_adjunto,"
                    . "movil_transportista,movil_estado,movil_lat,movil_lon,movil_last_lat,movil_last_lon,movil_ultima_asignacion,movil_servicio,movil_tipo)"
                    . " VALUES ('$patente','$nombre','$marca','$modelo',$anio,'$color',$cantidad,'$clase','$conductor','$gps','$celular','$app',"
                    . "'$venPerCir','$venRevTec','$venExt',$kilo,$motor,$chasis,"
                    . "'$segOb','$venSegOb','$polizaSegOb','$valorSegOb','$segRcDm','$venSegRcDm','$polizaSegRcDm','$valorSegRcDm','$segAs','$venSegAs','$polizaSegAs','$valorSegAs','$segRcExceso','$venSegRcExceso','$polizaSegRcExceso','$valorSegRcExceso',"
                    . "'$adjuntoPerCir','$adjuntoRevTec','$adjuntoNMotor','$adjuntoSeremi','$adjuntoSegOb','$adjuntoSegRcDm','$adjuntoSegAs','$adjuntoSegExceso',"
                    . "0,0,0,0,0,0,CURRENT_TIMESTAMP,0,'$tipo')";
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
        $conductor = $movil->getConductor();
        $gps = $movil->getGps();
        $celular = $movil->getCelular();
        $app = $movil->getApp();
        $tipo = $movil->getTipo();
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
        $valorSegOb = $movil->getValorSegOb();
        $segRcDm = $movil->getSegRcDm();
        $venSegRcDm = $movil->getVenSegRcDm();
        $polizaSegRcDm = $movil->getPolizaSegRcDm();
        $valorSegRcDm = $movil->getValorSegRcDm();
        $segRcExceso = $movil->getSegRcExceso();
        $venSegRcExceso = $movil->getVenSegRcExceso();
        $polizaSegRcExceso = $movil->getPolizaSegRcExceso();
        $valorSegRcExceso = $movil->getValorSegRcExceso();
        $segAs = $movil->getSegAs();
        $venSegAs = $movil->getVenSegAs();
        $polizaSegAs = $movil->getPolizaSegAs();
        $valorSegAs = $movil->getValorSegAs();
        $adjuntoPerCir = $movil->getAdjuntoPerCir();
        $adjuntoRevTec = $movil->getAdjuntoRevTec();
        $adjuntoNMotor = $movil->getAdjuntoNMotor();
        $adjuntoSeremi = $movil->getAdjuntoSeremi();
        $adjuntoSegOb = $movil->getAdjuntoSegOb();
        $adjuntoSegRcDm = $movil->getAdjuntoSegRcDm();
        $adjuntoSegAs = $movil->getAdjuntoSegAsiento();
        $adjuntoSegExceso = $movil->getAdjuntoSegRcExceso();
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_marca = '$marca',movil_nombre = '$nombre',movil_modelo = '$modelo',"
                    . "movil_anio = $anio,movil_color = '$color',movil_cantidad = $cantidad,movil_clase = '$clase',movil_conductor = '$conductor',movil_gps = '$gps',movil_celular = $celular,movil_app = $app,"
                    . "movil_per_circ = '$venPerCir',movil_venc_rev_tecnica = '$venRevTec', movil_venc_ext = '$venExt',"
                    . "movil_kilometraje = $kilo, movil_motor = $motor, movil_chasis = $chasis,"
                    . "movil_seg_ob = '$segOb',movil_venc_seg_ob = '$venSegOb',movil_pol_seg_ob = '$polizaSegOb',movil_seg_ob_valor = '$valorSegOb',"
                    . "movil_seg_rcdm = '$segRcDm', movil_venc_seg_rcdm = '$venSegRcDm', movil_pol_seg_rcdm = '$polizaSegRcDm',movil_seg_rcdm_valor = '$valorSegRcDm',movil_seg_rcexceso = '$segRcExceso', movil_venc_seg_rcexceso = '$venSegRcExceso', movil_pol_seg_rcexceso = '$polizaSegRcExceso',movil_seg_rcexceso_valor = '$valorSegRcExceso',movil_seg_as = '$segAs',movil_venc_seg_as = '$venSegAs',movil_pol_seg_as = '$polizaSegAs',movil_seg_as_valor = '$valorSegAs',"
                    . "movil_per_cir_adjunto = '$adjuntoPerCir',movil_rev_tec_adjunto = '$adjuntoRevTec',movil_motor_adjunto = '$adjuntoNMotor',"
                    . "movil_seremi_adjunto = '$adjuntoSeremi',movil_seg_ob_adjunto = '$adjuntoSegOb',movil_seg_rc_dm_adjunto = '$adjuntoSegRcDm',movil_seg_as_adjunto = '$adjuntoSegAs',movil_seg_exceso_adjunto = '$adjuntoSegExceso',movil_tipo = '$tipo'"
                    . " WHERE movil_patente = '$patente'";           
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
            $query = "SELECT * FROM tbl_movil left join tbl_conductor on movil_conductor = conductor_id WHERE "
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
                $movil->setGps($row["movil_gps"]);
                $movil->setCelular($row["movil_celular"]);
                $movil->setApp($row["movil_app"]);
                $movil->setTipo($row["movil_tipo"]);
                $movil->setVenPerCir($row["movil_per_circ"]);
                $movil->setVenRevTec($row["movil_venc_rev_tecnica"]);
                $movil->setVenExt($row["movil_venc_ext"]);
                $movil->setKilometraje($row["movil_kilometraje"]);
                $movil->setMotor($row["movil_motor"]);
                $movil->setChasis($row["movil_chasis"]);
                $movil->setSegOb($row["movil_seg_ob"]);
                $movil->setVenSegOb($row["movil_venc_seg_ob"]);                
                $movil->setPolizaSegOb($row["movil_pol_seg_ob"]);   
                $movil->setValorSegOb($row["movil_seg_ob_valor"]);   
                $movil->setSegRcDm($row["movil_seg_rcdm"]);
                $movil->setVenSegRcDm($row["movil_venc_seg_rcdm"]);                
                $movil->setPolizaSegRcDm($row["movil_pol_seg_rcdm"]); 
                $movil->setValorSegRcDm($row["movil_seg_rcdm_valor"]);
                $movil->setSegAs($row["movil_seg_as"]);
                $movil->setVenSegAs($row["movil_venc_seg_as"]);                
                $movil->setPolizaSegAs($row["movil_pol_seg_as"]); 
                $movil->setValorSegAs($row["movil_seg_as_valor"]);
                $movil->setSegRcExceso($row["movil_seg_rcexceso"]);
                $movil->setVenSegRcExceso($row["movil_venc_seg_rcexceso"]);                
                $movil->setPolizaSegRcExceso($row["movil_pol_seg_rcexceso"]); 
                $movil->setValorSegRcExceso($row["movil_seg_rcexceso_valor"]);
                $movil->setAdjuntoPerCir($row["movil_per_cir_adjunto"]);  
                $movil->setAdjuntoRevTec($row["movil_rev_tec_adjunto"]);  
                $movil->setAdjuntoNMotor($row["movil_motor_adjunto"]);  
                $movil->setAdjuntoSeremi($row["movil_seremi_adjunto"]);  
                $movil->setAdjuntoSegOb($row["movil_seg_ob_adjunto"]);  
                $movil->setAdjuntoSegRcDm($row["movil_seg_rc_dm_adjunto"]);  
                $movil->setAdjuntoSegAsiento($row["movil_seg_as_adjunto"]);  
                $movil->setAdjuntoSegRcExceso($row["movil_seg_exceso_adjunto"]); 
                $movil->setTransportista($row["movil_transportista"]);
                $movil->setEstado($row['movil_estado']);
                $movil->setLat($row['movil_lat']);
                $movil->setLon($row['movil_lon']);
                $movil->setServicio($row['movil_servicio']);
                $movil->setConductor($row['movil_conductor']);
                $movil->setConductorNombre($row['conductor_nombre']." ".$row['conductor_papellido']);
                $movil->setConductorNick($row['conductor_nick']);
                array_push($array, $movil);
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        return $array;
    }
    
    public function getMovilesGrupo($grupo)
    {
        $array = array();
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_movil left join tbl_conductor on movil_conductor = conductor_id WHERE movil_tipo = '$grupo'";
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
                $movil->setGps($row["movil_gps"]);
                $movil->setCelular($row["movil_celular"]);
                $movil->setApp($row["movil_app"]);
                $movil->setTipo($row["movil_tipo"]);
                $movil->setVenPerCir($row["movil_per_circ"]);
                $movil->setVenRevTec($row["movil_venc_rev_tecnica"]);
                $movil->setVenExt($row["movil_venc_ext"]);
                $movil->setKilometraje($row["movil_kilometraje"]);
                $movil->setMotor($row["movil_motor"]);
                $movil->setChasis($row["movil_chasis"]);
                $movil->setSegOb($row["movil_seg_ob"]);
                $movil->setVenSegOb($row["movil_venc_seg_ob"]);                
                $movil->setPolizaSegOb($row["movil_pol_seg_ob"]);   
                $movil->setValorSegOb($row["movil_seg_ob_valor"]);   
                $movil->setSegRcDm($row["movil_seg_rcdm"]);
                $movil->setVenSegRcDm($row["movil_venc_seg_rcdm"]);                
                $movil->setPolizaSegRcDm($row["movil_pol_seg_rcdm"]); 
                $movil->setValorSegRcDm($row["movil_seg_rcdm_valor"]);
                $movil->setSegAs($row["movil_seg_as"]);
                $movil->setVenSegAs($row["movil_venc_seg_as"]);                
                $movil->setPolizaSegAs($row["movil_pol_seg_as"]); 
                $movil->setValorSegAs($row["movil_seg_as_valor"]);
                $movil->setSegRcExceso($row["movil_seg_rcexceso"]);
                $movil->setVenSegRcExceso($row["movil_venc_seg_rcexceso"]);                
                $movil->setPolizaSegRcExceso($row["movil_pol_seg_rcexceso"]); 
                $movil->setValorSegRcExceso($row["movil_seg_rcexceso_valor"]);
                $movil->setAdjuntoPerCir($row["movil_per_cir_adjunto"]);  
                $movil->setAdjuntoRevTec($row["movil_rev_tec_adjunto"]);  
                $movil->setAdjuntoNMotor($row["movil_motor_adjunto"]);  
                $movil->setAdjuntoSeremi($row["movil_seremi_adjunto"]);  
                $movil->setAdjuntoSegOb($row["movil_seg_ob_adjunto"]);  
                $movil->setAdjuntoSegRcDm($row["movil_seg_rc_dm_adjunto"]);  
                $movil->setAdjuntoSegAsiento($row["movil_seg_as_adjunto"]);  
                $movil->setAdjuntoSegRcExceso($row["movil_seg_exceso_adjunto"]); 
                $movil->setTransportista($row["movil_transportista"]);
                $movil->setEstado($row['movil_estado']);
                $movil->setLat($row['movil_lat']);
                $movil->setLon($row['movil_lon']);
                $movil->setServicio($row['movil_servicio']);
                $movil->setConductor($row['movil_conductor']);
                $movil->setConductorNombre($row['conductor_nombre']." ".$row['conductor_papellido']);
                $movil->setConductorNick($row['conductor_nick']);
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
                $movil->setSegOb($row["movil_seg_obligatorio"]);
                $movil->setVenSegOb($row["movil_venc_seg_obligatorio"]);                
                $movil->setPolizaSegOb($row["movil_pol_seg_obligatorio"]);   
                $movil->setSegRcDm($row["movil_seg_rcdm"]);
                $movil->setVenSegRcDm($row["movil_venc_seg_rcdm"]);                
                $movil->setPolizaSegRcDm($row["movil_pol_seg_rcdm"]);                   
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
    
    public function getMovilConductor($movil)
    {
        $conn = new Conexion();
        try {
            $query = "SELECT * FROM tbl_movil JOIN tbl_conductor ON movil_id = conductor_movil WHERE movil_nombre = '".$movil."'";
            $conn->conectar();
            $result = mysqli_query($conn->conn,$query) or die (mysqli_error($conn->conn)); 
            while($row = mysqli_fetch_array($result)) {
                $movil = new Movil();
                $movil->setId($row["movil_id"]);
                $movil->setPatente($row["movil_patente"]);
                $movil->setMarca($row["movil_marca"]);
                $movil->setModelo($row["movil_modelo"]);
                $movil->setNombre($row["movil_nombre"]);
                $movil->setAnio($row["movil_anio"]);
                $movil->setColor($row["movil_color"]);
                $movil->setCantidad($row["movil_cantidad"]);
                $movil->setTransportista($row["movil_transportista"]);
                $movil->setEstado($row['movil_estado']);
                $movil->setLat($row['movil_lat']);
                $movil->setLon($row['movil_lon']);
                $movil->setServicio($row['movil_servicio']);
                $conductor = new Conductor();
                $conductor->setId($row["conductor_id"]);
                $conductor->setNombre($row["conductor_nombre"]);
                $conductor->setPapellido($row["conductor_papellido"]);
                $conductor->setMapellido($row["conductor_mapellido"]);
                $conductor->setRut($row["conductor_rut"]);
                $conductor->setNick($row["conductor_nick"]);
                $conductor->setTelefono($row["conductor_telefono"]);
                $conductor->setCelular($row["conductor_celular"]);
                $conductor->setDireccion($row["conductor_direccion"]);
                $conductor->setMail($row["conductor_mail"]);
                $movil->setConductor($conductor);
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
    
    public function modificarEstado($conductor, $estado)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_estado = $estado WHERE movil_conductor = ".$conductor; 
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
    
    public function modificarServicio($conductor,$servicio)
    {
        $id = 0;
        $conn = new Conexion();
        try {
            $query = "UPDATE tbl_movil SET movil_servicio = '$servicio' WHERE movil_conductor = ".$conductor; 
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
