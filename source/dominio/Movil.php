<?php
include '../../util/validarPeticion.php';

class Movil {
    private $id;
    private $patente;
    private $marca;
    private $modelo;
    private $nombre;
    private $anio;
    private $color;
    private $cantidad;
    private $clase;
    private $venPerCir;
    private $venRevTec;
    private $venExt;
    private $kilometraje;
    private $motor;
    private $chasis;
    private $segOb;
    private $venSegOb;
    private $transportista;
    private $estado;
    private $lat;
    private $lon;
    private $ultimaAsignacion;
    private $servicio;
    private $polizaSegOb;
    private $segRcDm;
    private $venSegRcDm;
    private $polizaSegRcDm;
    private $conductor;
    
    function getId() {
        return $this->id;
    }

    function getPatente() {
        return $this->patente;
    }

    function getMarca() {
        return $this->marca;
    }

    function getModelo() {
        return $this->modelo;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getAnio() {
        return $this->anio;
    }

    function getColor() {
        return $this->color;
    }

    function getCantidad() {
        return $this->cantidad;
    }

    function getClase() {
        return $this->clase;
    }

    function getVenPerCir() {
        return $this->venPerCir;
    }

    function getVenRevTec() {
        return $this->venRevTec;
    }

    function getVenExt() {
        return $this->venExt;
    }

    function getKilometraje() {
        return $this->kilometraje;
    }

    function getMotor() {
        return $this->motor;
    }

    function getChasis() {
        return $this->chasis;
    }

    function getSegOb() {
        return $this->segOb;
    }

    function getVenSegOb() {
        return $this->venSegOb;
    }

    function getTransportista() {
        return $this->transportista;
    }

    function getEstado() {
        return $this->estado;
    }

    function getLat() {
        return $this->lat;
    }

    function getLon() {
        return $this->lon;
    }

    function getUltimaAsignacion() {
        return $this->ultimaAsignacion;
    }

    function getServicio() {
        return $this->servicio;
    }

    function getPolizaSegOb() {
        return $this->polizaSegOb;
    }

    function getSegRcDm() {
        return $this->segRcDm;
    }

    function getVenSegRcDm() {
        return $this->venSegRcDm;
    }

    function getPolizaSegRcDm() {
        return $this->polizaSegRcDm;
    }

    function getConductor() {
        return $this->conductor;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setPatente($patente) {
        $this->patente = $patente;
    }

    function setMarca($marca) {
        $this->marca = $marca;
    }

    function setModelo($modelo) {
        $this->modelo = $modelo;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setAnio($anio) {
        $this->anio = $anio;
    }

    function setColor($color) {
        $this->color = $color;
    }

    function setCantidad($cantidad) {
        $this->cantidad = $cantidad;
    }

    function setClase($clase) {
        $this->clase = $clase;
    }

    function setVenPerCir($venPerCir) {
        $this->venPerCir = $venPerCir;
    }

    function setVenRevTec($venRevTec) {
        $this->venRevTec = $venRevTec;
    }

    function setVenExt($venExt) {
        $this->venExt = $venExt;
    }

    function setKilometraje($kilometraje) {
        $this->kilometraje = $kilometraje;
    }

    function setMotor($motor) {
        $this->motor = $motor;
    }

    function setChasis($chasis) {
        $this->chasis = $chasis;
    }

    function setSegOb($segOb) {
        $this->segOb = $segOb;
    }

    function setVenSegOb($venSegOb) {
        $this->venSegOb = $venSegOb;
    }

    function setTransportista($transportista) {
        $this->transportista = $transportista;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setLat($lat) {
        $this->lat = $lat;
    }

    function setLon($lon) {
        $this->lon = $lon;
    }

    function setUltimaAsignacion($ultimaAsignacion) {
        $this->ultimaAsignacion = $ultimaAsignacion;
    }

    function setServicio($servicio) {
        $this->servicio = $servicio;
    }

    function setPolizaSegOb($polizaSegOb) {
        $this->polizaSegOb = $polizaSegOb;
    }

    function setSegRcDm($segRcDm) {
        $this->segRcDm = $segRcDm;
    }

    function setVenSegRcDm($venSegRcDm) {
        $this->venSegRcDm = $venSegRcDm;
    }

    function setPolizaSegRcDm($polizaSegRcDm) {
        $this->polizaSegRcDm = $polizaSegRcDm;
    }

    function setConductor($conductor) {
        $this->conductor = $conductor;
    }

    
    public function toString() {
        return "DATOS MOVIL: ID : ".$this->id." PATENTE : ".$this->patente.
            " MARCA : ".$this->marca." MODELO : ".$this->modelo.
            " NOMBRE : ".$this->nombre." ANIO : ".$this->anio." COLOR : ".$this->color.
            " CANTIDAD : ".$this->cantidad." CLASE : ".$this->clase.
            " VEN PER CIR : ".$this->venPerCir." VEN REV TEC : ".$this->venRevTec.
            " VEN EXT : ". $this->venExt." KILOMETRAJE : ".$this->kilometraje.
            " MOTOR : ". $this->motor." CHASIS : ".$this->chasis.
            " SEG OB : ". $this->segOb." VEN SEG OB : ".$this->venSegOb.
            " TRANSPORTISTA : ". $this->transportista." ESTADO : ".$this->estado.
            " LATITUD : ". $this->lat." LONGITUD : ".$this->lon.
            " ULTIMA ASIGNACION : ". $this->ultimaAsignacion." SERVICIO : ".$this->servicio.
            " POLIZA SEG OB : ". $this->polizaSegOb." SEG RC DM : ".$this->segRcDm.
            " VEN SEG RC DM : ". $this->venSegRcDm." POLIZA SEG RC DM : ".$this->polizaSegRcDm.
            " CONUCTOR : ".$this->conductor->toString();
    }
    
}

