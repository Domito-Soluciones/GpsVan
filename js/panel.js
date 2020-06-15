/* global POLYLINE, alertify, urlBase, PLACES_AUTOCOMPLETE_API, POSITION, API_KEY, PLACES_DETAILS_API, google, map, DIRECTIONS_API, EN_PROCCESO_DE_ASIGNACION, markers, TIPO_SERVICIO, directionsService, directionsDisplay, geocoder, MENU_VISIBLE, GOOGLE_MAPS_API, flightPath, TIPO_RUTA, NOMBRE_RUTA, EDITANDO, SERVICIO_ACTUAL, SERVICIOS_PASAJEROS, ID_SERVICIO */
var CLIENTES = {};
var moviles = [];
var clientesArray = [];
var TARIFAS = {};
var SERVICIOS_PENDIENTES;
var PAGINA = "PANEL";
var objAnterior;
var origen;
var destinos= [];
var pasajeros = [];
var direccion_empresa;
var NOMBRE_CLIENTE;
var conductores = new Map();
var GEOCODING = false;
var INPUT_ACTUAL;
var CAMPOS = ["clientes","ruta","truta","fechaDesde","hora","vehiculos","tarifa1","tarifa2"];
var EMPRESA_QUITADO = false;
var accion = 'agregar';
var idEdit = '';
var partidaEdit = '';
var destinoEdit = '';
var indexDestinos = new Map();
var destinosVacios = ['',''];
var index = -1;
var LETRAS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var ultima_letra = 0;
var cantidadServicios = 0;
var cantidadServiciosAux = 0;
var LETRA_PASAJEROS = new Map();
var SERVICIO_EDITADO = [];

$(document).ready(function(){
    window.onbeforeunload = function() {
        return "¿Desea recargar la página web?";
    };
    init();
    if((TIPO_SERVICIO === '1') && ASIGNANDO){
        $("#ruta").html("<option value=\"ESP\">ESP</option>");
        $("#truta").html("<option value=\"XX-ESP\">XX-ESP</option>");
        $("#especial").prop("checked",true);
        habilitarCampo($("#tarifa2"));
        deshabilitarCampo($("#ruta"));
        deshabilitarCampo($("#truta"));
        habilitarCampo($("#partida"));
        cambiarPropiedad($("#addPasajero"),"display","none");
        cambiarPropiedad($(".buscador-pasajero"),"display","initial");
        var contenedor = $("#contenedor_pasajero");
        var contenedorEx = $("#contenedor_pasajero_no_asignado");
        contenedor.html("");
        contenedorEx.html("");
        agregarclase($("#contenedor_mapa"),"mapa_bajo");
        cargarPasajerosEspecial();
    }
    else if((TIPO_SERVICIO === '0') && ASIGNANDO){
        cambiarPropiedad($(".buscador-pasajero"),"display","initial");
        agregarclase($("#contenedor_mapa"),"mapa_bajo");
        agregarclase($("#dato_especial"),"none");
        $("#ruta").html("<option value='"+TIPO_RUTA+"'>"+TIPO_RUTA+"</option>");
        $("#ruta").val(TIPO_RUTA);
        $("#truta").html("<option value='"+NOMBRE_RUTA+"'>"+NOMBRE_RUTA+"</option>");
        $("#truta").val(NOMBRE_RUTA);
        cargarPasajeros();
    }
    else if(EDITANDO){
        var idServicio = ID_SERVICIO;
        var params = {id : idServicio,conductor : 115};
        var url = urlBase + "/servicio/GetServicioProgramado.php";
        var success = function(response)
        {
            SERVICIO_EDITADO = response;
            let servicio = response[0];
            if(servicio.servicio_truta.indexOf("ZP") !== -1 || servicio.servicio_truta.indexOf("RG") !== -1){
                TIPO_SERVICIO = "0";
            }
            else {
                TIPO_SERVICIO = "2";
            }
            $("#ids").val(servicio.servicio_id);
            $("#clientes").val(servicio.servicio_cliente);
            $("#fechaDesde").val(servicio.servicio_fecha.replace("-","/").replace("-","/"));
            $("#hora").val(servicio.servicio_hora);
            $("#conductorV").val(servicio.servicio_conductor);
            $("#conductorH").val(servicio.servicio_conductor);
            $("#tarifa1").val(servicio.servicio_tarifa);
            $("#observacion").val(servicio.servicio_observacion);
            $("#clientes").prop("readonly",true);
            cargarRutas();
            cargarMoviles();
            deshabilitarCampo($("#fechaHasta"));
            cambiarPropiedad($(".buscador-pasajero"),"display","initial");
            agregarclase($("#contenedor_mapa"),"mapa_bajo");
            if(TIPO_SERVICIO !== '2'){
                agregarclase($("#dato_especial"),"none");                
                cargarPasajerosEditar(response);
                cargarPasajerosSinAsignados();
            }
            else{
                $("#tarifa2").val(servicio.servicio_tarifa2);
                $("#especial").prop("checked",true);     
                let mapa = new Map();
                for(var i = 0; i < response.length; i++){
                    let nombre = response[i].servicio_pasajero_nombre;
                    let celular = response[i].servicio_pasajero_celular.replace("_par","").replace("_des","");
                    let punto = response[i].servicio_destino;
                    if(mapa.get(nombre) === undefined){
                        if(response[i].servicio_pasajero_celular.indexOf("_par") !== -1){
                            mapa.set(nombre,{"nombre":nombre,"celular":celular,"partida":punto,"destino":""});
                        }
                        else{
                            mapa.set(nombre,{"nombre":nombre,"celular":celular,"partida":"","destino":punto});
                        }
                    }
                    else{
                        var json = mapa.get(nombre);
                        json.destino = punto;
                        mapa.set(nombre,json);
                    }
                }
                for (var json of mapa.values()) {
                    agregarPasajeroEspecialEditar(json.nombre,json.celular,json.partida,json.destino);
                }
            }
            MODIFICADO = true;
            EDITANDO = false;
        };
        postRequest(url,params,success);
    }
    else{
        TIPO_SERVICIO = '0';
    }
    PAGINA_ANTERIOR = PAGINA;
    map.setZoom(15);
    var center = new google.maps.LatLng(POSITION[0], POSITION[1]);
    map.panTo(center);
    cambioEjecutado();
    if($("#ids").val() !== "")
    {
        if(TIPO_SERVICIO === '0' && !ASIGNANDO)
        {
            cargarRutas();
        }
    }
    $("#clientes").keyup(function () {
        cargarClientes();
    });
    $("#clientes").on('input',function () {
        if($(this).val() !== '')
        {
            if(TIPO_SERVICIO !== '1')
            {
                cargarRutas();
            }
        }
        else 
        {
            var contenedorDir = $("#contenedor_punto_encuentro");
            var contenedorDes = $("#contenedor_punto_destino");
            var contenedor = $("#contenedor_pasajero");
            var contenedorEx = $("#contenedor_pasajero_no_asignado");
            contenedor.html("");
            contenedorEx.html("");
            contenedorDir.html("<b>Origen: </b>");
            contenedorDes.html("<b>Destino: </b>");
            origen = undefined;
            destinos = [];
            dibujarRuta();
        }
    });
    
    $("#ruta").change(function(){
        $("#truta").html("<option val=\"\">Seleccione</option>");
        var aux = '';
        for(var i = 0; i < TARIFAS.length; i++)
        {
            if(aux !== TARIFAS[i].tarifa_descripcion){
                $("#truta").append("<option val=\""+TARIFAS[i].tarifa_nombre+"\">"+TARIFAS[i].tarifa_nombre+"</option>");   
                aux = TARIFAS[i].tarifa_nombre;
            }
        }
        borrarServicio();
    });
    
    $("#truta").change(function () {
        origen = undefined;
        destinos = [];
        cambiarPropiedad($(".buscador-pasajero"),"display","initial");
        agregarclase($("#contenedor_mapa"),"mapa_bajo");
        for(var i = 0; i < TARIFAS.length; i++)
        {
            if(TARIFAS[i].tarifa_nombre === $(this).val())
            {
                $("#hora").val(TARIFAS[i].tarifa_hora);
                $("#tarifa1").val(TARIFAS[i].tarifa_valor1);
                if(TIPO_SERVICIO === '1' || TIPO_SERVICIO === '2')
                {
                    $("#tarifa2").val(TARIFAS[i].tarifa_valor2);
                }
                else
                {
                    $("#tarifa2Hidden").val(TARIFAS[i].tarifa_valor2);
                }
            }
        }
        cargarPasajeros();
        borrarServicio();
        if(TIPO_SERVICIO === '0'){
            agregarclase($("#dato_especial"),"none");
        }
    });
    
    $("#vehiculos").change(function () {
        if($(this).val() !== "")
        {
            var conductor = $(this).children("option").filter(":selected").text().split(" / ")[1];
            $("#conductorV").val(conductor);
            $("#conductorH").val(conductores.get(conductor));
        }
    });
    
    $("#clientes").on('blur',function () {
        if(TIPO_SERVICIO === '0')
        {
            var noExiste = validarInexistencia($("#clientes").val(),clientesArray);
            if(noExiste)
            {
                alertify.error("Cliente inexistente");
                $("#clientes").val("");

            }
        }
        else
        {
            $("#ruta").html("<option value=\"ESP\">ESP</option>");
            $("#truta").html("<option value=\"XX-ESP\">XX-ESP</option>");
            deshabilitarCampo($("#ruta"));
            deshabilitarCampo($("#truta"));
            habilitarCampo($("#partida"));
            cambiarPropiedad($(".buscador-pasajero"),"display","initial");
            agregarclase($("#contenedor_mapa"),"mapa_bajo");
            cargarPasajeros();
        }
    });

    $("#vehiculos").keyup(function(){
        cargarMoviles();
    });

    $("#solicitar").click(function () {
        var f1 = $("#fechaDesde").val();
        var f2 = $("#fechaHasta").val();
        var hora = $("#hora").val();
        var dias = 1;
        if(f2 !== '')
        {
            dias += diasDiferencia(f1,f2);
        }
        var fecha = $("#fechaDesde").val();
        cantidadServicios = dias;
        for(var i = 0 ; i < dias; i++)
        {
//            var fechaFormat = fecha.split('/');
//            var date = new Date(fechaFormat[2]+"-"+fechaFormat[1]+"-"+fechaFormat[0]+" "+hora.replace(/-/g, "/"));
//            var now = new Date();
//            if(date < now)
//            {
//                alertify.error("Debe seleccionar una fecha válida");
//                return;
//            }
            agregarServicio(fecha);
            fecha = sumarDias(fecha,1);
        }
        EMPRESA_QUITADO = false;
        
    });

    $("#normal").click(function(){
        cambiarServicioNormal();
    });
    $("#especial").click(function(){
        cambiarServicioEspecial();
    });
    
    $("#busqueda").keyup(function(){
        cargarPasajerosBusqueda();
    });
    
    $("#addPasajero").click(function(){
        abrirAddPasajero();
    });
    $("#agregarPasajero").click(function(){
        var nombre = $("#agregaNombre").val();
        var direccion = $("#agregaDireccion").val();
        var celular = $("#agregaCelular").val();
        if(TIPO_SERVICIO !== '0')
        {
            if(nombre !== '')
            {
                agregarPasajero('0',nombre,direccion,celular);
            }
            else
            {
                alertify.error("Ingrese todos los campos necesarios");
            }
        }
        else
        {
            if(nombre !== '' && direccion !== '' && celular !== '')
            {
                agregarPasajero('0',nombre,direccion,celular);
            }
            else
            {
                alertify.error("Ingrese todos los campos necesarios");
            }
        }
    });
    $("#cerrarAgregar").click(function(){
        cerrarAddPasajero();
    });
    
    $("#buscaPartida").click(function(){
        eliminarMarkers();
        agregarclase($(this),"oculto");
    });
    
    $("#buscaDestino").click(function(){
        eliminarMarkers();
        agregarclase($(this),"oculto");    
    });
    
    $("#partida").click(function(){
        quitarclase($("#buscaPartida"),"oculto");
    });
    $("#destino").click(function(){
        quitarclase($("#buscaDestino"),"oculto");
    });
    
    initPlacesAutoComplete(document.getElementById("partida"));
    initPlacesAutoComplete(document.getElementById("destino"));
    
    setTimeout(function(){
        map.setZoom(11);
        $("#map").trigger("dblclick");
    },1000);
    
});

