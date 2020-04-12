<?php

class Solicitud {
    private $id;
    private $tipo;
    private $solicitante;
    
    public static $CLAVE_ADMINISTRADOR = 0;
    
    function getId() {
        return $this->id;
    }

    function getTipo() {
        return $this->tipo;
    }

    function getSolicitante() {
        return $this->solicitante;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    function setSolicitante($solicitante) {
        $this->solicitante = $solicitante;
    }


}
