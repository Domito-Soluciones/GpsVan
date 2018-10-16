<?php

class Movil {
    private $id;
    private $nombre;
    private $transportista;
    private $estado;
    private $lat;
    private $lon;
    private $servicio;
    
    function getId() {
        return $this->id;
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

    function getServicio() {
        return $this->servicio;
    }

    function setId($id) {
        $this->id = $id;
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

    function setServicio($servicio) {
        $this->servicio = $servicio;
    }


}
