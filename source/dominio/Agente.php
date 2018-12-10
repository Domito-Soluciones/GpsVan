<?php
include '../../util/validarPeticion.php';

class Agente {
    private $id;
    private $nombre;
    private $apellidoPat;
    private $apellidoMat;
    private $rut;
    private $nick;
    private $clave;
    private $telefono;
    private $celular;
    private $direccion;
    private $mail;
    private $cargo;
    private $perfil;

    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getApellidoPat() {
        return $this->apellidoPat;
    }

    function getApellidoMat() {
        return $this->apellidoMat;
    }

    function getRut() {
        return $this->rut;
    }

    function getNick() {
        return $this->nick;
    }

    function getClave() {
        return $this->clave;
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

    function getPerfil() {
        return $this->perfil;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setApellidoPat($apellidoPat) {
        $this->apellidoPat = $apellidoPat;
    }

    function setApellidoMat($apellidoMat) {
        $this->apellidoMat = $apellidoMat;
    }

    function setRut($rut) {
        $this->rut = $rut;
    }

    function setNick($nick) {
        $this->nick = $nick;
    }

    function setClave($clave) {
        $this->clave = $clave;
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

    function setPerfil($perfil) {
        $this->perfil = $perfil;
    }



}
