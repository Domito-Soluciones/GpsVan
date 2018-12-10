<?php

class Tarifa {
    private $id;
    private $nombre;
    private $origen;
    private $destino;
    private $valor1;
    private $valor2;
    
    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getOrigen() {
        return $this->origen;
    }

    function getDestino() {
        return $this->destino;
    }

    function getValor1() {
        return $this->valor1;
    }

    function getValor2() {
        return $this->valor2;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setOrigen($origen) {
        $this->origen = $origen;
    }

    function setDestino($destino) {
        $this->destino = $destino;
    }

    function setValor1($valor1) {
        $this->valor1 = $valor1;
    }

    function setValor2($valor2) {
        $this->valor2 = $valor2;
    }


}
