/* global urlBase, alertify, PLACES_AUTOCOMPLETE_API, POSITION, ID_CLIENTE, directionsDisplay, markers, google, geocoder, map, flightPath */
var ID_PASAJERO;
var ID_EMPRESA;
var ID_CLIENTE = 'todo';
var NOMBRE_CLIENTE = '';
var ID_RUTA;
var PASAJEROS;
var AGREGAR = true;
var PAGINA = 'PASAJEROS';
var CC;
var RUTA;
var mapa_oculto = true;
var input_places;
//var CAMPOS = ["rut","nombre","papellido","mapellido","celular","direccion","punto","empresa","centro","nick"];
var CAMPOS = ["rut","nombre","papellido","mapellido","celular","direccion","punto","empresa","centro"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    limpiarMapa();
    buscarClientePasajero();
    buscarPasajero(true);
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#lista_busqueda_pasajero_detalle").load("html/datos_pasajero.html", function( response, status, xhr ) {
            initPlacesAutoComplete(document.getElementById("direccion"));
            initPlacesAutoComplete(document.getElementById("punto"));
            cargarClientes();
            cargarCentroCosto(ID_EMPRESA,'');
            cargarRutas(ID_EMPRESA,'');
            iniciarPestanias();
            cambioEjecutado();
            $("#rut").blur(function (){
                if(validarExistencia('rut',$(this).val()))
                {
                    alertify.error("El rut "+$(this).val()+" ya existe");
                    return;
                }
            });

//            $("#nick").blur(function (){
//                if(validarExistencia('nick',$(this).val()))
//                {
//                    alertify.error("El nick "+$(this).val()+" no se encuentra disponible");
//                    $("#nick").val("");
//                    return;
//                }
//            });
            $("#volver").click(function(){
                ocultarMapa();
                if(typeof ID_CLIENTE === 'undefined')
                {
                    buscarPasajero();
                }
                else if(ID_CLIENTE === 'todo')
                {
                    buscarPasajeroTodo();
                }
                else{
                    buscarPasajeroCliente(ID_CLIENTE,NOMBRE_CLIENTE);
                }
                cambiarPropiedad($("#agregar"),"visibility","visible");
                cambiarPropiedad($("#guardar"),"visibility","hidden");
                cambiarPropiedad($("#eliminar"),"visibility","hidden");
            });
            $("#empresa").change(function (){
                cargarCentroCosto($(this).val(),'');
                cargarRutas($(this).val(),'');
            });

            $("#direccion").focus(function(){
                input_direccion = $("#direccion");
            });
            
            $("#punto").focus(function(){
                input_direccion = $("#punto");
            });
            
            $("#buscaDireccion").click(function(){
                input_places = $("#direccion");
                if(mapa_oculto)
                {
                    colocarMarcadorPlaces();
                    quitarclase($("#contenedor_mapa"),"oculto");
                    mapa_oculto = false;
                }
                else
                {
                    agregarclase($("#contenedor_mapa"),"oculto");
                    mapa_oculto = true;
                }
            });
            
            $("#buscaPunto").click(function(){
                input_places = $("#punto");
                if(mapa_oculto)
                {
                    colocarMarcadorPlaces();
                    quitarclase($("#contenedor_mapa"),"oculto");
                    mapa_oculto = false;
                }
                else
                {
                    agregarclase($("#contenedor_mapa"),"oculto");
                    mapa_oculto = true;
                }
            });
            mostrarMapa();
                    
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
            agregarPasajero();
        }
        else
        {
            modificarPasajero();
        }
    });
    $("#busqueda").keyup(function(){
        buscarPasajero();
    });
    
    $("#eliminar").click(function (){
            confirmar("Eliminar pasajero","Esta seguro que desea eliminar al pasajero "+$("#rut").val(),
            function(){
                eliminarPasajero();
            },null);
    });
});

