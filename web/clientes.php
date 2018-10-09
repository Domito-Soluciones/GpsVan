<?php
session_start(); 
?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            Maps
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="stylesheet" href="css/principal.css">
        <link rel="stylesheet" href="css/loader.css">
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/cliente.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">
            
        </div>
        <div id="menu" class="menu">
           
        </div>
        <div class="contenedor-lateral">
            <div class="lateral">
                <div class="pestana pestana-activa" id="pestanaAgregar">
                    Agregar
                </div>
                <div class="pestana" id="pestanaBuscar">
                    Buscar
                </div>
                <div class="asignar" id="agregar">
                    <div class="contenedor-pre-input">
                        Razon social
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="razon" placeholder="Nombre">
                    </div>
                    <div class="contenedor-pre-input">
                        Tipo
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltipo" id="tipo" placeholder="Tipo">
                        <datalist id="ltipo">
                            <option value="Convenio">Convenio</option>
                            <option value="Servicio especial">Servicio especial</option>
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Rut
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="rut" placeholder="Rut"  autocomplete="off">
                    </div>
                    <div class="contenedor-pre-input">
                        Dirección
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="direccion" placeholder="Dirección">
                    </div>
                    <div class="contenedor-pre-input">
                        Nombre de contacto
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="nombre" placeholder="Nombre de contacto">                    
                    </div>
                    <div class="contenedor-pre-input">
                        Teléfono de contacto
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="telefono" placeholder="Teléfono de contacto">
                    </div>
                    <div class="contenedor-pre-input">
                        E-mail de contacto
                    </div>
                    <div class="contenedor-input">
                        <input type="text"  id="mail" placeholder="E-mail de contacto">
                    </div>
                    <div class="contenedor-pre-input">
                        E-mail de facturacion
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="mail2" placeholder="E-mail de facturacion">
                    </div>
                    <div class="contenedor-pre-input">
                        Centros de costo
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="centros" placeholder="Tipo licencia">
                    </div>
                    <div class="contenedor-boton">
                        <div class="button-succes">
                            <a class="enlace-succes" id="entrar">
                                AGREGAR
                            </a>
                        </div>
                    </div>
                </div>
                <div class="buscar" id="buscar">
                    <div class="contenedor-pre-input">
                        Razon social
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lrazon" id="razon" placeholder="Nombre">
                        <datalist id="lrazon">
                            <option value="Convenio">Convenio</option>
                            <option value="Servicio especial">Servicio especial</option>
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Tipo
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltipo" id="tipo" placeholder="Tipo">
                        <datalist id="ltipo">
                            <option value="Convenio">Convenio</option>
                            <option value="Servicio especial">Servicio especial</option>
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Rut
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lrut" id="rut" placeholder="Rut">
                        <datalist id="lrut"></datalist>
                    </div>
                    
                    <div class="contenedor-boton">
                        <div class="button-succes">
                            <a class="enlace-succes" id="buscar">
                                BUSCAR
                            </a>
                        </div>
                    </div>
                </div>
                <div id="mensaje-error" class="mensaje-error">
                
                </div>
                <div class="contenedor-loader">
                    <div class="loader" id="loader">Loading...</div>
                </div>
            </div>
            </div>
        </div>
        <div class="contendor_central">
            <div class="central" id="central">
                <!--
                aqui va el mapa
                -->
            </div>    
        </div>   
    </body>
</html>