<?php
session_start(); 
if(!isset($_SESSION['agente']))
{
    header('Location: index.php');
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            Panel principal
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="stylesheet" href="css/principal.css">
        <link rel="stylesheet" href="css/loader.css">
        <link rel="stylesheet" href="css/alertify.css">
        <link rel="stylesheet" href="css/jquery.datetimepicker.css">
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/alertify.js" type="text/javascript"></script>
        <script src="js/thread.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/principal.js" type="text/javascript"></script>
        <script src="js/alertify.js" type="text/javascript"></script>
        <script src="js/jquery.datetimepicker.js" type="text/javascript"></script>
        <style>
            .pac-container
            {
                width: 400px !important;
            }
        </style>
    </head>
    <body>
        <div class="cabecera" id="cabecera">
            
        </div>
        <div id="menu" class="menu">
           
        </div>
        <div class="contenedor-lateral">
            <div class="lateral">
                <div class="pestana pestana-activa" id="pestanaAsignar">
                    Asignar
                </div>
                <div class="pestana" id="pestanaBuscar">
                    Buscar
                </div>
                <div class="asignar" id="asignar">
                    <div class="contenedor-pre-input">
                        Partida
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="partida" placeholder="Partida">
                        <input type="hidden" id="partida_hidden">
                    </div>
                    <div class="contenedor-pre-input">
                        Destino
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="destino" placeholder="Destino">
                        <input type="hidden" id="destino_hidden">
                    </div>
                    <div class="contenedor-pre-input">
                        Empresa cliente
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lcliente" id="cliente" placeholder="Empresa cliente" onkeyup="cargarClientes()">
                        <datalist id="lcliente" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Pasajero
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lusuario" id="usuario" placeholder="Pasajero"  autocomplete="off">
                        <datalist id="lusuario" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Transportista
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltransportista" id="transportista" placeholder="Transportista" onkeyup="cargarTransportistas()">
                        <datalist id="ltransportista"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        N° movil
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lmovil" id="movil" placeholder="N° Movil">
                        <datalist id="lmovil"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Tipo servicio
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltipo" id="tipo" placeholder="Tipo Servicio">
                        <datalist id="ltipo">
                            <option value="Recogida">Recogida</option>
                            <option value="Reparto">Reparto</option>
                            <option value="Servicio Especial">Servicio especial</option>
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Tarifa
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltarifa" id="tarifa" placeholder="Tarifa">
                        <datalist id="ltarifa">
                            <option value="1000">1000</option>
                            <option value="3000">3000</option>
                            <option value="5000">5000</option>
                            <option value="7000">7000</option>
                            <option value="10000">10000</option>
                            <option value="15000">15000</option>
                            <option value="20000">20000</option>
                            <option value="30000">30000</option>
                        </datalist>
                    </div>
                    <div class="contenedor-boton">
                        <div class="button-succes" id="entrar">
                            <a class="enlace-succes">
                                ASIGNAR
                            </a>
                        </div>
                    </div>
                </div>
                <div class="buscar" id="buscar">
                    <div class="contenedor-pre-input">
                        Id Servicio
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lids" id="ids" placeholder="Id servicio" onkeyup="cargarIds()">
                        <datalist id="lids"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Cliente
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lcliente" id="cliente" placeholder="Cliente">
                        <datalist id="lcliente" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Pasajero
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lusuario" id="usuario" placeholder="Pasajero">
                        <datalist id="lusuario" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Transportista
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltransportista" id="transportista" placeholder="Transportista">
                        <datalist id="ltransportista"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        N° movil
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lmovil" id="movil" placeholder="N° movil">
                        <datalist id="lmovil"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Fecha desde
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="desde" placeholder="Fecha desde">
                        
                    </div>
                    <div class="contenedor-pre-input">
                        Fecha hasta
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="hasta" placeholder="Fecha hasta">
                        
                    </div>
                    <div class="contenedor-boton">
                        <div class="button-succes" id="boton-buscar">
                            <a class="enlace-succes">
                                BUSCAR
                            </a>
                        </div>
                    </div>
                </div>
                <div id="mensaje-error" class="mensaje-error">
                
                </div>
                <div class="contenedor-loader">
                    <div class="loader" id="loader">Loading...</div>
                </div>
            </div>
        </div>
        <div class="contendor_mapa">
            <div class="map" id="map">
                <!--
                aqui va el mapa
                -->
            </div>    
        </div>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcQylEsZAzuEw3EHBdWbsDAynXvU2Ljzs&libraries=places&callback=initMap"></script>
    </body>
</html>