/* global urlBase, alertify, PLACES_AUTOCOMPLETE_API, POSITION, ID_CLIENTE, directionsDisplay, markers, google, geocoder, map, flightPath */
var ID_PASAJERO;
var ID_EMPRESA;
var ID_RUTA;
var PASAJEROS;
var AGREGAR = true;
var PAGINA = 'PASAJEROS';
var CC;
var mapa_oculto = true;
//var CAMPOS = ["rut","nombre","papellido","mapellido","celular","direccion","punto","empresa","centro","nick"];
var CAMPOS = ["rut","nombre","papellido","mapellido","celular","direccion","punto","empresa","centro"];
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    limpiarMapa();
    buscarClientePasajero();
    buscarPasajero();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#lista_busqueda_pasajero_detalle").load("html/datos_pasajero.html", function( response, status, xhr ) {
            initPlacesAutoComplete();
            cargarClientes();
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
                else
                {
                    buscarPasajeroCliente(ID_CLIENTE);
                }
                cambiarPropiedad($("#agregar"),"visibility","visible");
                cambiarPropiedad($("#guardar"),"visibility","hidden");
                cambiarPropiedad($("#eliminar"),"visibility","hidden");
            });
            $("#empresa").change(function (){
                cargarCentroCosto($(this).val(),'');
                cargarRutas($(this).val(),'');
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
        buscarPasajero($(this).val());
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
    var rut = $("#rut").val();
    var nombre = $("#nombre").val();
    var papellido = $("#papellido").val();
    var mapellido = $("#mapellido").val();
    var telefono = $("#aparato").val();
    var celular = $("#celular").val();
    var direccion = $("#direccion").val();
    var punto = $("#punto").val();
    var mail = $("#mail").val();
//    var nick = $("#nick").val();
//    var password = $("#password").val();
//    var password2 = $("#password2").val();
    var cargo = $("#cargo").val();
    var centro = $("#centro").val();
    var empresa = $("#empresa").val();
    var ruta = $("#ruta").val();
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
            ID_PASAJERO = undefined;
            cerrarSession(response);
            alertify.success("Pasajero Agregado");
            cambiarPestaniaGeneral();
            vaciarFormulario();
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            resetFormulario();
        };
        postRequest(url,params,success);
    }
}

function modificarPasajero()
{
    var id = ID_PASAJERO;
    var rut = $("#rut").val();
    var nombre = $("#nombre").val();
    var papellido = $("#papellido").val();
    var mapellido = $("#mapellido").val();
    var telefono = $("#aparato").val();
    var celular = $("#celular").val();
    var direccion = $("#direccion").val();
    var punto = $("#punto").val();
    var mail = $("#mail").val();
//    var nick = $("#nick").val();
//    var password = $("#password").val();
//    var password2 = $("#password2").val();
    var cargo = $("#cargo").val();
    var centro = $("#centro").val();
    var empresa = $("#empresa").val();
    var ruta = $("#ruta").val();
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
            cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
            cerrarSession(response);
            cambiarPestaniaGeneral();
            alertify.success("Pasajero Modificado");
            resetFormulario();
        };
        postRequest(url,params,success);
    }
}

function buscarPasajero()
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
        pasajeros.append("<div class=\"contenedor_central_titulo\"><div></div><div>Rut</div><div>Nombre</div><div>Apellido</div><div>Empresa</div></div>")
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].pasajero_id;
            var rut = response[i].pasajero_rut;
            var nombre = response[i].pasajero_nombre;
            var papellido = response[i].pasajero_papellido;
            var empresa = response[i].pasajero_empresa;
            pasajeros.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\">"+
                    "<div onClick=\"cambiarFila('"+id+"')\">"+rut+"</div>"+
                    "<div onClick=\"cambiarFila('"+id+"')\">"+nombre+"</div>"+
                    "<div onClick=\"cambiarFila('"+id+"')\">"+papellido+"</div><div>"+empresa+"</div>"+
                    "<div><img onclick=\"preEliminarPasajero('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>"+
                    "</div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function buscarPasajeroCliente(cliente)
{
    ID_CLIENTE = cliente;
    marcarFilaActiva(cliente);
    var pasajeros = $("#lista_busqueda_pasajero_detalle");
    pasajeros.html("");
    pasajeros.append("<div class=\"contenedor_central_titulo\"><div></div><div>Rut</div><div>Nombre</div><div>Apellido</div><div>Empresa</div></div>")
    var noHayRegistros = true;
    for(var i = 0 ; i < PASAJEROS.length; i++)
    {
        if(PASAJEROS[i].pasajero_empresa === cliente)
        {
            noHayRegistros = false;
            var id = PASAJEROS[i].pasajero_id;
            var rut = PASAJEROS[i].pasajero_rut;
            var nombre = PASAJEROS[i].pasajero_nombre;
            var papellido = PASAJEROS[i].pasajero_papellido;
            var empresa = PASAJEROS[i].pasajero_empresa;
            pasajeros.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+
                    "<div>"+rut+"</div>"+
                    "<div>"+nombre+"</div>"+
                    "<div>"+papellido+"</div><div>"+empresa+"</div>"+
                    "<div><img onclick=\"preEliminarPasajero('"+rut+"')\" src=\"img/eliminar-negro.svg\" width=\"12\" height=\"12\"></div>");
        }
    }
    if(noHayRegistros)
    {
        pasajeros.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
        alertify.error("No hay registros que mostrar");
        return;
    }
}

