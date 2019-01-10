/* global urlBase, alertify */
var TRANSPORTISTAS;
var CONDUCTORES;
var MOVILES;
var MOVILES_CONDUCTORES = [];
var AGREGAR = true;
var PAGINA = 'TRANSPORTISTAS';
var ID_TRANSPORTISTA;
var AGREGAR_CONDUCTORES = [];
var ELIMINAR_CONDUCTORES = [];
var AGREGAR_MOVILES = [];
var ELIMINAR_MOVILES = [];
var CAMPOS = ["rut","razon","nombre","direccion","nombreContacto","telefono","mail","mail2"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarTransportista();
    buscarConductores();
    buscarMoviles();
    $("#agregar").click(function(){
        ID_TRANSPORTISTA = undefined;
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_transportista.html", function( response, status, xhr ) {
            iniciarPestanias();
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
        var params = {razon : razon, rut : rut, nombre : nombre, direccion: direccion,
                    nombre_contacto : nombreContacto, telefono : telefono, mail : mail, mail2 : mail2,
                    conductores : AGREGAR_CONDUCTORES+"",moviles : AGREGAR_MOVILES+"",
                    delConductor : ELIMINAR_CONDUCTORES+"", delMovil : ELIMINAR_MOVILES+""};
        var url = urlBase+"/transportista/AddTransportista.php";
        var success = function(response)
        {
            ID_TRANSPORTISTA = undefined;
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
        postRequest(url,params,success);
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
    var array = [rut,razon,nombre,direccion,nombreContacto,telefono,mail,mail2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var params = {razon : razon, rut : rut, nombre : nombre, direccion: direccion,
                    nombre_contacto : nombreContacto, telefono : telefono, mail : mail, mail2 : mail2,
                    conductores : AGREGAR_CONDUCTORES+"",moviles : AGREGAR_MOVILES+"",
                    delConductor : ELIMINAR_CONDUCTORES+"", delMovil : ELIMINAR_MOVILES+""};
        var url = urlBase + "/transportista/ModTransportista.php";
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            alertify.success("Transportista Modificado");
            cambiarPestaniaGeneral();
            resetFormulario();
            buscarTransportista();
            buscarConductores();
            buscarMoviles();
        };
        postRequest(url,params,success);
    }
}

function buscarTransportista()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/transportista/GetTransportistas.php";
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
    postRequest(url,params,success);
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
        iniciarPestanias();
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
    var params = {rut : rut};
    var url = urlBase + "/transportista/DelTransportista.php";
    var success = function(response)
    {
        alertify.success("Transportista eliminado");
        cerrarSession(response);
        resetFormularioEliminar();
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarTransportista();
    };
    postRequest(url,params,success);
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

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_conductor").click(function(){
        cambiarPestaniaConductor();
        cargarConductores();
    });
    $("#p_movil").click(function(){
        cambiarPestaniaMovil();
        cargarMoviles();
    });
}

function buscarConductores()
{
    var params = {busqueda : ""};
    var url = urlBase + "/conductor/GetConductores.php";
    var success = function(response)
    {
        cambiarPropiedad($("#loader"),"visibility","hidden");
        cerrarSession(response);
        CONDUCTORES = response;
        obtenerMovilesConductores();
    };
    postRequest(url,params,success);
}

function buscarMoviles()
{
    var params = {busqueda : ""};
    var url = urlBase + "/movil/GetMoviles.php";
    var success = function(response)
    {
        cambiarPropiedad($("#loader"),"visibility","hidden");
        cerrarSession(response);
        MOVILES = response;
    };
    postRequest(url,params,success);
}

function cargarConductores()
{
    var tablaConductor = $("#tablaContenidoConductor");
    tablaConductor.html("");
    cambiarPropiedad($("#loaderC"),"visibility","hidden");
    if (typeof CONDUCTORES !== "undefined")
    {
        if(CONDUCTORES.length === 0)
        {
            alertify.error("No hay conductores asociados");    
        }
        for(var i = 0 ; i < CONDUCTORES.length; i++)
        {
            var id = CONDUCTORES[i].conductor_id;
            var rut = CONDUCTORES[i].conductor_rut;
            var nombre = CONDUCTORES[i].conductor_nombre;
            var papellido = CONDUCTORES[i].conductor_papellido;
            var movil = CONDUCTORES[i].conductor_movil;
            var transportista = CONDUCTORES[i].conductor_transportista;
            var asignacion = "";
            var claseAsignacion = "tablaFila";
            if(ID_TRANSPORTISTA === transportista && movil !== '')
            {
                asignacion = "<input type=\"radio\" onchange=\"agregarConductores($(this))\" name=\""+rut+"\" value=\""+id+"\" checked>SI\n\
                              <input type=\"radio\" onchange=\"eliminarConductores($(this))\" name=\""+rut+"\" value=\""+id+"\">NO";
            }
            else if(ID_TRANSPORTISTA !== transportista && transportista !== '0' && movil !== '')
            {
                for(var j = 0; j < TRANSPORTISTAS.length ; j++)
                {
                    var t = TRANSPORTISTAS[j];
                    if(t.transportista_id === transportista)
                    {
                        asignacion = "Asignado a "+t.transportista_nombre;
                        break;
                    }
                }
            }
            else if(transportista === '0')
            {
                asignacion = "<input type=\"radio\" onchange=\"agregarConductores($(this))\" name=\""+rut+"\" value=\""+id+"\">SI\n\
                              <input type=\"radio\" onchange=\"eliminarConductores($(this))\" name=\""+rut+"\" value=\""+id+"\" checked>NO";
            }
            tablaConductor.append("<div id=\""+rut+"\" class=\""+claseAsignacion+"\"><div>"
                        +rut+"</div><div>"+nombre+"</div><div>"+papellido+"</div><div>"+movil+"</div><div>"+asignacion+"</div></div>");

        }
    }
}

