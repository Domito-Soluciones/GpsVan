<?php
include '../../util/validarPeticion.php';

class Usuario {
    private $id;
    private $nombre;
    private $direccion;
    private $celular;
    private $cliente;
    
    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getDireccion() {
        return $this->direccion;
    }

    function getCelular() {
        return $this->celular;
    }

    function getCliente() {
        return $this->cliente;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    function setCelular($celular) {
        $this->celular = $celular;
    }

    function setCliente($cliente) {
        $this->cliente = $cliente;
    }


}