function agregarPasajero()
{
    var rut = formatearCadena($("#rut").val());
    var nombre = formatearCadena($("#nombre").val());
    var papellido = formatearCadena($("#papellido").val());
    var mapellido = formatearCadena($("#mapellido").val());
    var telefono = formatearCadena($("#aparato").val());
    var celular = formatearCadena($("#celular").val());
    var direccion = formatearCadena($("#direccion").val());
    var punto = formatearCadena($("#punto").val());
    var mail = formatearCadena($("#mail").val());
//    var nick = $("#nick").val();
//    var password = $("#password").val();
//    var password2 = $("#password2").val();
    var cargo = formatearCadena($("#cargo").val());
    var centro = formatearCadena($("#centro").val());
    var empresa = formatearCadena($("#empresa").val());
    var ruta = formatearCadena($("#ruta").val());
    //var array = [nombre,papellido,mapellido,rut,celular,direccion,punto,empresa,centro,nick,password,password2];
    var array = [nombre,papellido,mapellido,rut,celular,direccion,punto,empresa,centro];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
//    if(password !== password2)
//    {
//        marcarCampoError($("#password"));
//        marcarCampoError($("#password2"));
//        alertify.error("La password no coincide");
//        return;
//    }
    if(validarTipoDato())
    {
//        var params = {nombre : nombre, papellido : papellido, mapellido : mapellido,
//            rut : rut, nick : nick, password : btoa(password), telefono : telefono, celular : celular,
//            direccion : direccion,punto : punto, mail : mail, cargo : cargo, centro : centro, empresa : empresa, ruta : ruta};
        var params = {nombre : nombre, papellido : papellido, mapellido : mapellido,
            rut : rut, telefono : telefono, celular : celular,
            direccion : direccion,punto : punto, mail : mail, cargo : cargo, centro : centro, empresa : empresa, ruta : ruta};
        var url = urlBase + "/pasajero/AddPasajero.php";
        var success = function(response)
        {
            ocultarMapa();
            ID_PASAJERO = undefined;
            cerrarSession(response);
            alertify.success("Pasajero Agregado");
            cambiarPestaniaGeneral();
            buscarPasajero();
            vaciarFormulario();
            resetFormulario();
        };
        postRequest(url,params,success);
    }
}

function modificarPasajero()
{
    var id = ID_PASAJERO;
    var rut = formatearCadena($("#rut").val());
    var nombre = formatearCadena($("#nombre").val());
    var papellido = formatearCadena($("#papellido").val());
    var mapellido = formatearCadena($("#mapellido").val());
    var telefono = formatearCadena($("#aparato").val());
    var celular = formatearCadena($("#celular").val());
    var direccion = formatearCadena($("#direccion").val());
    var punto = formatearCadena($("#punto").val());
    var mail = formatearCadena($("#mail").val());
//    var nick = $("#nick").val();
//    var password = $("#password").val();
//    var password2 = $("#password2").val();
    var cargo = formatearCadena($("#cargo").val());
    var centro = formatearCadena($("#centro").val());
    var empresa = formatearCadena($("#empresa").val());
    var ruta = formatearCadena($("#ruta").val());
    var array;
    var params = {id : id, nombre : nombre, papellido : papellido, mapellido : mapellido,
        rut : rut, telefono : telefono, celular : celular,
        direccion : direccion, punto : punto, mail : mail, cargo : cargo, centro : centro, empresa : empresa, ruta : ruta};
//    var params = {id : id, nombre : nombre, papellido : papellido, mapellido : mapellido,
//        rut : rut, nick : nick, telefono : telefono, celular : celular,
//        direccion : direccion, punto : punto, mail : mail, cargo : cargo, centro : centro, empresa : empresa, ruta : ruta};
//    if(password !== '' || password2 !== '')
//    {
//        if(password !== password2)
//        {
//            marcarCampoError($("#password"));
//            marcarCampoError($("#password2"));
//            alertify.error("La password no coincide");
//            return;
//        }
//        array = [rut,nombre,papellido,mapellido,celular,direccion,punto,empresa,centro,
//        nick,password,password2];
//        params.password = btoa(password);
//    }
//    else
//    {
//        array = [rut,nombre,papellido,mapellido,celular,direccion,punto,empresa,centro,nick];  
          array = [rut,nombre,papellido,mapellido,celular,direccion,punto,empresa,centro];    
//    }
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var url = urlBase + "/pasajero/ModPasajero.php";
        var success = function(response)
        {
            ocultarMapa();
            cerrarSession(response);
            cambiarPestaniaGeneral();
            if(typeof ID_CLIENTE === 'undefined')
            {
                buscarPasajero();
            }
            else if(ID_CLIENTE === 'todo')
            {
                buscarPasajeroTodo();
            }
            else{
                buscarPasajeroCliente(ID_CLIENTE,NOMBRE_CLIENTE);
            }
            alertify.success("Pasajero Modificado");
            resetFormulario();
        };
        postRequest(url,params,success);
    }
}

