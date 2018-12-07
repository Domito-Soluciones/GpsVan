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
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="icon" type="image/png" href="img/ico.png" />
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/alertify.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/principal.js" type="text/javascript"></script>
        <script src="js/alertify.js" type="text/javascript"></script>
        <script src="js/jquery.datetimepicker.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">
            <div class="img-logo" >
                <img src="img/furgoneta.png" width="50" height="35" alt="GoTransfer" title="GoTransfer">
            </div>
            <div class="titulo">
                GoTransfer - Admin    
            </div>
            <div class="fecha" id="fecha">
                
            </div>
            <div class="usuario" id="usuario">
                
            </div>

        </div>
        <div id="menu" class="menu">
           
        </div>
        <div id="contenido-central" class="contenido-central">
            
        </div>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcQylEsZAzuEw3EHBdWbsDAynXvU2Ljzs&libraries=places&callback"></script>
    </body>
</html>