<?php

class ServicioPasajero {
    private $id;
    private $pasajero;
    private $destino;
    private $hora;
    private $estado;
    
    function getId() {
        return $this->id;
    }

    function getPasajero() {
        return $this->pasajero;
    }

    function getDestino() {
        return $this->destino;
    }

    function getHora() {
        return $this->hora;
    }

    function getEstado() {
        return $this->estado;
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

    function setHora($hora) {
        $this->hora = $hora;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }


}
