/* global urlBase, alertify */
var MOVILES;
var AGREGAR = true;
var PAGINA = 'MOVILES';
$(document).ready(function(){
    buscarMovil();
    $("#agregar").click(function(){
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_movil.html", function( response, status, xhr ) {
            iniciarPestanias();
            iniciarFecha(['#venRevTec','#venSegOb']);
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
        resetFormulario(PAGINA);
        resetBotones();
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
            alertify.confirm("Eliminar veh&iacute;culo","Esta seguro que desea eliminar el veh&iacute;culo "+$("#patente").val(),
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
    var venRevTec = $("#venRevTec").val();
    var segOb = $("#SegOb").val();
    var venSegOb = $("#venSegOb").val();
    var SegAd = $("#SegAd").val();
    var kilo = $("#kilo").val() === '' ? '0' : $("#kilo").val();
    var array = [patente,marca,nombre,modelo,anio,venRevTec,segOb,venSegOb];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "patente="+patente+"&marca="+marca+"&nombre="+nombre+"&modelo="+modelo+"&anio="+anio+
        "&venrevtec="+venRevTec+"&segob="+segOb+"&vensegob="+venSegOb+"&segad="+SegAd+"&kilo="+kilo; 
        var url = urlBase + "/movil/AddMovil.php?"+data;
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Veh&iacute;culo Agregado");
            vaciarFormulario($("#agregar input"));
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario(PAGINA);
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
    var venRevTec = $("#venRevTec").val();
    var segOb = $("#SegOb").val();
    var venSegOb = $("#venSegOb").val();
    var SegAd = $("#SegAd").val();
    var kilo = $("#kilo").val() === '' ? '0' : $("#kilo").val();
    var array = [patente,marca,nombre,modelo,anio,venRevTec,segOb,venSegOb];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "patente="+patente+"&marca="+marca+"&nombre="+nombre+"&modelo="+modelo+"&anio="+anio+
        "&venrevtec="+venRevTec+"&segob="+segOb+"&vensegob="+venSegOb+"&segad="+SegAd+"&kilo="+kilo; 
        var url = urlBase + "/movil/ModMovil.php?"+data;
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetBotones();
            cerrarSession(response);
            alertify.success("Veh&iacute;culo Modificado");
            vaciarFormulario($("#agregar input"));
            resetFormulario(PAGINA);
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
            moviles.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"abrirModificar('"+id+"')\">"+patente+"</div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function abrirModificar(id)
{
    AGREGAR = false;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_movil.html", function( response, status, xhr ) {
        iniciarPestanias();
        iniciarFecha(['#venRevTec','#venSegOb']);
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
        resetFormulario(PAGINA);
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
    var patente = $("#patente").val();
    var anio = $("#anio").val();
    var kilo = $("#kilo").val();
    if(!validarPatente(patente))
    {
        alertify.error('Patente invalida');
        return false;
    }
    if(!validarNumero(anio))
    {
        alertify.error('A&ntilde;o debe ser numerico');
        return false;
    }
    if(!validarNumero(kilo))
    {
        alertify.error('Kilometraje debe ser numerico');
        return false;
    }
    
    return true;
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPropiedad($("#cont_general"),"display","block");
        cambiarPropiedad($("#cont_seguro"),"display","none");
        quitarclase($(this),"dispose");
        agregarclase($("#p_seguro"),"dispose");
    });
    $("#p_seguro").click(function(){
        cambiarPropiedad($("#cont_general"),"display","none");
        cambiarPropiedad($("#cont_seguro"),"display","block");
        quitarclase($(this),"dispose");
        agregarclase($("#p_general"), "dispose");
    });
}
