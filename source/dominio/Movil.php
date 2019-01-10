<?php
include '../../util/validarPeticion.php';

class Movil {
    private $id;
    private $patente;
    private $marca;
    private $modelo;
    private $nombre;
    private $transportista;
    private $estado;
    private $lat;
    private $lon;
    private $ultimaAsignacion;
    private $servicio;
    private $anio;
    private $venRevTec;
    private $segOb;
    private $venSegOb;
    private $segAd;
    private $kilometraje;
    private $cantidad;
    private $clase;
   
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

    function getAnio() {
        return $this->anio;
    }

    function getVenRevTec() {
        return $this->venRevTec;
    }

    function getSegOb() {
        return $this->segOb;
    }

    function getVenSegOb() {
        return $this->venSegOb;
    }

    function getSegAd() {
        return $this->segAd;
    }

    function getKilometraje() {
        return $this->kilometraje;
    }

    function getCantidad() {
        return $this->cantidad;
    }

    function getClase() {
        return $this->clase;
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

    function setAnio($anio) {
        $this->anio = $anio;
    }

    function setVenRevTec($venRevTec) {
        $this->venRevTec = $venRevTec;
    }

    function setSegOb($segOb) {
        $this->segOb = $segOb;
    }

    function setVenSegOb($venSegOb) {
        $this->venSegOb = $venSegOb;
    }

    function setSegAd($segAd) {
        $this->segAd = $segAd;
    }

    function setKilometraje($kilometraje) {
        $this->kilometraje = $kilometraje;
    }

    function setCantidad($cantidad) {
        $this->cantidad = $cantidad;
    }

    function setClase($clase) {
        $this->clase = $clase;
    }


}
