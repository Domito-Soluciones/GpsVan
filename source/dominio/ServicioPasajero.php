<?php

class ServicioPasajero {
    private $id;
    private $pasajero;
    private $destino;
    private $latDestino;
    private $lonDestino;
    private $hora;
    private $estado;
    private $estadoCancelacion;
    private $centroCosto;
    private $tarifa;
    
    function getId() {
        return $this->id;
    }

    function getPasajero() {
        return $this->pasajero;
    }

    function getDestino() {
        return $this->destino;
    }

    function getLatDestino() {
        return $this->latDestino;
    }

    function getLonDestino() {
        return $this->lonDestino;
    }

    function getHora() {
        return $this->hora;
    }

    function getEstado() {
        return $this->estado;
    }

    function getEstadoCancelacion() {
        return $this->estadoCancelacion;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setPasajero($pasajero) {
        $this->pasajero = $pasajero;
    }

    function setDestino($destino) {
        $this->destino = $destino;
    }

    function setLatDestino($latDestino) {
        $this->latDestino = $latDestino;
    }

    function setLonDestino($lonDestino) {
        $this->lonDestino = $lonDestino;
    }

    function setHora($hora) {
        $this->hora = $hora;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setEstadoCancelacion($estadoCancelacion) {
        $this->estadoCancelacion = $estadoCancelacion;
    }
    
    function getCentroCosto() {
        return $this->centroCosto;
    }

    function getTarifa() {
        return $this->tarifa;
    }

    function setCentroCosto($centroCosto) {
        $this->centroCosto = $centroCosto;
    }

    function setTarifa($tarifa) {
        $this->tarifa = $tarifa;
    }

        
    function toString() {
        return "ServicioPasajero{" . "id=" . $this->id . ", pasajero=" . $this->pasajero . ", destino=" . $this->destino .
        ", latDestino=" . $this->latDestino . ", lonDestino=" . $this->lonDestino . ", hora=" . $this->hora . ", estado=" .
        $this->estado . ", estadoCancelacion=" . $this->estadoCancelacion . '}';
    }
    

}
