/* global urlBase, alertify */
var TRANSPORTISTAS;
var CONDUCTORES;
var AGREGAR = true;
var PAGINA = 'TRANSPORTISTAS';
$(document).ready(function(){
    $("#menu").load("menu.html", function( response, status, xhr ) {
        agregarclase($("#transportista"),"menu-activo");
    });
    buscarTransportista();
    buscarConductores();
    $("#agregar").click(function(){
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_transportista.html", function( response, status, xhr ) {
            iniciarPestaniasTransportista();
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
        resetFormulario(PAGINA);
        resetBotones();
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
            alertify.confirm("Eliminar transportista","Esta seguro que desea eliminar al transportista "+$("#rut").val(),
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
    var array = [razon,rut,nombre,direccion,nombreContacto,telefono,mail,mail2];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "razon="+razon+"&rut="+rut+"&nombre="+nombre+"&direccion="+
                direccion+"&nombre_contacto="+nombreContacto+
                "&telefono="+telefono+"&mail="+mail+"&mail2="+mail2;
        var url = urlBase+"/transportista/AddTransportista.php?"+data;
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Transportista Agregado");
            vaciarFormulario($("#agregar input"));
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario(PAGINA);
            buscarTransportista();
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

    var array = [razon,rut,direccion,nombre,telefono,mail,mail2];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var data = "razon="+razon+"&rut="+rut+"&nombre="+nombre+"&direccion="+
                direccion+"&nombre_contacto="+nombreContacto+
                "&telefono="+telefono+"&mail="+mail+"&mail2="+mail2+"&conductores="+conductores;
        var url = urlBase + "/transportista/ModTransportista.php?"+data;
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetBotones();
            cerrarSession(response);
            alertify.success("Transportista Modificado");
            vaciarFormulario($("#agregar input"));
            resetFormulario(PAGINA);
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
            var rut = response[i].transportista_rut;
            var nombre = response[i].transportista_nombre;
            transportistas.append("<div class=\"fila_contenedor\" onClick=\"abrirModificar('"+id+"')\">"+rut+" "+nombre+"</div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function abrirModificar(id)
{
    AGREGAR = false;
    $("#contenedor_central").load("html/datos_transportista.html", function( response, status, xhr ) {
        iniciarPestaniasTransportista(id);
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
        resetFormulario(PAGINA);
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
    var rut = $("#rut").val();
    var telefono = $("#telefono").val();
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    if(!validarRut(rut))
    {
        alertify.error('Rut invalido');
        return false;
    }
    if(!validarNumero(telefono))
    {
        alertify.error('Telefono debe ser numerico');
        return false;
    }
    if(!validarEmail(mail))
    {
        alertify.error('E-mail contacto invalido');
        return false;
    }
    if(!validarEmail(mail2))
    {
        alertify.error('E-mail facturaci&oacute;n invalido');
        return false;
    }
    
    return true;
}

function iniciarPestaniasTransportista(id)
{
    $("#p_general").click(function(){
        cambiarPropiedad($("#cont_general"),"display","block");
        cambiarPropiedad($("#cont_conductor"),"display","none");
        quitarclase($(this),"dispose");
        agregarclase($("#p_conductor"),"dispose");
    });
    $("#p_conductor").click(function(){
        cambiarPropiedad($("#cont_general"),"display","none");
        cambiarPropiedad($("#cont_conductor"),"display","block");
        quitarclase($(this),"dispose");
        agregarclase($("#p_general"),"dispose");
        cargarConductores(id);
    });
}

function buscarConductores()
{
    var url = urlBase + "/conductor/GetConductores.php?busqueda=";
    var success = function(response)
    {
        cerrarSession(response);
        CONDUCTORES = response;
    };
    getRequest(url,success);
}

function cargarConductores(idT)
{
    var conductor = $("#tablaContenido");
    if(conductor.html() === '')
    {
        var url = urlBase + "/transportista/GetTransportistaConductor.php?id="+idT;
        var success = function(response)
        {
            cambiarPropiedad($("#loader"),"visibility","hidden");
            var conductores = response;
            for(var i = 0 ; i < CONDUCTORES.length; i++)
            {
                var id = CONDUCTORES[i].conductor_id;
                var rut = CONDUCTORES[i].conductor_rut;
                var nombre = CONDUCTORES[i].conductor_nombre;
                var papellido = CONDUCTORES[i].conductor_papellido;
                var movil = CONDUCTORES[i].conductor_movil;
                var imagen = "";
                var clase = "";
                if(conductores.conductor_id === id)
                {
                    imagen = "<img src=\"img/guardar.svg\">";
                    clase = "seleccionado";
                }
                else
                {
                    clase = "no-seleccionado";
                }
                conductor.append("<div onClick=\"seleccionar($(this))\" id=\""+rut+"\" class=\"tablaFila "+clase+"\"><div>"+imagen+"</div><div>"
                            +rut+"</div><div>"+nombre+" "+papellido+"</div><div>"+movil+"</div></div>");
            }  
        };
        getRequest(url,success);
    }
}