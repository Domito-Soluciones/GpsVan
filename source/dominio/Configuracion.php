<?php

class Configuracion {
    private $id;
    private $dato;
    private $valor;
    
    function getId() {
        return $this->id;
    }

    function getDato() {
        return $this->dato;
    }

    function getValor() {
        return $this->valor;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setDato($dato) {
        $this->dato = $dato;
    }

    function setValor($valor) {
        $this->valor = $valor;
    }

    function toString(){
        return "Configuracion{" . "id=" . $this->id . ", dato=" . $this->dato . ", valor=" . $this->valor . '}';
    }

}
