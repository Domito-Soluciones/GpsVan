/* global urlBase, alertify, ID_AGENTE */
var ID_MOVIL;
var MOVILES;
var AGREGAR = true;
var PAGINA = 'MOVILES';
var CAMPOS = ["patente","marca","nombre","modelo","anio","cantidad","clase",
    "venPerCir","venRevTec","venExt","motor","chasis",
    "segOb","venSegOb","polizaSegOb","segRcDm","venSegRcDm","polizaSegRcDm"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarMovil();
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
    var cantidad = $("#cantidad").val();
    var clase = $("#clase").val();
    var venPerCir = $("#venPerCir").val();
    var venRevTec = $("#venRevTec").val();
    var venExt = $("#venExt").val();
    var kilo = $("#kilo").val() === '' ? '0' : $("#kilo").val();
    var motor = $("#motor").val();
    var chasis = $("#chasis").val();
    var segOb = $("#SegObSi").val() === 'on' ? 'SI' : 'NO';
    var venSegOb = $("#venSegOb").val();
    var polizaSegOb = $("#polizaSegOb").val();
    var segRcDm = $("#SegRcDmSi").val() === 'on' ? 'SI' : 'NO';
    var venSegRcDm = $("#venSegRcDm").val();
    var polizaSegRcDm = $("#polizaSegRcDm").val();
//    var SegAd = $("#SegAd").val();
    var array = [patente,marca,nombre,modelo,anio,cantidad,clase,
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
        var data = "patente="+patente+"&marca="+marca+"&nombre="+nombre+"&modelo="+modelo+"&anio="+anio+"&cantidad="+cantidad+"&clase="+clase
                +"&venpercic="+venPerCir+"&venrevtec="+venRevTec+"&venext="+venExt+"&kilo="+kilo+"&motor="+motor+"&chasis="+chasis+
                "&segob="+segOb+"&vensegob="+venSegOb+"&polizasegob="+polizaSegOb+"&segrcdm="+segRcDm+"&vensegrcdm="+venSegRcDm+"&polizasercdm="+polizaSegRcDm; 
        var url = urlBase + "/movil/AddMovil.php?"+data;
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
    var cantidad = $("#cantidad").val();
    var clase = $("#clase").val();
    var venPerCir = $("#venPerCir").val();
    var venRevTec = $("#venRevTec").val();
    var venExt = $("#venExt").val();
    var kilo = $("#kilo").val() === '' ? '0' : $("#kilo").val();
    var motor = $("#motor").val();
    var chasis = $("#chasis").val();
    var segOb = $("#SegObSi").val() === 'on' ? 'SI' : 'NO';
    var venSegOb = $("#venSegOb").val();
    var polizaSegOb = $("#polizaSegOb").val();
    var segRcDm = $("#SegRcDmSi").val() === 'on' ? 'SI' : 'NO';
    var venSegRcDm = $("#venSegRcDm").val();
    var polizaSegRcDm = $("#polizaSegRcDm").val();
//    var SegAd = $("#SegAd").val();
    
    var array = [patente,marca,nombre,modelo,anio,cantidad,clase,
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
        var data = "id="+ID_MOVIL+"&patente="+patente+"&marca="+marca+"&nombre="+nombre+"&modelo="+modelo+
        "&anio="+anio+"&cantidad="+cantidad+"&clase="+clase+"&venrevtec="+venRevTec+"&segob="+segOb+"&vensegob="
        +venSegOb+"&segad="+SegAd+"&kilo="+kilo; 
        var url = urlBase + "/movil/ModMovil.php?"+data;
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            alertify.success("Veh&iacute;culo Modificado");
            resetFormulario();
            buscarMovil();
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
        $("#venRevTec").val(movil.movil_ven_rev_tec);
        $("#SegOb").val(movil.movil_seg_ob);
        $("#venSegOb").val(movil.movil_ven_seg_ob);
        $("#SegAd").val(movil.movil_seg_ad);
        $("#kilo").val(movil.movil_kilo);
        $("#cantidad").val(movil.movil_cantidad);
        $("#clase").val(movil.movil_clase);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarMovil()
{
    var patente = $("#patente").val();
    var url = urlBase + "/movil/DelMovil.php?patente="+patente;
    var success = function(response)
    {
        alertify.success("Veh&iacute;culo eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarMovil();
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
    if(!validarNumero(kilo.val()))
    {
        cambiarPestaniaSeguro();
        marcarCampoError(kilo);
        alertify.error('Kilometraje debe ser numerico');
        return false;
    }
    else
    {
        marcarCampoOk(kilo);
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
    if(!validarNumero(motor.val()))
    {
        cambiarPestaniaGeneral();
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
        cambiarPestaniaGeneral();
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
        cambiarPestaniaGeneral();
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
        cambiarPestaniaGeneral();
        marcarCampoError(polizaSegRcDm);
        alertify.error('N° Poliza Seguro RC-DM debe ser numerico');
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
            if(i < 7)
            {
                general = true;
            }
            if(i > 6 && i < 12)
            {
                if(!general)
                {
                    ficha = true;
                }
            }
            if(i > 11)
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