/* global urlBase, alertify, PLACES_AUTOCOMPLETE_API, CORS_PROXY, POSITION, ID_CLIENTE */
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
    buscarClientePasajero();
    buscarPasajero();
    $("#agregar").click(function(){
        quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
        cambiarPropiedad($("#agregar"),"visibility","hidden");
        AGREGAR = true;
        $("#contenedor_central").load("html/datos_pasajero.html", function( response, status, xhr ) {
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
            $("#empresa").change(function (){
                cargarCentroCosto($(this).val(),'');
                cargarRutas($(this).val(),'');
            });
            
            $("#punto").on("input",function(){
                mostrarDatalist($(this).val(),$("#partida"),'punto');
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
        
        $("#volver").click(function(){
            buscarPasajeroCliente(ID_CLIENTE);
            cambiarPropiedad($("#agregar"),"visibility","visible");
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
    var telefono = $("#telefono").val();
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
            buscarPasajero();
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
    var telefono = $("#telefono").val();
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
            buscarPasajero();
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
            pasajeros.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+
                    "<div>"+rut+"</div>"+
                    "<div>"+nombre+"</div>"+
                    "<div>"+papellido+"</div><div>"+empresa+"</div></div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function buscarPasajeroCliente(cliente)
{
    ID_CLIENTE = cliente;
    marcarFilaActiva(cliente);
    var params = {cliente : cliente};
    var url = urlBase + "/pasajero/GetPasajerosCliente.php";
    var success = function(response)
    {
        cerrarSession(response);
        var pasajeros = $("#lista_busqueda_pasajero_detalle");
        pasajeros.html("");
        PASAJEROS = response;
        if(response.length === 0)
        {
            pasajeros.append("<div class=\"mensaje_bienvenida\">No hay registros que mostrar</div>");
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
            pasajeros.append("<div class=\"fila_contenedor fila_contenedor_servicio\" id=\""+id+"\" onClick=\"cambiarFila('"+id+"')\">"+
                    "<div>"+rut+"</div>"+
                    "<div>"+nombre+"</div>"+
                    "<div>"+papellido+"</div><div>"+empresa+"</div></div>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
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
    $("#contenedor_central").load("html/datos_pasajero.html", function( response, status, xhr ) {
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
        $("#punto").on("input",function(){
            mostrarDatalist($(this).val(),$("#partida"),'punto');
        });
        $("#volver").click(function(){
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
        $("#telefono").val(pasajero.pasajero_telefono);
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
        cambiarPropiedad($("#guardar"),"visibility","visible");
        cambiarPropiedad($("#cancelar"),"visibility","visible");
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
    var telefono = $("#telefono");
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
            var nombre = response[i].tarifa_nombre;
            $("#ruta").append("<option value=\""+nombre+"\" "+sel+">"+nombre+"</option>");
            
        }
    };
    postRequest(url,params,success,false);
}

function mostrarDatalist(val,datalist)
{
    if(val === "") return;
    var url = CORS_PROXY + PLACES_AUTOCOMPLETE_API + "input="+val+
            "&location="+POSITION[0]+","+POSITION[1]+"&sensor=true&radius=500&key="+API_KEY;
    var success = function(response)
    {
        datalist.html("");
        var places =  response.predictions;
        for(var i = 0 ; i < places.length;i++)
        {
            var descripcion = places[i].description;
            var placeId = places[i].place_id;
            var encodeDescripcion = descripcion.replace(/'/g,'');
            datalist.append(
                    "<div class=\"option-datalist\" onclick=\"selecionarPlace('"+encodeDescripcion+"')\"><img src=\"img/ubicacion.svg\" width=\"12\" heifgt=\"12\">"+descripcion+"</div>");
        }
    };
    getRequest(url,success);
}

function selecionarPlace(val)
{
    $("#punto").val(decodeURI(val));
    $("#partida").html("");
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
            var rut = response[i].cliente_rut;
            var nombre = response[i].cliente_razon;
            var titulo = recortar(rut+" / "+nombre);
            if (typeof ID_CLIENTE !== "undefined" && ID_CLIENTE === id)
            {
                clientes.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"cambirFilaPasajero('"+id+"')\">"+titulo+"</div>");
            }
            else
            {
                clientes.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"cambiarFilaPasajero('"+id+"')\">"+titulo+"</div>");
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
    if(typeof POLYLINE !== "undefined")
    {
        POLYLINE.setMap(null);
    }
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
        var url = CORS_PROXY + GEOCODER_API + "latlng="+POSITION[0]+","+POSITION[1]+"&sensor=true&key="+API_KEY;
        var success = function(response)
        {
            var status = response.status;
            if (status === "OK") {
                var results = response.results;
                var zero = results[0];
                var address = zero.formatted_address;
                var punto = $('#punto');
                punto.val(address);
            }
        };
        getRequest(url,success);
    });
}