function buscarPasajero(cargar = false)
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/pasajero/GetPasajeros.php";
    var success = function(response)
    {
        cerrarSession(response);
        var pasajeros = $("#lista_busqueda_pasajero_detalle");
        pasajeros.html("");
        PASAJEROS = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        pasajeros.append("<div class=\"contenedor_central_titulo_pasajero\"><div></div><div class=\"col_empresa_pasajero\">ID</div><div>Rut</div><div>Nombre</div><div>Apellido</div><div class=\"col_empresa_pasajero\">Empresa</div></div>")
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].pasajero_id;
            var rut = response[i].pasajero_rut;
            var nombre = response[i].pasajero_nombre;
            var papellido = response[i].pasajero_papellido;
            var empresa = response[i].pasajero_empresa_nombre;
            pasajeros.append("<div class=\"fila_contenedor fila_contenedor_pasajero\" id=\""+id+"\">"+
                    "<div class=\"col_empresa_pasajero\" onClick=\"cambiarFila('"+id+"','"+rut+"','"+nombre+"','"+papellido+"')\">"+(i+1)+"</div>"+
                    "<div onClick=\"cambiarFila('"+id+"','"+rut+"','"+nombre+"','"+papellido+"')\">"+rut+"</div>"+
                    "<div onClick=\"cambiarFila('"+id+"','"+rut+"','"+nombre+"','"+papellido+"')\">"+nombre+"</div>"+
                    "<div onClick=\"cambiarFila('"+id+"','"+rut+"','"+nombre+"','"+papellido+"')\">"+papellido+"</div>"+
                    "<div class=\"col_empresa_pasajero\" onClick=\"cambiarFila('"+id+"','"+rut+"','"+nombre+"','"+papellido+"')\">"+empresa+"</div>"+
                    "<div><img onclick=\"preEliminarPasajero('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success,cargar);
}

function buscarPasajeroCliente(cliente,nombreCliente)
{
    ID_CLIENTE = cliente;
    marcarFilaActiva("col_"+cliente);
    var pasajeros = $("#lista_busqueda_pasajero_detalle");
    pasajeros.html("");
    pasajeros.append("<div class=\"contenedor_central_titulo_pasajero\"><div></div><div>ID</div><div>Rut</div><div>Nombre</div><div>Apellido</div><div class=\"col_empresa_pasajero\">Empresa</div></div>")
    var noHayRegistros = true;
    var j = 1;
    for(var i = 0 ; i < PASAJEROS.length; i++)
    {
        if(PASAJEROS[i].pasajero_empresa === cliente)
        {
            noHayRegistros = false;
            var id = PASAJEROS[i].pasajero_id;
            var rut = PASAJEROS[i].pasajero_rut;
            var nombre = PASAJEROS[i].pasajero_nombre;
            var papellido = PASAJEROS[i].pasajero_papellido;
            var empresa = PASAJEROS[i].pasajero_empresa_nombre;
            pasajeros.append("<div class=\"fila_contenedor fila_contenedor_pasajero\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"','"+rut+"','"+nombre+"','"+papellido+"')\">"+
                    "<div class=\"col_empresa_pasajero\">"+j+"</div>"+
                    "<div>"+rut+"</div>"+
                    "<div>"+nombre+"</div>"+
                    "<div>"+papellido+"</div>"+
                    "<div class=\"col_empresa_pasajero\">"+empresa+"</div>"+
                    "<div><img onclick=\"preEliminarPasajero('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>");
            j++;
        }
    }
    if(noHayRegistros)
    {
        pasajeros.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        alertify.error("No hay registros que mostrar");
        return;
    }
}

