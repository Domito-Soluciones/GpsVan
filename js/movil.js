/* global urlBase, alertify, ID_AGENTE */
var ID_MOVIL;
var MOVILES;
var CONDUCTORES;
var MOVILES_CONDUCTORES = [];
var AGREGAR_CONDUCTORES = [];
var ELIMINAR_CONDUCTORES = [];
var AGREGAR = true;
var PAGINA = 'VEHÍCULOS';
var CAMPOS = ["patente","marca","nombre","modelo","anio","color","cantidad","clase",
    "venPerCir","venRevTec","venExt","motor","chasis",
    "segOb","venSegOb","polizaSegOb","segRcDm","venSegRcDm","polizaSegRcDm"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarMovil();
    buscarConductores();
    $("#agregar").click(function(){
        ID_MOVIL = undefined;
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_movil.html", function( response, status, xhr ) {
            iniciarPestanias();
            cambioEjecutado();
            iniciarFecha(['#venPerCir','#venRevTec','#venExt','#venSegOb','#venSegRcDm']);
            $("#patente").blur(function (){
                if(validarExistencia('patente',$(this).val()))
                {
                    alertify.error("La patente "+$(this).val()+" ya existe");
                    $("#patente").val("");
                    return;
                }
            });
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
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
        buscarMovil($(this).val());
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
    var venPerCir = $("#venPerCir").val();
    var venRevTec = $("#venRevTec").val();
    var venExt = $("#venExt").val();
    var kilo = $("#kilo").val() === '' ? '0' : $("#kilo").val();
    var motor = $("#motor").val();
    var chasis = $("#chasis").val();
    var segOb = $("#SegObSi").is(':checked') ? 'SI' : 'NO';
    var venSegOb = $("#venSegOb").val();
    var polizaSegOb = $("#polizaSegOb").val();
    var segRcDm = $("#SegRcDmSi").is(':checked') ? 'SI' : 'NO';
    var venSegRcDm = $("#venSegRcDm").val();
    var polizaSegRcDm = $("#polizaSegRcDm").val();
//    var SegAd = $("#SegAd").val();
    var array = [patente,marca,nombre,modelo,anio,color,cantidad,clase,
        venPerCir,venRevTec,venExt,motor,chasis,
        segOb,venSegOb,polizaSegOb,segRcDm,venSegRcDm,polizaSegRcDm];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "patente="+patente+"&marca="+marca+"&nombre="+nombre+"&modelo="+modelo+"&anio="+anio+"&color="+color+"&cantidad="+cantidad+"&clase="+clase
                +"&venpercir="+venPerCir+"&venrevtec="+venRevTec+"&venext="+venExt+"&kilo="+kilo+"&motor="+motor+"&chasis="+chasis+
                "&segob="+segOb+"&vensegob="+venSegOb+"&polizasegob="+polizaSegOb+"&segrcdm="+segRcDm+"&vensegrcdm="+venSegRcDm+"&polizasegrcdm="+polizaSegRcDm; 
        var url = urlBase + "/movil/AddMovil.php?"+data+"&conductores="+AGREGAR_CONDUCTORES+"&delConductor="+ELIMINAR_CONDUCTORES;
        var success = function(response)
        {
            ID_MOVIL = undefined;
            cerrarSession(response);
            alertify.success("Veh&iacute;culo Agregado");
            cambiarPestaniaGeneral();
            vaciarFormulario();
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario();
            buscarMovil();
            buscarConductores();
            AGREGAR_CONDUCTORES = [];
            ELIMINAR_CONDUCTORES = [];
        };
        postRequest(url,success);
    }
}

function modificarMovil()
{
    var patente = $("#patente").val();
    var marca = $("#marca").val();
    var nombre = $("#nombre").val();
    var modelo = $("#modelo").val();
    var anio = $("#anio").val();
    var color = $("#color").val();
    var cantidad = $("#cantidad").val();
    var clase = $("#clase").val();
    var venPerCir = $("#venPerCir").val();
    var venRevTec = $("#venRevTec").val();
    var venExt = $("#venExt").val();
    var kilo = $("#kilo").val() === '' ? '0' : $("#kilo").val();
    var motor = $("#motor").val();
    var chasis = $("#chasis").val();
    var segOb = $("#SegObSi").is(':checked') ? 'SI' : 'NO';
    var venSegOb = $("#venSegOb").val();
    var polizaSegOb = $("#polizaSegOb").val();
    var segRcDm = $("#SegRcDmSi").is(':checked') ? 'SI' : 'NO';
    var venSegRcDm = $("#venSegRcDm").val();
    var polizaSegRcDm = $("#polizaSegRcDm").val();
    
    var array = [patente,marca,nombre,modelo,anio,color,cantidad,clase,
        venPerCir,venRevTec,venExt,motor,chasis,
        segOb,venSegOb,polizaSegOb,segRcDm,venSegRcDm,polizaSegRcDm];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "id="+ID_MOVIL+"&patente="+patente+"&marca="+marca+"&nombre="+nombre+"&modelo="+modelo+"&anio="+anio+"&color="+color+"&cantidad="+cantidad+"&clase="+clase
        +"&venpercir="+venPerCir+"&venrevtec="+venRevTec+"&venext="+venExt+"&kilo="+kilo+"&motor="+motor+"&chasis="+chasis+
        "&segob="+segOb+"&vensegob="+venSegOb+"&polizasegob="+polizaSegOb+"&segrcdm="+segRcDm+"&vensegrcdm="+venSegRcDm+"&polizasegrcdm="+polizaSegRcDm; 
        var url = urlBase + "/movil/ModMovil.php?"+data+"&conductores="+AGREGAR_CONDUCTORES+"&delConductor="+ELIMINAR_CONDUCTORES;;
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            alertify.success("Veh&iacute;culo Modificado");
            resetFormulario();
            buscarMovil();
            buscarConductores();
            AGREGAR_CONDUCTORES = [];
            ELIMINAR_CONDUCTORES = [];
        };
        postRequest(url,success);
    }
}