function init()
{
    if(MENU_VISIBLE)
    {
        cambiarPropiedad($(".asignacion_buscador"),"margin-left","calc(37% - 21px)");
        cambiarPropiedad($(".asignacion_buscador"),"width","calc(70% - 51px)"); 
    }
    else
    {
        cambiarPropiedad($(".asignacion_buscador"),"margin-left","calc(37% - 24px)");
        cambiarPropiedad($(".asignacion_buscador"),"width","calc(70% - 67px)");
    }
    cargarClientes();
    if(EDITANDO){
        iniciarFecha(['#fechaDesde']);
    }
    else{
        iniciarFecha(['#fechaDesde','#fechaHasta']);
    }
    iniciarHora(['#hora']);
    cargarMoviles();
    directionsService = new google.maps.DirectionsService();
    limpiarMapa();
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
            CLIENTES = response;
            clientesArray.push(nombre);
        }
    };
    postRequest(url,params,success,false);
}

function cargarPasajeros()
{
    var pasajero = $("#busqueda").val();
    var cliente = $('#clientes').val();
    var truta = $('#truta').val();
    var ruta = $('#ruta').val();
    var params = {cliente : cliente, pasajero : pasajero, ruta: ''};
    var url = urlBase + "/pasajero/GetPasajerosRuta.php";
    if(TIPO_SERVICIO === '2')
    {
        params = {cliente : cliente};
        url =  urlBase + "/pasajero/GetPasajerosCliente.php";
    }
    var success = function(response)
    {
        var j = 0;
        var contenedorDir = $("#contenedor_punto_encuentro");
        var contenedorDes = $("#contenedor_punto_destino");
        var contenedor = $("#contenedor_pasajero");
        var contenedorEx = $("#contenedor_pasajero_no_asignado");
        contenedor.html("");
        contenedorEx.html("");
        if(typeof response[0] !== "undefined"){
            direccion_empresa = response[0].pasajero_empresa_direccion;
        }
        if(truta.indexOf("ZP") !== -1)
        {
            origen = response[0].pasajero_empresa_direccion;
            contenedorDir.html("<b>Origen:</b> "+origen);
            contenedor.prepend("<div class=\"cont-pasajero-gral\" id=\"origen_empresa\"><div class=\"cont-pasajero\">"+response[0].pasajero_empresa+"</div><div class=\"cont-mini-pasajero\"><div>"+ origen + "</div><div>");
            j++;
        }
        pasajeros = [];
        destinos = [];
        var partidaExiste = true;
        for(var i = 0 ; i < response.length ; i++)
        {
            if(response[0].pasajero_id === ""){
                break;
            }
            var id = response[i].pasajero_id;
            var nombre = response[i].pasajero_nombre.trim() + " " + response[i].pasajero_papellido.trim();
            var punto = response[i].pasajero_punto_encuentro;
            var celular = response[i].pasajero_celular;
            if(ruta === response[i].pasajero_ruta)
            {
                if(truta.indexOf("RG") !== -1 && partidaExiste)
                {
                    origen = punto;
                    contenedorDir.html("<b>Origen:</b> "+origen);
                    partidaExiste = false;
                }
                if(origen !== punto)
                {
                    destinos.push(punto);
                }
                contenedor.append(" <div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" draggable=\"true\" ondragstart=\"drag(event,$(this))\" ondrop=\"drop(event,$(this))\" ondragover=\"allowDrop(event)\">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+formatearCadena(punto)+"\">"
                                 +"<div class=\"cont-pasajero\">"+formatearCadena(nombre)+"</div><div style='float:right'>"
                                 +"<div class=\"boton-chico\" onclick=\"editarPasajero('"+id+"','"+formatearCadena(nombre)+"','"+celular+"','"+formatearCadena(punto)+"','punto_"+id+"','hidden_"+id+"')\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
                                 +"<div class=\"boton-chico\" onclick=\"borrarPasajero('"+id+"','"+formatearCadena(nombre)+"','pasajero_"+id+"','"+formatearCadena(nombre)+"','"+formatearCadena(punto)+"','"+celular+"')\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div id=\"punto_"+id+"\">"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>");
                pasajeros.push(id);
            j++;
            ultima_letra = j;
            }
            else if(truta.indexOf("-ESP") !== -1)
            {
                $("#contenedor_punto_encuentro").html("<b>Origen: </b>");
                $("#contenedor_punto_destino").html("<b>Destino: </b>");
                if(truta.indexOf("RG") !== -1 && partidaExiste)
                {
                    origen = punto;
                    contenedorDir.html("<b>Origen:</b> "+origen);
                    partidaExiste = false;
                }
                
                if(truta.indexOf("ZP") !== -1 && i === response.length-1)
                {
                    contenedorDes.html("<b>Destino:</b> "+punto);   
                    contenedor.append("<div class=\"cont-pasajero-gral\"><div class=\"cont-pasajero\">"+response[0].pasajero_empresa+"</div><div class=\"cont-mini-pasajero\"><div>"+ punto + "</div><div>");
                }
                contenedorEx.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" \">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+formatearCadena(nombre)+"','"+formatearCadena(punto)+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>");
            }
            else
            {
                contenedorEx.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" \">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+formatearCadena(nombre)+"','"+formatearCadena(punto)+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>");
            }
        }
        if(truta.indexOf("RG") !== -1)
        {
            destinos.push(response[0].pasajero_empresa_direccion);
            contenedorDes.html("<b>Destino:</b> "+response[0].pasajero_empresa_direccion);
            contenedor.append("<div class=\"cont-pasajero-gral\" id=\"destino_empresa\"><div class=\"cont-pasajero\">"+response[0].pasajero_empresa+"</div><div class=\"cont-mini-pasajero\"><div>"+ response[0].pasajero_empresa_direccion + "</div><div>");
        }
        else if(truta.indexOf("ZP") !== -1)
        {
            if(destinos.length > 0){
                contenedorDes.html("<b>Destino:</b> "+destinos[destinos.length-1]);
            }
        }
        dibujarRuta();
    };
    postRequest(url,params,success);
}

