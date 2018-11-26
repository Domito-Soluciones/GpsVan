<?php
include '../../util/validarPeticion.php';

class Usuario {
    private $id;
    private $nombre;
    private $direccion;
    private $celular;
    private $cliente;
    private $nick;
    private $password;
    private $estado;
    
    
    function getNick() {
        return $this->nick;
    }

    function getPassword() {
        return $this->password;
    }

    function getEstado() {
        return $this->estado;
    }

    function setNick($nick) {
        $this->nick = $nick;
    }

    function setPassword($password) {
        $this->password = $password;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

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