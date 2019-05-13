/* global urlBase, alertify, obj, google, API_KEY, map, directionsDisplay, markers, geocoder, DIRECCION_EMPRESA, flightPath */
var CLIENTES;
var AGREGAR = true;
var PAGINA = 'CLIENTES';
var ID_CLIENTE;
var NOMBRE_CLIENTE;
var TIPO_GRUPO = '3';
var CENTROS_COSTO = [];
var mapa_oculto = true;
var clientes_tarifa = [];
var CAMPOS = ["rut","razon","tipoCliente","direccion","nombreContacto","telefono","mail","mail2"];
$(document).ready(function(){
    cambiarPropiedad($("#titulo_tarifa"),"background-color","white");
    PAGINA_ANTERIOR = PAGINA;
    limpiarMapa();
    buscarCliente();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#lista_busqueda_cliente_detalle").load("html/datos_cliente.html", function( response, status, xhr ) {
            initPlacesAutoComplete();
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
            $("#agregar_cc").click(function(){
                agregarCentroCosto();
            });

            $("#quitar_cc").click(function(){
                quitarCentroCosto();
            });
            
            $("#buscaPunto").click(function(){
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
            $("#volver").click(function(){
                ocultarMapa();
                if(typeof TIPO_GRUPO === 'undefined')
                {
                    buscarCliente();
                }
                else if(TIPO_GRUPO === '0' || TIPO_GRUPO === '1' || TIPO_GRUPO === '2')
                {
                    buscarClienteTipo(TIPO_GRUPO);
                }
                else if(TIPO_GRUPO === '3')
                {
                    buscarClienteTodo();
                }
                cambiarPropiedad($("#agregar"),"visibility","visible");
                cambiarPropiedad($("#guardar"),"visibility","hidden");
                cambiarPropiedad($("#eliminar"),"visibility","hidden");
            });
            mostrarMapa();
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#elimianr"),"visibility","hidden");
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
    var tipo = $("#tipoCliente").val();
    var rut = $("#rut").val();
    var direccion = $("#direccion").val();
    var nombre = $("#nombreContacto").val();
    var telefono = $("#telefono").val();
    var mail = $("#data").val();
    var mail2 = $("#data2").val();
    var grupo = $("#grupo").val();
    var color = $("#color").val();
    var contrato = $("#contratoOculta").val();
    var cc = $(".centro_costo");
    cc.each(
        function (index){
            if($(this).val() !== '')
            {   
                CENTROS_COSTO.push($(this).val());
            }
        });
    var array = [rut,razon,tipo,direccion,nombre,telefono,mail,mail2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var params = { razon : razon, tipo : tipo, rut : rut, direccion : direccion, nombre : nombre,
                telefono : telefono, mail : mail, mail2 : mail2 , contrato : contrato, grupo : grupo,color:color, centros : CENTROS_COSTO + ""};
        var url = urlBase+"/cliente/AddCliente.php";
        var success = function(response)
        {
            ocultarMapa();
            ID_CLIENTE = undefined;
            NOMBRE_CLIENTE = undefined;
            cerrarSession(response);
            alertify.success("Cliente Agregado");
            vaciarFormulario();
            resetFormulario();
            buscarCliente();
            CENTROS_COSTO = [];
            $(".contenedor_contrato_movil").html("");
        };
        postRequest(url,params,success);
    }
}

function modificarCliente()
{
    var id = ID_CLIENTE;
    var razon = $("#razon").val();
    var tipo = $("#tipoCliente").val();
    var rut = $("#rut").val();
    var direccion = $("#direccion").val();
    var nombre = $("#nombreContacto").val();
    var telefono = $("#telefono").val();
    var mail = $("#data").val();
    var mail2 = $("#data2").val();
    var grupo = $("#grupo").val();
    var color = $("#color").val();
    var contrato = $("#contratoOculta").val();
    var cc = $(".centro_costo");
    cc.each(
        function (index){
            if($(this).val() !== '')
            {   
                CENTROS_COSTO.push($(this).val());
            }
        });
    var array = [rut,razon,tipo,direccion,nombre,telefono,mail,mail2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDato())
    {
        var params = { id : id, razon : razon, tipo : tipo, rut : rut, direccion : direccion, nombre : nombre,
            telefono : telefono, mail : mail, mail2 : mail2, contrato : contrato ,grupo : grupo,color : color, centros : CENTROS_COSTO+""};
        var url = urlBase + "/cliente/ModCliente.php";
        var success = function(response)
        {
            ocultarMapa();
            buscarCliente();
            cerrarSession(response);
            alertify.success("Cliente Modificado");
            resetFormulario();
            CENTROS_COSTO = [];
        };
        postRequest(url,params,success);
    }
}

function buscarCliente()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda,buscaCC : '1'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        cerrarSession(response);
        var grupos = $("#lista_busqueda_cliente");
        var clientes = $("#lista_busqueda_cliente_detalle");
        grupos.html("");
        grupos.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\"col_3\" onClick=\"cambiarFila('3')\">Todos</div>");
        grupos.append("<div class=\"fila_contenedor\" id=\"col_0\" onClick=\"cambiarFila('0')\">Grandes Clientes</div>");
        grupos.append("<div class=\"fila_contenedor\" id=\"col_1\" onClick=\"cambiarFila('1')\">Medianos Clientes</div>");
        grupos.append("<div class=\"fila_contenedor\" id=\"col_2\" onClick=\"cambiarFila('2')\">Pequeños Clientes</div>");
        clientes.html("");
        clientes.append("<div class=\"contenedor_central_titulo\"><div></div><div>Rut</div><div>Razon social</div><div>Tipo</div><div class=\"mini_tab\" >Grupo</div><div></div></div>");
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
            var tipo = response[i].cliente_tipo;
            var grupo = '';
            if(response[i].cliente_grupo === '0')
            {
                grupo = 'Grandes Clientes';
            }
            else if(response[i].cliente_grupo === '1')
            {
                grupo = 'Medianos Clientes';
            }
            else if(response[i].cliente_grupo === '2')
            {
                grupo = 'Pequeños Clientes';
            }
            clientes.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\">"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+rut+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+tipo+"</div>"+
                    "<div  class=\"mini_tab\" onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+grupo+"</div>"+
                    "<div><img onclick=\"preEliminarCliente('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
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
            if(id === '3')
            {
                buscarClienteTodo();
            }
            else
            {
                buscarClienteTipo(id);
            }
            
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        if(id === '3')
        {
            buscarClienteTodo();
        }
        else
        {
            buscarClienteTipo(id);
        }
    }
}
function buscarClienteTipo(tipo)
{
    TIPO_GRUPO = tipo;
    marcarFilaActiva("col_"+tipo);
    var clientes = $("#lista_busqueda_cliente_detalle");
    clientes.html("");
    clientes.append("<div class=\"contenedor_central_titulo\"><div></div><div>Rut</div><div>Razon social</div><div>Tipo</div><div class=\"mini_tab\" >Grupo</div><div></div></div>");
    var noHayRegistros = true;
    for(var i = 0 ; i < CLIENTES.length; i++)
    {
        if(CLIENTES[i].cliente_grupo === TIPO_GRUPO)
        {
            noHayRegistros = false;
            var id = CLIENTES[i].cliente_id;
            var rut = CLIENTES[i].cliente_rut;
            var nombre = CLIENTES[i].cliente_razon;
            var tipoG = CLIENTES[i].cliente_tipo;
            var grupo = '';
            if(CLIENTES[i].cliente_grupo === '0')
            {
                grupo = 'Grandes clientes';
            }
            else if(CLIENTES[i].cliente_grupo === '1')
            {
                grupo = 'Medianos clientes';
            }
            else if(CLIENTES[i].cliente_grupo === '2')
            {
                grupo = 'Pequeños clientes';
            }
            clientes.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\">"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+rut+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+tipoG+"</div>"+
                    "<div class=\"mini_tab\" onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+grupo+"</div>"+
                    "<div><img onclick=\"preEliminarCliente('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    }
    if(noHayRegistros)
    {
        clientes.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        alertify.error("No hay registros que mostrar");
        return;
    }
}
function buscarClienteTodo()
{
    TIPO_GRUPO = '3';
    marcarFilaActiva("col_3");
    var clientes = $("#lista_busqueda_cliente_detalle");
    clientes.html("");
    clientes.append("<div class=\"contenedor_central_titulo\"><div></div><div>Rut</div><div>Razon social</div><div>Tipo</div><div class=\"mini_tab\" >Grupo</div><div></div></div>");
    var noHayRegistros = true;
    for(var i = 0 ; i < CLIENTES.length; i++)
    {
        noHayRegistros = false;
        var id = CLIENTES[i].cliente_id;
        var rut = CLIENTES[i].cliente_rut;
        var nombre = CLIENTES[i].cliente_razon;
        var tipoG = CLIENTES[i].cliente_tipo;
        var grupo = '';
        if(CLIENTES[i].cliente_grupo === '0')
        {
            grupo = 'Grandes clientes';
        }
        else if(CLIENTES[i].cliente_grupo === '1')
        {
            grupo = 'Medianos clientes';
        }
        else if(CLIENTES[i].cliente_grupo === '2')
        {
            grupo = 'Pequeños clientes';
        }
        clientes.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\">"+
                "<div onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+rut+"</div>"+
                "<div onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+nombre+"</div>"+
                "<div onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+tipoG+"</div>"+
                "<div class=\"mini_tab\" onClick=\"abrirModificar('"+id+"','"+nombre+"')\">"+grupo+"</div>"+
                "<div><img onclick=\"preEliminarCliente('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                "</div>");
    }
    if(noHayRegistros)
    {
        clientes.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        alertify.error("No hay registros que mostrar");
        return;
    }
}

function abrirModificar(id,nombre)
{
    AGREGAR = false;
    ID_CLIENTE = id;
    NOMBRE_CLIENTE = nombre;
    //marcarFilaActiva(ID_CLIENTE);
    $("#lista_busqueda_cliente_detalle").load("html/datos_cliente.html", function( response, status, xhr ) {
        $("#titulo_pagina_cliente").text(nombre);
        initPlacesAutoComplete();
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
        $("#eliminarT").click(function (){
            confirmar("Eliminar tarifa","Esta seguro que desea eliminar la tarifa "+$("#descripcion").val() + " " +$("#nombre").val(),
            function(){
                eliminarTarifa();
            },null);
        });
        $("#agregarT").click(function(){
            AGREGAR = true;
            $("#lista_busqueda_tarifa_detalle").load("html/datos_tarifa_cliente.html", function( response, status, xhr ) {
                iniciarHora([$("#hora")]);
                cambiarPropiedad($("#titulo_tarifa"),"background-color","white");
                cambiarPropiedad($(".contenedor-pre-input"),"height","25px");
                agregarclase($("#agregarT"),"oculto");
                quitarclase($("#guardarT"),"oculto");
                agregarclase($("#eliminarT"),"oculto");
                $("#clientes").val(NOMBRE_CLIENTE);
                cambioEjecutado();                
                cambiarPropiedad($("#titulo_tarifa"),"background-color","white");
                cambiarPropiedad($(".contenedor-pre-input"),"height","25px");
                cargarClientes();
                $("#clientes").on('input',function(){
                    generarNombre('cliente');
                });
                $("#tipo").change(function(){
                    generarNombre('tipo');
                    var tipo = $(this).val();
                    if(tipo === 'RG')
                    {
                        $("#destino").val(DIRECCION_EMPRESA);
                        $("#origen").val("");
                    }
                    else if(tipo === 'ZP')
                    {
                        $("#origen").val(DIRECCION_EMPRESA);
                        $("#destino").val("");
                    }
                });
                $("#horario").change(function(){
                    generarNombre('horario');
                });

                $("#nombre").blur(function (){
                    if(validarExistencia('nombre',$(this).val()))
                    {
                        alertify.error("El nombre "+$(this).val()+" ya existe");
                        $("#nombre").val("");
                        return;
                    }
                });
                $("#clientes").on('blur',function () {
                    if($("#clientes").val() === "")
                    {
                        //cargarPasajeros();
                    }
                    var noExiste = validarInexistencia($("#clientes").val(),clientes);
                    if(noExiste)
                    {
                        alertify.error("Cliente inexistente");
                        $("#clientes").val("");

                    }
                });

                $("#volverT").click(function(){
                    buscarTarifas(ID_CLIENTE,NOMBRE_CLIENTE);
                    
                });

            });
            cambiarPropiedad($("#guardar"),"visibility","visible");
            cambiarPropiedad($("#cancelar"),"visibility","visible");
        });
        $("#guardarT").click(function (){
            if(AGREGAR)
            {
                agregarTarifa();
            }
            else
            {
                modificarTarifa();
            }
        });
        $("#volver").click(function(){
            ocultarMapa();
            if(typeof TIPO_GRUPO === 'undefined')
            {
                buscarCliente();
            }
            else if(TIPO_GRUPO === '0' || TIPO_GRUPO === '1' || TIPO_GRUPO === '2')
            {
                buscarClienteTipo(TIPO_GRUPO);
            }
            else if(TIPO_GRUPO === '3')
            {
                buscarClienteTodo();
            }
            cambiarPropiedad($("#agregar"),"visibility","visible");
            cambiarPropiedad($("#guardar"),"visibility","hidden");
            cambiarPropiedad($("#eliminar"),"visibility","hidden");
        });
        
        $("#buscaPunto").click(function(){
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
        $("#tipoCliente").val(cliente.cliente_tipo);
        $("#nombreContacto").val(cliente.cliente_nombre_contacto);
        $("#telefono").val(cliente.cliente_fono_contacto);
        $("#direccion").val(cliente.cliente_direccion);
        DIRECCION_EMPRESA = cliente.cliente_direccion;
        $("#data").val(cliente.cliente_mail_contacto);
        $("#data2").val(cliente.cliente_mail_facturacion);
        $("#grupo").val(cliente.cliente_grupo);
        $("#color").val(cliente.cliente_color);
        verAdjunto(cliente.cliente_contrato,'');
        var j = 0;
        Object.keys(cliente.cliente_centro_costo).forEach(function(key){
        var value = cliente.cliente_centro_costo[key];
            if(j === 0)
            {
                $("#centros").val(value);
            }
            else if(j > 0)
            {
                agregarCentroCostoValor(j+1,value);
            }
            j++;
        });
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
        
        $("#agregar_cc").click(function(){
            agregarCentroCosto();
        });

        $("#quitar_cc").click(function(){
            quitarCentroCosto();
        });
        
        mostrarMapa();
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
    var mail = $("#data");
    var mail2 = $("#data2");
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

function activarPestania(array)
{
    var general = false;
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
    if(general)
    {
        cambiarPestaniaGeneral();
    }
}

function iniciarPestanias()
{
    $("#p_general").click(function(){
        cambiarPestaniaGeneral();
    });
    $("#p_ccosto").click(function(){
        cambiarPestaniaCC();
    });
    $("#p_tarifa").click(function(){
        cambiarPestaniaTarifa();
        buscarTarifas(ID_CLIENTE, NOMBRE_CLIENTE,'');
    });
}

function cambiarPestaniaGeneral()
{
    cambiarPropiedad($("#cont_general"),"display","block");
    cambiarPropiedad($("#cont_ccosto"),"display","none");
    cambiarPropiedad($("#cont_tarifa"),"display","none");
    quitarclase($("#p_general"),"dispose");
    agregarclase($("#p_ccosto"),"dispose");
    agregarclase($("#p_tarifa"),"dispose");
}

function cambiarPestaniaCC()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_ccosto"),"display","block");
    cambiarPropiedad($("#cont_tarifa"),"display","none");
    quitarclase($("#p_ccosto"),"dispose");
    agregarclase($("#p_general"), "dispose");
     agregarclase($("#p_tarifa"), "dispose");
}
function cambiarPestaniaTarifa()
{
    cambiarPropiedad($("#cont_general"),"display","none");
    cambiarPropiedad($("#cont_ccosto"),"display","none");
    cambiarPropiedad($("#cont_tarifa"),"display","block");
    quitarclase($("#p_tarifa"),"dispose");
    agregarclase($("#p_general"), "dispose");
    agregarclase($("#p_ccosto"), "dispose");
       
}

function agregarCentroCosto()
{
    var i = 1;
    $(".centro_costo").each(function(index){
        i++;
    });
    $("#centro_costo").append("<div class=\"contenedor-pre-input\" id=\"cont-pre-cc-"+i+"\">Centro Costo "+i+" (*)</div>"+
            "<div class=\"contenedor-input\" id=\"cont-cc-"+i+"\">"+
                "<input class=\"centro_costo\" type=\"text\" id=\"centros"+i+"\" placeholder=\"Ej: Principal\" maxlength=\"40\">");
    $('#centro_costo').animate({ scrollTop: $('#centro_costo').height() });
}

function agregarCentroCostoValor(i,val)
{
    $("#centro_costo").append("<div class=\"contenedor-pre-input\" id=\"cont-pre-cc-"+i+"\">Centro Costo "+i+" (*)</div>"+
            "<div class=\"contenedor-input\" id=\"cont-cc-"+i+"\"><input class=\"centro_costo\" type=\"text\" id=\"centros"+i+"\" value=\""+val+"\" placeholder=\"Ej: Principal\" maxlength=\"40\">");
}

function quitarCentroCosto()
{
    var i = 1;
    var largo = $(".centro_costo").length;
    if(largo > 1 )
    {
        $(".centro_costo").each(function(index){
            if(i === largo)
            {
                $(this).remove();
                $("#cont-cc-"+i).remove();
                $("#cont-pre-cc-"+i).remove();
            }
            i++;
        });
    }
}

function succesSubirContrato()
{
    var archivo = $("#contratoOculta").val();
    var ext = archivo.split("\.")[1];
    if(ext !== 'pdf'){
        alertify.error("Archivo invalido");
        return;
    }
    else
    {
        var enlace = "<a href=\"source/util/pdf/"+$("#patente").val()+"_"+archivo+"\" target=\"_blanck\">Ver</a>";
        $("#contenedor_contrato").html(enlace);
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
        var punto = $('#direccion');
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

function preEliminarCliente(id)
{
    confirmar("Eliminar cliente","Esta seguro que desea eliminar al cliente "+id,
            function(){
                var params = {rut : id};
                var url = urlBase + "/cliente/DelCliente.php";
                var success = function(response)
                {
                    alertify.success("Cliente eliminado");
                    cerrarSession(response);
                    resetBotones();
                    buscarCliente();
                };
                postRequest(url,params,success);
            });
}

    function initPlacesAutoComplete() {
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('direccion'),
        {componentRestrictions:{'country': 'cl'}});
        places = new google.maps.places.PlacesService(map);
        autocomplete.addListener('place_changed', onPlaceChanged);
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
                var punto = $('#direccion');
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
    
    /* TARIFAS*/
    
    function agregarTarifa()
{
    var cliente = $("#clientes").val();
    var tipo = $("#tipo").val();
    var horario = $("#horario").val();
    var hora = $("#hora").val();
    var numero = $("#numero").val();
    var descripcion = $("#descripcion").val();
    var nombre = $("#nombre").val();
    var origen = $("#origen").val();
    var destino = $("#destino").val();
    var valor1 = $("#valor1").val();
    var valor2 = $("#valor2").val();
    var array = [tipo,horario,descripcion,numero,hora,nombre,origen,destino,valor1,valor2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDatoTarifa())
    {
        var params = {cliente : cliente, tipo : tipo,horario : horario, numero : numero, hora : hora,descripcion: descripcion,nombre : nombre, origen : origen,
            destino : destino, valor1 : valor1, valor2 : valor2};
        var url = urlBase + "/tarifa/AddTarifa.php";
        var success = function(response)
        {
            ID_TARIFA = undefined;
            cerrarSession(response);
            alertify.success("Tarifa Agregada");
            resetFormulario();
            buscarTarifas(ID_CLIENTE,NOMBRE_CLIENTE);
            cambiarPropiedad($("#pie-aniadir"),"display","block");
            quitarclase($("#agregarT"),"oculto");
            agregarclase($("#guardarT"),"oculto");
            agregarclase($("#eliminaT"),"oculto");
        };
        postRequest(url,params,success);
    }
}

function modificarTarifa()
{
    var id = ID_TARIFA;
    var cliente = $("#clientes").val();;
    var tipo = $("#tipo").val();
    var horario = $("#horario").val();
    var descripcion = $("#descripcion").val();
    var hora = $("#hora").val();
    var numero = $("#numero").val();
    var nombre = $("#nombre").val();
    var origen = $("#origen").val();
    var destino = $("#destino").val();
    var valor1 = $("#valor1").val();
    var valor2 = $("#valor2").val();
    var array = [tipo,horario,descripcion,numero, hora,nombre,valor1,valor2];
    if(!validarCamposOr(array))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(validarTipoDatoTarifa())
    {
        var params = {id : id,cliente : cliente, tipo : tipo,horario : horario, numero : numero, hora : hora,descripcion : descripcion,nombre : nombre, origen : origen,
            destino : destino, valor1 : valor1, valor2 : valor2};
        var url = urlBase + "/tarifa/ModTarifa.php";
        var success = function(response)
        {
            cerrarSession(response);
            alertify.success("Tarifa Modificada");
            resetFormulario();
            buscarTarifas(ID_CLIENTE,NOMBRE_CLIENTE);
            cambiarPropiedad($("#pie-aniadir"),"display","block");
            agregarclase($("#guardarT"),"oculto");
            agregarclase($("#eliminarT"),"oculto");
            quitarclase($("#agregarT"),"oculto");
        };
        postRequest(url,params,success);
    }
}

function buscarClienteTarifa()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda,buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        cerrarSession(response);
        var clientes = $("#lista_busqueda_tarifa");
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
            var direccion = response[i].cliente_direccion;
            var titulo = recortar(rut+" / "+nombre);
            if (typeof ID_CLIENTE !== "undefined" && ID_CLIENTE === id)
            {
                clientes.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambiarFilaTarifa('"+id+"','"+nombre+"','"+direccion+"')\">"+titulo+"</div>");
            }
            else
            {
                clientes.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFilaTarifa('"+id+"','"+nombre+"','"+direccion+"')\">"+titulo+"</div>");
            }
        }
    };
    postRequest(url,params,success);
}

function buscarTarifas(id,nombre)
{
    ID_CLIENTE = id;
    NOMBRE_CLIENTE = nombre;
    $("#clientes").val(nombre);
    marcarFilaActiva(id);
    quitarclase($("#agregarT"),"oculto");
    agregarclase($("#guardarT"),"oculto");
    agregarclase($("#eliminarT"),"oculto");
    $("#lista_busqueda_tarifa_detalle").html("");
    var busqueda = NOMBRE_CLIENTE;
    var params = {busqueda : busqueda};
    var url = urlBase + "/tarifa/GetTarifas.php";
    var success = function(response)
    {
        
        cambiarPropiedad($(".pie-tarifa"),"display","block");
        cerrarSession(response);
        var tarifas = $("#lista_busqueda_tarifa_detalle");
        tarifas.html("");
        TARIFAS = response;
        tarifas.append("<div class=\"contenedor_central_titulo_tarifa\"><div>Nombre</div><div>Hora</div><div>Descripción</div><div>Empresa</div><div></div></div>");
        if(response.length === 0)
        {
            tarifas.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].tarifa_id;
            var nombre = response[i].tarifa_descripcion;
            var hora = response[i].tarifa_hora;
            var descripcion = response[i].tarifa_nombre;
            var empresa = response[i].tarifa_cliente;
            tarifas.append("<div class=\"fila_contenedor fila_contenedor_tarifa_detalle\" id=\""+id+"\" \">"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+hora+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+descripcion+"</div>"+
                    "<div onClick=\"abrirBuscador('"+id+"')\">"+empresa+"</div>"+
                    "<div><img onclick=\"preEliminarTarifa('"+descripcion+"','"+nombre+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
    };
    postRequest(url,params,success);
    
}

function cargarClientes()
{
    var busqueda = $("#clientes").val();
    var params = {busqueda : busqueda,buscaCC : '0'};
    var url = urlBase + "/cliente/GetClientes.php";
    var success = function(response)
    {
        $("#lcliente").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].cliente_razon;
            $("#lcliente").append("<option value=\""+nombre+"\">"+nombre+"</option>");
            clientes_tarifa.push(nombre);
        }
    };
    postRequest(url,params,success);
}

function generarNombre()
{
    var tipo = $("#tipo").val();
    var horario = $("#horario").val();
    if(horario === '' && tipo === '')
    {
        $("#nombre").val("-");
    }
    if(horario !== '' && tipo === '')
    {
        $("#nombre").val("-"+horario);
    }
    else if(tipo !== '' && horario === '')
    {
        $("#nombre").val(tipo+"-");
    }
    else if(tipo !== '' && horario !== '')
    {
        $("#nombre").val(tipo+"-"+horario);
    }
}
function validarTipoDatoTarifa()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var numero = $("#numero");
    var valor1 = $("#valor1");
    var valor2 = $("#valor2");
    if(!validarNumero(numero.val()))
    {
        marcarCampoError(numero);
        alertify.error('Número ruta debe ser numerico');
        return false;
    }
    if(!validarNumero(valor1.val()))
    {
        marcarCampoError(valor1);
        alertify.error('Tarifa 1 debe ser numerico');
        return false;
    }
    if(!validarNumero(valor2.val()))
    {
        marcarCampoError(valor2);
        alertify.error('Tarifa 2 debe ser numerico');
        return false;
    }
    return true;
}
function abrirBuscador(id)
{
    AGREGAR = false;
    ID_TARIFA = id;
    cambiarPropiedad($("#pie-aniadir"),"display","none");
    agregarclase($("#agregarT"),"oculto");
    quitarclase($("#guardarT"),"oculto");
    quitarclase($("#eliminarT"),"oculto");
    $("#lista_busqueda_tarifa_detalle").load("html/datos_tarifa_cliente.html", function( response, status, xhr ) {
        iniciarHora([$("#hora")]);
        cambiarPropiedad($("#titulo_tarifa"),"background-color","white");
        cambiarPropiedad($(".contenedor-pre-input"),"height","25px");
        cambioEjecutado();
        var tarifa;
        for(var i = 0 ; i < TARIFAS.length; i++)
        {
            if(TARIFAS[i].tarifa_id === id)
            {
                tarifa = TARIFAS[i];
            }
        }
        $("#tipo").change(function(){
            generarNombre();
        });
        $("#horario").change(function(){
            generarNombre();
        });
        cargarClientes();
        $("#clientes").val(tarifa.tarifa_cliente);
        $("#tipo").val(tarifa.tarifa_tipo);
        $("#horario").val(tarifa.tarifa_horario);
        $("#hora").val(tarifa.tarifa_hora);
        $("#numero").val(tarifa.tarifa_numero);
        $("#descripcion").val(tarifa.tarifa_descripcion);
        $("#nombre").prop("readonly",true);
        $("#nombre").val(tarifa.tarifa_nombre);
        $("#origen").val(tarifa.tarifa_origen);
        $("#destino").val(tarifa.tarifa_destino);
        $("#valor1").val(tarifa.tarifa_valor1);
        $("#valor2").val(tarifa.tarifa_valor2);
        $("#eliminar2").click(function (){
            confirmar("Eliminar tarifa","Esta seguro que desea eliminar la tarifa "+$("#descripcion").val() + " " +$("#nombre").val(),
            function(){
                eliminarTarifa();
            },null);
        });

        $("#volverT").click(function(){
            buscarTarifas(ID_CLIENTE,NOMBRE_CLIENTE);
            quitarclase($("#agregar"),"oculto");
            agregarclase($("#guardarT"),"oculto");
            agregarclase($("#eliminaT"),"oculto");
        });
    });
}

function eliminarTarifa()
{
    var nombre = $("#nombre").val();
    var params = {nombre : nombre};
    var url = urlBase + "/tarifa/DelTarifa.php";
    var success = function(response)
    {
        alertify.success("Tarifa eliminada");
        cerrarSession(response);
        resetBotones();
        buscarTarifas(ID_CLIENTE,NOMBRE_CLIENTE);
        cambiarPropiedad($("#pie-aniadir"),"display","initial");
        agregarclase($("#eliminarT"),"oculto");
        agregarclase($("#guardarT"),"oculto");
        quitarclase($("#agregarT"),"oculto");
    };
    postRequest(url,params,success);
}

function preEliminarTarifa(nombre,descripcion)
{
    confirmar("Eliminar tarifa","Esta seguro que desea eliminar la tarifa "+descripcion+" "+nombre,
            function(){
                var params = {nombre : nombre};
                var url = urlBase + "/tarifa/DelTarifa.php";
                var success = function(response)
                {
                    agregarclase($("#eliminarT"),"oculto");
                    agregarclase($("#guardarT"),"oculto");
                    quitarclase($("#agregarT"),"oculto");
                    alertify.success("Tarifa eliminada");
                    cerrarSession(response);
                    resetBotones();
                    buscarTarifas(ID_CLIENTE,NOMBRE_CLIENTE);
                    cambiarFilaTarifa(ID_CLIENTE,NOMBRE_CLIENTE);
                };
                postRequest(url,params,success);
            });
}