function cargarPasajerosSinAsignados()
{
    var pasajero = $("#busqueda").val();
    var cliente = $('#clientes').val();
    var params = {cliente : cliente, pasajero : pasajero, ruta: ''};
    var url = urlBase + "/pasajero/GetPasajerosRuta.php";
    if(TIPO_SERVICIO === '2')
    {
        params = {cliente : cliente};
        url =  urlBase + "/pasajero/GetPasajerosCliente.php";
    }
    var success = function(response)
    {
        var j = 0;
        var contenedorEx = $("#contenedor_pasajero_no_asignado");
        contenedorEx.html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var agregar = true;
            if(response[0].pasajero_id === ""){
                break
            }
            var id = response[i].pasajero_id;
            var nombre = response[i].pasajero_nombre.trim() + " " + response[i].pasajero_papellido.trim();
            var punto = response[i].pasajero_punto_encuentro;
            var celular = response[i].pasajero_celular;
            for(var j = 0 ; j < pasajeros.length ; j++){
                if(pasajeros[j] === id){
                    agregar = false;
                }
            }
            if(agregar){
                contenedorEx.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" \">"
                             +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                             +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+formatearCadena(nombre)+"','"+formatearCadena(punto)+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                    "<div class=\"cont-mini-pasajero\"><div>"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>");
            }
        }
    };
    postRequest(url,params,success);
}

function cargarPasajerosEspecial()
{
    var params = {id : $("#ids").val(),conductor : 115};
    var url = urlBase + "/servicio/GetServicioProgramado.php";
    var success = function(response)
    {
        if(response.length === 0)
        {
            alertify.error("No hay pasajeros disponibles para esta ruta");
            return;
        }
        let mapa = new Map();
        for(var i = 0 ; i < response.length ; i++)
        {
            var nombre = response[i].servicio_pasajero_nombre;
            var punto = response[i].servicio_destino;
            var celular = response[i].servicio_pasajero_celular;
            if(mapa.get(nombre) === undefined){
                mapa.set(nombre,{"nombre":nombre,"celular":celular,"partida":punto,"destino":""});
            }
            else{
                var json = mapa.get(nombre);
                json.destino = punto;
                mapa.set(nombre,json);
            }
        }
        for (var json of mapa.values()) {
            var celular = json.celular.replace("_par","").replace("_des","");
            agregarPasajeroEspecialCliente(json.nombre,celular,json.partida,json.destino);
        }
        dibujarRuta();
    };
    postRequest(url,params,success);
}

function cargarPasajerosBusqueda()
{
    var pasajero = $("#busqueda").val();
    var cliente = $('#clientes').val();
    var ruta = $('#truta').val();
    var params = {cliente : cliente, pasajero : pasajero, ruta : ruta, pasajeros : +""};
    var url = urlBase + "/pasajero/GetPasajerosRuta.php";
    var success = function(response)
    {
        if(response.length === 0)
        {
            alertify.error("No hay pasajeros disponibles para esta ruta");
            return;
        }
        var contenedorEx = $("#contenedor_pasajero_no_asignado");
        contenedorEx.html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].pasajero_id;
            var nombre = response[i].pasajero_nombre + " " + response[i].pasajero_papellido;
            var punto = response[i].pasajero_punto_encuentro;
            var celular = response[i].pasajero_celular;
                contenedorEx.append("<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" \">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+formatearCadena(nombre)+"','"+formatearCadena(punto)+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>");
            //pasajeros.push(id);
        }
        
    };
    postRequest(url,params,success,false);
}


function cargarMoviles()
{
    var params = {busqueda : ''};
    var url = urlBase + "/movil/GetMoviles.php";
    var success = function(response)
    {
        $("#vehiculos").html("<option value=\"\">Seleccione</option>");
        for(var i = 0 ; i < response.length ; i++)
        {
            let movilNombre = '';
            if(SERVICIO_EDITADO.length > 0){
                movilNombre = SERVICIO_EDITADO[0].servicio_movil;
            }
            var nombre = response[i].movil_nombre;
            var id = response[i].movil_conductor;
            var conductor = response[i].movil_conductor_nombre;
            conductores.set(conductor,id);
            if(conductor.length === 1)
            {
                conductor = "No Definido";
            }
            let sel = '';
            if(nombre === movilNombre){
                sel = "selected";
            }
            $("#vehiculos").append("<option value=\""+nombre+"\" "+sel+">"+nombre+" / "+conductor+"</option>");
            moviles.push(nombre);
        }
    };
    postRequest(url,params,success);
}

function cargarRutas()
{
    var clientes = $('#clientes').val();
    $("#ruta").html("");
    $("#ruta").html("<option value=\"\">Seleccione</option>");
    $("#truta").html("<option value=\"\">Seleccione</option>");
    NOMBRE_CLIENTE = clientes;
    var params = {empresa : clientes};
    var url = urlBase + "/tarifa/GetTarifasEmpresaNombre.php";
    var success = function(response)
    {
        cerrarSession(response);
        var ruta = "";
        let rutaAux = '';
        if(SERVICIO_EDITADO.length > 0){
            rutaAux = SERVICIO_EDITADO[0].servicio_ruta;
        }
        for(var i = 0 ; i < response.length ; i++)
        {
            TARIFAS = response;
            var descripcion = response[i].tarifa_descripcion.trim();
            if(descripcion !== ruta)
            {
                let sel = '';
                if(rutaAux === descripcion){
                    sel = 'selected';
                }
                $("#ruta").append("<option value=\""+descripcion+"\" "+sel+">"+descripcion+"</option>");
                ruta = descripcion;
            }
        }
        if(EDITANDO){
            $("#truta").html("<option val=\"\">Seleccione</option>");
            var aux = '';
            for(var i = 0; i < TARIFAS.length; i++)
            {
                let sel = '';
                if(aux !== TARIFAS[i].tarifa_descripcion){
                    if(SERVICIO_EDITADO[0].servicio_truta === TARIFAS[i].tarifa_nombre){
                        sel = 'selected';
                    }
                    $("#truta").append("<option val=\""+TARIFAS[i].tarifa_nombre+"\" "+sel+">"+TARIFAS[i].tarifa_nombre+"</option>");   
                    aux = TARIFAS[i].tarifa_nombre;
                }
            }
        }
    };
    postRequest(url,params,success,false);
}

