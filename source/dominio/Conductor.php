<?php

class Conductor {
    private $id;
    private $nombre;
    private $papellido;
    private $mapellido;
    private $rut;
    private $telefono;
    private $celular;
    private $direccion;
    private $mail;
    private $tipoLicencia;
    private $nacimiento;
    private $renta;
    private $contrato;
    private $afp;
    private $isapre;
    private $mutual;
    private $seguroInicio;
    private $seguroRenovacion;
    private $descuento;
    private $anticipo;
    
    function getId() {
        return $this->id;
    }
    
    function getNombre() {
        return $this->nombre;
    }

    function getPapellido() {
        return $this->papellido;
    }

    function getMapellido() {
        return $this->mapellido;
    }

    function getRut() {
        return $this->rut;
    }

    function getTelefono() {
        return $this->telefono;
    }

    function getCelular() {
        return $this->celular;
    }

    function getDireccion() {
        return $this->direccion;
    }

    function getMail() {
        return $this->mail;
    }

    function getTipoLicencia() {
        return $this->tipoLicencia;
    }

    function getNacimiento() {
        return $this->nacimiento;
    }

    function getRenta() {
        return $this->renta;
    }

    function getContrato() {
        return $this->contrato;
    }

    function getAfp() {
        return $this->afp;
    }

    function getIsapre() {
        return $this->isapre;
    }

    function getMutual() {
        return $this->mutual;
    }

    function getSeguroInicio() {
        return $this->seguroInicio;
    }

    function getSeguroRenovacion() {
        return $this->seguroRenovacion;
    }

    function getDescuento() {
        return $this->descuento;
    }

    function getAnticipo() {
        return $this->anticipo;
    }
    
    function setId($id) {
        $this->id = $id;
    }
    
    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setPapellido($papellido) {
        $this->papellido = $papellido;
    }

    function setMapellido($mapellido) {
        $this->mapellido = $mapellido;
    }

    function setRut($rut) {
        $this->rut = $rut;
    }

    function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    function setCelular($celular) {
        $this->celular = $celular;
    }

    function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    function setMail($mail) {
        $this->mail = $mail;
    }

    function setTipoLicencia($tipoLicencia) {
        $this->tipoLicencia = $tipoLicencia;
    }

    function setNacimiento($nacimiento) {
        $this->nacimiento = $nacimiento;
    }

    function setRenta($renta) {
        $this->renta = $renta;
    }

    function setContrato($contrato) {
        $this->contrato = $contrato;
    }

    function setAfp($afp) {
        $this->afp = $afp;
    }

    function setIsapre($isapre) {
        $this->isapre = $isapre;
    }

    function setMutual($mutual) {
        $this->mutual = $mutual;
    }

    function setSeguroInicio($seguroInicio) {
        $this->seguroInicio = $seguroInicio;
    }

    function setSeguroRenovacion($seguroRenovacion) {
        $this->seguroRenovacion = $seguroRenovacion;
    }

    function setDescuento($descuento) {
        $this->descuento = $descuento;
    }

    function setAnticipo($anticipo) {
        $this->anticipo = $anticipo;
    }


}
