/* global urlBase, alertify, obj, google, API_KEY, map, markersPanel, directionsDisplay, markers, geocoder */
var CLIENTES;
var AGREGAR = true;
var PAGINA = 'CLIENTES';
var ID_CLIENTE;
var NOMBRE_CLIENTE;
var TIPO_GRUPO;
var CENTROS_COSTO = [];
var mapa_oculto = true;
var clientes_tarifa = [];
var CAMPOS = ["rut","razon","tipoCliente","direccion","nombreContacto","telefono","mail","mail2"];
$(document).ready(function(){
    if(geocoder === null)
    {
        geocoder = new google.maps.Geocoder();
    }
    PAGINA_ANTERIOR = PAGINA;
    if (directionsDisplay !== null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
    }
    for(var i = 0; i < markers.length;i++)
    {
        markers[i].setMap(null);
    }
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
                if(typeof TIPO_GRUPO === 'undefided')
                {
                    buscarCliente();
                }
                else
                {
                    buscarClienteTipo(TIPO_GRUPO);
                }
                cambiarPropiedad($("#agregar"),"visibility","visible");
                cambiarPropiedad($("#guardar"),"visibility","hidden");
                cambiarPropiedad($("#eliminar"),"visibility","hidden");
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
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    var grupo = $("#grupo").val();
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
                telefono : telefono, mail : mail, mail2 : mail2 , contrato : contrato, grupo : grupo, centros : CENTROS_COSTO + ""};
        var url = urlBase+"/cliente/AddCliente.php";
        var success = function(response)
        {
            ID_CLIENTE = undefined;
            NOMBRE_CLIENTE = undefined;
            cerrarSession(response);
            alertify.success("Cliente Agregado");
            cambiarPestaniaGeneral();
            vaciarFormulario();
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
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
    var mail = $("#mail").val();
    var mail2 = $("#mail2").val();
    var grupo = $("#grupo").val();
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
            telefono : telefono, mail : mail, mail2 : mail2, contrato : contrato ,grupo : grupo, centros : CENTROS_COSTO+""};
        var url = urlBase + "/cliente/ModCliente.php";
        var success = function(response)
        {
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            cambiarPestaniaGeneral();
            alertify.success("Cliente Modificado");
            resetFormulario();
            buscarCliente();
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
        grupos.append("<div class=\"fila_contenedor\" id=\"col_0\" onClick=\"cambiarFila('0')\">Grandes Clientes</div>");
        grupos.append("<div class=\"fila_contenedor\" id=\"col_1\" onClick=\"cambiarFila('1')\">Medianos Clientes</div>");
        grupos.append("<div class=\"fila_contenedor\" id=\"col_2\" onClick=\"cambiarFila('2')\">PequeñoClientes</div>");
        clientes.html("");
        clientes.append("<div class=\"contenedor_central_titulo\"><div></div><div>Rut</div><div>Razon social</div><div>Tipo</div><div>Grupo</div><div></div></div>");
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
                    "<div onClick=\"abrirModificar('"+id+"')\">"+rut+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"')\">"+tipo+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"')\">"+grupo+"</div>"+
                    "<div><img onclick=\"preEliminarCliente('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
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
            //abrirModificar(id,nombre);
            buscarClienteTipo(id);
            
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        //abrirModificar(id,nombre);
        buscarClienteTipo(id);
    }
}
function buscarClienteTipo(tipo)
{
    TIPO_GRUPO = tipo;
    marcarFilaActiva("col_"+tipo);
    var clientes = $("#lista_busqueda_cliente_detalle");
    clientes.html("");
    clientes.append("<div class=\"contenedor_central_titulo\"><div></div><div>Rut</div><div>Razon social</div><div>Tipo</div><div>Grupo</div><div></div></div>");
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
                    "<div onClick=\"abrirModificar('"+id+"')\">"+rut+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"')\">"+nombre+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"')\">"+tipoG+"</div>"+
                    "<div onClick=\"abrirModificar('"+id+"')\">"+grupo+"</div>"+
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
function abrirModificar(id,nombre)
{
    AGREGAR = false;
    ID_CLIENTE = id;
    NOMBRE_CLIENTE = nombre;
    marcarFilaActiva(ID_CLIENTE);
    $("#lista_busqueda_cliente_detalle").load("html/datos_cliente.html", function( response, status, xhr ) {
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
        $("#volver").click(function(){
            if(typeof TIPO_GRUPO === 'undefided')
            {
                buscarCliente();
            }
            else
            {
                buscarClienteTipo(TIPO_GRUPO);
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
        $("#mail").val(cliente.cliente_mail_contacto);
        $("#mail2").val(cliente.cliente_mail_facturacion);
        $("#grupo").val(cliente.cliente_grupo);
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
        
        buscarTarifas(ID_CLIENTE, NOMBRE_CLIENTE);
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
    for(var i = 0 ; i < markersPanel.length;i++)
    {
        markersPanel[i].setMap(null);
    }
    var icon = {
        url: "img/marcador.svg",
        scaledSize: new google.maps.Size(70, 30),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
    };
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        icon : icon,
        map: map
    });
    
    markersPanel.push(marker);

    map.setZoom(17);
    map.panTo(marker.position);
    
    google.maps.event.addListener(map, "drag", function() {
        marker.setPosition(this.getCenter());
        POSITION = [this.getCenter().lat(),this.getCenter().lng()];
    });
    
    google.maps.event.addListener(map, "dragend", function() {
        var latlng = new google.maps.LatLng(POSITION[0], POSITION[1]);
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                var zero = results[0];
                var address = zero.formatted_address;
                var punto = $('#direccion');
                punto.val(address);                
            }
            else
            {
                window.alert('Geocoder failed due to: ' + status);
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
                    cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
                    resetBotones();
                    if(typeof TIPO_GRUPO === 'undefined')
                    {
                        buscarCliente();
                    }
                    else
                    {
                        buscarClienteTipo(TIPO_GRUPO);
                    }
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
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
        }
    }
