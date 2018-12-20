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
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, user-scalable=no, 
              initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
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
            <div class="logOut" id="logOut">
                <a class="enlace-salir" id="enlace_usuario"></a>
                 - <a href="javascript:void(0)" class="enlace-salir" id="enlace-salir">Salir</a>
            </div>
            <div class="fecha" id="fecha">
                
            </div>
            <img src="img/menu.svg" id="menu-telefono" class="menu-telefono">
        </div>
        <div id="menu" class="menu">
           
        </div>
        <div id="contenido-central" class="contenido-central">
            
        </div>
        <div class="map" id="map">
            <!--aqui va el mapa-->
        </div> 
    </body>
</html>