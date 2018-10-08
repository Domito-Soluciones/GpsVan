<?php
session_start(); 
?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            Maps
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="stylesheet" href="css/principal.css">
        <link rel="stylesheet" href="css/loader.css">
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/movil.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">
            
        </div>
        <div id="menu" class="menu">
           
        </div>
        <div class="contenedor-lateral">
            <div class="lateral">
                <div class="pestana pestana-activa" id="pestanaAsignar">
                    Agregar
                </div>
                <div class="pestana" id="pestanaBuscar">
                    Buscar
                </div>
                <div class="asignar" id="asignar">
                    <div class="contenedor-pre-input">
                        Partida
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lorigen" id="partida" onkeyup="obtenerDireccion('partida')" placeholder="Partida">
                        <datalist id="lorigen"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Destino
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ldestino" id="destino" onkeyup="obtenerDireccion('destino')" placeholder="Destino">
                        <datalist id="ldestino"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Cliente
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lcliente" id="cliente" placeholder="Cliente">
                        <datalist id="lcliente" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Usuario
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lusuario" id="usuario" placeholder="Usuario">
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
                        N° Movil
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lmovil" id="movil" placeholder="N° Movil">
                        <datalist id="lmovil"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Tipo Servicio
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltipo" id="movil" placeholder="Tipo Servicio">
                        <datalist id="ltipo">
                            <option value="Recogida">Recogida</option>
                            <option value="Reparto">Reparto</option>
                            <option value="Servicio Especial">Servicio Especial</option>
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
                        <div class="button-succes">
                            <a class="enlace-succes" id="entrar">
                                AGREGAR
                            </a>
                        </div>
                    </div>
                </div>
                <div class="buscar" id="buscar">
                    <div class="contenedor-pre-input">
                        Id Servicio
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lid" id="cliente" placeholder="Id servicio">
                        <datalist id="lid" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Cliente
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lcliente" id="cliente" placeholder="Cliente">
                        <datalist id="lcliente" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Usuario
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lusuario" id="usuario" placeholder="Usuario">
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
                        N° Movil
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lmovil" id="movil" placeholder="N° Movil">
                        <datalist id="lmovil"></datalist>
                    </div>
                    <div class="contenedor-boton">
                        <div class="button-succes">
                            <a class="enlace-succes" id="buscar">
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
        </div>
        <div class="contendor_central">
            <div class="central" id="central">
                <!--
                aqui va el mapa
                -->
            </div>    
        </div>   
    </body>
</html>