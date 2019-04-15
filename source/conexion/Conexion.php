<?php
include '../../util/validarPeticion.php';

class Conexion {
    
    private $host="localhost";//ls-8fe75cfaec3ec8696988f7963ec4e4a0c3210f99.ckpnp4am1snb.us-east-1.rds.amazonaws.com
    private $user="root";//dbmasteruser 
    private $pass="";//1234Abcd
    private $dbname="gpsvan";//gpsvan

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