function buscarPasajeroTodo()
{
    ID_CLIENTE = 'todo';
    marcarFilaActiva('col_todo');
    var pasajeros = $("#lista_busqueda_pasajero_detalle");
    pasajeros.html("");
    pasajeros.append("<div class=\"contenedor_central_titulo_pasajero\"><div></div><div class=\"col_empresa_pasajero\">ID</div><div>Rut</div><div>Nombre</div><div>Apellido</div><div class=\"col_empresa_pasajero\">Empresa</div></div>")
    var noHayRegistros = true;
    for(var i = 0 ; i < PASAJEROS.length; i++)
    {
        noHayRegistros = false;
        var id = PASAJEROS[i].pasajero_id;
        var rut = PASAJEROS[i].pasajero_rut;
        var nombre = PASAJEROS[i].pasajero_nombre;
        var papellido = PASAJEROS[i].pasajero_papellido;
        var empresa = PASAJEROS[i].pasajero_empresa_nombre;
        pasajeros.append("<div class=\"fila_contenedor fila_contenedor_pasajero\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"','"+rut+"','"+nombre+"','"+papellido+"')\">"+
                "<div class=\"col_empresa_pasajero\">"+(i+1)+"</div>"+
                "<div>"+rut+"</div>"+
                "<div>"+nombre+"</div>"+
                "<div>"+papellido+"</div>"+
                "<div class=\"col_empresa_pasajero\">"+empresa+"</div>"+
                "<div><img onclick=\"preEliminarPasajero('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>");
    }
    if(noHayRegistros)
    {
        pasajeros.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        alertify.error("No hay registros que mostrar");
        return;
    }
}

function cambiarFila(id,rut,nombre,papellido)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de pasajero",
        "¿Desea cambiar de pasajero sin guardar los cambios?",
        function()
        {
            MODIFICADO = false;
            abrirModificar(id,rut,nombre,papellido);
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        abrirModificar(id,rut,nombre,papellido);
    }
}

