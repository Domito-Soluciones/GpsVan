/* global urlBase, alertify */
var TRANSPORTISTAS;
var CONDUCTORES;
var MOVILES;
var AGREGAR = true;
var PAGINA = 'TRANSPORTISTAS';
var ID_TRANSPORTISTA;
var ARRAY_ELIMINAR_CONDUCTORES = [];
var ARRAY_ELIMINAR_MOVILES = [];
var CAMPOS = ["rut","razon","nombre","direccion","nombreContacto","telefono","mail","mail2"];
$(document).ready(function(){
    buscarTransportista();
    buscarConductores();
    buscarMoviles();
    $("#agregar").click(function(){
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_transportista.html", function( response, status, xhr ) {
            iniciarPestaniasTransportista();
            cambioEjecutado();
            $("#rut").blur(function (){
                if(validarExistencia('rut',$(this).val()))
                {
                    alertify.error("El rut "+$(this).val()+" ya existe");
                    $("#rut").val("");
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
            agregarTransportista();
        }
        else
        {
            modificarTransportista();
        }
    });
    $("#busqueda").keyup(function(){
        buscarTransportista($(this).val());
    });
    
    $("#eliminar").click(function (){
            confirmar("Eliminar transportista","Esta seguro que desea eliminar al transportista "+$("#rut").val(),
            function(){
                eliminarTransportista();
            },null);
    });
});

function agregarTransportista()
{
    var razon = $("#razon").val();
    var rut = $("#rut").val();
    var nombre = $("#nombre").val();
    var direccion = $("#direccion").val();
    var nombreContacto = $("#nombreContacto").val();
    var telefono = $("#telefono").val();
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    var array = [rut,razon,nombre,direccion,nombreContacto,telefono,mail,mail2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "razon="+razon+"&rut="+rut+"&nombre="+nombre+"&direccion="+
                direccion+"&nombre_contacto="+nombreContacto+
                "&telefono="+telefono+"&mail="+mail+"&mail2="+mail2;
        var conductores = "&conductores=";
        $("#tablaContenidoConductor .tablaFila").each(function(index) {
            conductores +=$(this).attr("id")+",";
        });
        var moviles = "&moviles=";
        $("#tablaContenidoMovil .tablaFila").each(function(index) {
            moviles +=$(this).attr("id")+",";
        });
        var url = urlBase+"/transportista/AddTransportista.php?"+data+conductores+moviles;
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Transportista Agregado");
            cambiarPestaniaGeneral();
            vaciarFormulario();
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario();
            buscarTransportista();
            buscarConductores();
            buscarMoviles();
        };
        postRequest(url,success);
    }
}

function modificarTransportista()
{
    var razon = $("#razon").val();
    var rut = $("#rut").val();
    var nombre = $("#nombre").val();
    var direccion = $("#direccion").val();
    var nombreContacto = $("#nombreContacto").val();
    var telefono = $("#telefono").val();
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    var conductores = "";
    $(".seleccionado").each(function(i){
       conductores += $(this).attr("id") + ",";
    });

    var array = [rut,razon,nombre,direccion,nombreContacto,telefono,mail,mail2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var conductores = "&conductores=";
        $("#tablaContenidoConductor .tablaFila").each(function(index) {
            conductores +=$(this).attr("id")+",";
        });
        var moviles = "&moviles=";
        $("#tablaContenidoMovil .tablaFila").each(function(index) {
            moviles +=$(this).attr("id")+",";
        });
        var deleteConductor = "&delConductor=";
        for(var i = 0; i < ARRAY_ELIMINAR_CONDUCTORES.length;i++) {
            deleteConductor += ARRAY_ELIMINAR_CONDUCTORES[i]+",";
        };
        var deleteMovil = "&delMovil=";
        for(var i = 0; i < ARRAY_ELIMINAR_MOVILES.length;i++) {
            deleteMovil += ARRAY_ELIMINAR_MOVILES[i]+",";
        };
        var data = "id="+ID_TRANSPORTISTA+"&razon="+razon+"&rut="+rut+"&nombre="+nombre+"&direccion="+
                direccion+"&nombre_contacto="+nombreContacto+
                "&telefono="+telefono+"&mail="+mail+"&mail2="+mail2+"&conductores="+conductores;
        var url = urlBase + "/transportista/ModTransportista.php?"+data+conductores+moviles+deleteConductor+deleteMovil;
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            alertify.success("Transportista Modificado");
            cambiarPestaniaGeneral();
            resetFormulario();
            buscarTransportista();

        };
        postRequest(url,success);
    }
}

