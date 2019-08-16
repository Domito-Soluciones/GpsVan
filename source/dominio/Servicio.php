<?php
include '../../util/validarPeticion.php';

class Servicio {
    private $id;
    private $cliente;
    private $clienteDireccion;
    private $ruta;
    private $truta;
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
    private $observacionesAdicionales;
    private $pasajero;
    private $destino;
    private $tipo;
    
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

    function getTruta() {
        return $this->truta;
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

    function getObservacionesAdicionales() {
        return $this->observacionesAdicionales;
    }

    function getPasajero() {
        return $this->pasajero;
    }

    function getDestino() {
        return $this->destino;
    }

    function getTipo() {
        return $this->tipo;
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

    function setTruta($truta) {
        $this->truta = $truta;
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

    function setObservacionesAdicionales($observacionesAdicionales) {
        $this->observacionesAdicionales = $observacionesAdicionales;
    }

    function setPasajero($pasajero) {
        $this->pasajero = $pasajero;
    }

    function setDestino($destino) {
        $this->destino = $destino;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    function toString() {
        return "Servicio{" . "id=" . $this->id . ", cliente=" . $this->cliente . ", clienteDireccion=" . $this->clienteDireccion .
        ", ruta=" . $this->ruta . ", truta=" . $this->truta . ", fecha=" . $this->fecha . ", hora=" . $this->hora . ", movil=" . $this->movil .
        ", conductor=" . $this->conductor . ", movilLat=" . $this->movilLat . ", movilLon=" . $this->movilLon . ", tarifa1=" . $this->tarifa1 .
        ", tarifa2=" . $this->tarifa2 . ", agente=" . $this->agente . ", estado=" . $this->estado . ", observaciones=" . $this->observaciones .
        ", observacionesAdicionales=" . $this->observacionesAdicionales . ", pasajero=" . $this->pasajero . ", destino=" . $this->destino .
        ", tipo=" . $this->tipo . '}';
    }

}
