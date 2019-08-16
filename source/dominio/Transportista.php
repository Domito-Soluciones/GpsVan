<?php
include '../../util/validarPeticion.php';

class Transportista {
    private $id;
    private $nombre;
    private $razon;
    private $rut;
    private $direccion;
    private $nombreContacto;
    private $fonoContacto;
    private $mailContacto;
    private $mailFacturacion;
    
    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getRazon() {
        return $this->razon;
    }

    function getRut() {
        return $this->rut;
    }

    function getDireccion() {
        return $this->direccion;
    }

    function getNombreContacto() {
        return $this->nombreContacto;
    }

    function getFonoContacto() {
        return $this->fonoContacto;
    }

    function getMailContacto() {
        return $this->mailContacto;
    }

    function getMailFacturacion() {
        return $this->mailFacturacion;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setRazon($razon) {
        $this->razon = $razon;
    }

    function setRut($rut) {
        $this->rut = $rut;
    }

    function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    function setNombreContacto($nombreContacto) {
        $this->nombreContacto = $nombreContacto;
    }

    function setFonoContacto($fonoContacto) {
        $this->fonoContacto = $fonoContacto;
    }

    function setMailContacto($mailContacto) {
        $this->mailContacto = $mailContacto;
    }

    function setMailFacturacion($mailFacturacion) {
        $this->mailFacturacion = $mailFacturacion;
    }

    function toString() {
        return "Transportista{" . "id=" . $this->id . ", nombre=" . $this->nombre . ", razon=" . $this->razon . ", rut=" . $this->rut .
        ", direccion=" . $this->direccion . ", nombreContacto=" . $this->nombreContacto . ", fonoContacto=" . $this->fonoContacto .
        ", mailContacto=" . $this->mailContacto . ", mailFacturacion=" . $this->mailFacturacion . '}';
    }

}
