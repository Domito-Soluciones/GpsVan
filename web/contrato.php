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
            Contratos
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
        <script src="js/contrato.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">

        </div>
        <div id="menu" class="menu">
           
        </div>
        <div class="contenedor-lateral">
            <div class="lateral">
                <div class="contenedor-pre-input">
                    Contrato
                </div>
                <div class="contenedor-input">
                    <input type="text" list="ltransportista" id="transportista" placeholder="Transportista" onkeyup="cargarTransportistas()">
                    <datalist id="ltransportista"></datalist>
                </div>
                <div class="contenedor-pre-input">
                    Tipo
                </div>
                <div class="contenedor-input">
                    <input type="text" list="ltransportista" id="transportista" placeholder="Conductor" onkeyup="cargarTransportistas()">
                    <datalist id="ltransportista"></datalist>
                </div>
                <div class="contenedor-pre-input">
                    Adjuntar Contrato
                </div>
                <div class="contenedor-input">
                    <a onclick="" name="agregar" id="upload_link" href="javascript:void(0)" style="color: #C73549" ><img src="img/mas.png" style="width:20px;height:20px;"></a>
                    <input name="file" id="upload" type="file" style="display: none;" onchange="$('#form').submit()"/>
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
                                Contratos
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Contratos Conductores
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Contratos Personal Administrativo
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Contratos con Terceros
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>    
        </div>   
    </body>
</html>