function agregarServicio(fecha)
{
    var id = $("#ids").val();
    var cliente = $("#clientes").val();
    var ruta = $("#ruta").val();
    var truta = $("#truta").val();
    var hora = $("#hora").val();
    var movil = $("#vehiculos").val();
    var conductor = $("#conductorH").val();
    var tarifa1 = $("#tarifa1").val();
    var tarifa2 = $("#tarifa2").val() === '' ? $("#tarifa2Hidden").val() : $("#tarifa2").val();
    var observaciones = $("#observacion").val();
    var tipo = TIPO_SERVICIO;
    var array = [cliente,ruta,truta,fecha,hora,movil,tarifa1,tarifa2];
    var exp = obtenerExcepciones();
    if(!validarCamposOr(array,exp))
    {
        activarPestania(array);
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    if(pasajeros.length === 0)
    {
        alertify.error("No hay pasajeros asignados a este servicio");
        return;
    }
    if(typeof origen === 'undefined' || destinos.length === 0)
    {
        alertify.error("Seleccione origen y destino "+origen+" "+destinos);
        return;
    }
    if(conductor === "")
    {
        alertify.error("El veh&iacute;culo "+movil+" no tiene coductor asociado");
        return;
    }
    if(validarTipoDato())
    {
        var params = {cliente : cliente, ruta : ruta,truta : truta,fecha : fecha, hora : hora,movil : movil,
                    conductor: conductor ,tarifa1 : tarifa1, tarifa2 : tarifa2, observaciones : observaciones, estado : 1, tipo : tipo};
        initAddServicio(params,id,conductor,fecha,hora);
        if(tipo !== 0){
            index = -1;
            indexDestinos.clear();
        }
    }
}

function dibujarRuta()
{
    GEOCODING = false;
    if(typeof origen === 'undefined' || destinos.length === 0)
    {
        return;
    }
    eliminarMarkers();
    var largo = destinos.length;
    if(largo === 0)
    {
        return;
    }
    var destinoFinal = '';
    for(var x = 0 ; x < destinos.length;x++){
        if(destinos[x] !== ''){
            destinoFinal = destinos[x];
        }
    }
    var waypoints = [];
    if(largo > 1)
    {
        for(var i = 0 ; i < largo ; i++)
        {
            if(destinos[i]!=='')
            {
                if(i === largo-1)
                {
                    break;
                }
                waypoints.push({
                    location: destinos[i],
                    stopover: true
                });
            }
        }
    }
    setDirections();
    directionsService.route({
        origin: origen,
        waypoints: waypoints,
        optimizeWaypoints: false,
        destination: destinoFinal,
        travelMode: 'DRIVING'
    },  function(response, status){
        if(status === 'OK')
        {
            directionsDisplay.setDirections(response);
            var points = response.routes[0].overview_polyline;
            var polyline = decodePolyline(points);
            POLYLINE_LAT = '';
            POLYLINE_LNG = '';
            polyline.forEach(function(latLng) {
                POLYLINE_LAT+= latLng.lat + ",";
                POLYLINE_LNG += latLng.lng + ",";
            });
        }
        else if(status === 'NOT_FOUND')
        {
            alertify.error("Ruta no encontrada");
        }
    });
}
function agregarDetalleServicio(idServicio)
{
    var params = {};
    var destinoFinal = "";
    var pasajeroFinal = "";
    var esRecogida = $("#truta").val().indexOf("RG") !== -1;
    var esEsp = $("#truta").val().indexOf("ESP") !== -1;
    if(esRecogida || esEsp){
        destinoFinal += origen + "%";
    }
    if(TIPO_SERVICIO === '0'){
        if(esRecogida && !EMPRESA_QUITADO)
        {
            EMPRESA_QUITADO = true;
            destinos.pop();
        }
    }
    for(var i = 0; i < destinos.length;i++)
    {
        destinoFinal += destinos[i] + "%";
    }
    for(var i = 0; i < pasajeros.length;i++)
    {
        pasajeroFinal += pasajeros[i] + "%";
    }

    params = {pasajeros : pasajeroFinal ,destinos : destinoFinal, id : idServicio};
    var url = urlBase + "/servicio/AddServicioDetalle.php";
    var success = () => {
        ASIGNANDO = false;
        if(EDITANDO){
            EDITANDO = false;
            resetFormulario();
            cargarClientes();
            cargarMoviles();
            habilitarCampo($("#clientes"));
            habilitarCampo($("#ruta"));
            habilitarCampo($("#truta"));
            habilitarCampo($("#fechaDesde"));
            habilitarCampo($("#fechaHasta"));
            habilitarCampo($("#hora"));
            habilitarCampo($("#vehiculos"));
            habilitarCampo($("#conductorV"));
            habilitarCampo($("#tarifa1"));
            habilitarCampo($("#observacion"));
            $("#ruta").html("<option value=''>Seleccione</option>");
            $("#truta").html("<option value=''>Seleccione</option>");
            alertify.success('Servicio modificado');
        }
        if(cantidadServicios-1 === cantidadServiciosAux){
            vaciarFormulario();
            borrarDirections();
            resetPasajeros();
            habilitarCampo($("#ruta"));
            habilitarCampo($("#truta"));
            cambiarPropiedad($(".buscador-pasajero"),"display","none");
            quitarclase($("#contenedor_mapa"),"mapa_bajo");
            deshabilitarCampo($("#partida"));
            cantidadServiciosAux = 0;
            return;
        }
        cantidadServiciosAux++;
    };
    postRequest(url,params,success);
}

function eliminarDetalleServicio(idServicio)
{
    params = { id : idServicio};
    var url = urlBase + "/servicio/DelServicioDetalle.php";
    var success = ()=>{
        if(EDITANDO || ASIGNANDO){
            agregarDetalleServicio(idServicio);
        }
    };
    postRequest(url,params,success);
}

function notificarConductor(idServicio,llave,fecha,hora)
{
    var texto = "Nuevo servicio asignado con id: "+idServicio;
    var tipo = 0;
    var params = {texto  : texto, tipo : tipo, llave : llave, idServicio : idServicio, fecha : fecha, hora : hora};        
    var url = urlBase + "/notificacion/AddNotificacion.php";
    postRequest(url,params,null);
}

function notificarServicioFuturo(idServicio,llave,fecha,hora)
{
    var texto = "Se aproxima el siguiente servicio: "+idServicio;
    var tipo = 1;
    var params = {texto  : texto, tipo : tipo, llave : llave, fecha : fecha, hora : hora, idServicio : idServicio};            
    var url = urlBase + "/notificacion/AddNotificacion.php";
    postRequest(url,params,null);
}

function abrirServiciosPendientes()
{
    cambiarPropiedad($("#servicios_pendientes"),"display","block");

}


function marcarServicioEnProceso(idServicio)
{
    var params = {id : idServicio, estado : EN_PROCCESO_DE_ASIGNACION};
    var url = urlBase + "/servicio/ModEstadoServicio.php";
    var success = function(response)
    {
        alertify.success("Servicio "+response.servicio_id +" se encuentra en proceso asignaci&oacute;n");
    };
    postRequest(url,params,success);
}


function quitarDestino()
{
    var i = 1;
    var largo = $(".destino").length;
    if(largo > 1 )
    {
        $(".destino").each(function(index){
            if(i === largo)
            {
                $(this).remove();
                $("#cont-destino"+i).remove();
            }
            i++;
        });
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev,obj) {
    objAnterior = obj.attr("id");
    ev.dataTransfer.setData("text", obj.html());
}

function drop(ev,obj) {
    ev.preventDefault();
    $("#"+objAnterior).html(obj.html());
    var idAnt = $("#"+objAnterior).attr("id");
    obj.html(ev.dataTransfer.getData("text"));
    var id = obj.attr("id");
    $("#"+objAnterior).attr("id",id);
    obj.attr("id",idAnt);
    pasajeros = [];
    destinos = [];
    let ruta = $("#truta").val();
    var total = $("#contenedor_pasajero .cont-pasajero-gral .hidden" ).length;
    $("#contenedor_pasajero .cont-pasajero-gral .hidden" ).each(function(index) {
        pasajeros.push($(this).attr("id").replace("hidden_",""));
        if(ruta.indexOf("RG") !== -1)
        {
            if(index === 0)
            {
                origen = $(this).val();
                $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
            }
            else if( index > 0 )
            {
                destinos.push($(this).val());
            }
        }
        else if(ruta.indexOf("ZP") !== -1)
        {
            if(index === 0)
            {
                origen = direccion_empresa;
                $("#contenedor_punto_origen").html("<b>Origen: </b>"+origen);
                destinos.push($(this).val());
            }
            else if(index > 0)
            {
                destinos.push($(this).val());
            }
        }
        else if(TIPO_SERVICIO === '1' || TIPO_SERVICIO === '2'){
            if(total > 1){
                if(index === 0){
                    origen = $(this).val();
                    $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
                }
                else if(index > 0){
                    destinos.push($(this).val());
                }
                
                if(index === total - 1){
                    $("#contenedor_punto_destino").html("<b>Destino: </b>"+$(this).val());
                }
            }
        }
    });
    if(ruta.indexOf("RG") !== -1)
    {
        destinos.push(direccion_empresa);
    }
    dibujarRuta();
}

function borrarPasajero(idx,nombreReal,obj,nombre,punto,celular)
{
    cambiarPropiedad($(".contenedor_editar"),"display","none");
    quitarclase($("#contenedor_mapa"),"mapa_editar");
    var id = obj.replace("pasajero_","");
    for(var i = 0; i < pasajeros.length; i++)
    {
        if(pasajeros[i] === id)
        {
            pasajeros.splice(i, 1);
        }
    }
    if(origen === punto)
    {
        if(destinos.length > 1)
        {
            var destFinal = destinos.shift();
            origen = destFinal;
            $("#contenedor_punto_encuentro").html("<b>Origen:</b> "+origen);
        }
        else
        {
            origen = undefined;
            $("#contenedor_punto_encuentro").html("<b>Origen:</b> ");
            borrarDirections();
        }
    }
    else{
        //origen = undefined;
        $("#contenedor_punto_encuentro").html("<b>Origen:</b> "+origen);
        borrarDirections();
    }
    for(var i = 0; i < destinos.length; i++)
    {
        if(destinos[i] === punto)
        {
            destinos.splice(i, 1);
        }
    }
    var ruta = $("#truta").val();
    if(ruta.indexOf("RG") !== -1)
    {
        $("#contenedor_punto_destino").html("<b>Destino: </b>"+destinos[destinos.length-1]);
    }
    if(ruta.indexOf("ZP") === -1)
    {
        if(typeof origen === 'undefined')
        {
            $("#contenedor_punto_encuentro").html("<b>Origen: </b>");
        }
        else
        {
            $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
        }
    }
    if(ruta.indexOf("ESP") !== -1)
    {
        if(destinos.length === 0)
        {
            $("#contenedor_punto_destino").html("<b>Destino: </b>");
        }
        else
        {
            $("#contenedor_punto_destino").html("<b>Destino: </b>"+destinos[destinos.length-1]);
        }
    }
    var pasajero = $("#"+obj);
    var texto = "<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" \">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+punto+"\">"
                                 +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'><div class=\"boton-chico\" onclick=\"agregarPasajero('pasajero_"+id+"','"+formatearCadena(nombre)+"','"+formatearCadena(punto)+"','"+celular+"')\"><img src=\"img/flecha-arriba.svg\" width=\"12\" height=\"12\"></div></div>"+
                        "<div class=\"cont-mini-pasajero\"><div>"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>";
    $("#contenedor_pasajero_no_asignado").append(texto);
    pasajero.remove();
    
    dibujarRuta();
}

function borrarPasajeroEspecial(obj,partida,destino)
{
    $("#"+obj).remove();
    var id = obj.split("_")[1];
    for(var i = 0; i < pasajeros.length; i++)
    {
        if(pasajeros[i] === id)
        {
            pasajeros.splice(i, 1);
        }
    }
    indexDestinos.delete(partida);
    indexDestinos.delete(destino);
    for(var i = 0; i < destinos.length; i++)
    {
        if(destinos[i] === origen)
        {
            origen = destinos.length>0?destinos.shift():undefined;
        }
        if(destinos[i] === partida){
            destinos.splice(i, 1);
        }
        if(destinos[i] === destino){
            destinos.splice(i, 1);
        }
    }
    if(origen === partida){
        origen = undefined;
    }
    if(typeof origen === 'undefined'){
        $("#contenedor_punto_encuentro").html("<b>Origen:</b> ");
    }
    else{
        $("#contenedor_punto_encuentro").html("<b>Origen:</b> "+origen);
    }
    if(destinos.length === 0){
        $("#contenedor_punto_destino").html("<b>Destino: </b>");
    }
    else{
        $("#contenedor_punto_destino").html("<b>Destino: </b>"+destinos[destinos.length-1]);
    }
    borrarDirections();
    dibujarRuta();
}

function agregarPasajero(obj,nombre,punto,celular)
{
    if(pasajeros.length >= 17){
        alertify.error("Son 17 pasajeros como máximo por servicio");
        return;
    }
    if(TIPO_SERVICIO !== '0'){
        $("#nombre").val(nombre);
        $("#celular").val(celular.replace("_par","").replace("_des",""));
        $("#partida").val(punto);
    }
    else{
        initAgregarPasajero(obj,nombre,punto,celular);
    }
}

function cambiarServicioNormal()
{
    if(MODIFICADO)
    {
        confirmar("Reinicio formulario",
        "¿Desea cambiar sin guardar los cambios?",
        function()
        {
            ejecutarNormal();
        },()=>{
            $("#especial").prop("checked",true);
        });
    }
    else{
        ejecutarNormal();
    }
}
function ejecutarNormal(){
    SERVICIO_EDITADO = [];
    iniciarFecha(['#fechaDesde','#fechaHasta']);
    iniciarHora(['#hora']);    
    agregarclase($("#dato_especial"),"none");
    cambiarPropiedad($("#addPasajero"),"display","block");
    TIPO_SERVICIO = '0';
    vaciarFormulario();
    cargarMoviles();
    habilitarCampo($("#clientes"));
    $("#clientes").prop("readonly",false);
    habilitarCampo($("#ruta"));
    habilitarCampo($("#truta"));
    habilitarCampo($("#fechaDesde"));
    habilitarCampo($("#fechaHasta"));
    habilitarCampo($("#hora"));
    habilitarCampo($("#vehiculos"));
    habilitarCampo($("#conductorV"));
    habilitarCampo($("#tarifa1"));
    habilitarCampo($("#observacion"));
    $("#ruta").html("<option val=\"\">Seleccione</option>");
    $("#truta").html("<option val=\"\">Seleccione</option>");
    borrarDirections();
    eliminarMarkers();
    cambiarPropiedad($(".buscador-pasajero"),"display","none");
    cambiarPropiedad($(".contenedor_agregar"),"display","none");
    cambiarPropiedad($(".contenedor_editar"),"display","none");
    agregarclase($("#buscaPartida"),"oculto");
    agregarclase($("#buscaDestino"),"oculto"); 
    quitarclase($("#contenedor_mapa"),"mapa_bajo");
    quitarclase($("#contenedor_mapa"),"mapa_agregar");
    quitarclase($("#contenedor_mapa"),"mapa_editar");
    deshabilitarCampo($("#tarifa2"));
    deshabilitarCampo($("#partida"));
    cambiarPropiedad($("#tarifa2"),"background-color","#e5e7e9");
    $("#tarifa2").val("");
    MODIFICADO = false;
    EDITANDO = false;
    ASIGNANDO = false;
}
function cambiarServicioEspecial()
{
    if(MODIFICADO)
    {
        confirmar("Reinicio formulario",
        "¿Desea cambiar sin guardar los cambios?",
        function()
        {
            ejecutarEspecial();
        },()=>{
            $("#normal").prop("checked",true);
        });
    }
    else{
        ejecutarEspecial();
    }
}

function ejecutarEspecial(){
    SERVICIO_EDITADO = [];
    iniciarFecha(['#fechaDesde','#fechaHasta']);
    iniciarHora(['#hora']);
    quitarclase($("#dato_especial"),"none");
    cambiarPropiedad($("#addPasajero"),"display","none");
    TIPO_SERVICIO = '2';
    destinos = [];
    pasajeros = [];
    origen = undefined;
    cargarMoviles();
    habilitarCampo($("#clientes"));
    $("#clientes").prop("readonly",false);
    habilitarCampo($("#fechaDesde"));
    habilitarCampo($("#fechaHasta"));
    habilitarCampo($("#hora"));
    habilitarCampo($("#vehiculos"));
    habilitarCampo($("#conductorV"));
    habilitarCampo($("#tarifa1"));
    habilitarCampo($("#tarifa2"));
    habilitarCampo($("#observacion"));
    $("#tarifa2").val("");
    cambiarPropiedad($("#tarifa2"),"background-color","white");
    deshabilitarCampo($("#ruta"));
    deshabilitarCampo($("#truta"));
    vaciarFormulario();
    borrarDirections();
    eliminarMarkers();
    cambiarPropiedad($(".buscador-pasajero"),"display","none");
    cambiarPropiedad($(".contenedor_agregar"),"display","none");
    cambiarPropiedad($(".contenedor_editar"),"display","none");
    quitarclase($("#contenedor_mapa"),"mapa_bajo");
    quitarclase($("#contenedor_mapa"),"mapa_agregar");
    quitarclase($("#contenedor_mapa"),"mapa_editar");
    var contenedor = $("#contenedor_pasajero");
    var contenedorEx = $("#contenedor_pasajero_no_asignado");
    $("#contenedor_punto_encuentro").html("<b>Origen: </b>");
    $("#contenedor_punto_destino").html("<b>Destino: </b>");
    contenedor.html("");
    contenedorEx.html("");
    MODIFICADO = false;
    EDITANDO = false;
    ASIGNANDO = false;
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

function validarTipoDato()
{
    for(var i = 0 ; i < CAMPOS.length ; i++)
    {
        marcarCampoOk($("#"+CAMPOS[i]));
    }
    var tarifa1 = $("#tarifa1");
    var tarifa2 = $("#tarifa2");
    if(!validarNumero(tarifa1.val()))
    {
        marcarCampoError(tarifa1);
        alertify.error('Tarifa 1 debe ser numérico');
        return false;
    }
    if(!validarNumero(tarifa2.val()))
    {
        marcarCampoError(tarifa2);
        alertify.error('Tarifa 2 debe ser numérico');
        return false;
    }
    return true;
}

function obtenerExcepciones()
{
    var exp = "";
    if(TIPO_SERVICIO === '1')
    {
        exp += '||1||';
    }
    else if(TIPO_SERVICIO === '0')
    {
        exp += '||7||';
    }
    return exp;
}

function editarPasajero(id,nombre,celular,valor,obj,hidden)
{
    borrarDirections();
    initPlacesAutoComplete(document.getElementById('input_editar'));
    cambiarPropiedad($(".contenedor_editar"),"display","block");
    cambiarPropiedad($(".contenedor_agregar"),"display","none");
    agregarclase($("#contenedor_mapa"),"mapa_editar");
    quitarclase($("#contenedor_mapa"),"mapa_agregar");
    $("#input_editar").val(valor);
    $("#input_editar").select();
    $("#boton_place").off('click');
    $("#boton_place").click(function(){
        cambiarPropiedad($(".contenedor_editar"),"display","none");
        quitarclase($("#contenedor_mapa"),"mapa_editar");
        $("#"+obj).html(recortar($("#input_editar").val(),30));
        $("#"+obj+"_editar").attr('onclick',"editarPasajero('"+id+"','"+nombre+"','"+celular+"','"+$("#input_editar").val()+"','punto_"+id+"','hidden_"+id+"')");
        $("#"+obj+"_borrar").attr('onclick',"borrarPasajero('"+id+"','"+nombre+"','pasajero_"+id+"','"+formatearCadena(nombre)+"','"+formatearCadena($("#input_editar").val())+"','"+celular+"')");
        var existe = false;
        for(var i = 0; i < destinos.length; i++)
        {
            if(destinos[i] === valor)
            {
                existe = true;
                $("#"+hidden).val($("#input_editar").val());
                destinos[i] = $("#input_editar").val();
                if(i === destinos.length-1){
                    $("#contenedor_punto_destino").html("<b>Destino: </b>"+$("#input_editar").val());
                }
                break;
            }
        }
        if(!existe)
        {
            origen = $("#input_editar").val();
            $("#"+hidden).val($("#input_editar").val());
            $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
        }
        if(directionsDisplay === null)
        {
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
        }
        dibujarRuta();
    });
}

function editarPasajeroEspecial(nombre,celular,origen,destino,id)
{
    idEdit = id;
    partidaEdit = origen;
    destinoEdit = destino;
    accion = 'editar';
    borrarDirections();
    $("#nombre").val(nombre);
    $("#celular").val(celular);
    $("#partida").val(origen);
    $("#destino").val(destino);
    $("#addEspecial").text("Guardar");
    destinosVacios[0] = partidaEdit;
    destinosVacios[1] = destinoEdit;
}

function initPlacesAutoComplete(input) {
    var autocomplete = new google.maps.places.Autocomplete(input,
    {componentRestrictions:{'country': 'cl'}});
    places = new google.maps.places.PlacesService(map);
    autocomplete.addListener('place_changed', function(){
        INPUT_ACTUAL = input.id;
        if(input.id === 'partida')
        {
            quitarclase($("#buscaPartida"),"oculto");
        }
        else if(input.id === 'destino')
        {
            quitarclase($("#buscaDestino"),"oculto");
        }
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            colocarMarcadorPlaces();
        }
    });
}

function colocarMarcadorPlaces()
{
    eliminarMarkers();
    GEOCODING = true;
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map
    });
    markers.set("marker",marker);
    map.setZoom(17);
    map.panTo(marker.position);
    
    google.maps.event.addListener(map, "drag", function() {
        marker.setPosition(this.getCenter());
        POSITION = [this.getCenter().lat(),this.getCenter().lng()];
    });
    
    google.maps.event.addListener(map, "dragend", function() {
        if(GEOCODING)
        {
            if(INPUT_ACTUAL === 'partida')
            {
                document.getElementById('partida').value = "Cargando...";
            }
            else if(INPUT_ACTUAL === 'destino')
            {
                document.getElementById('destino').value = "Cargando...";
            }
            else if(INPUT_ACTUAL === 'agregaDireccion')
            {
                document.getElementById('agregaDireccion').value = "Cargando...";
            }
            else if(INPUT_ACTUAL === 'input_editar')
            {
                document.getElementById('input_editar').value = "Cargando...";
            }
            var query = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + POSITION[0] +','+ POSITION[1]+'&key=' + API_KEY;
            $.getJSON(query, function (data) {
                if (data.status === 'OK') { 
                    var zero = data.results[0];
                    var address = zero.formatted_address;
                    if(INPUT_ACTUAL === 'partida')
                    {
                        document.getElementById('partida').value = address;
                    }
                    else if(INPUT_ACTUAL === 'destino')
                    {
                        document.getElementById('destino').value = address;
                    }
                    else if(INPUT_ACTUAL === 'agregaDireccion')
                    {
                        document.getElementById('agregaDireccion').value = address;
                    }
                    else if(INPUT_ACTUAL === 'input_editar')
                    {
                        document.getElementById('input_editar').value = address;
                    }
                } 
            });
        }
    });
}

