/* global urlBase, alertify, ID_AGENTE, ADJUNTANDO */
var ID_MOVIL;
var MOVILES;
var conductores = new Map();
var ID_CONDUCTOR;
var TIPO_GRUPO = '2';
var AGREGAR = true;
var PAGINA = 'VEHICULOS';
var CAMPOS = ["patente","marca","nombre","modelo","anio","color","cantidad","clase","gps","celular","app",
    "venPerCir","venRevTec","venExt","motor","chasis",
    "segOb","venSegOb","polizaSegOb","valorSegOb","segRcDm","venSegRcDm","polizaSegRcDm","valorSegRcDm",
    "segAs","venSegAs","polizaSegAs","valorSegAs","segRcExceso","venSegRcExceso","polizaSegRcExceso","valorSegRcExceso"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarMovil(true);
    $("#agregar").click(function(){
        ID_CONDUCTOR = undefined;
        ID_MOVIL = undefined;
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#lista_busqueda_movil_detalle").load("html/datos_movil.html", function( response, status, xhr ) {
            iniciarPestanias();
            cambioEjecutado();
            buscarConductores();
            iniciarFecha(['#venPerCir','#venRevTec','#venExt','#venSegOb','#venSegRcDm','#venSegAs','#venSegRcExceso']);
            $("#patente").blur(function (){
                if(validarExistencia('patente',$(this).val()))
                {
                    alertify.error("La patente "+$(this).val()+" ya existe");
                    $("#patente").val("");
                    return;
                }
            });
            iniciarEventosCheck();
            $("#volver").click(function(){
                if(typeof TIPO_GRUPO === 'undefined')
                {
                    buscarMovil();
                }
                else if(TIPO_GRUPO === '0' || TIPO_GRUPO === '1')
                {
                    buscarMovilTipo(TIPO_GRUPO);
                }
                else if(TIPO_GRUPO === '2')
                {
                    buscarMovilTodo();
                }
                cambiarPropiedad($("#agregar"),"visibility","visible");
                cambiarPropiedad($("#guardar"),"visibility","hidden");
                cambiarPropiedad($("#eliminar"),"visibility","hidden");
            });
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","hidden");
        
    });
    
    $("#cancelar").click(function(){
        validarCancelar(PAGINA);
    });
    
    $("#guardar").click(function(){
        if(AGREGAR)
        {
            agregarMovil();
        }
        else
        {
            modificarMovil();
        }
    });
    
    $("#busqueda").keyup(function(){
        buscarMovil();
    });
    
    $("#eliminar").click(function (){
        confirmar("Eliminar veh&iacute;culo",
            "Esta seguro que desea eliminar el veh&iacute;culo "+$("#patente").val(),
            function(){
                eliminarMovil();
            },null);
    });
});

