<?php

class Servicio {
    private $id;
    private $partida;
    private $partidaId;
    private $destino;
    private $destinoId;
    private $cliente;
    private $usuario_id;
    private $usuario_nombre;
    private $usuario_direccion;
    private $usuario_celular;
    private $transportista;
    private $movil;
    private $tipo;
    private $tarifa;
    private $agente;
    private $fecha;
    function getId() {
        return $this->id;
    }

    function getPartida() {
        return $this->partida;
    }

    function getPartidaId() {
        return $this->partidaId;
    }

    function getDestino() {
        return $this->destino;
    }

    function getDestinoId() {
        return $this->destinoId;
    }

    function getCliente() {
        return $this->cliente;
    }

    function getUsuario_id() {
        return $this->usuario_id;
    }

    function getUsuario_nombre() {
        return $this->usuario_nombre;
    }

    function getUsuario_direccion() {
        return $this->usuario_direccion;
    }

    function getUsuario_celular() {
        return $this->usuario_celular;
    }

    function getTransportista() {
        return $this->transportista;
    }

    function getMovil() {
        return $this->movil;
    }

    function getTipo() {
        return $this->tipo;
    }

    function getTarifa() {
        return $this->tarifa;
    }

    function getAgente() {
        return $this->agente;
    }

    function getFecha() {
        return $this->fecha;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setPartida($partida) {
        $this->partida = $partida;
    }

    function setPartidaId($partidaId) {
        $this->partidaId = $partidaId;
    }

    function setDestino($destino) {
        $this->destino = $destino;
    }

    function setDestinoId($destinoId) {
        $this->destinoId = $destinoId;
    }

    function setCliente($cliente) {
        $this->cliente = $cliente;
    }

    function setUsuario_id($usuario_id) {
        $this->usuario_id = $usuario_id;
    }

    function setUsuario_nombre($usuario_nombre) {
        $this->usuario_nombre = $usuario_nombre;
    }

    function setUsuario_direccion($usuario_direccion) {
        $this->usuario_direccion = $usuario_direccion;
    }

    function setUsuario_celular($usuario_celular) {
        $this->usuario_celular = $usuario_celular;
    }

    function setTransportista($transportista) {
        $this->transportista = $transportista;
    }

    function setMovil($movil) {
        $this->movil = $movil;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    function setTarifa($tarifa) {
        $this->tarifa = $tarifa;
    }

    function setAgente($agente) {
        $this->agente = $agente;
    }

    function setFecha($fecha) {
        $this->fecha = $fecha;
    }

   
}
