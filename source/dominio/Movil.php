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



}