function abrirModificar(id,rut,nombre,apellido)
{
    AGREGAR = false;
    $("#lista_busqueda_pasajero_detalle").load("html/datos_pasajero.html", function( response, status, xhr ) {
        $("#titulo_pagina_pasajero").text(rut+" ("+nombre+" "+apellido+")");
        iniciarPestanias();
        cambioEjecutado();
        cargarClientes();
        initPlacesAutoComplete(document.getElementById("direccion"));
        initPlacesAutoComplete(document.getElementById("punto"));
//        $("#nick").blur(function (){
//            if(validarExistencia('nick',$(this).val()))
//            {
//                $("#nick").val("");
//                return;
//            }
//        });
        $("#empresa").change(function (){
            cargarCentroCosto($(this).val(),'');
            cargarRutas($(this).val(),'');
        });

        $("#volver").click(function(){
            ocultarMapa();
            if(typeof ID_CLIENTE === 'undefined')
            {
                buscarPasajero();
            }
            else if(ID_CLIENTE === 'todo')
            {
                buscarPasajeroTodo();
            }
            else{
                buscarPasajeroCliente(ID_CLIENTE,NOMBRE_CLIENTE);
            }
            cambiarPropiedad($("#agregar"),"visibility","visible");
        });
        var pasajero;
        for(var i = 0 ; i < PASAJEROS.length; i++)
        {
            if(PASAJEROS[i].pasajero_id === id)
            {
                pasajero = PASAJEROS[i];
            }
        }
        $("#rut").val(pasajero.pasajero_rut);
        $("#rut").prop("readonly",true);
        $("#nombre").val(pasajero.pasajero_nombre);
        $("#papellido").val(pasajero.pasajero_papellido);
        $("#mapellido").val(pasajero.pasajero_mapellido);
//        $("#nick").val(pasajero.pasajero_nick);
        $("#aparato").val(pasajero.pasajero_telefono);
        $("#celular").val(pasajero.pasajero_celular);
        $("#direccion").val(pasajero.pasajero_direccion);
        $("#punto").val(pasajero.pasajero_punto_encuentro);
        $("#mail").val(pasajero.pasajero_mail);
        $("#cargo").val(pasajero.pasajero_cargo);
        $("#empresa").val(pasajero.pasajero_empresa);
        $("#ruta").val(pasajero.pasajero_ruta);
        ID_EMPRESA = pasajero.pasajero_empresa;
        CC = pasajero.pasajero_centro_costo;
        RUTA = pasajero.pasajero_ruta;
        cargarCentroCosto(ID_EMPRESA,pasajero.pasajero_centro_costo);
        cargarRutas(ID_EMPRESA,pasajero.pasajero_ruta);
        cambiarPropiedad($("#agregar"),"visibility","visible");
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
        $("#buscaDireccion").click(function(){
            input_places = $("#direccion");
                if(mapa_oculto)
                {
                    colocarMarcadorPlaces();
                    quitarclase($("#contenedor_mapa"),"oculto");
                    mapa_oculto = false;
                }
                else
                {
                    agregarclase($("#contenedor_mapa"),"oculto");
                    mapa_oculto = true;
                }
            });
        
        $("#buscaPunto").click(function(){
            input_places = $("#punto");
            if(mapa_oculto)
            {
                colocarMarcadorPlaces();
                quitarclase($("#contenedor_mapa"),"oculto");
                mapa_oculto = false;
            }
            else
            {
                agregarclase($("#contenedor_mapa"),"oculto");
                mapa_oculto = true;
            }
        });
        mostrarMapa();
    });
}

function eliminarPasajero()
{
    var rut = $("#rut").val();
    var params = {rut : rut};
    var url = urlBase + "/pasajero/DelPasajero.php";
    var success = function(response)
    {
        alertify.success("Pasajero eliminado");
        cerrarSession(response);
        resetFormularioEliminar(PAGINA);
        resetBotones();
        buscarPasajero();
    };
    postRequest(url,params,success);
}

function validarExistencia(tipo,valor)
{
    for(var i = 0 ; i < PASAJEROS.length ; i++)
    {
        if(tipo === 'rut')
        {
            if(valor === PASAJEROS[i].pasajero_rut)
            {
                return true;
            }
        }
//        if(tipo === 'nick')
//        {
//            if(valor === PASAJEROS[i].pasajero_nick)
//            {
//                alertify.error("El nick "+valor+" no se encuentra disponible");
//                $("#nick").val("");
//                $("#nick").focus();
//                return ;
//            }
//        }
    }    
}

function validarTipoDato()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var rut = $("#rut");
    var telefono = $("#aparato");
    var celular = $("#celular");
    var mail = $("#mail");
//    if(!validarRut(rut.val()))
//    {
//        cambiarPestaniaGeneral();
//        marcarCampoError(rut);
//        alertify.error('Rut invalido');
//        return false;
//    }
    if(!validarNumero(telefono.val()))
    {
        marcarCampoOk(telefono);
        cambiarPestaniaGeneral();
        marcarCampoError(telefono);
        alertify.error('Telefono debe ser numerico');
        return false;
    }
    if(!validarNumero(celular.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(celular);
        alertify.error('Celular debe ser numerico');
        return false;
    }
    if(!validarEmail(mail.val()))
    {
        if(mail.val() !== '')
        {
            cambiarPestaniaGeneral();
            marcarCampoError(mail);
            alertify.error('E-mail invalido');
            return false;
        }
    }
    
    return true;
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_empresa").click(function(){
        cambiarPestaniaEmpresa();
    });
