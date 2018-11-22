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
            Reportes
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="stylesheet" href="css/principal.css">
        <link rel="stylesheet" href="css/loader.css">
        <link rel="stylesheet" href="css/alertify.css">
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/alertify.js" type="text/javascript"></script>
        <!--<script src="js/thread.js" type="text/javascript"></script>-->
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/reporte.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">

        </div>
        <div id="menu" class="menu">
           
        </div>
        <div class="contenedor-lateral">
            <div class="lateral">
                <div class="contenedor-pre-input">
                    Transportista
                </div>
                <div class="contenedor-input">
                    <input type="text" list="ltransportista" id="transportista" placeholder="Transportista" onkeyup="cargarTransportistas()">
                    <datalist id="ltransportista"></datalist>
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
                <div id="mensaje-error" class="mensaje-error">
                
                </div>
                <div class="contenedor-loader">
                    <div class="loader" id="loader">Loading...</div>
                </div>
                <div class="contenedor-boton">
                    <div class="button-succes" id="buscar">
                        <a class="enlace-succes">
                            BUSCAR
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="contendor_central">
            <div class="central" id="central">
                <table id="tabla" class="tabla-central">
                    <thead>
                        <tr class="tr_titulo">
                            <th>
                                Reportes
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Reporte Servicios Diarios
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Reporte Servicios Mensuales
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Reporte Servicos Recogidas
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Reporte Servicios Reparto
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Reporte Servicios Especiales
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>    
        </div>   
    </body>
</html>