function agregarMovil()
{
    var patente = $("#patente").val();
    var marca = $("#marca").val();
    var nombre = $("#nombre").val();
    var modelo = $("#modelo").val();
    var anio = $("#anio").val();
    var color = $("#color").val();
    var cantidad = $("#cantidad").val();
    var clase = $("#clase").val();
    var conductor = $("#conductores").val();
    var gps = $("#gps").val();
    var celular = $("#celular").val();
    var app = $("#app").val();
    var tipo = $("#tipo").val();
    var venPerCir = $("#venPerCir").val();
    var venRevTec = $("#venRevTec").val();
    var venExt = $("#venExt").val();
    var kilo = $("#kilo").val() === '' ? '0' : $("#kilo").val();
    var motor = $("#motor").val();
    var chasis = $("#chasis").val();
    var segOb;
    if($("#SegObSi").is(':checked'))
    {
        segOb = 'SI';
    }
    else if($("#SegObNo").is(':checked'))
    {
        segOb = 'NO';
    }
    else
    {
        segOb = 'EXT';
    }
    var venSegOb = $("#venSegOb").val();
    var polizaSegOb = $("#polizaSegOb").val();
    var valorSegOb = $("#valorSegOb").val();
    var segRcDm;
    if($("#SegRcDmSi").is(':checked'))
    {
        segRcDm = 'SI';
    }
    else if($("#SegRcDmNo").is(':checked'))
    {
        segRcDm = 'NO';
    }
    else
    {
        segRcDm = 'EXT';
    }
    var venSegRcDm = $("#venSegRcDm").val();
    var polizaSegRcDm = $("#polizaSegRcDm").val();
    var valorSegRcDm =  $("#valorSegRcDm").val();
    var segAs;
    if($("#SegAsSi").is(':checked'))
    {
        segAs = 'SI';
    }
    else if($("#SegAsNo").is(':checked'))
    {
        segAs = 'NO';
    }
    else
    {
        segAs = 'EXT';
    }
    var venSegAs = $("#venSegAs").val();
    var polizaSegAs = $("#polizaSegAs").val();
    var valorSegAs =  $("#valorSegAs").val();
    var segRcExceso;
    if($("#SegRcExcesoSi").is(':checked'))
    {
        segRcExceso = 'SI';
    }
    else if($("#SegRcExcesoNo").is(':checked'))
    {
        segRcExceso = 'NO';
    }
    else
    {
        segRcExceso = 'EXT';
    }
    var venSegRcExceso = $("#venSegRcExceso").val();
    var polizaSegRcExceso = $("#polizaSegRcExceso").val();
    var valorSegRcExceso =  $("#valorSegRcExceso").val();
    var array = [patente,marca,nombre,modelo,anio,color,cantidad,clase,gps,celular,app,
        venPerCir,venRevTec,venExt,motor,chasis,
        segOb,venSegOb,polizaSegOb,valorSegOb,segRcDm,venSegRcDm,polizaSegRcDm,valorSegRcDm,
        segAs,venSegAs,polizaSegAs,valorSegAs,segRcExceso,venSegRcExceso,polizaSegRcExceso,valorSegRcExceso];
    var exp = obtenerExcepciones();
    if(!validarCamposOr(array,exp))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(ADJUNTANDO)
    {
            alertify.error("Espere a que se adjunten los documentos");
        return;
    }
    if(validarTipoDato())
    {
        var archivoContrato1 = $("#contratoOculta1").val();
        var archivoContrato2 = $("#contratoOculta2").val();
        var archivoContrato3 = $("#contratoOculta3").val();
        var archivoContrato4 = $("#contratoOculta4").val();
        var archivoContrato5 = $("#contratoOculta5").val();
        var archivoContrato6 = $("#contratoOculta6").val();
        var archivoContrato7 = $("#contratoOculta7").val();
        var archivoContrato8 = $("#contratoOculta8").val();

        var params = {patente : patente, marca : marca, nombre : nombre, modelo : modelo, anio : anio,
                    color : color, cantidad : cantidad , clase : clase, conductor : conductor,  gps : gps,
                    celular : celular, app : app, tipo : tipo, venpercir : venPerCir, 
                    venrevtec : venRevTec, venext : venExt, kilo : kilo, motor : motor, chasis : chasis,
                    segob : segOb, vensegob : venSegOb, polizasegob : polizaSegOb, valorsegob : valorSegOb, segrcdm : segRcDm,
                    vensegrcdm : venSegRcDm, polizasegrcdm : polizaSegRcDm, valorsegrcdm : valorSegRcDm,segas : segAs,
                    vensegas : venSegAs, polizasegas : polizaSegAs, valorsegas : valorSegAs,segrcexceso : segRcExceso,
                    vensegrcexceso : venSegRcExceso, polizasegrcexceso : polizaSegRcExceso, valorsegrcexceso : valorSegRcExceso,
                    adjuntoPerCir : archivoContrato1, adjuntoRevTec : archivoContrato2, adjuntoNMotor : archivoContrato3,
                    adjuntoSeremi : archivoContrato4, adjuntoSegOb : archivoContrato5, adjuntoSegRcDm : archivoContrato6,
                    adjuntoSegAs : archivoContrato7, adjuntoSegExceso : archivoContrato8};
        var url = urlBase + "/movil/AddMovil.php";
    };
    var success = function(response)
    {
        ID_MOVIL = undefined;
        cerrarSession(response);
        alertify.success("Veh&iacute;culo Agregado");
        cambiarPestaniaGeneral();
        vaciarFormulario();
        resetFormulario();
        buscarMovil();
        buscarConductores();
        $(".contenedor_contrato_movil").html("");
    };
    postRequest(url,params,success);
}

