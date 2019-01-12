/* global urlBase, alertify, ARRAY_ELIMINAR_PASAJEROS */
var CLIENTES;
var PASAJEROS;
var AGREGAR = true;
var PAGINA = 'CLIENTES';
var ID_CLIENTE;
var AGREGAR_PASAJEROS = [];
var ELIMINAR_PASAJEROS = [];
var CAMPOS = ["rut","razon","tipo","direccion","nombre","telefono","mail","mail2","centros"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    buscarCliente();
    buscarPasajeros();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_cliente.html", function( response, status, xhr ) {
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
            agregarCliente();
        }
        else
        {
            modificarCliente();
        }
    });
    $("#busqueda").keyup(function(){
        buscarCliente($(this).val());
    });
    
    $("#eliminar").click(function (){
        confirmar("Eliminar cliente"
        ,"Esta seguro que desea eliminar al cliente "+$("#rut").val(),
        function(){
                eliminarCliente();
            },null);
    });
});

function agregarCliente()
{
    var razon = $("#razon").val();
    var tipo = $("#tipo").val();
    var rut = $("#rut").val();
    var direccion = $("#direccion").val();
    var nombre = $("#nombre").val();
    var telefono = $("#telefono").val();
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    var cc = $("#centros").val();
    var array = [razon,tipo,rut,direccion,nombre,telefono,mail,mail2,cc];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var params = { razon : razon, tipo : tipo, rut : rut, direccion : direccion, nombre : nombre,
                telefono : telefono, mail : mail, mail2 : mail2, centros : cc , pasajeros : AGREGAR_PASAJEROS + "",
                delpasajero : ELIMINAR_PASAJEROS + "" };
        alert(JSON.stringify(params));
        var url = urlBase+"/cliente/AddCliente.php";
        var success = function(response)
        {
            ID_CLIENTE = undefined;
            cerrarSession(response);
            alertify.success("Cliente Agregado");
            cambiarPestaniaGeneral();
            vaciarFormulario();
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario();
            buscarCliente();
            buscarPasajeros();
        };
        postRequest(url,params,success);
    }
}

function modificarCliente()
{
    var id = ID_CLIENTE;
    var razon = $("#razon").val();
    var tipo = $("#tipo").val();
    var rut = $("#rut").val();
    var direccion = $("#direccion").val();
    var nombre = $("#nombre").val();
    var telefono = $("#telefono").val();
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    var cc = $("#centros").val();
    var array = [rut,razon,tipo,direccion,nombre,telefono,mail,mail2,cc];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var params = { id : id, razon : razon, tipo : tipo, rut : rut, direccion : direccion, nombre : nombre,
            telefono : telefono, mail : mail, mail2 : mail2, centros : cc , pasajeros : AGREGAR_PASAJEROS + "",
            delpasajero : ELIMINAR_PASAJEROS + "" };
        var url = urlBase + "/cliente/ModCliente.php";
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            cambiarPestaniaGeneral();
            alertify.success("Cliente Modificado");
            resetFormulario();
            buscarCliente();
            buscarPasajeros();
        };
        postRequest(url,params,success);
    }
}

function buscarCliente()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        cerrarSession(response);
        var clientes = $("#lista_busqueda");
        clientes.html("");
        CLIENTES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].cliente_id;
            var rut = response[i].cliente_rut;
            var nombre = response[i].cliente_razon;
            var titulo = recortar(rut+" / "+nombre);
            if (typeof ID_CLIENTE !== "undefined" && ID_CLIENTE === id)
            {
                clientes.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
                clientes.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+titulo+"</div>");
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
        confirmar("Cambio de cliente",
        "¿Desea cambiar de cliente sin guardar los cambios?",
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
    ID_CLIENTE = id;
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    $("#contenedor_central").load("html/datos_cliente.html", function( response, status, xhr ) {
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
        var cliente;
        for(var i = 0 ; i < CLIENTES.length; i++)
        {
            if(CLIENTES[i].cliente_id === id)
            {
                cliente = CLIENTES[i];
            }
        }
        $("#razon").val(cliente.cliente_razon);
        $("#rut").val(cliente.cliente_rut);
        $("#rut").prop("readonly",true);
        $("#tipo").val(cliente.cliente_tipo);
        $("#nombre").val(cliente.cliente_nombre_contacto);
        $("#telefono").val(cliente.cliente_fono_contacto);
        $("#direccion").val(cliente.cliente_direccion);
        $("#mail").val(cliente.cliente_mail_contacto);
        $("#mail2").val(cliente.cliente_mail_facturacion);
        $("#centros").val(cliente.cliente_centro_costo);
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
    });
}

