<?php

class Servicio {
    private $id;
    private $partida;
    private $partidaId;
    private $destino;
    private $destinoId;
    private $cliente;
    private $usuario;
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

    function getUsuario() {
        return $this->usuario;
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

    function setUsuario($usuario) {
        $this->usuario = $usuario;
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