function modificarMovil()
{
    var id = ID_MOVIL;
    var patente = $("#patente").val();
    var marca = $("#marca").val();
    var nombre = $("#nombre").val();
    var modelo = $("#modelo").val();
    var anio = $("#anio").val();
    var color = $("#color").val();
    var cantidad = $("#cantidad").val();
    var clase = $("#clase").val();
    var conductor = $("#conductores").val();
    var gps = $("#gps").val();
    var celular = $("#celular").val();
    var app = $("#app").val();
    var tipo = $("#tipo").val();
    var venPerCir = $("#venPerCir").val();
    var venRevTec = $("#venRevTec").val();
    var venExt = $("#venExt").val();
    var kilo = $("#kilo").val() === '' ? '0' : $("#kilo").val();
    var motor = $("#motor").val();
    var chasis = $("#chasis").val();
    var segOb;
    if($("#SegObSi").is(':checked'))
    {
        segOb = 'SI';
    }
    else if($("#SegObNo").is(':checked'))
    {
        segOb = 'NO';
    }
    else
    {
        segOb = 'EXT';
    }
    var venSegOb = $("#venSegOb").val();
    var polizaSegOb = $("#polizaSegOb").val();
    var valorSegOb = $("#valorSegOb").val();
    var segRcDm;
    if($("#SegRcDmSi").is(':checked'))
    {
        segRcDm = 'SI';
    }
    else if($("#SegRcDmNo").is(':checked'))
    {
        segRcDm = 'NO';
    }
    else
    {
        segRcDm = 'EXT';
    }
    var venSegRcDm = $("#venSegRcDm").val();
    var polizaSegRcDm = $("#polizaSegRcDm").val();
    var valorSegRcDm = $("#valorSegRcDm").val();
    var segAs;
    if($("#SegAsSi").is(':checked'))
    {
        segAs = 'SI';
    }
    else if($("#SegAsNo").is(':checked'))
    {
        segAs = 'NO';
    }
    else
    {
        segAs = 'EXT';
    }
    var venSegAs = $("#venSegAs").val();
    var polizaSegAs = $("#polizaSegAs").val();
    var valorSegAs = $("#valorSegAs").val();
    var segRcExceso;
    if($("#SegRcExcesoSi").is(':checked'))
    {
        segRcExceso = 'SI';
    }
    else if($("#SegRcExcesoNo").is(':checked'))
    {
        segRcExceso = 'NO';
    }
    else
    {
        segRcExceso = 'EXT';
    }
    var venSegRcExceso = $("#venSegRcExceso").val();
    var polizaSegRcExceso = $("#polizaSegRcExceso").val();
    var valorSegRcExceso =  $("#valorSegRcExceso").val();
    var array = [patente,marca,nombre,modelo,anio,color,cantidad,clase,gps,celular,app,
        venPerCir,venRevTec,venExt,motor,chasis,
        segOb,venSegOb,polizaSegOb,valorSegOb,segRcDm,venSegRcDm,polizaSegRcDm,valorSegRcDm,
        segAs,venSegAs,polizaSegAs,valorSegAs,segRcExceso,venSegRcExceso,polizaSegRcExceso,valorSegRcExceso];
    var exp = obtenerExcepciones();
    if(!validarCamposOr(array,exp))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(ADJUNTANDO)
    {
            alertify.error("Espere a que se adjunten los documentos");
        return;
    }
    if(validarTipoDato())
    {
        var archivoContrato1 = $("#contratoOculta1").val();
        var archivoContrato2 = $("#contratoOculta2").val();
        var archivoContrato3 = $("#contratoOculta3").val();
        var archivoContrato4 = $("#contratoOculta4").val();
        var archivoContrato5 = $("#contratoOculta5").val();
        var archivoContrato6 = $("#contratoOculta6").val();
        var archivoContrato7 = $("#contratoOculta7").val();
        var archivoContrato8 = $("#contratoOculta8").val();
        var params = {patente : patente, marca : marca, nombre : nombre, modelo : modelo, anio : anio,
                    color : color, cantidad : cantidad , clase : clase, conductor : conductor,  gps : gps,
                    celular : celular, app : app, tipo : tipo,venpercir : venPerCir, 
                    venrevtec : venRevTec, venext : venExt, kilo : kilo, motor : motor, chasis : chasis,
                    segob : segOb, vensegob : venSegOb, polizasegob : polizaSegOb, valorsegob : valorSegOb, segrcdm : segRcDm,
                    vensegrcdm : venSegRcDm, polizasegrcdm : polizaSegRcDm, valorsegrcdm : valorSegRcDm,segas : segAs,
                    vensegas : venSegAs, polizasegas : polizaSegAs, valorsegas : valorSegAs,segrcexceso : segRcExceso,
                    vensegrcexceso : venSegRcExceso, polizasegrcexceso : polizaSegRcExceso, valorsegrcexceso : valorSegRcExceso,
                    adjuntoPerCir : archivoContrato1, adjuntoRevTec : archivoContrato2, adjuntoNMotor : archivoContrato3,
                    adjuntoSeremi : archivoContrato4, adjuntoSegOb : archivoContrato5, adjuntoSegRcDm : archivoContrato6,
                    adjuntoSegAs : archivoContrato7,adjuntoSegExceso : archivoContrato8}; 
        var url = urlBase + "/movil/ModMovil.php";
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Veh&iacute;culo Modificado");
            resetFormulario();
            buscarMovil();
            buscarConductores();
        };
        postRequest(url,params,success);
    }
}

