<?php
include '../../util/validarPeticion.php';

class Conexion {
    
    private $host="localhost";
    private $user="domitocl_gpsvan";
    private $pass="Dmt.2005DMT";
    private $dbname="domitocl_gpsvan";

    public $conn;
    
    function conectar()
    {       
        $this->conn = mysqli_connect($this->host,$this->user,$this->pass, $this->dbname);
        return $this->conn;
    }
    
    function desconectar()
    {
        mysqli_close($this->conn);
    }
}
