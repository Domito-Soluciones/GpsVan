<?php

class Liquidacion {
    private $mes;
    private $anio;
    private $idConductor;
    private $rutConductor;
    private $nombreConductor;
    private $produccionBruta;
    private $participacion;
    private $produccionLiquida;
    private $totalDescuentos;
    private $totalRendiciones;
    private $liquidoPagar;
    
    function getMes() {
        return $this->mes;
    }

    function getAnio() {
        return $this->anio;
    }

    function getIdConductor() {
        return $this->idConductor;
    }

    function getRutConductor() {
        return $this->rutConductor;
    }

    function getNombreConductor() {
        return $this->nombreConductor;
    }

    function getProduccionBruta() {
        return $this->produccionBruta;
    }

    function getParticipacion() {
        return $this->participacion;
    }

    function getProduccionLiquida() {
        return $this->produccionLiquida;
    }

    function getTotalDescuentos() {
        return $this->totalDescuentos;
    }

    function getTotalRendiciones() {
        return $this->totalRendiciones;
    }

    function getLiquidoPagar() {
        return $this->liquidoPagar;
    }

    function setMes($mes) {
        $this->mes = $mes;
    }

    function setAnio($anio) {
        $this->anio = $anio;
    }

    function setIdConductor($idConductor) {
        $this->idConductor = $idConductor;
    }

    function setRutConductor($rutConductor) {
        $this->rutConductor = $rutConductor;
    }

    function setNombreConductor($nombreConductor) {
        $this->nombreConductor = $nombreConductor;
    }

    function setProduccionBruta($produccionBruta) {
        $this->produccionBruta = $produccionBruta;
    }

    function setParticipacion($participacion) {
        $this->participacion = $participacion;
    }

    function setProduccionLiquida($produccionLiquida) {
        $this->produccionLiquida = $produccionLiquida;
    }

    function setTotalDescuentos($totalDescuentos) {
        $this->totalDescuentos = $totalDescuentos;
    }

    function setTotalRendiciones($totalRendiciones) {
        $this->totalRendiciones = $totalRendiciones;
    }

    function setLiquidoPagar($liquidoPagar) {
        $this->liquidoPagar = $liquidoPagar;
    }


    
}