function abrirAddPasajero()
{
    initPlacesAutoComplete(document.getElementById('agregaDireccion'));
    cambiarPropiedad($(".contenedor_editar"),"display","none");
    cambiarPropiedad($(".contenedor_agregar"),"display","block");
    quitarclase($("#contenedor_mapa"),"mapa_editar");
    agregarclase($("#contenedor_mapa"),"mapa_agregar");
}

function cerrarAddPasajero()
{
    $("#agregaNombre").val("");
    $("#agregaCelular").val("");
    $("#agregaDireccion").val("");
    cambiarPropiedad($(".contenedor_agregar"),"display","none");
    quitarclase($("#contenedor_mapa"),"mapa_agregar");   
    eliminarMarkers();
}

function diasDiferencia(f1,f2)
{
    f1A = f1.split("/");
    f2A = f2.split("/");
    f1 = f1A[2]+"-"+f1A[1]+"-"+f1A[0];
    f2 = f2A[2]+"-"+f2A[1]+"-"+f2A[0];
    var fecha1 = moment(f1);
    var fecha2 = moment(f2);
    return fecha2.diff(fecha1, 'days');
}

function sumarDias(fecha, dias){
  var f = fecha.split("/");
  var date = new Date(parseInt(f[2]),parseInt(f[1])-1,parseInt(f[0]));
  date.setDate(date.getDate() + dias);
  var day = date.getDate();
  var monthIndex = date.getMonth()+1;
  var year = date.getFullYear();
  return day+"/"+monthIndex+"/"+year;
}