//    $("#p_app").click(function(){
//        cambiarPestaniaAplicacion();
//    });
}

function cargarCentroCosto(empresa,centro)
{
    var params = {cliente : empresa};
    var url = urlBase + "/cliente/GetCentroCosto.php";
    var success = function(response)
    {
        var cc = $("#centro");
        cc.html("<option value=\"\">Seleccione</option>");
        for(var i = 0 ; i < response.length; i++){
            var sel = "";
            if(centro === response[i].cc_nombre)
            {
                sel = " selected ";
            }
            cc.append("<option value=\""+response[i].cc_nombre+"\" "+sel+">"+response[i].cc_nombre+"</option>");
        }
    };
    postRequest(url,params,success);
}

function activarPestania(array)
{
    var general = false;
    var empresa = false;
//    var app = false;
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        if(array[i] === '')
        {
            if(i < 7)
            {
                general = true;
            }
            if(i > 6 && i < 9)
            {
                if(!general)
                {
                    empresa = true;
                }
            }
//            if(i > 8)
//            {
//                if(!empresa)
//                {
//                    app = true;
//                }
//            }
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
    else if(empresa)
    {
        cambiarPestaniaEmpresa();
    }
//    else if(app)
//    {
//        cambiarPestaniaAplicacion();
//    }
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_empresa"),"display","none");
//    cambiarPropiedad($("#cont_app"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_empresa"), "dispose");
//    agregarclase($("#p_app"),"dispose");
}

function cambiarPestaniaEmpresa()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_empresa"),"display","block");
//    cambiarPropiedad($("#cont_app"),"display","none");
    quitarclase($("#p_empresa"),"dispose");
    agregarclase($("#p_general"), "dispose");
    $("#empresa").val(ID_EMPRESA);
    cargarCentroCosto(ID_EMPRESA,CC);
    cargarRutas(ID_EMPRESA,RUTA);
//    agregarclase($("#p_app"), "dispose");
}

function cambiarPestaniaAplicacion()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_empresa"),"display","none");
    cambiarPropiedad($("#cont_app"),"display","block");
    quitarclase($("#p_app"),"dispose");
    agregarclase($("#p_general"), "dispose");
    agregarclase($("#p_empresa"), "dispose");
}


function cargarClientes()
{
    var busqueda = $("#clientes").val();
    var params = {busqueda : busqueda,buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        $("#empresa").html("<option value=''>Seleccione</option>");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].cliente_id;
            var nombre = response[i].cliente_razon;
            var sel = "";
            if(ID_EMPRESA === response[i].cliente_id)
            {
                sel = " selected ";
                //cargarCentroCosto(ID_EMPRESA,'');
            }
            $("#empresa").append("<option value=\""+id+"\" "+sel+">"+nombre+"</option>");
        }
    };
    postRequest(url,params,success);
}

function cargarRutas(empresa,ruta)
{
    var params = {empresa : empresa};
    var url = urlBase + "/tarifa/GetTarifasEmpresa.php";
    var success = function(response)
    {
        $("#ruta").html("<option value=\"\">Seleccione</option>");
        for(var i = 0 ; i < response.length ; i++)
        {
            var sel = "";
            if(ruta === response[i].tarifa_descripcion)
            {
                sel = " selected ";
            }
            var nombre = response[i].tarifa_descripcion;
            var descripcion = response[i].tarifa_nombre;
            $("#ruta").append("<option value=\""+nombre+"\" "+sel+">"+nombre+" / "+descripcion+"</option>");
        }
    };
    postRequest(url,params,success);
}