function buscarMovil(cargar = false)
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/movil/GetMoviles.php";
    var success = function(response)
    {
        cerrarSession(response);
        var grupos = $("#lista_busqueda_movil");
        var moviles = $("#lista_busqueda_movil_detalle");
        grupos.html("");
        moviles.html("");
        grupos.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\"col_2\" onClick=\"cambiarFila('2')\">Todos</div>");
        grupos.append("<div class=\"fila_contenedor\" id=\"col_0\" onClick=\"cambiarFila('0')\">Internos</div>");
        grupos.append("<div class=\"fila_contenedor\" id=\"col_1\" onClick=\"cambiarFila('1')\">Externos</div>");
        MOVILES = response;
        if(response.length === 0)
        {
            moviles.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
            alertify.error("No hay registros que mostrar");
            return;
        }
        moviles.append("<div class=\"contenedor_central_titulo movil_tabla\"><div></div><div>Patente</div><div>Nombre</div><div>Marca</div><div class=\"fila_oculta\">Tipo</div><div></div></div>");
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].movil_id;
            var patente = response[i].movil_patente;
            var nombre = response[i].movil_nombre;
            var marca = response[i].movil_marca;
            var grupo = '';
            if(response[i].movil_tipo === '0')
            {
                grupo = 'Interno';
            }
            else if(response[i].movil_tipo === '1')
            {
                grupo = 'Externo';
            }
            moviles.append("<div class=\"fila_contenedor fila_contenedor_servicio movil_tabla_valor\" id=\""+id+"\">"+
                    "<div onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+patente+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+marca+"</div>"+
                    "<div class=\"fila_oculta\" onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+grupo+"</div>"+
                    "<div><img onclick=\"preEliminarMovil('"+patente+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success,cargar);
}

