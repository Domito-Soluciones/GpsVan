<?php
include '../../util/validarPeticion.php';

class Conductor {
    private $id;
    private $nombre;
    private $papellido;
    private $mapellido;
    private $tipo;
    private $rut;
    private $nick;
    private $password;
    private $telefono;
    private $celular;
    private $direccion;
    private $mail;
    private $tipoLicencia;
    private $banco;
    private $numeroCuenta;
    private $tipoCuenta;
    private $vencLicencia;
    private $nacimiento;
    private $renta;
    private $contrato;
    private $afp;
    private $isapre;
    private $isapreAd;
    private $mutual;
    private $seguroInicio;
    private $seguroRenovacion;
    private $descuento;
    private $imagenAdjunta;
    private $contratoAdjunto;
    private $transportista;
    private $movil;
    
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

    function getTipo() {
        return $this->tipo;
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

    function getTipoLicencia() {
        return $this->tipoLicencia;
    }

    function getBanco() {
        return $this->banco;
    }

    function getNumeroCuenta() {
        return $this->numeroCuenta;
    }

    function getTipoCuenta() {
        return $this->tipoCuenta;
    }

    function getVencLicencia() {
        return $this->vencLicencia;
    }

    function getNacimiento() {
        return $this->nacimiento;
    }

    function getRenta() {
        return $this->renta;
    }

    function getContrato() {
        return $this->contrato;
    }

    function getAfp() {
        return $this->afp;
    }

    function getIsapre() {
        return $this->isapre;
    }

    function getIsapreAd() {
        return $this->isapreAd;
    }

    function getMutual() {
        return $this->mutual;
    }

    function getSeguroInicio() {
        return $this->seguroInicio;
    }

    function getSeguroRenovacion() {
        return $this->seguroRenovacion;
    }

    function getDescuento() {
        return $this->descuento;
    }

    function getImagenAdjunta() {
        return $this->imagenAdjunta;
    }

    function getContratoAdjunto() {
        return $this->contratoAdjunto;
    }

    function getTransportista() {
        return $this->transportista;
    }

    function getMovil() {
        return $this->movil;
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

    function setTipo($tipo) {
        $this->tipo = $tipo;
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

    function setTipoLicencia($tipoLicencia) {
        $this->tipoLicencia = $tipoLicencia;
    }

    function setBanco($banco) {
        $this->banco = $banco;
    }

    function setNumeroCuenta($numeroCuenta) {
        $this->numeroCuenta = $numeroCuenta;
    }

    function setTipoCuenta($tipoCuenta) {
        $this->tipoCuenta = $tipoCuenta;
    }

    function setVencLicencia($vencLicencia) {
        $this->vencLicencia = $vencLicencia;
    }

    function setNacimiento($nacimiento) {
        $this->nacimiento = $nacimiento;
    }

    function setRenta($renta) {
        $this->renta = $renta;
    }

    function setContrato($contrato) {
        $this->contrato = $contrato;
    }

    function setAfp($afp) {
        $this->afp = $afp;
    }

    function setIsapre($isapre) {
        $this->isapre = $isapre;
    }

    function setIsapreAd($isapreAd) {
        $this->isapreAd = $isapreAd;
    }

    function setMutual($mutual) {
        $this->mutual = $mutual;
    }

    function setSeguroInicio($seguroInicio) {
        $this->seguroInicio = $seguroInicio;
    }

    function setSeguroRenovacion($seguroRenovacion) {
        $this->seguroRenovacion = $seguroRenovacion;
    }

    function setDescuento($descuento) {
        $this->descuento = $descuento;
    }

    function setImagenAdjunta($imagenAdjunta) {
        $this->imagenAdjunta = $imagenAdjunta;
    }

    function setContratoAdjunto($contratoAdjunto) {
        $this->contratoAdjunto = $contratoAdjunto;
    }

    function setTransportista($transportista) {
        $this->transportista = $transportista;
    }

    function setMovil($movil) {
        $this->movil = $movil;
    }

            
        public function toString() {
        return "DATOS CONDUCTOR: ID : ".$this->id." NOMBRE : ".$this->nombre.
                " PAPELLIDO : ".$this->papellido." MAPELLIDO : ".$this->mapellido.
                " RUT : ".$this->rut." NICK : ".$this->nick." PASSWORD : ".$this->password.
                " TELEFONO : ".$this->telefono." CELULAR : ".$this->celular.
                " DIRECCION : ".$this->direccion." MAIL : ".$this->mail.
                " TIPO LICENCIA : ". $this->tipoLicencia." NACIMIENTO : ".$this->nacimiento.
                " RENTA : ". $this->renta." CONTRATO : ".$this->contrato.
                " AFP : ". $this->afp." ISAPRE : ".$this->isapre." ISAPRE AD : ".$this->isapreAd.
                " MUTUAL : ". $this->mutual." SEGURO INICIO : ".$this->seguroInicio.
                " DESCUENTO : ". $this->descuento." TIPO : ".$this->tipo.
                " IMAGEN ADJUNTA : ". $this->imagenAdjunta." CONTRATO ADJUNTO : ".$this->contratoAdjunto.
                " TRANSPORTISTA : ". $this->transportista." MOVIL : ".$this->movil;
    }
}
