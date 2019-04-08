<?php
    session_start();
    if($_SESSION['tipo'] == '0')
    {
?>
<div class="opcion-menu menu-activo" id="home" onclick="cambiarModulo('home')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/dashboard.svg">
    </div>
    <div class="contenido-menu">
        Dashboard
    </div>
    <div class="tooltip" id="tooltip_home">
        Dashboard
    </div>
</div>
<div class="opcion-menu" id="panel" onclick="cambiarModulo('panel')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/mapa.svg">
    </div>
    <div class="contenido-menu">
        Asignaci&oacute;n
    </div>
    <div class="tooltip" id="tooltip_panel">
        Asignaci&oacute;n
    </div>
</div>
<div class="opcion-menu" id="movil" onclick="cambiarModulo('movil')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/vehiculo.svg">
    </div>
    <div class="contenido-menu">
        Veh&iacute;culos
    </div>
    <div class="tooltip" id="tooltip_movil">
        Veh&iacute;culos
    </div>
</div>
<div class="opcion-menu" id="conductor" onclick="cambiarModulo('conductor')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/conductor.svg">
    </div>
    <div class="contenido-menu">
        Conductores
    </div>
    <div class="tooltip" id="tooltip_conductor">
        Conductores
    </div>
</div>
<div class="opcion-menu" id="cliente" onclick="cambiarModulo('cliente')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/empresa.svg">
    </div>
    <div class="contenido-menu">
        Clientes
    </div>
    <div class="tooltip" id="tooltip_cliente">
        Clientes
    </div>
</div>
<div class="opcion-menu" id="pasajero" onclick="cambiarModulo('pasajero')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/pasajero.svg">
    </div>
    <div class="contenido-menu">
        Pasajeros
    </div>
    <div class="tooltip" id="tooltip_pasajero">
        Pasajeros
    </div>
</div>
<div class="opcion-menu" id="servicios" onclick="cambiarModulo('servicios')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/servicio.svg">
    </div>
    <div class="contenido-menu">
        Servicios
    </div>
    <div class="tooltip" id="tooltip_servicios">
        Servicios
    </div>
</div>
<div class="opcion-menu" id="monitoreo" onclick="cambiarModulo('monitoreo')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/monitorear.svg">
    </div>
    <div class="contenido-menu">
        Monitoreo
    </div>
    <div class="tooltip" id="tooltip_monitoreo">
        Monitoreo
    </div>
</div>
<div class="opcion-menu"  id="reportes" onclick="cambiarModulo('reportes')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/reporte.svg">
    </div>
    <div class="contenido-menu">
        Reportes
    </div>
    <div class="tooltip" id="tooltip_reportes">
        Reportes
    </div>
</div>
<div class="opcion-menu" id="liquidaciones" onclick="cambiarModulo('liquidaciones')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/liquidacion.svg">
    </div>
    <div class="contenido-menu">
        Liquidaciones
    </div>
    <div class="tooltip" id="tooltip_liquidaciones">
        Liquidaciones
    </div>
</div>
<div class="opcion-menu" id="rendiciones" onclick="cambiarModulo('rendiciones')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/rendiciones.svg">
    </div>
    <div class="contenido-menu">
        Rendiciones
    </div>
    <div class="tooltip" id="tooltip_liquidaciones">
        Rendiciones
    </div>
</div>
<div class="opcion-menu" id="contrato" onclick="cambiarModulo('contrato')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/contrato.svg">
    </div>
    <div class="contenido-menu">
        Contratos
    </div>
    <div class="tooltip" id="tooltip_contrato">
        Contratos
    </div>
</div>
<div class="opcion-menu" id="tarifa" onclick="cambiarModulo('tarifa')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/ruta.svg">
    </div>
    <div class="contenido-menu">
        Tarifas
    </div>
    <div class="tooltip" id="tooltip_tarifa">
        Tarifas
    </div>
</div>
<div class="opcion-menu" id="agente" onclick="cambiarModulo('agente')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/admin.svg">
    </div>
    <div class="contenido-menu">
        Administradores
    </div>
    <div class=tooltip id="tooltip_agente">
        Administradores
    </div>
</div>
<div class="opcion-menu" id="configuracion" onclick="cambiarModulo('configuracion')">
    <div class="cont-img-menu">
        <img class="img-menu" src="img/configuracion.svg">
    </div>
    <div class="contenido-menu">
        Configuración
    </div>
    <div class=tooltip id="tooltip_agente">
        Configuración
    </div>
</div>
<div class="opcion-menu menu-salir" id="salir" onclick="salir()">
    <div class="contenido-menu">
        Salir
    </div>
    <div class="tooltip" id="tooltip_salir">
        Salir
    </div>
</div>
<?php
    }
    else
    {
?>
    <div class="opcion-menu" id="panel_cliente" onclick="cambiarModulo('panel_cliente')">
        <div class="cont-img-menu">
            <img class="img-menu" src="img/mapa.svg">
        </div>
        <div class="contenido-menu">
            Asignaci&oacute;n
        </div>
        <div class="tooltip" id="tooltip_panel">
            Asignaci&oacute;n
        </div>
    </div>
    <div class="opcion-menu" id="servicios" onclick="cambiarModulo('servicios')">
        <div class="cont-img-menu">
            <img class="img-menu" src="img/servicio.svg">
        </div>
        <div class="contenido-menu">
            Servicios
        </div>
        <div class="tooltip" id="tooltip_panel">
            Servicios
        </div>
    </div>
<?php
    }
?>