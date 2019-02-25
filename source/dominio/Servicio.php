<?php
include '../../util/validarPeticion.php';

class Servicio {
    private $id;
    private $cliente;
    private $clienteDireccion;
    private $ruta;
    private $fecha;
    private $hora;
    private $movil;
    private $conductor;
    private $movilLat;
    private $movilLon;
    private $tarifa1;
    private $tarifa2;
    private $agente;
    private $estado;
    private $observaciones;
    private $pasajero;
    private $destino;
    
    function getId() {
        return $this->id;
    }

    function getCliente() {
        return $this->cliente;
    }

    function getClienteDireccion() {
        return $this->clienteDireccion;
    }

    function getRuta() {
        return $this->ruta;
    }

    function getFecha() {
        return $this->fecha;
    }

    function getHora() {
        return $this->hora;
    }

    function getMovil() {
        return $this->movil;
    }

    function getConductor() {
        return $this->conductor;
    }

    function getMovilLat() {
        return $this->movilLat;
    }

    function getMovilLon() {
        return $this->movilLon;
    }

    function getTarifa1() {
        return $this->tarifa1;
    }

    function getTarifa2() {
        return $this->tarifa2;
    }

    function getAgente() {
        return $this->agente;
    }

    function getEstado() {
        return $this->estado;
    }

    function getObservaciones() {
        return $this->observaciones;
    }

    function getPasajero() {
        return $this->pasajero;
    }

    function getDestino() {
        return $this->destino;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setCliente($cliente) {
        $this->cliente = $cliente;
    }

    function setClienteDireccion($clienteDireccion) {
        $this->clienteDireccion = $clienteDireccion;
    }

    function setRuta($ruta) {
        $this->ruta = $ruta;
    }

    function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    function setHora($hora) {
        $this->hora = $hora;
    }

    function setMovil($movil) {
        $this->movil = $movil;
    }

    function setConductor($conductor) {
        $this->conductor = $conductor;
    }

    function setMovilLat($movilLat) {
        $this->movilLat = $movilLat;
    }

    function setMovilLon($movilLon) {
        $this->movilLon = $movilLon;
    }

    function setTarifa1($tarifa1) {
        $this->tarifa1 = $tarifa1;
    }

    function setTarifa2($tarifa2) {
        $this->tarifa2 = $tarifa2;
    }

    function setAgente($agente) {
        $this->agente = $agente;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setObservaciones($observaciones) {
        $this->observaciones = $observaciones;
    }

    function setPasajero($pasajero) {
        $this->pasajero = $pasajero;
    }

    function setDestino($destino) {
        $this->destino = $destino;
    }



}
