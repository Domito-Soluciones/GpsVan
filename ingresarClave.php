<!DOCTYPE html>
<?php
    $rut = filter_input(INPUT_GET, "data");
    $idSol = filter_input(INPUT_GET, "idSol");
?>
<html>
    <head>
        <title>
            Recuperar Clave
        </title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, user-scalable=no, 
              initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="Expires" content="0">
        <meta http-equiv="Last-Modified" content="0">
        <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <!--<meta http-equiv="Content-Security-Policy" content="default-src https:">-->
        <link rel="stylesheet" href="css/lib/alertify.css" type="text/css"/>
        <link rel="stylesheet" href="css/lib/alertify.rtl.css" type="text/css"/>
        <link rel="stylesheet" href="css/estilo.css" type="text/css"/>
        <link rel="stylesheet" href="css/index.css" type="text/css"/>
        <link rel="stylesheet" href="css/loader.css" type="text/css"/>
        <link rel="stylesheet" href="css/media-queries.css">
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="icon" type="image/png" href="img/ico.png" />
        <script src="js/lib/jquery.js" type="text/javascript"></script>
        <script src="js/lib/alertify.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/recuperar.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="img-login">
            <img src="img/logo.png" style="cursor: pointer" onclick="redireccionar('index.php')">
        </div>
        <div class="login">
            <div class="contenedor-login">
                <div class="contenedor-pre-input contenedor-pre-input-login">
                    Ingresa Clave
                </div>
                <div class="contenedor-input">
                <input type="password" id="password1" name="password1" placeholder="Ingrese clave"/>
                </div>
            </div>
            <div class="contenedor-login">
                <div class="contenedor-pre-input contenedor-pre-input-login">
                    Repita Clave
                </div>
                <div class="contenedor-input">
                    <input type="password" id="password2" name="password2" placeholder="Repita clave" />
                </div>
            </div>
            <div class="contenedor-login">
                <div class="boton" style="margin-left: 35%;" id="confirmar">
                    <img src="img/guardar.svg" width="12" height="12">
                    Confirmar
                </div>
            </div>
        </div>
        <?php 
        echo "<input type=\"hidden\" id=\"aux\" value='".$idSol."'>";
        echo "<input type=\"hidden\" id=\"aux2\" value='".$rut."'>";
        ?>
    </body>
</html>