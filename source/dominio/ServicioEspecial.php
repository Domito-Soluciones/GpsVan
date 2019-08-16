<?php
include '../../util/validarPeticion.php';

class ServicioEspecial {
    private $id;
    private $partida;
    private $destino;
    private $pasajero;
    private $celular;
    private $fecha;
    private $hora;
    private $movil;
    private $conductor;
    private $tarifa;
    private $observaciones;
    private $agente;
    private $estado;
    
    function getId() {
        return $this->id;
    }

    function getPartida() {
        return $this->partida;
    }

    function getDestino() {
        return $this->destino;
    }

    function getPasajero() {
        return $this->pasajero;
    }

    function getCelular() {
        return $this->celular;
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

    function getTarifa() {
        return $this->tarifa;
    }

    function getObservaciones() {
        return $this->observaciones;
    }

    function getAgente() {
        return $this->agente;
    }

    function getEstado() {
        return $this->estado;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setPartida($partida) {
        $this->partida = $partida;
    }

    function setDestino($destino) {
        $this->destino = $destino;
    }

    function setPasajero($pasajero) {
        $this->pasajero = $pasajero;
    }

    function setCelular($celular) {
        $this->celular = $celular;
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

    function setTarifa($tarifa) {
        $this->tarifa = $tarifa;
    }

    function setObservaciones($observaciones) {
        $this->observaciones = $observaciones;
    }

    function setAgente($agente) {
        $this->agente = $agente;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function toString() {
        return "ServicioEspecial{" . "id=" . $this->id . ", partida=" . $this->partida . ", destino=" . $this->destino . ", pasajero=" . $this->pasajero . ", celular=" . $this->celular . ", fecha=" . $this->fecha . ", hora=" . $this->hora . ", movil=" . $this->movil . ", conductor=" . $this->conductor . ", tarifa=" . $this->tarifa . ", observaciones=" . $this->observaciones . ", agente=" . $this->agente . ", estado=" . $this->estado . '}';
    }
    
}
