<?php
include '../../util/validarPeticion.php';

class Movil {
    private $id;
    private $patente;
    private $marca;
    private $modelo;
    private $nombre;
    private $anio;
    private $color;
    private $cantidad;
    private $clase;
    private $conductor;
    private $conductorNombre;
    private $conductorNick;
    private $gps;
    private $celular;
    private $app;
    private $tipo;
    private $venPerCir;
    private $venRevTec;
    private $venExt;
    private $kilometraje;
    private $motor;
    private $chasis;
    private $segOb;
    private $venSegOb;
    private $transportista;
    private $estado;
    private $lat;
    private $lon;
    private $ultimaAsignacion;
    private $servicio;
    private $polizaSegOb;
    private $valorSegOb;
    private $segRcDm;
    private $venSegRcDm;
    private $polizaSegRcDm;
    private $valorSegRcDm;
    private $segRcExceso;
    private $venSegRcExceso;
    private $polizaSegRcExceso;
    private $valorSegRcExceso;
    private $segAs;
    private $venSegAs;
    private $polizaSegAs;
    private $valorSegAs;
    private $adjuntoPerCir;
    private $adjuntoRevTec;
    private $adjuntoNMotor;
    private $adjuntoSeremi;
    private $adjuntoSegOb;
    private $adjuntoSegRcDm;
    private $adjuntoSegAsiento;
    private $adjuntoSegRcExceso;
    private $nombreEmpresa;
    private $colorEmpresa;
    private $servicioEstado;
    
    function getId() {
        return $this->id;
    }

    function getPatente() {
        return $this->patente;
    }

    function getMarca() {
        return $this->marca;
    }

