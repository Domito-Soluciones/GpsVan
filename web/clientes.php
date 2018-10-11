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
            Maps
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="stylesheet" href="css/principal.css">
        <link rel="stylesheet" href="css/loader.css">
        <link rel="stylesheet" href="css/alertify.css">
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/cliente.js" type="text/javascript"></script>
        <script src="js/alertify.js" type="text/javascript"></script>
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
                        <input type="text" id="razon" placeholder="Razon social">
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
                        <input type="text" id="centros" placeholder="Centros de costo">
                    </div>
                    <div class="contenedor-boton">
                        <div class="button-succes"  id="entrar">
                            <a class="enlace-succes">
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
                        <input type="text" list="lrazon" id="razonS" placeholder="Nombre">
                        <datalist id="lrazon">
                            
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Tipo
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltipo" id="tipoS" placeholder="Tipo">
                        <datalist id="ltipo">
                            <option value="Convenio">Convenio</option>
                            <option value="Servicio especial">Servicio especial</option>
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Rut
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lrut" id="rutS" placeholder="Rut">
                        <datalist id="lrut"></datalist>
                    </div>
                    
                    <div class="contenedor-boton">
                        <div class="button-succes" id="boton-buscar">
                            <a class="enlace-succes">
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
            <table id="tabla" class="tabla-central">
                <thead>
                    <tr class="tr_titulo">
                        <th>
                            Razon social
                        </th>
                        <th>
                            Tipo Servicio
                        </th>
                        <th>
                            Rut
                        </th>
                        <th>
                            Dirección
                        </th>
                        <th>
                            Nombre contacto
                        </th>
                        <th>
                            Teléfono contacto
                        </th>
                        <th>
                            E-mail contacto
                        </th>
                        <th>
                            E-mail facturación
                        </th>
                        <th>
                            Centro costo
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>   
    </body>
</html>