function resetPasajeros(){
    cambiarPropiedad($(".contenedor_agregar"),"display","none");
    cambiarPropiedad($(".contenedor_editar"),"display","none");
    quitarclase($("#contenedor_mapa"),"mapa_agregar");
    quitarclase($("#contenedor_mapa"),"mapa_editar");
    $("#contenedor_pasajero").html("");
    $("#contenedor_pasajero_no_asignado").html("");
    $("#contenedor_punto_encuentro").html("<b>Origen: </b>");
    $("#contenedor_punto_destino").html("<b>Destino: </b>");
    origen = undefined;
    destinos = [];
    pasajeros = [];
}

function borrarServicio(){
    origen = undefined;
    destinos = [];
    pasajeros = [];
    borrarDirections();
    $("#contenedor_punto_encuentro").html("<b>Origen: </b>");
    $("#contenedor_punto_destino").html("<b>Destino: </b>");
}

function cancelarPasajeroEspecial(){
    $("#nombre").val("");
    $("#celular").val("");
    $("#partida").val("");
    $("#destino").val("");
    $("addEspecial").text("Agregar");
    accion = 'agregar';
}

function agregarPasajeroEspecial(){
    var nombre = $("#nombre").val().split(" ").join("_");
    var celular = $("#celular").val();
    var partida = $("#partida").val();
    var destino = $("#destino").val();
    if(nombre === ''){
        marcarCampoError($("#nombre"));
        alertify.error("Ingrese nombre");
        return;
    }
    else{
        marcarCampoOk($("#nombre"));
    }
    if(celular === ''){
        marcarCampoError($("#celular"));
        alertify.error("Ingrese celular");
        return;
    }
    else{
        marcarCampoOk($("#celular"));
    }
    if(partida === ''){
        marcarCampoError($("#partida"));
        alertify.error("Ingrese partida");
        return;
    }
    else{
        marcarCampoOk($("#partida"));
    }
    if(destino === ''){
        marcarCampoError($("#destino"));
        alertify.error("Ingrese destino");
        return;
    }
    else{
        marcarCampoOk($("#destino"));
    }
    if(validarNumero(nombre))
    {
        alertify.error("Nombre no debe ser numérico");
        return;
    }
    if(nombre.indexOf("-") !== -1)
    {
        alertify.error("Nombre no debe tener caracteres especiales");
        return;
    }
    if(!validarNumero(celular))
    {
        alertify.error("Celular debe ser numérico");
        return;
    }
    if(pasajeros.length > 15){
        alertify.error("Son 17 pasajeros como máximo por servicio");
        return;
    }
    var id = nombre+"-"+celular.split("+").join("");
    
    if(accion === 'editar'){
        var id = nombre+"-"+celular.split("+").join("");
        $("#editEspecial"+id).click(()=>{
            editarPasajeroEspecial(formatearCadena(nombre),celular,formatearCadena(partida),formatearCadena(destino),id);
        });
        $("#delEspecial"+id).click(()=>{
            borrarPasajeroEspecial("pasajero_"+id,formatearCadena(partida),formatearCadena(destino));
        });
        $("#punto_origen_"+id).html("<div id=\"punto_"+id+"\"><b>Origen:</b> "+ recortar(partida,50) + "</div>");
        $("#punto_destino_"+id).html("<div id=\"punto_"+id+"\"><b>Destino:</b> "+ recortar(destino,50) + "</div>");
        for(var i = 0; i < pasajeros.length; i++)
        {
            if(pasajeros[i] === idEdit)
            {
                pasajeros[i] = id;
            }
        }
        if(origen === partidaEdit){
            origen = partida;
        }
        for(var i = 0; i < destinos.length; i++)
        {
            if(destinos[i] === partidaEdit)
            {
                destinos[i] = partida;
            }
            if(destinos[i] === destinoEdit){
                destinos[i] = destino;
            }
        }
    }
    else {
        var cont = "<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral-especial\">"
                +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'>"
                +"<div class=\"boton-chico\" id=\"editEspecial"+id+"\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
                +"<div class=\"boton-chico\" id=\"delEspecial"+id+"\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"
                +"<div class=\"cont-mini-pasajero\"><div class=\"punto-especial\" id=\"punto_origen_"+id+"\"></div><div class=\"punto-especial\" id=\"punto_destino_"+id+"\"></div><div>" + celular+"</div></div>";
        $("#contenedor_pasajero").append(cont);
        $("#editEspecial"+id).click(()=>{
            editarPasajeroEspecial(formatearCadena(nombre),celular,formatearCadena(partida),formatearCadena(destino),id);
        });
        $("#delEspecial"+id).click(()=>{
            borrarPasajeroEspecial("pasajero_"+id,formatearCadena(partida),formatearCadena(destino));
        });
        $("#punto_origen_"+id).html("<div id=\"punto_"+id+"\"><b>Origen:</b> "+ recortar(partida,50) + "</div>");
        if(typeof origen === 'undefined'){
            origen = partida;
            $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
        }
        else{
            destinos.push(partida);
            $("#contenedor_punto_destino").html("<b>Destino: </b>"+partida);
        }
        pasajeros.push(id+"_par");
        $("#punto_destino_"+id).html("<div id=\"punto_"+id+"\"><b>Destino:</b> "+ recortar(destino,50) + "</div>");
        if(typeof origen === 'undefined'){
            origen = destino;
            $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
        }
        else{
            destinos.push(destino);
            $("#contenedor_punto_destino").html("<b>Destino: </b>"+destino);
        }
        pasajeros.push(id+"_des");
    }
    dibujarRuta();
    $("#nombre").val("");
    $("#celular").val("");
    $("#partida").val("");
    $("#destino").val("");
    $("#addEspecial").text("Agregar");
    accion = 'agregar';
}   