function buscarMovil()
{
    var busqueda = $("#busqueda").val();
    var url = urlBase + "/movil/GetMoviles.php?busqueda="+busqueda;
    var success = function(response)
    {
        cerrarSession(response);
        var moviles = $("#lista_busqueda");
        moviles.html("");
        MOVILES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].movil_id;
            var patente = response[i].movil_patente;
            var nombre = response[i].movil_nombre;
            var titulo = recortar(nombre+" / "+patente);
            if (typeof ID_MOVIL !== "undefined" && ID_MOVIL === id)
            {
                moviles.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
                moviles.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
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
            abrirModificar(id);
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        abrirModificar(id);
    }
}

function abrirModificar(id)
{
    ID_MOVIL = id;
    AGREGAR = false;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_movil.html", function( response, status, xhr ) {
        iniciarPestanias();
        cambioEjecutado();
        iniciarFecha(['#venPerCir','#venRevTec','#venExt','#venSegOb','#venSegRcDm']);
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
        $("#venPerCir").val(movil.movil_ven_per_cir);
        $("#venRevTec").val(movil.movil_ven_rev_tec);
        $("#venExt").val(movil.movil_ven_ext);
        $("#kilo").val(movil.movil_kilo);
        $("#motor").val(movil.movil_motor);
        $("#chasis").val(movil.movil_chasis);
        $("#SegOb").val(movil.movil_seg_ob);
        $("#venSegOb").val(movil.movil_ven_seg_ob);
        $("#polizaSegOb").val(movil.movil_pol_seg_ob); 
        $("#SegRcDm").val(movil.movil_seg_rcdm);
        $("#venSegRcDm").val(movil.movil_ven_seg_rcdm);
        $("#polizaSegRcDm").val(movil.movil_pol_seg_rcdm); 
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarMovil()
{
    var patente = $("#patente").val();
    var url = urlBase + "/movil/DelMovil.php?patente="+patente+"&id="+ID_MOVIL;
    var success = function(response)
    {
        alertify.success("Veh&iacute;culo eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarMovil();
        buscarConductores();
    };
    getRequest(url,success);
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
            if(i < 8)
            {
                general = true;
            }
            if(i > 7 && i < 13)
            {
                if(!general)
                {
                    ficha = true;
                }
            }
            if(i > 12)
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
    cambiarPropiedad($("#cont_conductor"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_ficha"),"dispose");
    agregarclase($("#p_seguro"),"dispose");
    agregarclase($("#p_conductor"),"dispose");
}
function cambiarPestaniaFicha()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_ficha"),"display","block");
    cambiarPropiedad($("#cont_seguro"),"display","none");
    cambiarPropiedad($("#cont_conductor"),"display","none");
    quitarclase($("#p_ficha"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_seguro"),"dispose");
    agregarclase($("#p_conductor"),"dispose");
}
function cambiarPestaniaSeguro()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_ficha"),"display","none");
    cambiarPropiedad($("#cont_seguro"),"display","block");
    cambiarPropiedad($("#cont_conductor"),"display","none");
    quitarclase($("#p_seguro"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_ficha"),"dispose");
    agregarclase($("#p_conductor"),"dispose");
}
function cambiarPestaniaConductor()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_ficha"),"display","none");
    cambiarPropiedad($("#cont_seguro"),"display","none");
    cambiarPropiedad($("#cont_conductor"),"display","block");
    quitarclase($("#p_conductor"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_ficha"),"dispose");
    agregarclase($("#p_seguro"),"dispose");
}

function cargarConductores()
{
    var tablaMovil = $("#tablaContenidoConductor");
    tablaMovil.html("");
    cambiarPropiedad($("#loaderV"),"visibility","hidden");
    if (typeof CONDUCTORES !== "undefined")
    {
        if(CONDUCTORES.length === 0)
        {
            alertify.error("No hay conductores disponibles");    
        }
        for(var i = 0 ; i < CONDUCTORES.length; i++)
        {
            var id = CONDUCTORES[i].conductor_id;
            var rut = CONDUCTORES[i].conductor_rut;
            var nombre = CONDUCTORES[i].conductor_nombre;
            var papellido = CONDUCTORES[i].conductor_papellido;
            var movil = CONDUCTORES[i].conductor_movil;
            var asignacion = "";
            var claseAsignacion = "tablaFila";
            if(ID_MOVIL === movil)
            {
                asignacion = "<input type=\"radio\" onchange=\"agregarConductores($(this))\" name=\""+id+"\" value=\""+id+"\" checked>SI\n\
                              <input type=\"radio\" onchange=\"eliminarConductores($(this))\" name=\""+id+"\" value=\""+id+"\">NO";
            }
            else if(movil === '0')
            {

                asignacion = "<input type=\"radio\" onchange=\"agregarConductores($(this))\" name=\""+id+"\" value=\""+id+"\">SI\n\
                              <input type=\"radio\" onchange=\"eliminarConductores($(this))\" name=\""+id+"\" value=\""+id+"\" checked>NO";
            }
            else if (ID_MOVIL !== movil)
            {
                for(var j = 0; j < MOVILES.length ; j++)
                {
                    var c = MOVILES[j];
                    if(c.movil_id === movil)
                    {
                        asignacion = "Asignado a "+c.movil_nombre;
                        break;
                    }
                }
            }
            if(MOVILES_CONDUCTORES.indexOf(id) === -1)
            {
                tablaMovil.append("<div id=\""+id+"\" class=\""+claseAsignacion+"\"><div>"
                    +id+"</div><div>"+rut+"</div><div>"+nombre+"</div><div>"+papellido+"</div><div>"+asignacion+"</div></div>");
            }
        }
        if(tablaMovil.html() === "")
        {
            alertify.success("No hay conductores disponibles para asociar");
        }
    }
    cambiarPropiedad($("#loader"),"visibility","hidden");
}

function buscarConductores()
{
    var url = urlBase + "/conductor/GetConductores.php?busqueda=";
    var success = function(response)
    {
        cambiarPropiedad($("#loader"),"visibility","hidden");
        cerrarSession(response);
        CONDUCTORES = response;
    };
    getRequest(url,success);
}
function obtenerMovilesConductores()
{
    for (var i = 0; i < CONDUCTORES.length ; i++)
    {
        var movil = CONDUCTORES[i].conductor_movil;
        MOVILES_CONDUCTORES.push(movil);
    }
}
function agregarConductores(obj)
{
    if(obj.prop("checked"))
    {
        AGREGAR_CONDUCTORES.push(obj.val());
        for(var i = 0; i < ELIMINAR_CONDUCTORES.length; i++)
        {
            if(ELIMINAR_CONDUCTORES[i] === obj.val())
            {
                ELIMINAR_CONDUCTORES.splice(i, 1);
                break;
            }
        }
    }
}
function eliminarConductores(obj)
{
    if(obj.prop("checked"))
    {
        ELIMINAR_CONDUCTORES.push(obj.val());
        for(var i = 0; i < AGREGAR_CONDUCTORES.length; i++)
        {
            if(AGREGAR_CONDUCTORES[i] === obj.val())
            {
                AGREGAR_CONDUCTORES.splice(i, 1);
                break;
            }
        }
    }
}