function cambiarFila(id)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de pasajero",
        "?Desea cambiar de pasajero sin guardar los cambios?",
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
    $("#lista_busqueda_pasajero_detalle").load("html/datos_pasajero.html", function( response, status, xhr ) {
        initPlacesAutoComplete();
        iniciarPestanias();
        cambioEjecutado();
        cargarClientes();
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
            else
            {
                buscarPasajeroCliente(ID_CLIENTE);
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
        $("#centro").val(pasajero.pasajero_centro_costo);
        $("#empresa").val(pasajero.pasajero_empresa);
        $("#ruta").val(pasajero.pasajero_ruta);
        ID_EMPRESA = pasajero.pasajero_empresa;
        if(ID_EMPRESA !== '')
        {
            cargarCentroCosto(ID_EMPRESA,pasajero.pasajero_centro_costo);
            cargarRutas(ID_EMPRESA,pasajero.pasajero_ruta);
        }
        cambiarPropiedad($("#agregar"),"visibility","visible");
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#eliminar"),"visibility","visible");
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
        cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
        resetBotones();
        if(typeof ID_CLIENTE === 'undefined')
        {
            buscarPasajero();
        }
        else
        {
            buscarPasajeroCliente(ID_CLIENTE);
        }
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
    if(!validarRut(rut.val()))
    {
        cambiarPestaniaGeneral();
        marcarCampoError(rut);
        alertify.error('Rut invalido');
        return false;
    }
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
            var nombre = response[i].cliente_razon;
            var sel = "";
            if(ID_EMPRESA === response[i].cliente_razon)
            {
                sel = " selected ";
            }
            $("#empresa").append("<option value=\""+nombre+"\" "+sel+">"+nombre+"</option>");
        }
    };
    postRequest(url,params,success,false);
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
            if(ruta === response[i].tarifa_nombre)
            {
                sel = " selected ";
            }
            var nombre = response[i].tarifa_descripcion;
            var descripcion = response[i].tarifa_nombre;
            $("#ruta").append("<option value=\""+descripcion+"\" "+sel+">"+nombre+" / "+descripcion+"</option>");
        }
    };
    postRequest(url,params,success,false);
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
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].cliente_id;
            var nombre = response[i].cliente_razon;
            var titulo = recortar(nombre);
            if (typeof ID_CLIENTE !== "undefined" && ID_CLIENTE === id)
            {
                clientes.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+nombre+"\" onClick=\"cambirFilaPasajero('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
                clientes.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFilaPasajero('"+nombre+"')\">"+titulo+"</div>");
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function cambiarFilaPasajero(id)
{
    if(MODIFICADO)
    {
        confirmar("Cambio de tarifa",
        "¿Desea cambiar de tarifa sin guardar los cambios?",
        function()
        {
            MODIFICADO = false;
            buscarPasajeroCliente(id);
        },
        function()
        {
            MODIFICADO = true;
        });
    }
    else
    {
        buscarPasajeroCliente(id);
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
                    cambiarPropiedad($("#loaderCentral"),"visibility","hidden");
                    resetBotones();
                    if(typeof ID_CLIENTE === 'undefined')
                    {
                        buscarPasajero();
                    }
                    else
                    {
                        buscarPasajeroCliente(ID_CLIENTE);
                    }
                };
                postRequest(url,params,success);
            });
}

    function initPlacesAutoComplete() {
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('punto'),
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