function agregarPasajeroEspecialEditar(nombre,celular,partida,destino){
    var id = nombre+"-"+celular.split("+").join("");
    
    if(accion === 'editar'){
        var indexPartida = indexDestinos.get(partidaEdit);
        var indexDestino = indexDestinos.get(destinoEdit);
        if(indexPartida === 0){
            
            if(partida === ''){
                if(destinos.length > 0){
                    origen = destinos.shift();
                }
            }
            else{
                if(typeof origen === 'undefined'){
                    origen = partida;
                }
                else{
                    destinos.unshift(origen);
                    origen = partida;
                }
                pasajeros.splice(0,1,nombre+"_par");
            }
        }
        if(indexDestino === 1){
            if(partida !== ''){
                destinos.splice(0, 1, destino);
                pasajeros.splice(0, 1, nombre+"_des");
            }
            else{
                console.log("no se hace nada");
            }
        }
        if(indexDestino === 0){
            destinos.unshift(origen);
            origen = partida;
        }
        if(indexPartida > 0 && indexDestino > 1){
            destinos.splice(indexPartida-1, 1, partida);
            pasajeros.splice(indexPartida-1, 1, nombre+"_par");
            destinos.splice(indexDestino-1, 1, destino);
            pasajeros.splice(indexDestino-1, 1, nombre+"_des");
        }
        indexDestinos.clear();
        indexDestinos.set(origen,0);
        for(var i = 0 ; i < destinos.length ; i++){
            indexDestinos.set(destinos[i],i+1);
        }
        $("#editEspecial"+idEdit).prop("onclick", null).off("click");
        $("#delEspecial"+idEdit).prop("onclick", null).off("click");
        $("#editEspecial"+id).click(()=>{
            editarPasajeroEspecial(formatearCadena(nombre),celular,formatearCadena(partida),formatearCadena(destino),id);
        });
        $("#delEspecial"+id).click(()=>{
            borrarPasajeroEspecial("pasajero_"+id,formatearCadena(partida),formatearCadena(destino));
        });
        $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
        if(destinos.length > 0){
            $("#contenedor_punto_destino").html("<b>Destino: </b>"+destinos[destinos.length-1]);
        }
        $("#punto_origen_"+id).html("<div id=\"punto_"+id+"\"><b>Origen:</b> "+ recortar(partida,50) + "</div>");
        $("#punto_destino_"+id).html("<div id=\"punto_"+id+"\"><b>Destino:</b> "+ recortar(destino,50) + "</div>");
        $("#addEspecial").text("Agregar");
        accion = 'agregar';
    }
    else {
        var cont = '';
        index = index + 1;
        indexDestinos.set(partida.trim(),index);
        index = index + 1;
        indexDestinos.set(destino.trim(),index);
        if(partida.trim() !== '' || destino !== ''){
            cont = "<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral-especial\">"
                +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'>"
                +"<div class=\"boton-chico\" id=\"editEspecial"+id+"\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
                +"<div class=\"boton-chico\" id=\"delEspecial"+id+"\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"
                +"<div class=\"cont-mini-pasajero\"><div class=\"punto-especial\" id=\"punto_origen_"+id+"\"></div><div class=\"punto-especial\" id=\"punto_destino_"+id+"\"></div><div>" + celular+"</div></div>";
        }
        else{
            return;
        }
        $("#contenedor_pasajero").append(cont);
        $("#editEspecial"+id).click(()=>{
            editarPasajeroEspecial(formatearCadena(nombre),celular,formatearCadena(partida),formatearCadena(destino),id);
        });
        $("#delEspecial"+id).click(()=>{
            borrarPasajeroEspecial("pasajero_"+id,formatearCadena(partida),formatearCadena(destino));
        });
        if(partida.trim() !== ''){
            $("#punto_origen_"+id).html("<div id=\"punto_"+id+"\"><b>Origen:</b> "+ recortar(partida,50) + "</div>");
            if(typeof origen === 'undefined'){
                origen = partida;
                $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
            }
            else{
                destinos.push(partida);
                $("#contenedor_punto_destino").html("<b>Destino: </b>"+partida);
            }
            pasajeros.push(id+"_par");
        }
        else{
             $("#punto_origen_"+id).html("<div id=\"punto_"+id+"\"><b>Origen:</b></div>");
        }
        if(destino.trim() !== ''){
            $("#punto_destino_"+id).html("<div id=\"punto_"+id+"\"><b>Destino:</b> "+ recortar(destino,50) + "</div>");
            if(typeof origen === 'undefined'){
                origen = destino;
                $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+origen);
            }
            else{
                destinos.push(destino);
                $("#contenedor_punto_destino").html("<b>Destino: </b>"+destino);
            }
            pasajeros.push(id+"_des");
        }
        else{
            $("#punto_destino_"+id).html("<div id=\"punto_"+id+"\"><b>Destino:</div>");
        }
    }
    dibujarRuta();
}   

function initAgregarPasajero(obj,nombre,punto,celular){
    var nombreCompleto = nombre;
    nombre = nombre.split(" ").join("_");
    if(validarNumero(nombre))
    {
        alertify.error("Nombre no debe ser numérico");
        return;
    }
    if(nombre.indexOf("-") !== -1)
    {
        alertify.error("Nombre no debe ser numérico");
        return;
    }
    if(!validarNumero(celular))
    {
        alertify.error("Celular debe ser numérico");
        return;
    }
    $("#agregaNombre").val("");
    $("#agregaDireccion").val("");
    $("#agregaCelular").val("");
    var id = obj.split("_")[1];
    if(typeof id === 'undefined')
    {
        id = nombre+"-"+celular;
    }
    var ruta = $('#truta').val();
    var pasajero = $("#"+obj);
    var texto = "<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" draggable=\"true\" ondragstart=\"drag(event,$(this))\" ondrop=\"drop(event,$(this))\" ondragover=\"allowDrop(event)\">"
                                 +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+formatearCadena(punto)+"\">"
                                 +"<div class=\"cont-pasajero\">"+formatearCadena(nombre)+"</div><div style='float:right'>"
                                 +"<div class=\"boton-chico\" id=\"punto_"+id+"_editar\" onclick=\"editarPasajero('"+id+"','"+formatearCadena(nombreCompleto)+"','"+celular+"','"+formatearCadena(punto)+"','punto_"+id+"','hidden_"+id+"')\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
                                 +"<div class=\"boton-chico\" id=\"punto_"+id+"_borrar\" onclick=\"borrarPasajero('"+id+"','"+formatearCadena(nombreCompleto)+"','pasajero_"+id+"','"+formatearCadena(nombre)+"','"+formatearCadena(punto)+"','"+celular+"')\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"
                                 +"<div class=\"cont-mini-pasajero\"><div id=\"punto_"+id+"\">"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>";
    if(ruta.indexOf("RG") !== -1)
    {
        pasajeros.push(id);
        $("#contenedor_punto_destino").html("<b>Destino: </b>"+direccion_empresa);
        var final = destinos.pop();
        if(typeof origen !== 'undefined')
        {
            destinos.push(punto);
        }
        destinos.push(final);
    }
    else if(ruta.indexOf("ZP") !== -1)
    {
        pasajeros.push(id);
        $("#contenedor_punto_destino").html("<b>Destino: </b>"+punto);
        destinos.push(punto);
    }
    if(ruta.indexOf("RG") !== -1)
    {
        if(typeof origen === 'undefined')
        {
            origen = punto;
            $("#contenedor_punto_encuentro").html("<b>Origen: </b>"+punto);
        }
        $(texto).insertBefore($("#destino_empresa"));
    }
    else if(ruta.indexOf("ZP") !== -1)
    {
        $("#contenedor_pasajero").append(texto);
    }
    soloHayPartidaDestino = false;
    pasajero.remove();
    dibujarRuta();
}

