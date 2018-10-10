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
        <link rel="stylesheet" href="css/jquery.datetimepicker.css">
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/jquery.datetimepicker.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/movil.js" type="text/javascript"></script>
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
                        Nombre
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="nombre" placeholder="Nombre">
                    </div>
                    <div class="contenedor-pre-input">
                        Apellido paterno
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="papellido" placeholder="Apellido paterno">
                    </div>
                    <div class="contenedor-pre-input">
                        Apellido materno
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="mapellido" placeholder="Apellido materno">
                    </div>
                    <div class="contenedor-pre-input">
                        Rut
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="rut" placeholder="Rut"  autocomplete="off">
                    </div>
                    <div class="contenedor-pre-input">
                        Teléfono
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="telefono" placeholder="Teléfono">                    
                    </div>
                    <div class="contenedor-pre-input">
                        Celular
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="celular" placeholder="Celular">
                    </div>
                    <div class="contenedor-pre-input">
                        Dirección
                    </div>
                    <div class="contenedor-input">
                        <input type="text"  id="direccion" placeholder="Dirección">
                    </div>
                    <div class="contenedor-pre-input">
                        E-mail
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="mail" placeholder="E-mail">
                    </div>
                    <div class="contenedor-pre-input">
                        Tipo licencia
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="llicencia" id="tipoLicencia" placeholder="Tipo licencia">
                        <datalist id="llicencia" >
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="A3">A3</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Fecha nacimiento
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="nacimiento" placeholder="Fecha nacimiento">
                    </div>
                    <div class="contenedor-pre-input">
                        Renta imponible
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="renta" placeholder="Renta">
                    </div>
                    <div class="contenedor-pre-input">
                        Tipo contrato
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lcontrato" id="contrato" placeholder="Tipo contrato">
                        <datalist id="lcontrato" >
                            <option value="Indefinido">Indefinido</option>
                            <option value="Plazo fijo">Plazo fijo</option>
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Institucion previsional
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lafp" id="afp" placeholder="Institución previsional">
                        <datalist id="lafp" >
                            <option value="Modelo">Modelo</option>
                            <option value="Capital">Capital</option>
                            <option value="Cuprum">Cuprum</option>
                            <option value="Habitat">Habitat</option>
                            <option value="Provida">Provida</option>
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Isapre
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lisapre" id="isapre" placeholder="Isapre">
                        <datalist id="lisapre" >
                            <option value="Banmédica">Banmédica</option>
                            <option value="Colmena Golden Cross">Colmena Golden Cross</option>
                            <option value="Consalud">Consalud</option>
                            <option value="Cruz Blanca">Cruz Blanca</option>
                            <option value="Nueva Masvida">Nueva Masvida</option>
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Mutual (% descuento)
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="mutual" placeholder="% Descuento">
                    </div>
                    <div class="contenedor-pre-input">
                        Inicio Seguro Conductor
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="seguroInicio" placeholder="Inicio">
                    </div>
                    <div class="contenedor-pre-input">
                        Renovación Seguro Conductor
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="seguroRenovacion" placeholder="Renovación">
                    </div>
                    <div class="contenedor-pre-input">
                        % Descuento
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="descuento" placeholder="% Descuento">
                    </div>
                    <div class="contenedor-pre-input">
                        Anticipos
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="anticipo" placeholder="Anticipo">
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
                        Rut
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lrut" id="rutS" placeholder="Rut"  autocomplete="off">
                        <datalist id="lrut" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Nombre
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lnombre" id="nombreS" placeholder="Nombre">
                        <datalist id="lnombre" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Apellido Paterno
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lpapellido" id="papellidoS" placeholder="Apellido Paterno">
                        <datalist id="lpapellido" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Apellido Paterno
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lmapellido" id="mapellidoS" placeholder="Apellido Materno">
                        <datalist id="lmapellido"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        E-mail
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lmail" id="mailS" placeholder="E-mail">
                        <datalist id="lmail"></datalist>
                    </div>
                    <div class="contenedor-boton">
                        <div class="button-succes">
                            <a class="enlace-succes" id="boton-buscar">
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
                    <tr>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Apellido paterno
                        </th>
                        <th>
                            Apellido materno
                        </th>
                        <th>
                            Rut
                        </th>
                        <th>
                            Teléfono
                        </th>
                        <th>
                            Celular
                        </th>
                        <th>
                            Dirección
                        </th>
                        <th>
                            E-mail
                        </th>
                        <th>
                            Tipo licencia
                        </th>
                        <th>
                           Tipo contrato 
                        </th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>   
    </body>
</html>