function cambiarFila(id)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de veh&iacute;culo",
        "¿Desea cambiar de veh&iacute;culo sin guardar los cambios?",
        function()
        {
            MODIFICADO = false;
            //abrirModificar(id);
            if(id === '2')
            {
                buscarMovilTodo();
            }
            else
            {
                buscarMovilTipo(id);
            }
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        if(id === '2')
        {
            buscarMovilTodo();
        }
        else
        {
            buscarMovilTipo(id);
        }
    }
}
function buscarMovilTipo(tipo)
{
    TIPO_GRUPO = tipo;
    marcarFilaActiva("col_"+tipo);
    var moviles = $("#lista_busqueda_movil_detalle");
    moviles.html("");
    moviles.append("<div class=\"contenedor_central_titulo movil_tabla\"><div></div><div>Patente</div><div>Nombre</div><div>Marca</div><div class=\"fila_oculta\">Tipo</div><div></div></div>");
    var noHayRegistros = true;
    for(var i = 0 ; i < MOVILES.length; i++)
    {
        if(MOVILES[i].movil_tipo === tipo)
        {
            noHayRegistros = false;
            var id = MOVILES[i].movil_id;
            var patente = MOVILES[i].movil_patente;
            var nombre = MOVILES[i].movil_nombre;
            var marca = MOVILES[i].movil_marca;
            var grupo = '';
            if(MOVILES[i].movil_tipo === '0')
            {
                grupo = 'Interno';
            }
            else if(MOVILES[i].movil_tipo === '1')
            {
                grupo = 'Externo';
            }
            moviles.append("<div class=\"fila_contenedor fila_contenedor_servicio movil_tabla_valor\" id=\""+id+"\">"+
                    "<div onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+patente+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+marca+"</div>"+
                    "<div class=\"fila_oculta\" onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+grupo+"</div>"+
                    "<div><img onclick=\"preEliminarMovil('"+patente+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    }
    if(noHayRegistros)
    {
        moviles.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        alertify.error("No hay registros que mostrar");
        return;
    }
}
function buscarMovilTodo()
{
    TIPO_GRUPO = '2';
    marcarFilaActiva("col_2");
    var moviles = $("#lista_busqueda_movil_detalle");
    moviles.html("");
    moviles.append("<div class=\"contenedor_central_titulo movil_tabla\"><div></div><div>Patente</div><div>Nombre</div><div>Marca</div><div class=\"fila_oculta\">Tipo</div><div></div></div>");
    var noHayRegistros = true;
    for(var i = 0 ; i < MOVILES.length; i++)
    {
        noHayRegistros = false;
        var id = MOVILES[i].movil_id;
        var patente = MOVILES[i].movil_patente;
        var nombre = MOVILES[i].movil_nombre;
        var marca = MOVILES[i].movil_marca;
        var grupo = '';
        if(MOVILES[i].movil_tipo === '0')
        {
            grupo = 'Interno';
        }
        else if(MOVILES[i].movil_tipo === '1')
        {
            grupo = 'Externo';
        }
        moviles.append("<div class=\"fila_contenedor fila_contenedor_servicio movil_tabla_valor\" id=\""+id+"\">"+
                "<div onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+patente+"</div>"+
                "<div onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+nombre+"</div>"+
                "<div onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+marca+"</div>"+
                "<div class=\"fila_oculta\" onClick=\"abrirModificar('"+id+"','"+patente+"','"+nombre+"')\">"+grupo+"</div>"+
                "<div><img onclick=\"preEliminarMovil('"+patente+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                "</div>");
    }
    if(noHayRegistros)
    {
        moviles.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        alertify.error("No hay registros que mostrar");
        return;
    }
}
function abrirModificar(id,patente,nombre)
{
    ID_MOVIL = id;
    AGREGAR = false;
    $("#lista_busqueda_movil_detalle").load("html/datos_movil.html", function( response, status, xhr ) {
        $("#titulo_pagina_vehiculo").text(patente + " ("+nombre+")");
        iniciarPestanias();
        cambioEjecutado();
        iniciarFecha(['#venPerCir','#venRevTec','#venExt','#venSegOb','#venSegRcDm','#venSegAs','#venSegRcExceso']);
        $("#volver").click(function(){
            if(typeof TIPO_GRUPO === 'undefined')
            {
                buscarMovil();
            }
            else if(TIPO_GRUPO === '0' || TIPO_GRUPO === '1')
            {
                buscarMovilTipo(TIPO_GRUPO);
            }
            else if(TIPO_GRUPO === '2')
            {
                buscarMovilTodo();
            }
            cambiarPropiedad($("#agregar"),"visibility","visible");
            cambiarPropiedad($("#guardar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
        });
        var movil;
        for(var i = 0 ; i < MOVILES.length; i++)
        {
            if(MOVILES[i].movil_id === id)
            {
                movil = MOVILES[i];
            }
        }
        $("#patente").val(movil.movil_patente);
        $("#nombre").val(movil.movil_nombre);
        $("#patente").prop("readonly",true);
        $("#marca").val(movil.movil_marca);
        $("#modelo").val(movil.movil_modelo);
        $("#anio").val(movil.movil_anio);
        $("#color").val(movil.movil_color);
        $("#cantidad").val(movil.movil_cantidad);
        $("#clase").val(movil.movil_clase);
        $("#gps").val(movil.movil_gps);
        $("#celular").val(movil.movil_celular);
        $("#app").val(movil.movil_app);
        $("#tipo").val(movil.movil_tipo);
        $("#venPerCir").val(movil.movil_ven_per_cir);
        $("#venRevTec").val(movil.movil_ven_rev_tec);
        $("#venExt").val(movil.movil_ven_ext);
        $("#kilo").val(movil.movil_kilo);
        $("#motor").val(movil.movil_motor);
        $("#chasis").val(movil.movil_chasis);
        if(movil.movil_seg_ob !== 'NO')
        {
            if(movil.movil_seg_ob === 'SI')
            {
                $("#SegObSi").prop("checked",true);
            }
            if(movil.movil_seg_ob === 'EXT')
            {
                $("#SegObEx").prop("checked",true);
            }
            $("#venSegOb").prop("disabled",false);
            $("#polizaSegOb").prop("disabled",false);
            $("#valorSegOb").prop("disabled",false);
            $("#venSegOb").val(movil.movil_ven_seg_ob);
        }
        else
        {
            $("#venSegOb").val("");
        }
        $("#polizaSegOb").val(movil.movil_pol_seg_ob); 
        $("#valorSegOb").val(movil.movil_seg_ob_valor); 
        if(movil.movil_seg_rcdm !== 'NO')
        {
            if(movil.movil_seg_rcdm === 'SI')
            {
                $("#SegRcDmSi").prop("checked",true);
            }
            if(movil.movil_seg_rcdm === 'EXT')
            {
                $("#SegRcDmEx").prop("checked",true);
            }
            $("#venSegRcDm").prop("disabled",false);
            $("#polizaSegRcDm").prop("disabled",false);
            $("#valorSegRcDm").prop("disabled",false);
            $("#venSegRcDm").val(movil.movil_ven_seg_rcdm);
        }
        else
        {
            $("#venSegRcDm").val("");
        }
        $("#polizaSegRcDm").val(movil.movil_pol_seg_rcdm); 
        $("#valorSegRcDm").val(movil.movil_seg_rcdm_valor); 
        if(movil.movil_seg_as !== 'NO')
        {
            if(movil.movil_seg_as === 'SI')
            {
                $("#SegAsSi").prop("checked",true);
            }
            if(movil.movil_seg_as === 'EXT')
            {
                $("#SegAsEx").prop("checked",true);
            }
            $("#venSegAs").prop("disabled",false);
            $("#venSegAs").val("");
            $("#polizaSegAs").prop("disabled",false);
            $("#valorSegAs").prop("disabled",false);
            $("#venSegAs").val(movil.movil_ven_seg_as);
        }
        else
        {
            $("#venSegAs").val("");
        }
        $("#polizaSegAs").val(movil.movil_pol_seg_as); 
        $("#valorSegAs").val(movil.movil_seg_as_valor); 
        if(movil.movil_seg_rcexceso !== 'NO')
        {
            if(movil.movil_seg_rcexceso === 'SI')
            {
                $("#SegRcExcesoSi").prop("checked",true);
            }
            if(movil.movil_seg_rcexceso === 'EXT')
            {
                $("#SegRcExcesoEx").prop("checked",true);
            }
            $("#venSegRcExceso").prop("disabled",false);
            $("#venSegRcExceso").val("");
            $("#polizaSegRcExceso").prop("disabled",false);
            $("#valorSegRcExceso").prop("disabled",false);
            $("#venSegRcExceso").val(movil.movil_ven_seg_rcexceso);
        }
        else
        {
            $("#venSegRcExceso").val("");
        }
        $("#polizaSegRcExceso").val(movil.movil_pol_seg_rcexceso); 
        $("#valorSegRcExceso").val(movil.movil_seg_rcexceso_valor); 
        $("#conductor").val(movil.movil_conductor);
        ID_CONDUCTOR = movil.movil_conductor;
        buscarConductores();
        var percir = movil.movil_adj_per_cir;
        var revtec = movil.movil_adj_rev_tec;
        var nmotor = movil.movil_adj_n_motor;
        var seremi = movil.movil_adj_seremi;
        var segOb = movil.movil_adj_seg_ob;
        var segRcDm = movil.movil_adj_seg_rcdm;
        var segAs = movil.movil_adj_seg_as;
        var segRcExceso = movil.movil_adj_seg_exceso;
        verAdjunto(percir,1);
        verAdjunto(revtec,2),
        verAdjunto(nmotor,3);
        verAdjunto(seremi,4);
        verAdjunto(segOb,5);
        verAdjunto(segRcDm,6);
        verAdjunto(segAs,7);
        verAdjunto(segRcExceso,8);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
        iniciarEventosCheck();
    });
}

function eliminarMovil()
{
    var patente = $("#patente").val();
    var params = {patente : patente, id : ID_MOVIL};
    var url = urlBase + "/movil/DelMovil.php";
    var success = function(response)
    {
        alertify.success("Veh&iacute;culo eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        resetBotones();
        buscarMovil();
        buscarConductores();
    };
    postRequest(url,params,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < MOVILES.length ; i++)
    {
        if(tipo === 'patente')
        {
            if(valor === MOVILES[i].movil_patente)
            {
                return true;
            }
        }
    }    
}
function validarTipoDato()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var patente = $("#patente");
    var anio = $("#anio");
    var kilo = $("#kilo");
    var cantidad = $("#cantidad");
    var motor = $("#motor");
    var chasis = $("#chasis");
    var polizaSegOb = $("#polizaSegOb");
    var polizaSegRcDm = $("#polizaSegRcDm");
    var polizaSegAs = $("#polizaSegAs");
    var polizaSegRcExceso = $("#polizaSegRcExceso");
    var valorSegOb = $("#valorSegOb");
    var valorSegRcDm = $("#valorSegRcDm");
    var valorSegAs = $("#valorSegAs");
    var valorSegRcExceso = $("#valorSegRcExceso");
    var gps = $("#gps");
    var celular = $("#celular");
    var app = $("#app");
    if(!validarPatente(patente.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(patente);
        alertify.error('Patente invalida');
        return false;
    }
    else
    {
        marcarCampoOk(patente);
    }
    if(!validarNumero(anio.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(anio);
        alertify.error('A&ntilde;o debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(anio);
    }
    if(!validarNumero(cantidad.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(cantidad);
        alertify.error('Cantidad debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(anio);
    }
    if(!validarNumero(gps.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(gps);
        alertify.error('Descuento GPS debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(gps);
    }
    if(!validarNumero(celular.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(celular);
        alertify.error('Descuento Celular debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(celular);
    }
    if(!validarNumero(app.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(app);
        alertify.error('Descuento Celular debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(app);
    }
    if(!validarNumero(kilo.val()))
    {
        cambiarPestaniaFicha();
        marcarCampoError(kilo);
        alertify.error('Kilometraje debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(kilo);
    }
    if(!validarNumero(motor.val()))
    {
        cambiarPestaniaFicha();
        marcarCampoError(motor);
        alertify.error('N° Motor debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(motor);
    }
    if(!validarNumero(chasis.val()))
    {
        cambiarPestaniaFicha();
        marcarCampoError(chasis);
        alertify.error('N° Chasis debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(chasis);
    }
    if(!validarNumero(polizaSegOb.val()))
    {
        cambiarPestaniaSeguro();
        marcarCampoError(polizaSegOb);
        alertify.error('N° Poliza Seguro Obligatorio debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(polizaSegOb);
    }
    if(!validarNumero(polizaSegRcDm.val()))
    {
        cambiarPestaniaSeguro();
        marcarCampoError(polizaSegRcDm);
        alertify.error('N° Poliza Seguro RC+DM debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(polizaSegRcDm);
    }
    if(!validarNumero(polizaSegAs.val()))
    {
        cambiarPestaniaSeguro();
        marcarCampoError(polizaSegAs);
        alertify.error('N° Poliza Seguro Asientos debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(polizaSegAs);
    }
    if(!validarNumero(polizaSegRcExceso.val()))
    {
        cambiarPestaniaSeguro();
        marcarCampoError(polizaSegRcExceso);
        alertify.error('N° Poliza Seguro RC Exceso debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(polizaSegRcExceso);
    }
    if(!validarNumero(valorSegOb.val()))
    {
        cambiarPestaniaSeguro();
        marcarCampoError(valorSegOb);
        alertify.error('Valor Seguro Obligatorio debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(valorSegOb);
    }
    if(!validarNumero(valorSegRcDm.val()))
    {
        cambiarPestaniaSeguro();
        marcarCampoError(valorSegRcDm);
        alertify.error('Valor Seguro RC+DM debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(valorSegRcDm);
    }
    if(!validarNumero(valorSegRcExceso.val()))
    {
        cambiarPestaniaSeguro();
        marcarCampoError(valorSegRcExceso);
        alertify.error('Valor Seguro RC Exceso debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(valorSegRcExceso);
    }
    if(!validarNumero(valorSegAs.val()))
    {
        cambiarPestaniaSeguro();
        marcarCampoError(valorSegAs);
        alertify.error('Valor Seguro Asientos debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(valorSegAs);
    }
    return true;
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_ficha").click(function(){
        cambiarPestaniaFicha();
    });
    $("#p_seguro").click(function(){
        cambiarPestaniaSeguro();
    });
    $("#p_conductor").click(function(){
        cambiarPestaniaConductor();
        cargarConductores();
    });
    $("#p_documento").click(function(){
        cambiarPestaniaDocumento();
    });
}

function activarPestania(array)
{
    var general = false;
    var ficha = false;
    var seguro = false;
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        if(array[i] === '')
        {
            if(i < 10)
            {
                general = true;
            }
            if(i > 10 && i < 16)
            {
                if(!general)
                {
                    ficha = true;
                }
            }
            if(i > 15)
            {
                if(!ficha)
                {
                    seguro = true;
                }
            }
            marcarCampoError($("#"+CAMPOS[i]));
        }
        else
        {
            marcarCampoOk($("#"+CAMPOS[i]));
        }
    }
    
    if(general)
    {
        cambiarPestaniaGeneral();
    }
    else if(ficha)
    {
        cambiarPestaniaFicha();
    }
    else if(seguro)
    {
        cambiarPestaniaSeguro();
    }
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_ficha"),"display","none");
    cambiarPropiedad($("#cont_seguro"),"display","none");
    cambiarPropiedad($("#cont_documento"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_ficha"),"dispose");
    agregarclase($("#p_seguro"),"dispose");
    agregarclase($("#p_documento"),"dispose");
}
function cambiarPestaniaFicha()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_ficha"),"display","block");
    cambiarPropiedad($("#cont_seguro"),"display","none");
    cambiarPropiedad($("#cont_documento"),"display","none");
    quitarclase($("#p_ficha"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_seguro"),"dispose");
    agregarclase($("#p_documento"),"dispose");
}
function cambiarPestaniaSeguro()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_ficha"),"display","none");
    cambiarPropiedad($("#cont_seguro"),"display","block");
    cambiarPropiedad($("#cont_documento"),"display","none");
    quitarclase($("#p_seguro"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_ficha"),"dispose");
    agregarclase($("#p_documento"),"dispose");
}

function cambiarPestaniaDocumento()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_ficha"),"display","none");
    cambiarPropiedad($("#cont_seguro"),"display","none");
    cambiarPropiedad($("#cont_documento"),"display","block");
    quitarclase($("#p_documento"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_ficha"),"dispose");
    agregarclase($("#p_seguro"),"dispose");
}

function buscarConductores()
{
    var params = {busqueda : ""};
    var url = urlBase + "/conductor/GetConductores.php";
    var success = function(response)
    {
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].conductor_id;
            var nombre = response[i].conductor_nombre + " " + response[i].conductor_papellido;
            var sel = "";
            if(id === ID_CONDUCTOR)
            {
                sel = " selected";
                $("#conductores").append("<option value=\""+id+"\" "+sel+">"+id+" - "+nombre+"</option>");                
            }
            else
            {
                $("#conductores").append("<option value=\""+id+"\" "+sel+">"+id+" - "+nombre+"</option>");                
            }
        }
    };
    postRequest(url,params,success);
}

function obtenerExcepciones()
{
    var exp = "";
    if($("#SegObNo").is(':checked'))
    {
        exp += '||17||18||19||';
    }
    if($("#SegRcDmNo").is(':checked'))
    {
        exp += '||21||22||23||';
    }
    if($("#SegAsNo").is(':checked'))
    {
        exp += '||25||26||27||';
    }
    if($("#SegRcExcesoNo").is(':checked'))
    {
        exp += '||29||30||31||';
    }
    return exp;
}

function succesSubirContrato(id)
{
    var archivo = $("#contratoOculta"+id).val();
    var ext = archivo.split("\.")[1];
    if(ext !== 'pdf'){
        alertify.error("Archivo invalido");
        return;
    }
    else
    {
        var enlace = "<a href=\"source/util/pdf/"+$("#patente").val()+"_"+archivo+"\" target=\"_blanck\">Ver</a>";
        $("#contenedor_contrato"+id).html(enlace);
    }
}


function iniciarEventosCheck()
{
    $("#SegObSi").click(function(){
        $("#venSegOb").prop("disabled",false);
        $("#polizaSegOb").prop("disabled",false);        
        $("#valorSegOb").prop("disabled",false); 
    });
    $("#SegObNo").click(function(){
        $("#venSegOb").prop("disabled",true);        
        $("#polizaSegOb").prop("disabled",true);        
        $("#valorSegOb").prop("disabled",true);        
        $("#venSegOb").val("");
        $("#polizaSegOb").val("");
        $("#valorSegOb").val("");
    });
    $("#SegObEx").click(function(){
        $("#venSegOb").prop("disabled",false);
        $("#polizaSegOb").prop("disabled",false);        
        $("#valorSegOb").prop("disabled",false); 
    });
    $("#SegRcDmSi").click(function(){
        $("#venSegRcDm").prop("disabled",false);
        $("#polizaSegRcDm").prop("disabled",false);
        $("#valorSegRcDm").prop("disabled",false);
    });
    $("#SegRcDmNo").click(function(){
        $("#venSegRcDm").prop("disabled",true);
        $("#polizaSegRcDm").prop("disabled",true);
        $("#valorSegRcDm").prop("disabled",true);
        $("#venSegRcDm").val("");
        $("#polizaSegRcDm").val("");
        $("#valorSegRcDm").val("");
    });
    $("#SegRcDmEx").click(function(){
        $("#venSegRcDm").prop("disabled",false);
        $("#polizaSegRcDm").prop("disabled",false);
        $("#valorSegRcDm").prop("disabled",false);
    });
    $("#SegAsSi").click(function(){
        $("#venSegAs").prop("disabled",false);
        $("#polizaSegAs").prop("disabled",false);
        $("#valorSegAs").prop("disabled",false);
    });
    $("#SegAsNo").click(function(){
        $("#venSegAs").prop("disabled",true);
        $("#polizaSegAs").prop("disabled",true);
        $("#valorSegAs").prop("disabled",true);
        $("#venSegAs").val("");
        $("#polizaSegAs").val("");
        $("#valorSegAs").val("");
    });
    $("#SegAsEx").click(function(){
        $("#venSegAs").prop("disabled",false);
        $("#polizaSegAs").prop("disabled",false);
        $("#valorSegAs").prop("disabled",false);
    });
    $("#SegRcExcesoSi").click(function(){
        $("#venSegRcExceso").prop("disabled",false);
        $("#polizaSegRcExceso").prop("disabled",false);
        $("#valorSegRcExceso").prop("disabled",false);
    });
    $("#SegRcExcesoNo").click(function(){
        $("#venSegRcExceso").prop("disabled",true);
        $("#polizaSegRcExceso").prop("disabled",true);
        $("#valorSegRcExceso").prop("disabled",true);
        $("#venSegRcExceso").val("");
        $("#polizaSegRcExceso").val("");
        $("#valorSegRcExceso").val("");
    });
    $("#SegRcExcesoEx").click(function(){
        $("#venSegRcExceso").prop("disabled",false);
        $("#polizaSegExceso").prop("disabled",false);
        $("#valorSegRcExceso").prop("disabled",false);
    });
}

function preEliminarMovil(id)
{
    confirmar("Eliminar vehículo","Esta seguro que desea eliminar el vehículo "+id,
            function(){
                var params = {patente : id};
                var url = urlBase + "/movil/DelMovil.php";
                var success = function(response)
                {
                    alertify.success("Vehículo eliminado");
                    cerrarSession(response);
                    resetBotones();
                    buscarMovil();
                };
                postRequest(url,params,success);
            });
}