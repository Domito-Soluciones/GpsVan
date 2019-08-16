<?php
include '../../util/validarPeticion.php';

class Cliente {
    private $id;
    private $razon;
    private $tipo;
    private $rut;
    private $direccion;
    private $nombreContacto;
    private $fonoContacto;
    private $mailContacto;
    private $mailFacturacion; 
    private $contrato;
    private $grupo;
    private $color;
    
    function getId() {
        return $this->id;
    }

    function getRazon() {
        return $this->razon;
    }

    function getTipo() {
        return $this->tipo;
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

    function getContrato() {
        return $this->contrato;
    }

    function getGrupo() {
        return $this->grupo;
    }

    function getColor() {
        return $this->color;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setRazon($razon) {
        $this->razon = $razon;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
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

    function setContrato($contrato) {
        $this->contrato = $contrato;
    }

    function setGrupo($grupo) {
        $this->grupo = $grupo;
    }

    function setColor($color) {
        $this->color = $color;
    }

    
    function toString() {
        return "Cliente{" . "id=" . $this->id . ", razon=" . $this->razon . ", tipo=" . $this->tipo . ", rut=" . $this->rut . ", direccion=" .
        $this->direccion . ", nombreContacto=" . $this->nombreContacto . ", fonoContacto=" . $this->fonoContacto . ", mailContacto=" .
        $this->mailContacto . ", mailFacturacion=" . $this->mailFacturacion . ", contrato=" . $this->contrato . ", grupo=" . $this->grupo .
        ", color=" . $this->color . '}';
    }
}