function cargarMoviles()
{
    var tablaMovil = $("#tablaContenidoMovil");
    tablaMovil.html("");
    cambiarPropiedad($("#loaderV"),"visibility","hidden");
    if (typeof MOVILES !== "undefined")
    {
        if(MOVILES.length === 0)
        {
            alertify.error("No hay veh&iacute;culos asociados");    
        }
        for(var i = 0 ; i < MOVILES.length; i++)
        {
            var id = MOVILES[i].movil_id;
            var nombre = MOVILES[i].movil_nombre;
            var patente = MOVILES[i].movil_patente;
            var marca = MOVILES[i].movil_marca;
            var modelo = MOVILES[i].movil_modelo;
            var transportista = MOVILES[i].movil_transportista;
            var asignacion = "";
            var claseAsignacion = "tablaFila";
            if(ID_TRANSPORTISTA === transportista)
            {
                asignacion = "<input type=\"radio\" onchange=\"agregarMoviles($(this))\" name=\""+patente+"\" value=\""+id+"\" checked>SI\n\
                              <input type=\"radio\" onchange=\"eliminarMoviles($(this))\" name=\""+patente+"\" value=\""+id+"\">NO";
            }
            else if(transportista === '0')
            {

                asignacion = "<input type=\"radio\" onchange=\"agregarMoviles($(this))\" name=\""+patente+"\" value=\""+id+"\">SI\n\
                              <input type=\"radio\" onchange=\"eliminarMoviles($(this))\" name=\""+patente+"\" value=\""+id+"\" checked>NO";
            }
            else if (ID_TRANSPORTISTA !== transportista)
            {
                for(var j = 0; j < TRANSPORTISTAS.length ; j++)
                {
                    var c = TRANSPORTISTAS[j];
                    if(c.transportista_id === transportista)
                    {
                        asignacion = "Asignado a "+c.transportista_nombre;
                        break;
                    }
                }
            }
            if(MOVILES_CONDUCTORES.indexOf(patente) === -1)
            {
                tablaMovil.append("<div id=\""+patente+"\" class=\""+claseAsignacion+"\"><div>"
                    +patente+"</div><div>"+nombre+"</div><div>"+marca+"</div><div>"+modelo+"</div><div>"+asignacion+"</div></div>");
            }
        }
        if(tablaMovil.html() === "")
        {
            alertify.success("No hay veh&iacute;culos disponibles para asociar");
        }
    }
    cambiarPropiedad($("#loader"),"visibility","hidden");
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

function cambiarPestaniaConductor()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_conductor"),"display","block");
    cambiarPropiedad($("#cont_movil"),"display","none");
    quitarclase($("#p_conductor"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_movil"),"dispose");
}

function cambiarPestaniaMovil()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_conductor"),"display","none");
    cambiarPropiedad($("#cont_movil"),"display","block");
    quitarclase($("#p_movil"),"dispose");
    agregarclase($("#p_general"),"dispose");
    agregarclase($("#p_conductor"),"dispose");
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

function agregarMoviles(obj)
{
    if(obj.prop("checked"))
    {
        AGREGAR_MOVILES.push(obj.val());
        for(var i = 0; i < ELIMINAR_MOVILES.length; i++)
        {
            if(ELIMINAR_MOVILES[i] === obj.val())
            {
                ELIMINAR_MOVILES.splice(i, 1);
                break;
            }
        }
    }
}
function eliminarMoviles(obj)
{
    if(obj.prop("checked"))
    {
        ELIMINAR_MOVILES.push(obj.val());
        for(var i = 0; i < AGREGAR_MOVILES.length; i++)
        {
            if(AGREGAR_MOVILES[i] === obj.val())
            {
                AGREGAR_MOVILES.splice(i, 1);
                break;
            }
        }
    }
}