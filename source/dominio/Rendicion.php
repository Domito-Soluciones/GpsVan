<?php

class Rendicion {
    private $id;
    private $conductor;
    private $dato;
    private $valor;
    private $fecha;
    private $tipo;
    
    function getId() {
        return $this->id;
    }

    function getConductor() {
        return $this->conductor;
    }

    function getDato() {
        return $this->dato;
    }

    function getValor() {
        return $this->valor;
    }

    function getFecha() {
        return $this->fecha;
    }

    function getTipo() {
        return $this->tipo;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setConductor($conductor) {
        $this->conductor = $conductor;
    }

    function setDato($dato) {
        $this->dato = $dato;
    }

    function setValor($valor) {
        $this->valor = $valor;
    }

    function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
    }



    
}