    function getModelo() {
        return $this->modelo;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getAnio() {
        return $this->anio;
    }

    function getColor() {
        return $this->color;
    }

    function getCantidad() {
        return $this->cantidad;
    }

    function getClase() {
        return $this->clase;
    }

    function getConductor() {
        return $this->conductor;
    }

    function getConductorNombre() {
        return $this->conductorNombre;
    }

    function getConductorNick() {
        return $this->conductorNick;
    }

    function getGps() {
        return $this->gps;
    }

    function getCelular() {
        return $this->celular;
    }

    function getApp() {
        return $this->app;
    }

    function getTipo() {
        return $this->tipo;
    }

    function getVenPerCir() {
        return $this->venPerCir;
    }

    function getVenRevTec() {
        return $this->venRevTec;
    }

    function getVenExt() {
        return $this->venExt;
    }

    function getKilometraje() {
        return $this->kilometraje;
    }

    function getMotor() {
        return $this->motor;
    }

    function getChasis() {
        return $this->chasis;
    }

    function getSegOb() {
        return $this->segOb;
    }

    function getVenSegOb() {
        return $this->venSegOb;
    }

    function getTransportista() {
        return $this->transportista;
    }

    function getEstado() {
        return $this->estado;
    }

    function getLat() {
        return $this->lat;
    }

    function getLon() {
        return $this->lon;
    }

    function getUltimaAsignacion() {
        return $this->ultimaAsignacion;
    }

    function getServicio() {
        return $this->servicio;
    }

    function getPolizaSegOb() {
        return $this->polizaSegOb;
    }

    function getValorSegOb() {
        return $this->valorSegOb;
    }

    function getSegRcDm() {
        return $this->segRcDm;
    }

    function getVenSegRcDm() {
        return $this->venSegRcDm;
    }

    function getPolizaSegRcDm() {
        return $this->polizaSegRcDm;
    }

    function getValorSegRcDm() {
        return $this->valorSegRcDm;
    }

    function getSegRcExceso() {
        return $this->segRcExceso;
    }

    function getVenSegRcExceso() {
        return $this->venSegRcExceso;
    }

    function getPolizaSegRcExceso() {
        return $this->polizaSegRcExceso;
    }

    function getValorSegRcExceso() {
        return $this->valorSegRcExceso;
    }

    function getSegAs() {
        return $this->segAs;
    }

    function getVenSegAs() {
        return $this->venSegAs;
    }

    function getPolizaSegAs() {
        return $this->polizaSegAs;
    }

    function getValorSegAs() {
        return $this->valorSegAs;
    }

    function getAdjuntoPerCir() {
        return $this->adjuntoPerCir;
    }

    function getAdjuntoRevTec() {
        return $this->adjuntoRevTec;
    }

    function getAdjuntoNMotor() {
        return $this->adjuntoNMotor;
    }

    function getAdjuntoSeremi() {
        return $this->adjuntoSeremi;
    }

    function getAdjuntoSegOb() {
        return $this->adjuntoSegOb;
    }

    function getAdjuntoSegRcDm() {
        return $this->adjuntoSegRcDm;
    }

    function getAdjuntoSegAsiento() {
        return $this->adjuntoSegAsiento;
    }

    function getAdjuntoSegRcExceso() {
        return $this->adjuntoSegRcExceso;
    }

    function getNombreEmpresa() {
        return $this->nombreEmpresa;
    }
    
    function getColorEmpresa() {
        return $this->colorEmpresa;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setPatente($patente) {
        $this->patente = $patente;
    }

    function setMarca($marca) {
        $this->marca = $marca;
    }

    function setModelo($modelo) {
        $this->modelo = $modelo;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setAnio($anio) {
        $this->anio = $anio;
    }

    function setColor($color) {
        $this->color = $color;
    }

    function setCantidad($cantidad) {
        $this->cantidad = $cantidad;
    }

    function setClase($clase) {
        $this->clase = $clase;
    }

    function setConductor($conductor) {
        $this->conductor = $conductor;
    }

    function setConductorNombre($conductorNombre) {
        $this->conductorNombre = $conductorNombre;
    }

    function setConductorNick($conductorNick) {
        $this->conductorNick = $conductorNick;
    }

    function setGps($gps) {
        $this->gps = $gps;
    }

    function setCelular($celular) {
        $this->celular = $celular;
    }

    function setApp($app) {
        $this->app = $app;
    }

    function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    function setVenPerCir($venPerCir) {
        $this->venPerCir = $venPerCir;
    }

    function setVenRevTec($venRevTec) {
        $this->venRevTec = $venRevTec;
    }

    function setVenExt($venExt) {
        $this->venExt = $venExt;
    }

    function setKilometraje($kilometraje) {
        $this->kilometraje = $kilometraje;
    }

    function setMotor($motor) {
        $this->motor = $motor;
    }

    function setChasis($chasis) {
        $this->chasis = $chasis;
    }

    function setSegOb($segOb) {
        $this->segOb = $segOb;
    }

    function setVenSegOb($venSegOb) {
        $this->venSegOb = $venSegOb;
    }

    function setTransportista($transportista) {
        $this->transportista = $transportista;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    function setLat($lat) {
        $this->lat = $lat;
    }

    function setLon($lon) {
        $this->lon = $lon;
    }

    function setUltimaAsignacion($ultimaAsignacion) {
        $this->ultimaAsignacion = $ultimaAsignacion;
    }

    function setServicio($servicio) {
        $this->servicio = $servicio;
    }

    function setPolizaSegOb($polizaSegOb) {
        $this->polizaSegOb = $polizaSegOb;
    }

    function setValorSegOb($valorSegOb) {
        $this->valorSegOb = $valorSegOb;
    }

    function setSegRcDm($segRcDm) {
        $this->segRcDm = $segRcDm;
    }

    function setVenSegRcDm($venSegRcDm) {
        $this->venSegRcDm = $venSegRcDm;
    }

    function setPolizaSegRcDm($polizaSegRcDm) {
        $this->polizaSegRcDm = $polizaSegRcDm;
    }

    function setValorSegRcDm($valorSegRcDm) {
        $this->valorSegRcDm = $valorSegRcDm;
    }

    function setSegRcExceso($segRcExceso) {
        $this->segRcExceso = $segRcExceso;
    }

    function setVenSegRcExceso($venSegRcExceso) {
        $this->venSegRcExceso = $venSegRcExceso;
    }

    function setPolizaSegRcExceso($polizaSegRcExceso) {
        $this->polizaSegRcExceso = $polizaSegRcExceso;
    }

    function setValorSegRcExceso($valorSegRcExceso) {
        $this->valorSegRcExceso = $valorSegRcExceso;
    }

    function setSegAs($segAs) {
        $this->segAs = $segAs;
    }

    function setVenSegAs($venSegAs) {
        $this->venSegAs = $venSegAs;
    }

    function setPolizaSegAs($polizaSegAs) {
        $this->polizaSegAs = $polizaSegAs;
    }

    function setValorSegAs($valorSegAs) {
        $this->valorSegAs = $valorSegAs;
    }

    function setAdjuntoPerCir($adjuntoPerCir) {
        $this->adjuntoPerCir = $adjuntoPerCir;
    }

    function setAdjuntoRevTec($adjuntoRevTec) {
        $this->adjuntoRevTec = $adjuntoRevTec;
    }

    function setAdjuntoNMotor($adjuntoNMotor) {
        $this->adjuntoNMotor = $adjuntoNMotor;
    }

    function setAdjuntoSeremi($adjuntoSeremi) {
        $this->adjuntoSeremi = $adjuntoSeremi;
    }

    function setAdjuntoSegOb($adjuntoSegOb) {
        $this->adjuntoSegOb = $adjuntoSegOb;
    }

    function setAdjuntoSegRcDm($adjuntoSegRcDm) {
        $this->adjuntoSegRcDm = $adjuntoSegRcDm;
    }

    function setAdjuntoSegAsiento($adjuntoSegAsiento) {
        $this->adjuntoSegAsiento = $adjuntoSegAsiento;
    }

    function setAdjuntoSegRcExceso($adjuntoSegRcExceso) {
        $this->adjuntoSegRcExceso = $adjuntoSegRcExceso;
    }
    
    function setNombreEmpresa($nombreEmpresa) {
        $this->nombreEmpresa = $nombreEmpresa;
    }
    
    function setColorEmpresa($colorEmpresa) {
        $this->colorEmpresa = $colorEmpresa;
    }

    function getServicioEstado() {
        return $this->servicioEstado;
    }

    function setServicioEstado($servicioEstado) {
        $this->servicioEstado = $servicioEstado;
    }

    
    function toString() {
        return "Movil{" . "id=" . $this->id . ", patente=" . $this->patente . ", marca=" . $this->marca . ", modelo=" . $this->modelo .
        ", nombre=" . $this->nombre . ", anio=" . $this->anio . ", color=" . $this->color . ", cantidad=" . $this->cantidad . ", clase=" .
        $this->clase . ", conductor=" . $this->conductor . ", conductorNombre=" . $this->conductorNombre . ", conductorNick=" .
        $this->conductorNick . ", gps=" . $this->gps . ", celular=" . $this->celular . ", app=" . $this->app . ", tipo=" . $this->tipo .
        ", venPerCir=" . $this->venPerCir . ", venRevTec=" . $this->venRevTec . ", venExt=" . $this->venExt . ", kilometraje=" .
        $this->kilometraje . ", motor=" . $this->motor . ", chasis=" . $this->chasis . ", segOb=" . $this->segOb . ", venSegOb=" .
        $this->venSegOb . ", transportista=" . $this->transportista . ", estado=" . $this->estado . ", lat=" . $this->lat . ", lon=" .
        $this->lon . ", ultimaAsignacion=" . $this->ultimaAsignacion . ", servicio=" . $this->servicio . ", polizaSegOb=" .
        $this->polizaSegOb . ", valorSegOb=" . $this->valorSegOb . ", segRcDm=" . $this->segRcDm . ", venSegRcDm=" . $this->venSegRcDm .
        ", polizaSegRcDm=" . $this->polizaSegRcDm . ", valorSegRcDm=" . $this->valorSegRcDm . ", segRcExceso=" . $this->segRcExceso .
        ", venSegRcExceso=" . $this->venSegRcExceso . ", polizaSegRcExceso=" . $this->polizaSegRcExceso . ", valorSegRcExceso=" .
        $this->valorSegRcExceso . ", segAs=" . $this->segAs . ", venSegAs=" . $this->venSegAs . ", polizaSegAs=" . $this->polizaSegAs .
        ", valorSegAs=" . $this->valorSegAs . ", adjuntoPerCir=" . $this->adjuntoPerCir . ", adjuntoRevTec=" . $this->adjuntoRevTec .
        ", adjuntoNMotor=" . $this->adjuntoNMotor . ", adjuntoSeremi=" . $this->adjuntoSeremi . ", adjuntoSegOb=" . $this->adjuntoSegOb .
        ", adjuntoSegRcDm=" . $this->adjuntoSegRcDm . ", adjuntoSegAsiento=" . $this->adjuntoSegAsiento . ", adjuntoSegRcExceso=" .
        $this->adjuntoSegRcExceso . ", colorEmpresa=" . $this->colorEmpresa . '}';
    }
    
}