function buscarClientePasajero()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda,buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        cerrarSession(response);
        var clientes = $("#lista_busqueda_pasajero");
        clientes.html("");
        CLIENTES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        clientes.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\"col_todo\" onClick=\"cambiarFilaPasajero('todo','todo')\">Todos</div>");
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].cliente_id;
            var nombre = response[i].cliente_razon;
            var titulo = recortar(nombre);
            clientes.append("<div class=\"fila_contenedor fila_contenedor\" id=\"col_"+id+"\" onClick=\"cambiarFilaPasajero('"+id+"','"+nombre+"')\">"+titulo+"</div>");
        }
    };
    postRequest(url,params,success);
}

function cambiarFilaPasajero(id,nombre)
{
//    NOMBRE_CLIENTE = nombre;
    if(MODIFICADO)
    {
        confirmar("Cambio de tarifa",
        "¿Desea cambiar de tarifa sin guardar los cambios?",
        function()
        {
            MODIFICADO = false;
            if(id === 'todo')
            {
                buscarPasajeroTodo();
            }
            else
            {
                buscarPasajeroCliente(id,nombre);
            }
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        if(id === 'todo')
        {
            buscarPasajeroTodo();
        }
        else
        {
            buscarPasajeroCliente(id,nombre);
        }
    }
}

function colocarMarcadorPlaces()
{
    eliminarMarkers();
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map
    });
    
    markers.push(marker);

    map.setZoom(17);
    map.panTo(marker.position);
    
    google.maps.event.addListener(map, "drag", function() {
        marker.setPosition(this.getCenter());
        POSITION = [this.getCenter().lat(),this.getCenter().lng()];
    });
    
    google.maps.event.addListener(map, "dragend", function() {
        input_places.val("Cargando...");
        var query = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + POSITION[0] +','+ POSITION[1]+'&key=' + API_KEY;
        $.getJSON(query, function (data) {
            if (data.status === 'OK') { 
                var zero = data.results[0];
                var address = zero.formatted_address;
                input_places.val(address);     
            } 
        });
    });
}

function preEliminarPasajero(id)
{
    confirmar("Eliminar pasajero","Esta seguro que desea eliminar al pasajero "+id,
            function(){
                var params = {rut : id};
                var url = urlBase + "/pasajero/DelPasajero.php";
                var success = function(response)
                {
                    alertify.success("Pasajero eliminado");
                    cerrarSession(response);
                    resetBotones();
                    buscarPasajero();
                };
                postRequest(url,params,success);
            });
}

function initPlacesAutoComplete(input) {
    var autocomplete = new google.maps.places.Autocomplete(input,
    {componentRestrictions:{'country': 'cl'}});
    places = new google.maps.places.PlacesService(map);
    autocomplete.addListener('place_changed', function(){
        input_places = input.id;
        if(input.id === 'direccion')
        {
            quitarclase($("#buscaDireccion"),"oculto");
        }
        else if(input.id === 'punto')
        {
            quitarclase($("#buscaPunto"),"oculto");
        }
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            colocarMarcadorPlaces();
        }
    });
}
    
    function onPlaceChanged()
    {
        eliminarMarkers();
        var place = autocomplete.getPlace();
        if (place.geometry) {
            var marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map
            });
            markers.push(marker);
            map.panTo(place.geometry.location);
            map.setZoom(15);
            google.maps.event.addListener(map, "drag", function() {
            marker.setPosition(this.getCenter());
                POSITION = [this.getCenter().lat(),this.getCenter().lng()];
            });
    
            google.maps.event.addListener(map, "dragend", function() {
                var punto = $('#punto');
                punto.val("Cargando...");
                var query = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + POSITION[0] +','+ POSITION[1]+'&key=' + API_KEY;
                $.getJSON(query, function (data) {
                    if (data.status === 'OK') { 
                        var zero = data.results[0];
                        var address = zero.formatted_address;
                        punto.val(address);     
                    } 
                });
            });
        }
    }