<?php

class Tarifa {
    private $id;
    private $nombre;
    private $origen;
    private $destino;
    private $valor1;
    private $valor2;
    private $cliente;
    private $ruta;
    
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

    function getCliente() {
        return $this->cliente;
    }

    function getRuta() {
        return $this->ruta;
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

    function setCliente($cliente) {
        $this->cliente = $cliente;
    }

    function setRuta($ruta) {
        $this->ruta = $ruta;
    }



}
