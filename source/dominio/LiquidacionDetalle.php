<?php

class LiquidacionDetalle {
    private $item;
    private $valor;
    private $tipo;
    
    function getItem() {
        return $this->item;
    }

    function getValor() {
        return $this->valor;
    }

    function getTipo() {
        return $this->tipo;
    }

    function setItem($item) {
        $this->item = $item;
    }

    function setValor($valor) {
        $this->valor = $valor;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
    }


}
