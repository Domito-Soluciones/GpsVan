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
        <script src="js/principal_cliente.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">
            <div class="img-logo" >
                <img src="img/furgoneta.png" width="50" height="35" alt="GoTransfer" title="GoTransfer">
            </div>
            <div class="titulo">
                GoTransfer - Cliente    
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
            <div class="contenedor-lateral buscador-asignacion-cliente">
                <div id="servicio-normal" class="buscador barra_asignacion">
                    <div>
                        <div class="input-monitoreo">
                            <input type="hidden" id="clientes" value="<?php echo $_SESSION['empresa']?>">
                        </div>
                    </div>
                    <div>
                        <div class="cont-pre-monitor">
                            Tipo
                        </div>
                         <div class="input-monitoreo">
                             <select id="ruta" class="select_asignar_cliente">
                                 <option value="">Seleccione</option>
                                 <option value="<?php echo $_SESSION['empresa']?>-ZP-ESP">Zarpe</option>
                                 <option value="<?php echo $_SESSION['empresa']?>-RG-ESP">Recogida</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div class="cont-pre-monitor">
                            Fecha
                        </div>
                        <div class="input-monitoreo">
                             <input type="text" class="input_cliente" id="fechas" placeholder="Ej: 01/01/2020">
                        </div>
                    </div>
                    <div>
                        <div class="cont-pre-monitor">
                            Hora
                        </div>
                         <div class="input-monitoreo">
                            <input type="text" class="input_cliente" id="hora" placeholder="Ej: 12:23:00">
                        </div>
                    </div>
                    <div>
                        <div class="cont-pre-monitor">
                            Observaciones
                        </div>
                        <div class="input-monitoreo">
                            <textarea maxlength="200" class="textarea_asignar" id="observacion" rows="5" cols="30"></textarea>
                        </div>
                    </div>
                    <div class="boton" id="solicitar">
                        <img src="img/guardar.svg" width="12" height="12">
                        Solicitar
                    </div>
                </div>
            </div>
            <div id="contenedor-pasajero" class="contenedor-lateral buscador-asignacion-cliente-pasajero">
                
            </div>
        </div>
    </body>
</html>