function initAddServicio(params,id,conductor,fecha,hora){
    $("#conductores").html("Conductor: ");
    var anterior = false;
    var fechaFormat = fecha.split('/');
    var date = new Date(fechaFormat[2]+"-"+fechaFormat[1]+"-"+fechaFormat[0]+" "+hora.replace(/-/g, "/"));
    var now = new Date();
    if(date < now)
    {
        anterior = true;
    }
    var url = urlBase + "/servicio/AddServicio.php";
    if(TIPO_SERVICIO === '1' || EDITANDO)
    {
        params.id = id;
        params.tipo = 1;
        if(EDITANDO){
            params.tipo = TIPO_SERVICIO;
            eliminarDetalleServicio(id);
        }
        url = urlBase + "/servicio/ModServicio.php";
    }
    params.anterior = anterior ? "1" : "0";
    var success = function(response)
    {
        MODIFICADO = false;
        cerrarSession(response);
        if(TIPO_SERVICIO === '1')
        {
            eliminarDetalleServicio(response.servicio_id);
        }
        if(!EDITANDO){
            agregarDetalleServicio(response.servicio_id);
            alertify.success('Servicio agregado con id '+response.servicio_id);
        }
        notificarConductor(response.servicio_id,conductor,fecha,hora);
        notificarServicioFuturo(response.servicio_id,conductor,fecha,hora);
    };
    postRequest(url,params,success);
}


function cargarPasajerosEditar(servicios)
{
    direccion_empresa = servicios[0].servicio_cliente_direccion;
    $("#conductorH").val(servicios[0].servicio_conductor);
    var contenedorDir = $("#contenedor_punto_encuentro");
    var contenedorDes = $("#contenedor_punto_destino");
    var contenedor = $("#contenedor_pasajero");
    contenedor.html("");
    var truta = servicios[0].servicio_truta;
    if(truta.indexOf("ZP") !== -1)
    {
        origen = servicios[0].servicio_cliente_direccion;
        contenedorDir.html("<b>Origen:</b> "+origen);
        contenedor.prepend("<div class=\"cont-pasajero-gral\" id=\"origen_empresa\">"
        +"<div class=\"cont-pasajero\">"+servicios[0].servicio_cliente+
        "</div><div class=\"cont-mini-pasajero\"><div>"+ origen + "</div><div>");
    }
    pasajeros = [];
    destinos = [];
    var partidaExiste = true;
    for(var i = 0 ; i < servicios.length ; i++)
    {
        if(servicios[0].pasajero_id === ""){
            break;
        }
        var id = servicios[i].servicio_pasajero_id;
        var nombre = servicios[i].servicio_pasajero_nombre.trim();
        var punto = servicios[i].servicio_destino;
        var celular = servicios[i].servicio_pasajero_celular;
        if(truta.indexOf("RG") !== -1 && partidaExiste)
        {
            origen = punto;
            contenedorDir.html("<b>Origen:</b> "+origen);
            partidaExiste = false;
        }
        else if(truta.indexOf("ESP") !== -1 && partidaExiste){
            origen = punto;
            contenedorDir.html("<b>Origen:</b> "+origen);
            partidaExiste = false;
        }
        if(origen !== punto)
        {
            destinos.push(punto);
        }
        contenedor.append(" <div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral\" draggable=\"true\" ondragstart=\"drag(event,$(this))\" ondrop=\"drop(event,$(this))\" ondragover=\"allowDrop(event)\">"
                         +"<input id=\"hidden_"+id+"\" type=\"hidden\" class=\"hidden\" value=\""+formatearCadena(punto)+"\">"
                         +"<div class=\"cont-pasajero\">"+formatearCadena(nombre)+"</div><div style='float:right'>"
                         +"<div class=\"boton-chico\" onclick=\"editarPasajero('"+id+"','"+formatearCadena(nombre)+"','"+celular+"','"+formatearCadena(punto)+"','punto_"+id+"','hidden_"+id+"')\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
                         +"<div class=\"boton-chico\" onclick=\"borrarPasajero('"+id+"','"+formatearCadena(nombre)+"','pasajero_"+id+"','"+formatearCadena(nombre)+"','"+formatearCadena(punto)+"','"+celular+"')\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"+
                "<div class=\"cont-mini-pasajero\"><div id=\"punto_"+id+"\">"+ recortar(punto,30) + "</div><div>" + celular+"</div></div>");
        pasajeros.push(id);
    }
    if(truta.indexOf("RG") !== -1)
    {
        destinos.push(servicios[0].servicio_cliente_direccion);
        contenedorDes.html("<b>Destino:</b> "+servicios[0].servicio_cliente_direccion);
        contenedor.append("<div class=\"cont-pasajero-gral\" id=\"destino_empresa\"><div class=\"cont-pasajero\">"
                +servicios[0].servicio_cliente+"</div><div class=\"cont-mini-pasajero\"><div>"
                + servicios[0].servicio_cliente_direccion + "</div><div>");
    }
    else if(truta.indexOf("ZP") !== -1)
    {
        if(destinos.length > 0){
            contenedorDes.html("<b>Destino:</b> "+destinos[destinos.length-1]);
        }
    }
    else if(truta.indexOf("ESP") !== -1){
        if(destinos.length > 0){
            contenedorDes.html("<b>Destino:</b> "+destinos[destinos.length-1]);
        }
    }
    dibujarRuta();
}

function agregarPasajeroEspecialCliente(nombre,celular,partida,destino){
    if(validarNumero(nombre))
    {
        alertify.error("Nombre no debe ser numérico");
        return;
    }
    if(nombre.indexOf("-") !== -1)
    {
        alertify.error("Nombre no debe tener caracteres especiales");
        return;
    }
    if(!validarNumero(celular))
    {
        alertify.error("Celular debe ser numérico");
        return;
    }
    var id = nombre+"-"+celular.split("+").join("");
        var cont = "<div id=\"pasajero_"+id+"\" class=\"cont-pasajero-gral-especial\">"
            +"<div class=\"cont-pasajero\">"+nombre+"</div><div style='float:right'>"
            +"<div class=\"boton-chico\" id=\"editEspecial"+id+"\"><img src=\"img/editar.svg\" width=\"12\" height=\"12\"></div>"
            +"<div class=\"boton-chico\" id=\"delEspecial"+id+"\"><img src=\"img/cancelar.svg\" width=\"12\" height=\"12\"></div></div>"
            +"<div class=\"cont-mini-pasajero\"><div class=\"punto-especial\" id=\"punto_origen_"+id+"\"></div><div class=\"punto-especial\" id=\"punto_destino_"+id+"\"></div><div>" + celular+"</div></div>";
    $("#contenedor_pasajero").append(cont);
    $("#editEspecial"+id).click(()=>{
        editarPasajeroEspecial(formatearCadena(nombre),celular,formatearCadena(partida),formatearCadena(destino),id);
    });
    $("#delEspecial"+id).click(()=>{
        borrarPasajeroEspecial("pasajero_"+id,formatearCadena(partida),formatearCadena(destino));
    });
    $("#punto_origen_"+id).html("<div id=\"punto_"+id+"\"><b>Origen:</b> "+ recortar(partida,50) + "</div>");
    $("#punto_destino_"+id).html("<div id=\"punto_"+id+"\"><b>Destino:</b> "+ recortar(destino,50) + "</div>");
    pasajeros.push(id+"_par");
    pasajeros.push(id+"_des"); 
    if(typeof origen === 'undefined'){
        origen = partida;
    }
    else{
        destinos.push(partida);
    }
    destinos.push(destino)
    dibujarRuta();
}   
