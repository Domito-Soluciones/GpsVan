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
            Maps
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="stylesheet" href="css/principal.css">
        <link rel="stylesheet" href="css/loader.css">
        <link rel="stylesheet" href="css/alertify.css">
        <link rel="stylesheet" href="css/jquery.datetimepicker.css">
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/servicio.js" type="text/javascript"></script>
        <script src="js/jquery.datetimepicker.js" type="text/javascript"></script>
        <script src="js/alertify.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">
            
        </div>
        <div id="menu" class="menu">
           
        </div>
        <div class="contenedor-lateral">
            <div class="lateral">
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
                    Usuario
                </div>
                <div class="contenedor-input">
                    <input type="text" list="lusuario" id="usuario" placeholder="Usuario" autocomplete="off">
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
        </div>
        <div class="contendor_central">
            <table id="tabla" class="tabla-central">
                <thead>
                    <tr class="tr_titulo">
                        <th>
                            ID servicio
                        </th>
                        <th>
                            Fecha
                        </th>
                        <th>
                            Tarifa
                        </th>
                        <th>
                            Partida
                        </th>
                        <th>
                            Destino
                        </th>
                        <th>
                            Cliente
                        </th>
                        <th>
                            Pasajero
                        </th>
                        <th>
                            Transportista
                        </th>
                        <th>
                            Movil
                        </th>
                        <th>
                            Tipo
                        </th>

                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>   
    </body>
</html>