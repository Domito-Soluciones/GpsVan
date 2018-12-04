<?php
include '../../util/validarPeticion.php';

class Transportista {
    private $id;
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



}
