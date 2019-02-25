<?php
include '../conexion/Conexion.php';

    $apiUrl = 'https://mindicador.cl/api';
    if ( ini_get('allow_url_fopen') ) {
        $json = file_get_contents($apiUrl);
    } else {
        $curl = curl_init($apiUrl);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $json = curl_exec($curl);
        curl_close($curl);
    }

    $dailyIndicators = json_decode($json);
    $uf = $dailyIndicators->uf->valor;
    
    $conn = new Conexion();
    $query = "UPDATE tbl_configuracion SET configuracion_valor = '$uf',"
            . " configuracion_fecha_actualizacion = NOW() WHERE configuracion_nombre = 'valor_uf'";
    $conn->conectar();
    if (mysqli_query($conn->conn,$query)) {
        $id = mysqli_insert_id($conn->conn);
    } else {
        echo mysqli_error($conn->conn);
    }