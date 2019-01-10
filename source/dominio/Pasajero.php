<?php
include '../../util/validarPeticion.php';

class Pasajero {
    private $id;
    private $nombre;
    private $papellido;
    private $mapellido;
    private $rut;
    private $nick;
    private $password;
    private $telefono;
    private $celular;
    private $direccion;
    private $mail;
    private $cargo;
    private $nivel;
    private $estado;
    private $cliente;
    private $centroCosto;
    private $empresa;
    private $ruta;
    
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

    function getNick() {
        return $this->nick;
    }

    function getPassword() {
        return $this->password;
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

    function getCargo() {
        return $this->cargo;
    }

    function getNivel() {
        return $this->nivel;
    }

    function getEstado() {
        return $this->estado;
    }

    function getCliente() {
        return $this->cliente;
    }

    function getCentroCosto() {
        return $this->centroCosto;
    }

    function getEmpresa() {
        return $this->empresa;
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

    function setPapellido($papellido) {
        $this->papellido = $papellido;
    }

    function setMapellido($mapellido) {
        $this->mapellido = $mapellido;
    }

    function setRut($rut) {
        $this->rut = $rut;
    }

    function setNick($nick) {
        $this->nick = $nick;
    }

    function setPassword($password) {
        $this->password = $password;
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

    function setCargo($cargo) {
        $this->cargo = $cargo;
    }

    function setNivel($nivel) {
        $this->nivel = $nivel;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setCliente($cliente) {
        $this->cliente = $cliente;
    }

    function setCentroCosto($centroCosto) {
        $this->centroCosto = $centroCosto;
    }

    function setEmpresa($empresa) {
        $this->empresa = $empresa;
    }

    function setRuta($ruta) {
        $this->ruta = $ruta;
    }



}