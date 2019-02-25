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
        <meta http-equiv="Expires" content="0">
        <meta http-equiv="Last-Modified" content="0">
        <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
        <meta http-equiv="Pragma" content="no-cache">
<!--        <meta http-equiv="Content-Security-Policy" content="default-src https:">-->
        <link rel="stylesheet" href="css/lib/alertify.css">
        <link rel="stylesheet" href="css/lib/jquery.datetimepicker.css">
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="stylesheet" href="css/loader.css">
        <link rel="stylesheet" href="css/media-queries.css">
        <link rel="icon" type="image/png" href="img/ico.png" />
        <script src="js/lib/jquery.js" type="text/javascript"></script>
        <script src="js/lib/chart.js" type="text/javascript"></script>
        <script src="js/lib/alertify.js" type="text/javascript"></script>
        <script src="js/lib/jquery.datetimepicker.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/principal.js" type="text/javascript"></script>
        <script src="js/asignacion.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">
            <div class="btn-menu" id="btn_menu">
                <img src="img/menu.svg" id="btn_menu_img" width="20" height="20" alt="GoTransfer" title="GoTransfer">
            </div>
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