function buscarTransportista()
{
    var busqueda = $("#busqueda").val();
    var url = urlBase + "/transportista/GetTransportistas.php?busqueda="+busqueda;
    var success = function(response)
    {
        cerrarSession(response);
        var transportistas = $("#lista_busqueda");
        transportistas.html("");
        TRANSPORTISTAS = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].transportista_id;
            var razon = response[i].transportista_razon;
            var nombre = response[i].transportista_nombre;
            var titulo = recortar(nombre+" / "+razon);
            if (typeof ID_TRANSPORTISTA !== "undefined" && ID_TRANSPORTISTA === id)
            {
                transportistas.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
                transportistas.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
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
        confirmar("Cambio de transportista",
        "¿Desea cambiar de transportista sin guardar los cambios?",
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
    AGREGAR = false;
    ID_TRANSPORTISTA = id;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_transportista.html", function( response, status, xhr ) {
        iniciarPestaniasTransportista();
        cambioEjecutado();
        $("#nick").blur(function (){
            if(validarExistencia('rut',$(this).val()))
            {
                alertify.error("El rut "+$(this).val()+" ya existe");
                $("#rut").val("");
                return;
            }
            if(validarExistencia('razon',$(this).val()))
            {
                alertify.error("La razon social "+$(this).val()+" ya existe");
                $("#razon").val("");
                return;
            }
        });
        var transportista;
        for(var i = 0 ; i < TRANSPORTISTAS.length; i++)
        {
            if(TRANSPORTISTAS[i].transportista_id === id)
            {
                transportista = TRANSPORTISTAS[i];
            }
        }
        $("#razon").val(transportista.transportista_razon);
        $("#rut").val(transportista.transportista_rut);
        $("#rut").prop("readonly",true);
        $("#tipo").val(transportista.transportista_tipo);
        $("#nombre").val(transportista.transportista_nombre);
        $("#telefono").val(transportista.transportista_fono_contacto);
        $("#direccion").val(transportista.transportista_direccion);
        $("#nombreContacto").val(transportista.transportista_nombre_contacto);
        $("#mail").val(transportista.transportista_mail_contacto);
        $("#mail2").val(transportista.transportista_mail_facturacion);
        $("#centros").val(transportista.transportista_centro_costo);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarTransportista()
{
    var rut = $("#rut").val();
    var url = urlBase + "/transportista/DelTransportista.php?rut="+rut;
    var success = function(response)
    {
        alertify.success("Transportista eliminado");
        cerrarSession(response);
        resetFormularioEliminar();
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarTransportista();
    };
    getRequest(url,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < TRANSPORTISTAS.length ; i++)
    {
        if(tipo === 'rut')
        {
            if(valor === TRANSPORTISTAS[i].transportista_rut)
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
    var rut = $("#rut");
    var telefono = $("#telefono");
    var mail = $("#mail");
    var mail2 = $("#mail2");
    if(!validarRut(rut.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(rut);
        alertify.error('Rut invalido');
        return false;
    }
    if(!validarNumero(telefono.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(telefono);
        alertify.error('Telefono debe ser numerico');
        return false;
    }
    if(!validarEmail(mail.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(mail);
        alertify.error('E-mail contacto invalido');
        return false;
    }
    if(!validarEmail(mail2.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(mail2);
        alertify.error('E-mail facturaci&oacute;n invalido');
        return false;
    }
    
    return true;
}

function iniciarPestaniasTransportista()
{
    $("#p_general").click(function(){
        cambiarPropiedad($("#cont_general"),"display","block");
        cambiarPropiedad($("#cont_conductor"),"display","none");
        cambiarPropiedad($("#cont_movil"),"display","none");
        quitarclase($(this),"dispose");
        agregarclase($("#p_conductor"),"dispose");
        agregarclase($("#p_movil"),"dispose");
    });
    $("#p_conductor").click(function(){
        cambiarPropiedad($("#cont_general"),"display","none");
        cambiarPropiedad($("#cont_conductor"),"display","block");
        cambiarPropiedad($("#cont_movil"),"display","none");
        quitarclase($(this),"dispose");
        agregarclase($("#p_general"),"dispose");
        agregarclase($("#p_movil"),"dispose");
        cargarConductores();
        $("#rutConductor").on('keydown',function(e){
            if(isTeclaEnter(e))
            {
                encontrarConductor();
            }
        });
        $("#rutConductor").on('blur',function(){
            if($(this).val() !== '')
            {
                encontrarConductor();
            }
        });
    });
    $("#p_movil").click(function(){
        cambiarPropiedad($("#cont_general"),"display","none");
        cambiarPropiedad($("#cont_conductor"),"display","none");
        cambiarPropiedad($("#cont_movil"),"display","block");
        quitarclase($(this),"dispose");
        agregarclase($("#p_general"),"dispose");
        agregarclase($("#p_conductor"),"dispose");
        cargarMoviles();
        $("#patenteMovil").on('keydown',function(e){
            if(isTeclaEnter(e))
            {
                encontrarMovil();
            }
        });
        $("#patenteMovil").on('blur',function(){
            if($(this).val() !== '')
            {
                encontrarMovil();
            }
        });
    });
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

function buscarMoviles()
{
    var url = urlBase + "/movil/GetMoviles.php?busqueda=";
    var success = function(response)
    {
        cambiarPropiedad($("#loader"),"visibility","hidden");
        cerrarSession(response);
        MOVILES = response;
    };
    getRequest(url,success);
}

function cargarConductores()
{
    var tablaConductor = $("#tablaContenidoConductor");
    var datalistConductor = $("#rutConductorL");
    datalistConductor.html("");
    if(tablaConductor.html() === '')
    {
        cambiarPropiedad($("#loaderC"),"visibility","hidden");
        if (typeof CONDUCTORES !== "undefined")
        {
            if(CONDUCTORES.length === 0)
            {
                alertify.error("No hay conductores asociados");    
            }
            for(var i = 0 ; i < CONDUCTORES.length; i++)
            {
                var rut = CONDUCTORES[i].conductor_rut;
                var nombre = CONDUCTORES[i].conductor_nombre;
                var papellido = CONDUCTORES[i].conductor_papellido;
                var movil = CONDUCTORES[i].conductor_movil;
                var transportista = CONDUCTORES[i].conductor_transportista;
                if(ID_TRANSPORTISTA === transportista && movil !== '')
                {
                    tablaConductor.append("<div id=\""+rut+"\" class=\"tablaFila\"><div class=\"cabecera_fila\"><img onclick=\"eliminarFilaConductor('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"20\" height=\"20\"></div><div>"
                            +rut+"</div><div>"+nombre+"</div><div>"+papellido+"</div><div>"+movil+"</div></div>");
                }
                else if(movil !== '')
                {
                    datalistConductor.append("<option id=\"data-"+rut+"\" value=\""+rut+"\">"+rut+"</option>");
                }
                else
                {
                    alertify.error("No hay conductores con veh&iacute;culos asociados");    
                }
            }
        }
    }
}

function cargarMoviles()
{
    var tablaMovil = $("#tablaContenidoMovil");
    var datalistMovil = $("#patenteMovilL");
    datalistMovil.html("");
    if(tablaMovil.html() === '')
    {
        cambiarPropiedad($("#loaderV"),"visibility","hidden");
        if (typeof MOVILES !== "undefined")
        {
            if(MOVILES.length === 0)
            {
                alertify.error("No hay veh&iacute;culos asociados");    
            }
            for(var i = 0 ; i < MOVILES.length; i++)
            {
                var nombre = MOVILES[i].movil_nombre;
                var patente = MOVILES[i].movil_patente;
                var marca = MOVILES[i].movil_marca;
                var modelo = MOVILES[i].movil_modelo;
                var transportista = MOVILES[i].movil_transportista;
                if(ID_TRANSPORTISTA === transportista)
                {
                    tablaMovil.append("<div id=\""+patente+"\" class=\"tablaFila\"><div class=\"cabecera_fila\"><img onclick=\"eliminarFilaMovil('"+patente+"')\" src=\"img/eliminar-negro.svg\" width=\"20\" height=\"20\"></div><div>"
                        +patente+"</div><div>"+nombre+"</div><div>"+marca+"</div><div>"+modelo+"</div></div>");
                }
                else
                {
                    datalistMovil.append("<option id=\"data-"+patente+"\" value=\""+patente+"\">"+patente+"</option>");
                }
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    }
}

function encontrarConductor(){
    $("#resultadoConductor").html("");
    var rutConductor = $("#rutConductor").val();
    if(validarRut(rutConductor))
    {
        for(var i = 0 ; i < CONDUCTORES.length; i++)
        {
            var rut = CONDUCTORES[i].conductor_rut;
            if(rutConductor === rut)
            {
                var nombre = CONDUCTORES[i].conductor_nombre;
                var papellido = CONDUCTORES[i].conductor_papellido;
                var movil = CONDUCTORES[i].conductor_movil;
                $("#resultadoConductor").append(
                        "<div class=\"cuadro_asignar\" onclick=\"agregarConductor('"
                        +rut+"','"+nombre+"','"+papellido+"','"+movil+"')\">\n\
                            <div>Rut: "+rut+"</div>\n\
                            <div>Nombre: "+nombre+" "+papellido+"</div>\n\
                        </div>");
            }
        }
    }
    else
    {
        $("#rutConductor").val("");
        $("#rutConductor").focus();
        $("#resultadoConductor").append("No hay resultados para su busqueda");
        alertify.error('Rut invalido');
    }
}
function agregarConductor(rut,nombre,apelllido,movil)
{
    for(var i = 0; i < ARRAY_ELIMINAR_CONDUCTORES.length;i++) {
        if(rut === ARRAY_ELIMINAR_CONDUCTORES[i])
        {
            delete ARRAY_ELIMINAR_CONDUCTORES[i];
        }
    };
    $("#rutConductor").val("");
    $("#tablaContenidoConductor").append("<div id=\""+rut+"\" class=\"tablaFila\"><div class=\"cabecera_fila\"><img onclick=\"eliminarFilaConductor('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"20\" height=\"20\"></div><div>"
            +rut+"</div><div>"+nombre+"</div><div>"+apelllido+"</div><div>"+movil+"</div></div>");
    $(".cuadro_asignar").remove();
}
function encontrarMovil(){
    $("#resultadoMovil").html("");
    var patenteMovil = $("#patenteMovil").val();
    if(validarPatente(patenteMovil))
    {
        for(var i = 0 ; i < MOVILES.length; i++)
        {
            var patente = MOVILES[i].movil_patente;
            if(patenteMovil === patente)
            {
                var nombre = MOVILES[i].movil_nombre;
                var marca = MOVILES[i].movil_marca;
                var modelo = MOVILES[i].movil_modelo;
                $("#resultadoMovil").append(
                    "<div class=\"cuadro_asignar\" onclick=\"agregarMovil('"+
                    patente+"','"+nombre+"','"+marca+"','"+modelo+"')\">\n\
                        <div>Patente: "+patente+"</div><div>\n\
                             Marca: "+marca+"</div><div>\n\
                        </div>");
            }
            
        }
    }
    else
    {
        $("#patenteMovil").val("");
        $("#patenteMovil").focus();
        $("#resultadoMovil").append("No hay resultados para su busqueda");
        alertify.error('Patente invalida');
    }
}

function agregarMovil(patente,nombre,marca,modelo)
{
    for(var i = 0; i < ARRAY_ELIMINAR_MOVILES.length;i++) {
        if(patente === ARRAY_ELIMINAR_MOVILES[i])
        {
            delete ARRAY_ELIMINAR_MOVILES[i];
        }
    };
    $("#patenteMovil").val("");
    $("#tablaContenidoMovil").append("<div id=\""+patente+"\" class=\"tablaFila\"><div class=\"cabecera_fila\"><img onclick=\"eliminarFilaMovil('"+patente+"')\" src=\"img/eliminar-negro.svg\" width=\"20\" height=\"20\"></div><div>"
            +patente+"</div><div>"+nombre+"</div><div>"+marca+"</div><div>"+modelo+"</div></div>");
    $(".cuadro_asignar").remove();
}

function eliminarFilaConductor(obj)
{
    ARRAY_ELIMINAR_CONDUCTORES.push(obj);
    $("#"+obj).remove();
    $("#data-"+obj).remove();
    $("#rutConductorL").append("<option id=\"data-"+obj+"\" value=\""+obj+"\">"+obj+"</option>");
}

function eliminarFilaMovil(obj)
{
    ARRAY_ELIMINAR_MOVILES.push(obj);
    $("#"+obj).remove();
    $("#data-"+obj).remove();
    $("#patenteMovilL").append("<option id=\"data-"+obj+"\" value=\""+obj+"\">"+obj+"</option>");
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_conductor"),"display","none");
    cambiarPropiedad($("#cont_movil"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_conductor"),"dispose");
    agregarclase($("#p_movil"),"dispose");
}


function activarPestania(array)
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        if(array[i] === '')
        {
            marcarCampoError($("#"+CAMPOS[i]));
        }
        else
        {
            marcarCampoOk($("#"+CAMPOS[i]));
        }
    }
    cambiarPestaniaGeneral();
}