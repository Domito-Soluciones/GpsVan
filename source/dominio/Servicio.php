<?php
include '../../util/validarPeticion.php';

class Servicio {
    private $id;
    private $partida;
    private $horaPartida;
    private $destinoInt1;
    private $horaDestinoInt1;
    private $destinoInt2;
    private $horaDestinoInt2;
    private $destinoInt3;
    private $horaDestinoInt3;
    private $destinoFinal;
    private $horaDestinoFinal;
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
    private $estado;
    
    function getId() {
        return $this->id;
    }

    function getPartida() {
        return $this->partida;
    }

    function getHoraPartida() {
        return $this->horaPartida;
    }

    function getDestinoInt1() {
        return $this->destinoInt1;
    }

    function getHoraDestinoInt1() {
        return $this->horaDestinoInt1;
    }

    function getDestinoInt2() {
        return $this->destinoInt2;
    }

    function getHoraDestinoInt2() {
        return $this->horaDestinoInt2;
    }

    function getDestinoInt3() {
        return $this->destinoInt3;
    }

    function getHoraDestinoInt3() {
        return $this->horaDestinoInt3;
    }

    function getDestinoFinal() {
        return $this->destinoFinal;
    }

    function getHoraDestinoFinal() {
        return $this->horaDestinoFinal;
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

    function getEstado() {
        return $this->estado;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setPartida($partida) {
        $this->partida = $partida;
    }

    function setHoraPartida($horaPartida) {
        $this->horaPartida = $horaPartida;
    }

    function setDestinoInt1($destinoInt1) {
        $this->destinoInt1 = $destinoInt1;
    }

    function setHoraDestinoInt1($horaDestinoInt1) {
        $this->horaDestinoInt1 = $horaDestinoInt1;
    }

    function setDestinoInt2($destinoInt2) {
        $this->destinoInt2 = $destinoInt2;
    }

    function setHoraDestinoInt2($horaDestinoInt2) {
        $this->horaDestinoInt2 = $horaDestinoInt2;
    }

    function setDestinoInt3($destinoInt3) {
        $this->destinoInt3 = $destinoInt3;
    }

    function setHoraDestinoInt3($horaDestinoInt3) {
        $this->horaDestinoInt3 = $horaDestinoInt3;
    }

    function setDestinoFinal($destinoFinal) {
        $this->destinoFinal = $destinoFinal;
    }

    function setHoraDestinoFinal($horaDestinoFinal) {
        $this->horaDestinoFinal = $horaDestinoFinal;
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

    function setEstado($estado) {
        $this->estado = $estado;
    }


}
