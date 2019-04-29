<?php

class Notificacion {
    private $id;
    private $texto;
    private $estado;
    private $tipo;
    private $llave;
    private $fecha;
    private $idServicio;
    
    function getId() {
        return $this->id;
    }

    function getTexto() {
        return $this->texto;
    }

    function getEstado() {
        return $this->estado;
    }

    function getTipo() {
        return $this->tipo;
    }

    function getLlave() {
        return $this->llave;
    }

    function getFecha() {
        return $this->fecha;
    }

    function getIdServicio() {
        return $this->idServicio;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setTexto($texto) {
        $this->texto = $texto;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    function setLlave($llave) {
        $this->llave = $llave;
    }

    function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    function setIdServicio($idServicio) {
        $this->idServicio = $idServicio;
    }

}
