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
            Estadistica
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="stylesheet" href="css/estadistica.css">
        <link rel="stylesheet" href="css/loader.css">
        <link rel="stylesheet" href="css/alertify.css">
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/alertify.js" type="text/javascript"></script>
        <!--<script src="js/thread.js" type="text/javascript"></script>-->
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/estadistica.js" type="text/javascript"></script>
        <script src="js/chart.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">
            
        </div>
        <div id="menu" class="menu">
           
        </div>
        <div class="contenedor_central">
            <div class="fecha" id="fecha">
                
            </div>
            <div class="panel1">
                <div class="totales" id="totales">
                    <div class="cont-total">
                        <div id="total" class="total"></div>                        
                    </div>
                    <table class="tabla-est" id="servicios">
                        <thead>
                            
                        </thead>   
                        <tbody>
                            
                        </tbody>
                    </table>
                        
<!--                    agregar grafico total servicios del dia de dona
                    total servicos del dia: 15
                    tipos de servicos (titulo)
                        recogida: 12
                        reparto:  1
                        servicio especial: 3   
                         colores grsfico numeros en amrillo y color grafico naranjo-->
                </div>
                <div class="conductores" id="conductores">
                    <canvas id="myChart" width="200" height="200"></canvas>                 
    <!--                    agregar grafico conductores de barra
                    total servicos del dia: 15
                    tipos de servicos (titulo)
                        recogida: 12
                        reparto:  1
                        servicio especial: 3   -->
                </div>
            </div>
            <div class="panel2">
                <div class="centro" id="centro">
                    <canvas id="pie-chart" width="800" height="450"></canvas>
                </div>
            </div>
            <div class="panel3">
                <div  class="activos" id="activos">
                    <canvas id="chart" height="150" width="100"></canvas>
                    <table class="tabla-est" id="activos">
                        <thead>

                        </thead>   
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
                <div  class="lista" id="lista">
                </div>
            </div>
        </div>
    </body>
</html>