<!DOCTYPE html>
<html>
    <head>
        <title>
            Gpsvan
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css" type="text/css"/>
        <link rel="stylesheet" href="css/index.css" type="text/css"/>
        <link rel="stylesheet" href="css/loader.css" type="text/css"/>
        <script src="js/jquery.js"></script>
        <script src="js/index.js"></script>
        <script src="js/funciones.js"></script>
    </head>
    <body>
        <div class="login">
            <div class="contenedor-input">
                <div class="mensaje-input">
                    Usuario
                </div>
                <input class="input-text" type="text" id="usuario" name="usuario" placeholder="Ingrese usuario"/>
            </div>
            <div class="contenedor-input">
                <div class="mensaje-input">
                    Password
                </div>
                <input class="input-text" type="password" id="password" name="password" placeholder="Ingrese clave" />
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