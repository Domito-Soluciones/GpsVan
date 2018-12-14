<!DOCTYPE html>
<html>
    <head>
        <title>
            Login
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css" type="text/css"/>
        <link rel="stylesheet" href="css/index.css" type="text/css"/>
        <link rel="stylesheet" href="css/loader.css" type="text/css"/>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="icon" type="image/png" href="img/ico.png" />
        <script src="js/jquery.js"></script>
        <script src="js/index.js"></script>
        <script src="js/funciones.js"></script>
    </head>
    <body>
        <div class="img-login">
            <img src="img/logo.png">
        </div>
        <div class="login">
            <div class="contenedor-fila">
                <div class="contenedor-pre-input contenedor-pre-input-login">
                    Usuario
                </div>
                <div class="contenedor-input">
                <input type="text" id="usuario" name="usuario" placeholder="Ingrese usuario"/>
                </div>
            </div>
            <div class="contenedor-fila">
                <div class="contenedor-pre-input contenedor-pre-input-login">
                     Password
                </div>
                <div class="contenedor-input">
                    <input type="password" id="password" name="password" placeholder="Ingrese clave" />
                </div>
            </div>
            <div class="contenedor-boton">
                <div class="button-succes" id="entrar">
                    <a class="enlace-succes">
                        ENTRAR
                    </a>
                </div>
            </div>
            <div id="mensaje-error" class="mensaje-error">
                
            </div>
            <div class="contenedor-loader">
                <div class="loader" id="loader">Loading...</div>
            </div>
        </div>

    </body>
</html>