function eliminarCliente()
{
    var rut = $("#rut").val();
    var params = {rut : rut,id : ID_CLIENTE};
    var url = urlBase + "/cliente/DelCliente.php";
    var success = function(response)
    {
        alertify.success("Cliente eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        buscarCliente();
    };
    postRequest(url,params,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < CLIENTES.length ; i++)
    {
        if(tipo === 'rut')
        {
            if(valor === CLIENTES[i].cliente_rut)
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
        marcarCampoError(rut);
        alertify.error('Rut invalido');
        return false;
    }
    if(!validarNumero(telefono.val()))
    {
        marcarCampoError(telefono);
        alertify.error('Telefono debe ser numerico');
        return false;
    }
    if(!validarEmail(mail.val()))
    {
        marcarCampoError(mail);
        alertify.error('E-mail contacto invalido');
        return false;
    }
    if(!validarEmail(mail2.val()))
    {
        marcarCampoError(mail2);
        alertify.error('E-mail facturaci&oacute;n invalido');
        return false;
    }
    
    return true;
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
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_pasajero").click(function(){
        cambiarPestaniaPasajero();
        cargarPasajeros();
    });
}

function buscarPasajeros()
{
    var url = urlBase + "/pasajero/GetPasajeros.php";
    var params = {busqueda : ""};
    var success = function(response)
    {
        cambiarPropiedad($("#loader"),"visibility","hidden");
        cerrarSession(response);
        PASAJEROS = response;
    };
    postRequest(url,params,success);
}

function cargarPasajeros()
{
    var tablaPasajero = $("#tablaContenidoPasajero");
    tablaPasajero.html("");
    cambiarPropiedad($("#loaderV"),"visibility","hidden");
    if (typeof PASAJEROS !== "undefined")
    {
        if(PASAJEROS.length === 0)
        {
            alertify.error("No hay pasajeros asociados");    
        }
        for(var i = 0 ; i < PASAJEROS.length; i++)
        {
            var id = PASAJEROS[i].pasajero_id;
            var rut = PASAJEROS[i].pasajero_rut;
            var nombre = PASAJEROS[i].pasajero_nombre;
            var papellido = PASAJEROS[i].pasajero_papellido;
            var mapellido = PASAJEROS[i].pasajero_mapellido;
            var cliente = PASAJEROS[i].pasajero_cliente;
            var asignacion = "";
            var claseAsignacion = "tablaFila";
            console.log(ID_CLIENTE +" "+ cliente);
            if(ID_CLIENTE === cliente)
            {
                asignacion = "<input type=\"radio\" onchange=\"agregarPasajeros($(this))\" name=\""+rut+"\" value=\""+id+"\" checked>SI\n\
                              <input type=\"radio\" onchange=\"eliminarPasajeros($(this))\" name=\""+rut+"\" value=\""+id+"\">NO";
            }
            else if(cliente === '0')
            {
                asignacion = "<input type=\"radio\" onchange=\"agregarPasajeros($(this))\" name=\""+rut+"\" value=\""+id+"\">SI\n\
                              <input type=\"radio\" onchange=\"eliminarPasajeros($(this))\" name=\""+rut+"\" value=\""+id+"\" checked>NO";
            }
            else if (ID_CLIENTE !== cliente)
            {
                for(var j = 0; j < CLIENTES.length ; j++)
                {
                    var c = CLIENTES[j];
                    if(c.cliente_id === cliente)
                    {
                        asignacion = "Asignado a "+c.cliente_razon;
                        break;
                    }
                }
            }
            tablaPasajero.append("<div id=\""+rut+"\" class=\""+claseAsignacion+"\"><div>"
                    +rut+"</div><div>"+nombre+"</div><div>"+papellido+"</div><div>"+mapellido+"</div><div>"+asignacion+"</div></div>");
        }
    }
    cambiarPropiedad($("#loader"),"visibility","hidden");
}

function eliminarFilaPasajero(obj)
{
    ARRAY_ELIMINAR_PASAJEROS.push(obj);
    $("#"+obj).remove();
    $("#data-"+obj).remove();
    $("#rutPasajeroL").append("<option id=\"data-"+obj+"\" value=\""+obj+"\">"+obj+"</option>");
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_pasajero"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_pasajero"),"dispose");
}

function cambiarPestaniaPasajero()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_pasajero"),"display","block");
    quitarclase($("#p_pasajero"),"dispose");
    agregarclase($("#p_general"), "dispose");
}
function agregarPasajeros(obj)
{
    if(obj.prop("checked"))
    {
        AGREGAR_PASAJEROS.push(obj.val());
        for(var i = 0; i < ELIMINAR_PASAJEROS.length; i++)
        {
            if(ELIMINAR_PASAJEROS[i] === obj.val())
            {
                ELIMINAR_PASAJEROS.splice(i, 1);
                break;
            }
        }
    }
}
function eliminarPasajeros(obj)
{
    if(obj.prop("checked"))
    {
        ELIMINAR_PASAJEROS.push(obj.val());
        for(var i = 0; i < AGREGAR_PASAJEROS.length; i++)
        {
            if(AGREGAR_PASAJEROS[i] === obj.val())
            {
                AGREGAR_PASAJEROS.splice(i, 1);
                break;
            }
        }
    }
}